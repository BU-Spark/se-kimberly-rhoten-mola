"use client";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Map from "./components/Map";
import SearchBar from "./components/SearchBar";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/configfirebase";

interface MarkerData {
  id: string;
  lat: number;
  lng: number;
  Organization_Name?: string;
  Organization_Address?: string;
}

async function geocodeAddress(
  address: string,
): Promise<{ lat: number; lng: number }> {
  const normalized = address.toLowerCase().trim();
  if (normalized === "n/a" || normalized === "virtual" || normalized === "") {
    console.log(
      `Address "${address}" is not valid; using fallback coordinates.`,
    );
    return { lat: 42.3601, lng: -71.0589 };
  }
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const encoded = encodeURIComponent(address);
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encoded}&key=${apiKey}`
  );
  const data = await res.json();
  console.log("Geocoding API response for address:", address, data);
  if (data.status === "OK" && data.results.length > 0) {
    return data.results[0].geometry.location;
  } else {
    console.error(
      "Geocoding error for address:",
      address,
      data.error_message || data.status,
    );
    return { lat: 42.3601, lng: -71.0589 };
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function geocodeAddressIfNeeded(docData: any): Promise<MarkerData> {
  if (docData.Organization_Address) {
    try {
      const result = await geocodeAddress(docData.Organization_Address);
      return {
        id: docData.id,
        lat: result.lat,
        lng: result.lng,
        Organization_Name: docData.Organization_Name,
        Organization_Address: docData.Organization_Address,
      };
    } catch (error) {
      console.error(
        "Error geocoding address for doc:",
        docData.Organization_Address,
        error,
      );
    }
  }
  return {
    id: docData.id,
    lat: 42.3601,
    lng: -71.0589,
    Organization_Name: docData.Organization_Name,
    Organization_Address: docData.Organization_Address,
  };
}

export default function Home() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const downtownBostonCenter = { lat: 42.355, lng: -71.0656 }; // Coordinates for downtown Boston

  useEffect(() => {
    const fetchAllOrganizations = async () => {
      try {
        const snapshot = await getDocs(collection(db, "Organizations"));
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const geocodedPromises = docs.map((docData) =>
          geocodeAddressIfNeeded(docData),
        );
        const finalMarkers = await Promise.all(geocodedPromises);
        console.log("Final markers:", finalMarkers);
        setMarkers(finalMarkers);
      } catch (error) {
        console.error("Error fetching organizations:", error);
      }
    };

    fetchAllOrganizations();
  }, []);

  const handleFilter = (filters: {
    category?: string;
    subcategory?: string;
  }) => {
    console.log("Filters from SearchBar:", filters);
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <section className={styles.heroSection}>
          <h1 className={styles.heroTitle}>
            LGBTQIA2S+
            <br />
            Resource Map
          </h1>
          <p className={styles.heroSubtitle}>
            Supporting Boston&apos;s LGBTQ+ community by providing resources,
            services, and programs that enhance well-being, provide vital
            support, and create pathways to thrive.
          </p>
          <SearchBar onFilter={handleFilter} />
        </section>
        <section className={styles.mapSection}>
          <Map
            apiKey={apiKey}
            markers={markers}
            center={downtownBostonCenter}
          />
        </section>
      </main>
    </div>
  );
}

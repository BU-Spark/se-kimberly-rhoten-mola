"use client";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";

import Search from "@/app/components/sections/Search";
import Map from "@/app/components/sections/Maps";

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
    return { lat: 42.3601, lng: -71.0589 };
  }
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const encoded = encodeURIComponent(address);
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encoded}&key=${apiKey}`
  );
  const data = await res.json();
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
  }) => {  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Search onFilter={handleFilter} />
        <section className={styles.mapSection}>
          <Map markers={markers} center={downtownBostonCenter} />
        </section>
      </main>
    </div>
  );
}

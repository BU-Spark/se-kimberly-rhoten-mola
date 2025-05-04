// app/page.tsx
// HOME / LANDING PAGE
// contains functionality to geocode addresses, render the search bar + map, create marker data

"use client";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Map from "./components/Map";
import SearchBar from "./components/SearchBar";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/configfirebase";
import Link from "next/link";

interface MarkerData {
  id: string;
  lat: number;
  lng: number;
  Organization_Name?: string;
  Organization_Address?: string;
}

// Helper functions

// Google Geocoding API only when we need to turn a postal address into coordinates.
// Normalizes non‑addresses like "N/A" or "virtual"

async function geocodeAddress(
  address: string,
): Promise<{ lat: number; lng: number }> {
  const normalised = address.toLowerCase().trim();
  if (normalised === "n/a" || normalised === "virtual" || normalised === "") {
    return { lat: 42.3601, lng: -71.0589 }; // Center of Boston fallback
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const encoded = encodeURIComponent(address);
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encoded}&key=${apiKey}`,
  );
  const data = await res.json();

  if (data.status === "OK" && data.results.length > 0) {
    return data.results[0].geometry.location;
  }

  console.error("Geocoding error:", data.error_message || data.status);
  return { lat: 42.3601, lng: -71.0589 };
}

// Function to Convert a Firestore document -> MarkerData

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function orgToMarker(docData: any): Promise<MarkerData> {
  const { Organization_Address = "" } = docData;
  const { lat, lng } = await geocodeAddress(Organization_Address);

  return {
    id: docData.id,
    lat,
    lng,
    Organization_Name: docData.Organization_Name,
    Organization_Address,
  };
}

export default function Home() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const downtownBostonCenter = { lat: 42.355, lng: -71.0656 };

  // Fetch + geocode once on mount

  useEffect(() => {
    const fetchAllOrganizations = async () => {
      try {
        const snap = await getDocs(collection(db, "Organizations"));
        const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        const geocoded = await Promise.all(docs.map(orgToMarker));
        setMarkers(geocoded);
      } catch (err) {
        console.error("Firestore fetch failed:", err);
      }
    };
    fetchAllOrganizations();
  }, []);

  // Filter functionality

  const handleFilter = (filters: {
    category?: string;
    subcategory?: string;
  }) => {
    console.log("Filters from SearchBar:", filters); //make sure results are filtered
  };

  // Display

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {/* Hero */}
        <section className={styles.heroSection}>
          <h1 className={styles.heroTitle}>
            LGBTQIA2S+
            <br />
            Resource Map
          </h1>
          <p className={styles.heroSubtitle}>
            Supporting Boston&apos;s LGBTQ+ community by providing resources,
            services, and programs that enhance well‑being, provide vital
            support, and create pathways to thrive.
          </p>
          <SearchBar onFilter={handleFilter} />
        </section>

        {/* Teaser */}
        <section>
          <div className={styles.mapTeaserText}>
            <h1 className={styles.mapTeaserTitle}>MAP</h1>
            <section className={styles.mapTeaser}>
              <p className={styles.mapTeaserDesc}>
                Discover LGBTQIA2S+ events, secure locations, and resources near
                you with this interactive map.
              </p>
              <Link href="/map" className={styles.mapTeaserBtn}>
                GO&nbsp;TO&nbsp;MAP&nbsp;↗
              </Link>
            </section>
          </div>
        </section>

        {/* Map preview */}
        <section className={styles.mapSection}>
          <Map
            apiKey={apiKey}
            markers={markers}
            center={downtownBostonCenter}
            height="400px"
          />
        </section>
      </main>
    </div>
  );
}

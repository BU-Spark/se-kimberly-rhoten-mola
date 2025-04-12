'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import Map from './components/Map';
import SearchBar from './components/SearchBar';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/configfirebase';

interface MarkerData {
  id: string;
  lat: number;
  lng: number;
  Organization_Name?: string;
  Organization_Address?: string;
}

// Helper function: Geocode an address using the Google Geocoding API
async function geocodeAddress(address: string): Promise<{ lat: number; lng: number }> {
  const normalized = address.toLowerCase().trim();
  // If the address is a placeholder, return fallback coordinates
  if (normalized === 'n/a' || normalized === 'virtual' || normalized === '') {
    console.warn(`Address "${address}" is not valid; using fallback coordinates.`);
    return { lat: 42.3601, lng: -71.0589 };
  }
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const encoded = encodeURIComponent(address);
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encoded}&key=${apiKey}`
  );
  const data = await res.json();
  console.log('Geocoding API response for address:', address, data);
  if (data.status === 'OK' && data.results.length > 0) {
    return data.results[0].geometry.location;
  } else {
    console.error('Geocoding error for address:', address, data.error_message || data.status);
    // Fallback: default to Boston's coordinates
    return { lat: 42.3601, lng: -71.0589 };
  }
}

// Helper function: For each document, always geocode the address
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
      console.error('Error geocoding address for doc:', docData.Organization_Address, error);
    }
  }
  // Fallback if no address is provided: use default coordinates
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

  // Fetch all organizations from Firestore and geocode their addresses
  useEffect(() => {
    const fetchAllOrganizations = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'Organizations'));
        const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        // For each document, geocode its address (since none have lat/lng)
        const geocodedPromises = docs.map((docData) => geocodeAddressIfNeeded(docData));
        const finalMarkers = await Promise.all(geocodedPromises);
        console.log('Final markers:', finalMarkers);
        setMarkers(finalMarkers);
      } catch (error) {
        console.error('Error fetching organizations:', error);
      }
    };

    fetchAllOrganizations();
  }, []);

  const handleFilter = (filters: { category?: string; subcategory?: string }) => {
    console.log('Filters from SearchBar:', filters);
    // Additional filtering logic can be implemented here if needed
  };

  return (
    <div className={styles.container}>
      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.logoArea}>
          <Image
            src="/cob_b_white-01.png"
            alt="City of Boston Logo"
            width={60}
            height={60}
          />
          <div className={styles.headerText}>
            <span>Mayor&apos;s Office of LGBTQIA2S+ Advancement</span>
          </div>
        </div>
        <nav className={styles.navMenu}>
          <ul>
            <li>
              <a href="/database">Database</a>
            </li>
            <li>
              <a href="#">Interactive Map</a>
            </li>
            <li>
              <a href="#">Help</a>
            </li>
          </ul>
        </nav>
      </header>

      {/* MAIN */}
      <main className={styles.main}>
        {/* HERO SECTION */}
        <section className={styles.heroSection}>
          <h1 className={styles.heroTitle}>
            Mayor&apos;s Office of
            <br />
            LGBTQIA2S+
            <br />
            Advancement
            <br />
            Directory
          </h1>
          <p className={styles.heroSubtitle}>
            Supporting Boston&apos;s LGBTQ+ community by providing resources,
            services, and programs that enhance well-being, provide vital
            support, and create pathways to thrive.
          </p>

          <SearchBar onFilter={handleFilter} />
        </section>

        <section className={styles.placeholderSection}>
          {/* Pass the complete markers array to the Map component */}
          <Map apiKey={apiKey} markers={markers} />
        </section>
      </main>

      <footer className={styles.footer}>
        <p>© 2025 City of Boston. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
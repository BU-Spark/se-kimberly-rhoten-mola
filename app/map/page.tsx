// app/map/page.tsx
// Full‑screen map + results panel
// Fuse.js fuzzy search across name / address / service type
// Live two‑column layout (results list + Google Map)

"use client";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useCallback, useEffect, useMemo, useState } from "react";
import styles from "../page.module.css";
import Map from "../components/Map";
import MapSearchBar from "../components/MapSearchBar";
import ResourceList from "../components/ResourceList";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/configfirebase";
import Fuse from "fuse.js";

interface MarkerData {
  id: string;
  lat: number;
  lng: number;
  Organization_Name?: string;
  Organization_Address?: string;
}
interface Org {
  id: string;
  Organization_Name: string;
  Organization_Address?: string;
  Type_Of_Service?: string;
}

// Google Geocode Function
async function geocodeAddress(
  address: string,
): Promise<{ lat: number; lng: number }> {
  const norm = address.toLowerCase().trim();
  if (norm === "n/a" || norm === "virtual" || norm === "") {
    return { lat: 42.3601, lng: -71.0589 }; // Boston fallback
  }
  const apiKey  = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
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

// Convert a Firestore doc -> MarkerData
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

// Static config

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const downtownBostonCenter = { lat: 42.355, lng: -71.0656 };

// Component

export default function MapPage() {
  const [allOrgs, setAllOrgs] = useState<Org[]>([]);
  const [filtered, setFiltered] = useState<Org[]>([]);
  const [markers, setMarkers] = useState<MarkerData[]>([]);

  // Fetch + geocode everything once
  useEffect(() => {
    const fetchData = async () => {
      const snap = await getDocs(collection(db, "Organizations"));
      const docs = snap.docs.map((d) => ({ id: d.id, ...(d.data() as Org) }));
      setAllOrgs(docs);
      setFiltered(docs);

      const geo = await Promise.all(docs.map(orgToMarker));
      setMarkers(geo);
    };
    fetchData();
  }, []);

  // Fuse.js instance (memoised)
  const fuse = useMemo(() => {
    if (!allOrgs.length) return null;
    return new Fuse(allOrgs, {
      keys: [
        { name: "Organization_Name", weight: 0.7 },
        { name: "Organization_Address", weight: 0.3 },
        { name: "Type_Of_Service", weight: 0.4 },
      ],
      threshold: 0.4,
      includeScore: false,
    });
  }, [allOrgs]);

  // Search/filter callback passed to <MapSearchBar>
  const handleFilter = useCallback(
    ({ text, category }: { text: string; category?: string }) => {
      if (!text && !category) {
        setFiltered(allOrgs);
        return;
      }
      const fuzzed =
        text && fuse ? fuse.search(text).map((r) => r.item) : allOrgs;
      const final = category
        ? fuzzed.filter((o) => o.Type_Of_Service === category)
        : fuzzed;
      setFiltered(final);
    },
    [allOrgs, fuse],
  );

  // Render

  return (
    <main className={styles.mapPage}>
      {/* Results list */}
      <aside className={styles.resultsPanel}>
        <h2 style={{ marginTop: 0 }}>Showing {filtered.length} results</h2>
        <ResourceList resources={filtered} />
      </aside>

      {/* Map */}
      <section className={styles.mapPanel}>
        <div className={styles.floatingSearch}>
          <MapSearchBar onFilter={handleFilter} />
        </div>
        <div className={styles.fullHeightMap}>
          <Map
            apiKey={apiKey}
            markers={markers}
            center={downtownBostonCenter}
            style={{ height: "100%", width: "100%" }}
          />
        </div>
      </section>
    </main>
  );
}

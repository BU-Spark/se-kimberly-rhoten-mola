"use client";

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
  // …any other fields you care about…
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
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encoded}&key=${apiKey}`,
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

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const downtownBostonCenter = { lat: 42.355, lng: -71.0656 }; // Coordinates for downtown Boston

export default function MapPage() {
  const [allOrgs, setAllOrgs] = useState<Org[]>([]);
  const [filtered, setFiltered] = useState<Org[]>([]);
  const [markers, setMarkers] = useState<MarkerData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const snap = await getDocs(collection(db, "Organizations"));
      const docs = snap.docs.map((d) => {
          return ({ id: d.id, ...(d.data() as Org) });
      });
      setAllOrgs(docs);
      setFiltered(docs);

      const geo = await Promise.all(docs.map(geocodeAddressIfNeeded));
      setMarkers(geo);
    };
    fetchData();
  }, []);

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

  const handleFilter = useCallback(
    ({ text, category }: { text: string; category?: string }) => {
      if (!text && !category) {
        setFiltered(allOrgs);
        return;
      }
      const fuseResults =
        text && fuse ? fuse.search(text).map((r) => r.item) : allOrgs;
      const final = category
        ? fuseResults.filter((org) => org.Type_Of_Service === category)
        : fuseResults;
      setFiltered(final);
    },
    [allOrgs, fuse],
  );

  return (
    <main className={styles.mapPage}>
      <aside className={styles.resultsPanel}>
        <h2 style={{ marginTop: 0 }}>Showing {filtered.length} results</h2>
        <ResourceList resources={filtered} />
      </aside>

      <section className={styles.mapPanel}>
        <div className={styles.floatingSearch}>
          <MapSearchBar onFilter={handleFilter} />
        </div>

        {/* 💡 full-height wrapper */}
        <div className={styles.fullHeightMap}>
          <Map
            apiKey={apiKey}
            markers={markers}
            center={downtownBostonCenter}
            style={{ height: "100%", width: "100%" }}   // make the canvas stretch
          />
        </div>
      </section>
    </main>
  );
}

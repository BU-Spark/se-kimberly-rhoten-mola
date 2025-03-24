"use client";

import React, { useEffect, useState } from 'react';
import { db } from "../../firebase/configfirebase";
import { collection, getDocs } from "firebase/firestore";
import ResourceList from "../components/ResourceList";
import SearchBar from "../components/SearchBar";

export default function DatabasePage() {
  const [allResources, setAllResources] = useState<any[]>([]);

  // Optionally parse query params to apply filters
  // e.g. const searchParams = useSearchParams(); // Next.js 13 feature

  useEffect(() => {
    // Fetch all resources on load
    const fetchResources = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Organizations"));
        const data: unknown[] = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        setAllResources(data);
      } catch (err) {
        console.error("Error fetching resources:", err);
      }
    };
    fetchResources();
  }, []);

  const handleFilter = (filters: {
    category?: string;
    subcategory?: string;
  }) => {
    // If you want to re-query Firestore by the selected filters or do a local filter
    console.log("Filters from Database page:", filters);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>LGBTQIA2S+ Resource Database</h1>
      <p>
        Welcome to the LGBTQIA2S+ resource database. Here, you will find
        resources in the Boston area. Apply filters below.
      </p>
      <SearchBar onFilter={handleFilter} />
      <ResourceList resources={allResources} />
    </div>
  );
}

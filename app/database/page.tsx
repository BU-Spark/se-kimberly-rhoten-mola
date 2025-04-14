"use client";

import React, { useEffect, useState } from "react";
import { db } from "../../firebase/configfirebase";
import { collection, getDocs } from "firebase/firestore";
import ResourceList from "../components/ResourceList";
import SearchBar from "../components/SearchBar";
import styles from "../page.module.css"; // Reuse the main page CSS

export default function DatabasePage() {
  const [allResources, setAllResources] = useState<any[]>([]);

  useEffect(() => {
    // Fetch all resources on load
    const fetchResources = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Organizations"));
        const data: any[] = [];
        querySnapshot.forEach((doc) => {
          const docData = doc.data();
          // Filter out entries with no name or "Unnamed Resource"
          if (
            docData.Organization_Name &&
            docData.Organization_Name.trim() !== "" &&
            docData.Organization_Name !== "Unnamed Resource"
          ) {
            data.push({ id: doc.id, ...docData });
          }
        });
        // Remove duplicate resources based on Organization_Name
        const uniqueResources = Array.from(
          new Map(data.map((item) => [item.Organization_Name, item])).values()
        );
        setAllResources(uniqueResources);
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
    console.log("Filters from Database page:", filters);
    // Additional filtering logic can be implemented here if needed
  };

  return (
    <div className={styles.container}>
      {/* MAIN CONTENT */}
      <main className={styles.main} style={{ padding: "2rem" }}>
        <h1>LGBTQIA2S+ Resource Database</h1>
        <p>
          Welcome to the LGBTQIA2S+ resource database. Here, you will find
          resources in the Boston area. Apply filters below.
        </p>
        <SearchBar onFilter={handleFilter} />
        <ResourceList resources={allResources} />
      </main>
    </div>
  );
}

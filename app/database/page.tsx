"use client";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { db } from "../../firebase/configfirebase";
import { collection, getDocs } from "firebase/firestore";
import ResourceList from "../components/ResourceList";
import SearchBar from "../components/SearchBar";
import styles from "../page.module.css";

interface Organization {
  id: string;
  Organization_Name: string;
  Type_Of_Service?: string; // or whatever fields you have
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // fallback for other fields
}

export default function DatabasePage() {
  const [allResources, setAllResources] = useState<Organization[]>([]);
  const [filteredResources, setFilteredResources] = useState<Organization[]>(
    [],
  );

  // Grab query params: e.g. /database?search=Impact&filters=Food,Hotlines
  const searchParams = useSearchParams();
  const searchText = searchParams.get("search") || "";
  const filtersParam = searchParams.get("filters") || ""; // e.g. "Food,Hotlines"

  useEffect(() => {
    // Fetch all resources once on load.
    const fetchResources = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Organizations"));
        const data: Organization[] = [];
        querySnapshot.forEach((doc) => {
          const docData = doc.data() as Organization;
          // Filter out entries with no name or "Unnamed Resource"
          if (
            docData.Organization_Name &&
            docData.Organization_Name.trim() !== "" &&
            docData.Organization_Name !== "Unnamed Resource"
          ) {
            data.push({ id: doc.id, ...docData });
          }
        });

        // Remove duplicates based on Organization_Name
        const uniqueResources = Array.from(
          new Map(data.map((item) => [item.Organization_Name, item])).values(),
        );

        setAllResources(uniqueResources);
      } catch (err) {
        console.error("Error fetching resources:", err);
      }
    };

    fetchResources();
  }, []);

  // Whenever searchText or filtersParam changes, re-filter the existing resources in memory.
  useEffect(() => {
    // 1. Build an array of service filters (if any).
    const selectedServices = filtersParam
      ? filtersParam.split(",").map((s) => s.trim())
      : [];

    // 2. Convert searchText to lowercase for case-insensitive matching.
    const lowerSearch = searchText.toLowerCase();

    // 3. Filter the resources in memory.
    const results = allResources.filter((resource) => {
      // A. Text Match Check (case-insensitive substring of Organization_Name).
      const nameMatches =
        resource.Organization_Name.toLowerCase().includes(lowerSearch);

      // B. Service Category Check
      // If no services are selected, we skip this check (i.e. pass).
      // If services are selected, resource.Type_Of_Service must match at least one.
      let serviceMatches = true;
      if (selectedServices.length > 0) {
        // Some organizations might have multiple services in an array, or a single string.
        // Adjust the logic accordingly:
        // If you store a single string in "Type_Of_Service", we check if that single string
        // is in the selectedServices array.
        if (resource.Type_Of_Service) {
          serviceMatches = selectedServices.includes(resource.Type_Of_Service);
        } else {
          // If there's no Type_Of_Service field, it doesn't match.
          serviceMatches = false;
        }
      }

      // Must pass *both* checks to be included in final results.
      return nameMatches && serviceMatches;
    });

    setFilteredResources(results);
  }, [allResources, searchText, filtersParam]);

  return (
    <div className={styles.container}>
      <main className={styles.main} style={{ padding: "2rem" }}>
        <h1>LGBTQIA2S+ Resource Database</h1>
        <p>
          Welcome to the LGBTQIA2S+ resource database. Here, you will find
          resources in the Boston area. Apply filters below.
        </p>

        {/* Passing handleFilter if you wish, 
            but the primary logic is driven by the query params + the updated SearchBar now. */}
        <SearchBar onFilter={() => {}} />

        {/* The ResourceList only shows "filteredResources" now. */}
        <ResourceList resources={filteredResources} />
      </main>
    </div>
  );
}

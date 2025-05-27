"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

import { db } from "../../firebase/configfirebase";
import { collection, getDocs } from "firebase/firestore";

import ResourceList from "../components/ResourceList";
import SearchBar from "../components/SearchBar";

interface Organization {
  id: string;
  Organization_Name: string;
  Type_Of_Service?: string;
  [key: string]: any;
}

export default function DatabasePage() {
  const [allResources, setAllResources] = useState<Organization[]>([]);
  const [filteredResources, setFilteredResources] = useState<Organization[]>([]);
  const router = useRouter();

  // Grab query params: e.g. /database?search=Impact&filters=Food,Hotlines
  const searchParams = useSearchParams();
  const searchText = searchParams.get("search") || "";
  const filtersParam = searchParams.get("filters") || "";

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
            data.push({ ...docData, id: doc.id });
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

  const styles = {
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "2rem 1rem",
      fontFamily: "Arial, sans-serif",
    },
    backButton: {
      display: "inline-flex",
      alignItems: "center",
      fontSize: "1.2rem",
      color: "#000",
      marginBottom: "1.5rem",
      cursor: "pointer",
      background: "none",
      border: "none",
      padding: 0,
    },
    backArrow: {
      fontSize: "1.5rem",
      marginRight: "0.5rem",
    },
    title: {
      fontSize: "3rem",
      fontWeight: "bold",
      margin: "0 0 1rem 0",
      color: "#0a2240",
    },
    description: {
      fontSize: "1.25rem",
      marginBottom: "2rem",
      maxWidth: "800px",
      lineHeight: "1.6",
      color: "#333",
    },
    searchContainer: {
      marginBottom: "2rem",
      width: "100%",
      border: "1px solid #ccc",
      borderRadius: "4px",
      overflow: "hidden",
    },
    divider: {
      height: "1px",
      backgroundColor: "#0a2240",
      width: "100%",
      margin: "2rem 0",
    }
  };

  return (
    <div style={styles.container}>
      <Link href="/" passHref>
        <button style={styles.backButton}>
          <span style={styles.backArrow}>←</span>
        </button>
      </Link>
      
      <h1 style={styles.title}>
        LGBTQIA2S+<br />
        Resource Database
      </h1>
      
      <p style={styles.description}>
        Welcome to the LGBTQIA2S+ resource database. Here, you will find
        resources in the Boston area. Apply filters
      </p>

      <SearchBar />
      
      <div style={styles.divider}></div>

      <ResourceList resources={filteredResources} />
    </div>
  );
}

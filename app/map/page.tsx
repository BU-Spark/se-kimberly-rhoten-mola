"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { colors, typography, spacing } from "../styles/constants";
import Map from "../components/Map";
import { FiFilter } from "react-icons/fi";
import { FiX } from "react-icons/fi";
import { 
  FaChevronDown,
  FaChevronUp
} from "react-icons/fa";

import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/configfirebase";

export interface MarkerData {
  id: string;
  lat: number;
  lng: number;
  Organization_Name?: string;
  Organization_Address?: string;
  Type_Of_Service?: string | string[];
}

interface OrganizationData {
  id: string;
  Organization_Name?: string;
  Organization_Address?: string;
  Type_Of_Service?: string | string[];
  [key: string]: any;
}

// Service categories options
const SERVICE_OPTIONS = [
  "Food",
  "Health and Wellness",
  "Hotlines",
  "Housing",
  "Legal Assistance",
  "STI/HIV Support",
  "Therapeutic Support",
  "Trans Health and Social Services",
  "Violence Prevention and Survivor Support",
  "Youth Empowerment",
];

async function geocodeAddress(
  address: string,
): Promise<{ lat: number; lng: number }> {
  const normalized = address.toLowerCase().trim();
  if (normalized === "n/a" || normalized === "virtual" || normalized === "") {
    return { lat: 42.3601, lng: -71.0589 };
  }
  
  try {
    const encoded = encodeURIComponent(address);
    const res = await fetch(`/api/geocode?address=${encoded}`);
    const data = await res.json();
    
    if (res.ok) {
      return { lat: data.lat, lng: data.lng };
    } else {
      console.error("Error from geocoding API:", data.error);
      return { lat: 42.3601, lng: -71.0589 };
    }
  } catch (error) {
    console.error("Error fetching geocoding API:", error);
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

export default function MapPage() {
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [filteredMarkers, setFilteredMarkers] = useState<MarkerData[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const filtersRef = useRef<HTMLDivElement>(null);
  const downtownBostonCenter = { lat: 42.355, lng: -71.0656 }; 

  // Fetch all organizations from Firestore
  useEffect(() => {
    const fetchAllOrganizations = async () => {
      try {
        const snapshot = await getDocs(collection(db, "Organizations"));
        const docs = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
          };
        });
        const geocodedPromises = docs.map((docData) =>
          geocodeAddressIfNeeded(docData),
        );
        const finalMarkers = await Promise.all(geocodedPromises);
        setMarkers(finalMarkers);
        setFilteredMarkers(finalMarkers); 
      } catch (error) {
        console.error("Error fetching organizations:", error);
      }
    };

    fetchAllOrganizations();
  }, []);

  // Filter markers when selected services change
  useEffect(() => {
    const filterMarkers = async () => {
      setIsLoading(true);
      if (selectedServices.length === 0) {
        // If no filters are selected, show all markers
        setFilteredMarkers(markers);
        setIsLoading(false);
        return;
      }

      try {
        // Get complete data for each marker and filter based on Type_Of_Service
        const filteredResults = [];
        
        for (const marker of markers) {
          // Fetch complete organization data from Firestore
          const docRef = doc(db, "Organizations", marker.id);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            const orgData = docSnap.data();
            
            if (orgData.Type_Of_Service) {
              // Convert Type_Of_Service to array if it's a string
              const services = typeof orgData.Type_Of_Service === 'string' 
                ? orgData.Type_Of_Service.split(',').map(s => s.trim())
                : orgData.Type_Of_Service;

              // Check if any selected service matches
              const hasMatchingService = selectedServices.some(selected =>
                services.some((service: string) =>
                  service.toLowerCase().trim() === selected.toLowerCase().trim()
                )
              );

              if (hasMatchingService) {
                filteredResults.push(marker);
              }
            }
          }
        }

        setFilteredMarkers(filteredResults);
      } catch (error) {
        console.error("Error filtering markers:", error);
        // In case of error, show all markers
        setFilteredMarkers(markers);
      } finally {
        setIsLoading(false);
      }
    };

    filterMarkers();
  }, [selectedServices, markers, db]);

  // Toggle service filter
  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  // Remove a single service filter
  const removeService = (service: string) => {
    setSelectedServices((prev) => prev.filter((s) => s !== service));
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedServices([]);
  };

  // Handle click outside filters panel to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filtersRef.current && !filtersRef.current.contains(event.target as Node)) {
        setShowFilters(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Function to fetch complete organization data for a specific marker
  const fetchOrganizationData = async (markerId: string): Promise<OrganizationData | null> => {
    try {
      const docRef = doc(db, "Organizations", markerId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        const orgData: OrganizationData = {
          id: docSnap.id,
          ...data
        };
        return orgData;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching organization data:", error);
      return null;
    }
  };

  const styles = {
    container: {
      padding: spacing.xl,
      fontFamily: typography.fontFamily.primary,
    },
    header: {
      marginBottom: spacing.xl,
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
      color: colors.charlesBlue,
      fontSize: "2.5rem",
      fontWeight: typography.fontWeight.bold,
      margin: 0,
      marginBottom: spacing.sm,
    },
    description: {
      fontSize: "1rem",
      color: colors.supportingGrays.dark,
      lineHeight: typography.lineHeight.normal,
      maxWidth: "800px",
    },
    mapContainer: {
      marginTop: spacing.xl,
      position: "relative" as const,
      height: "75vh",
      width: "100%",
      border: `1px solid ${colors.supportingGrays.light}`,
      borderTop: `4px solid ${colors.freedomTrailRed}`,
    },
    filtersContainer: {
      display: "flex",
      flexDirection: "column" as const,
      marginBottom: spacing.lg,
      position: "relative" as const,
      zIndex: 20,
    },
    filtersButton: {
      display: "flex",
      alignItems: "center",
      gap: spacing.xs,
      backgroundColor: colors.white,
      border: `1px solid ${colors.supportingGrays.medium}`,
      borderRadius: "4px",
      padding: `${spacing.sm} ${spacing.md}`,
      fontSize: "1rem",
      fontWeight: typography.fontWeight.medium,
      cursor: "pointer",
      alignSelf: "flex-start",
      marginTop: spacing.md,
      color: colors.charlesBlue,
    },
    activeFilters: {
      display: "flex",
      flexWrap: "wrap" as const,
      gap: spacing.sm,
      marginTop: spacing.md,
    },
    filterTag: {
      display: "flex",
      alignItems: "center",
      gap: spacing.xs,
      backgroundColor: colors.freedomTrailRed,
      color: colors.white,
      padding: `${spacing.xs} ${spacing.sm}`,
      borderRadius: "4px",
      fontSize: "0.875rem",
    },
    removeFilterButton: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      fontSize: "0.75rem",
    },
    filtersPanel: {
      position: "absolute" as const,
      top: "100%",
      left: 0,
      backgroundColor: colors.white,
      border: `1px solid ${colors.supportingGrays.medium}`,
      borderRadius: "4px",
      padding: spacing.md,
      marginTop: spacing.xs,
      display: showFilters ? "block" : "none",
      width: "100%",
      maxWidth: "600px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    },
    filtersPanelHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: spacing.md,
    },
    filtersPanelTitle: {
      fontSize: "1.125rem",
      fontWeight: typography.fontWeight.bold,
      color: colors.charlesBlue,
    },
    clearFiltersButton: {
      background: "none",
      border: "none",
      color: colors.optimisticBlue,
      fontSize: "0.875rem",
      cursor: "pointer",
      padding: 0,
    },
    filtersList: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
      gap: spacing.md,
      color: colors.charlesBlue,
    },
    filterItem: {
      display: "flex",
      alignItems: "center",
      gap: spacing.sm,
      fontSize: "0.9rem",
    },
    filterCheckbox: {
      width: "18px",
      height: "18px",
      accentColor: colors.optimisticBlue,
    },
    resultsCount: {
      marginTop: spacing.md,
      fontSize: "1rem",
      color: colors.supportingGrays.dark,
    },
    loadingOverlay: {
      position: "absolute" as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 10,
    },
    loadingText: {
      color: colors.charlesBlue,
      fontSize: "1.2rem",
      fontWeight: typography.fontWeight.medium,
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Link href="/" passHref>
          <button style={styles.backButton}>
            <span style={styles.backArrow}>←</span>
          </button>
        </Link>
        <h1 style={styles.title}>LGBTQIA2S+ Resource Map</h1>
        <p style={styles.description}>
          Here, you will find a comprehensive map of available resources, 
          services, and event locations. Refer to the legend on the right for
          icons.
        </p>
      </div>

      {/* Filters */}
      <div style={styles.filtersContainer} ref={filtersRef}>
        <button 
          style={styles.filtersButton} 
          onClick={() => setShowFilters(!showFilters)}
        >
          <FiFilter /> 
          Filter Resources 
          {showFilters ? <FaChevronUp /> : <FaChevronDown />}
        </button>

        {selectedServices.length > 0 && (
          <div style={styles.activeFilters}>
            {selectedServices.map(service => (
              <div key={service} style={styles.filterTag}>
                {service}
                <span 
                  style={styles.removeFilterButton} 
                  onClick={() => removeService(service)}
                >
                  <FiX />
                </span>
              </div>
            ))}
          </div>
        )}

        <div style={styles.filtersPanel}>
          <div style={styles.filtersPanelHeader}>
            <div style={styles.filtersPanelTitle}>Filter by Service Type</div>
            {selectedServices.length > 0 && (
              <button 
                style={styles.clearFiltersButton} 
                onClick={clearAllFilters}
              >
                Clear all filters
              </button>
            )}
          </div>
          
          <div style={styles.filtersList}>
            {SERVICE_OPTIONS.map((service) => (
              <label key={service} style={styles.filterItem}>
                <input 
                  type="checkbox"
                  style={styles.filterCheckbox}
                  checked={selectedServices.includes(service)}
                  onChange={() => toggleService(service)}
                />
                {service}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      <div style={styles.resultsCount}>
        {isLoading ? (
          "Filtering resources..."
        ) : (
          <>
            Showing {filteredMarkers.length} of {markers.length} resources
            {selectedServices.length > 0 && " with selected filters"}
          </>
        )}
      </div>

      {/* Map */}
      <div style={styles.mapContainer}>
        {isLoading && (
          <div style={styles.loadingOverlay}>
            <div style={styles.loadingText}>Filtering resources...</div>
          </div>
        )}
        <Map 
          markers={filteredMarkers} 
          center={downtownBostonCenter}
        />
      </div>
    </div>
  );
} 
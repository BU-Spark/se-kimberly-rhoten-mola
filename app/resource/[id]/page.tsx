"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/configfirebase";
import dynamic from "next/dynamic";
import Link from "next/link";

// Dynamically import Map to ensure client-side rendering.
const Map = dynamic(() => import("../../components/Map"), { ssr: false });

export default function ResourceDetailPage() {
  const { id } = useParams(); // Firestore document ID from the URL
  const [resource, setResource] = useState<any | null>(null);
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  // Fetch the resource from Firestore.
  useEffect(() => {
    const fetchResource = async () => {
      try {
        const docRef = doc(db, "Organizations", String(id));
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setResource(data);
        } else {
        }
      } catch (error) {
        console.error("Error fetching resource:", error);
      }
    };

    if (id) {
      fetchResource();
    }
  }, [id]);

  // Geocode the address if resource does not have lat/lng.
  useEffect(() => {
    if (
      resource &&
      !resource.lat &&
      !resource.lng &&
      resource.Organization_Address
    ) {
      geocodeAddress(resource.Organization_Address)
        .then(({ lat, lng }) => {
          setCoordinates({ lat, lng });
        })
        .catch((error) => {
          console.error("Error geocoding address:", error);
        });
    }
  }, [resource]);

  // Helper function to geocode an address using the Google Geocoding API.
  async function geocodeAddress(
    address: string,
  ): Promise<{ lat: number; lng: number }> {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const encoded = encodeURIComponent(address);
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encoded}&key=${apiKey}`
    );
    const data = await res.json();
    if (data.status === "OK" && data.results.length > 0) {
      return data.results[0].geometry.location;
    } else {
      console.error("Geocoding error:", data.error_message || data.status);
      throw new Error("Geocoding failed");
    }
  }

  if (!resource) {
    return <p>Loading resource...</p>;
  }

  // Destructure fields from the resource.
  const {
    Organization_Name,
    Organization_Description,
    Organization_Website,
    Organization_Address,
    Public_Phone_Number,
    Public_Email,
    Preferred_Method_Of_Organizational_Contact,
    Type_Of_Service,
    Target_Population,
    Neighborhood_Of_Organization_Neighborhoods_Primarily_Served,
    Days_Hours_Of_Operation,
    Program_Cost_To_Participant,
    Health_Insurance_Required,
    lat,
    lng,
  } = resource;

  // Compute effective coordinates
  const effectiveLat = lat ?? coordinates?.lat ?? 42.3601;
  const effectiveLng = lng ?? coordinates?.lng ?? -71.0589;

  // Utility for formatting URLs.
  const formatUrl = (url: string) => {
    return url.startsWith("http://") || url.startsWith("https://")
      ? url
      : `https://${url}`;
  };

  const styles = {
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "2rem",
      fontFamily: "Arial, sans-serif",
      color: "#333",
    },
    backButton: {
      display: "inline-flex",
      alignItems: "center",
      fontSize: "1rem",
      color: "#0078d7",
      marginBottom: "1.5rem",
      cursor: "pointer",
      background: "none",
      border: "none",
      padding: 0,
      textDecoration: "none",
    },
    backArrow: {
      marginRight: "0.5rem",
    },
    header: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      marginBottom: "1.5rem",
      color: "#333",
      borderBottom: "none",
    },
    twoColumnLayout: {
      display: "flex",
      gap: "2rem",
      flexWrap: "wrap" as "wrap",
    },
    leftColumn: {
      flex: "1 1 600px",
    },
    rightColumn: {
      flex: "1 1 400px",
    },
    sectionTitle: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      marginBottom: "1rem",
      marginTop: "1.5rem",
      color: "#333",
    },
    description: {
      fontSize: "1rem",
      lineHeight: "1.6",
      marginBottom: "2rem",
    },
    infoList: {
      listStyleType: "none",
      padding: 0,
      margin: 0,
    },
    infoItem: {
      marginBottom: "1rem",
      lineHeight: "1.5",
    },
    label: {
      fontWeight: "bold",
      display: "inline-block",
      marginRight: "0.5rem",
    },
    link: {
      color: "#0078d7",
      textDecoration: "none",
    },
    mapContainer: {
      width: "100%",
      height: "400px",
      border: "1px solid #e0e0e0",
      borderRadius: "4px",
      overflow: "hidden",
    },
  };

  return (
    <div style={styles.container}>
      <Link href="/database" style={styles.backButton}>
        <span style={styles.backArrow}>←</span> Back to results
      </Link>
      
      <h1 style={styles.header}>{Organization_Name || "Resource Name"}</h1>
      
      <div style={styles.twoColumnLayout}>
        {/* Left column: resource info */}
        <div style={styles.leftColumn}>
          <h2 style={styles.sectionTitle}>Description</h2>
          <p style={styles.description}>
            {Organization_Description || "No description available."}
          </p>
          
          <h2 style={styles.sectionTitle}>Additional Info</h2>
          <ul style={styles.infoList}>
            <li style={styles.infoItem}>
              <span style={styles.label}>Website:</span>
              {Organization_Website ? (
                <a
                  href={formatUrl(Organization_Website)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.link}
                >
                  {Organization_Website}
                </a>
              ) : (
                "N/A"
              )}
            </li>
            <li style={styles.infoItem}>
              <span style={styles.label}>Address:</span>
              {Organization_Address ? (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    Organization_Address,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.link}
                >
                  {Organization_Address}
                </a>
              ) : (
                "N/A"
              )}
            </li>
            <li style={styles.infoItem}>
              <span style={styles.label}>Public Phone:</span> {Public_Phone_Number || "N/A"}
            </li>
            <li style={styles.infoItem}>
              <span style={styles.label}>Public Email:</span>
              {Public_Email ? (
                <a href={`mailto:${Public_Email}`} style={styles.link}>
                  {Public_Email}
                </a>
              ) : (
                "N/A"
              )}
            </li>
            <li style={styles.infoItem}>
              <span style={styles.label}>Preferred Contact:</span>
              {Preferred_Method_Of_Organizational_Contact || "N/A"}
            </li>
            <li style={styles.infoItem}>
              <span style={styles.label}>Type of Service:</span> {Type_Of_Service || "N/A"}
            </li>
            <li style={styles.infoItem}>
              <span style={styles.label}>Target Population:</span> {Target_Population || "N/A"}
            </li>
            <li style={styles.infoItem}>
              <span style={styles.label}>Neighborhood(s) Served:</span>
              {Neighborhood_Of_Organization_Neighborhoods_Primarily_Served || "N/A"}
            </li>
            <li style={styles.infoItem}>
              <span style={styles.label}>Days/Hours of Operation:</span>
              {Days_Hours_Of_Operation || "N/A"}
            </li>
            <li style={styles.infoItem}>
              <span style={styles.label}>Program Cost:</span>
              {Program_Cost_To_Participant || "N/A"}
            </li>
            <li style={styles.infoItem}>
              <span style={styles.label}>Health Insurance Required?:</span>
              {Health_Insurance_Required || "N/A"}
            </li>
          </ul>
        </div>
        
        {/* Right column: map */}
        <div style={styles.rightColumn}>
          <h2 style={styles.sectionTitle}>Location</h2>
          <div style={styles.mapContainer}>
            <Map
              key={`${id}-${effectiveLat}-${effectiveLng}`}
              markers={[
                {
                  id: String(id),
                  lat: effectiveLat,
                  lng: effectiveLng,
                  Organization_Name,
                  Organization_Address,
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/configfirebase";
import dynamic from "next/dynamic";
import styles from "../../page.module.css";

// Dynamically import Map to ensure client-side rendering.
const Map = dynamic(() => import("../../components/Map"), { ssr: false });

export default function ResourceDetailPage() {
  const { id } = useParams(); // Firestore document ID from the URL
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [resource, setResource] = useState<any | null>(null);
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  // Fetch the resource from Firestore.
  useEffect(() => {
    const fetchResource = async () => {
      try {
        console.log("Fetching resource for id:", id);
        const docRef = doc(db, "Organizations", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log("Fetched resource:", data);
          setResource(data);
        } else {
          console.log("No such document in Firestore for id:", id);
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
      console.log("Geocoding address:", resource.Organization_Address);
      geocodeAddress(resource.Organization_Address)
        .then(({ lat, lng }) => {
          console.log("Geocoded coordinates:", lat, lng);
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
    console.log("Calling Geocoding API for address:", address);
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encoded}&key=${apiKey}`
    );
    const data = await res.json();
    console.log("Geocoding API response:", data);
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

  // Compute effective coordinates:
  // Use resource's lat/lng if available; otherwise use geocoded coordinates; otherwise fall back to default Boston coordinates.
  const effectiveLat = lat ?? coordinates?.lat ?? 42.3601;
  const effectiveLng = lng ?? coordinates?.lng ?? -71.0589;
  console.log("Coordinates for detail page:", effectiveLat, effectiveLng);

  // Utility for formatting URLs.
  const formatUrl = (url: string) => {
    return url.startsWith("http://") || url.startsWith("https://")
      ? url
      : `https://${url}`;
  };

  return (
    <div className={styles.container}>
      {/* MAIN CONTENT */}
      <main className={styles.main} style={{ padding: "2rem" }}>
        <h1 style={{ fontSize: "4rem", marginBottom: "1rem" }}>
          {Organization_Name || "Resource Name"}
        </h1>
        <h2>
          {Organization_Website ? (
            <a
              href={formatUrl(Organization_Website)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {Organization_Website}
            </a>
          ) : (
            "N/A"
          )}
        </h2>
        <br></br>
        <div style={{ display: "flex", gap: "2rem" }}>
          {/* LEFT COLUMN */}
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
              Description
            </h2>
            <p style={{ marginBottom: "1rem" }}>
              {Organization_Description || "No description available."}
            </p>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
              Additional Info
            </h2>
            <strong>Preferred Contact:</strong>{" "}
            {Preferred_Method_Of_Organizational_Contact || "N/A"}
            <br></br>
            <strong>Type of Service:</strong> {Type_Of_Service || "N/A"}
            <br></br>
            <strong>Target Population:</strong> {Target_Population || "N/A"}
            <br></br>
            <strong>Neighborhood(s) Served:</strong>{" "}
            {Neighborhood_Of_Organization_Neighborhoods_Primarily_Served ||
              "N/A"}
            <br></br>
            <strong>Program Cost:</strong>{" "}
            {Program_Cost_To_Participant || "N/A"}
            <br></br>
            <strong>Health Insurance Required?:</strong>{" "}
            {Health_Insurance_Required || "N/A"}
          </div>
          {/* RIGHT COLUMN */}
          <div
            style={{
              width: "400px",
              height: "90vh",
              gap: "2rem",
              float: "left",
            }}
          >
            {/* 
              Using a key that depends on the resource id and effective coordinates 
              forces the Map to re-mount when these values change—ensuring the marker
              initialization logic re-runs (exactly as on the main page).
            */}
            <Map
              key={`${id}-${effectiveLat}-${effectiveLng}`}
              markers={[
                {
                  id,
                  lat: effectiveLat,
                  lng: effectiveLng,
                  Organization_Name,
                  Organization_Address, // Include address so the info window builds like on the main page.
                },
              ]}
            />
            <br></br>
            <h2>Contact Information</h2>
            <strong></strong>{" "}
            {Organization_Address ? (
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  Organization_Address,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {Organization_Address}
              </a>
            ) : (
              "N/A"
            )}
            <br></br>
            <strong></strong> {Public_Phone_Number || "N/A"}
            <br></br>
            <strong></strong>{" "}
            {Public_Email ? (
              <a href={`mailto:${Public_Email}`}>{Public_Email}</a>
            ) : (
              "N/A"
            )}
            <br></br>
            <h2>Days/Hours of Operation:</h2>
            <strong></strong>
            {""}
            {Days_Hours_Of_Operation || "N/A"}
          </div>
        </div>
      </main>
    </div>
  );
}

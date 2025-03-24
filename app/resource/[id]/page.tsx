"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/configfirebase";
import dynamic from "next/dynamic";

// Dynamically import your Map to ensure it only renders client-side
const Map = dynamic(() => import("../../components/Map"), { ssr: false });

export default function ResourceDetailPage() {
  const { id } = useParams(); // Firestore document ID from the URL

  const [resource, setResource] = useState<any | null>(null);
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  // Fetch the resource from Firestore
  useEffect(() => {
    const fetchResource = async () => {
      try {
        const docRef = doc(db, "Organizations", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setResource(docSnap.data());
        } else {
          console.log("No such document in Firestore!");
        }
      } catch (error) {
        console.error("Error fetching resource:", error);
      }
    };

    if (id) {
      fetchResource();
    }
  }, [id]);

  // If the resource doesn't have lat/lng but has an address, geocode it
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

  // Helper function to geocode an address using the Google Geocoding API
  async function geocodeAddress(
    address: string,
  ): Promise<{ lat: number; lng: number }> {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const encoded = encodeURIComponent(address);
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encoded}&key=${apiKey}`,
    );
    const data = await res.json();
    if (data.status === "OK" && data.results.length > 0) {
      return data.results[0].geometry.location;
    } else {
      throw new Error("Geocoding failed");
    }
  }

  if (!resource) {
    return <p>Loading resource...</p>;
  }

  // Destructure all fields from the Firestore document
  const {
    Name,
    Email_Phone_Number,
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

  // Determine the effective coordinates to use: use resource lat/lng if available, otherwise the geocoded coordinates, then fallback to Boston
  const effectiveLat = lat ?? coordinates?.lat ?? 42.3601;
  const effectiveLng = lng ?? coordinates?.lng ?? -71.0589;

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
        {Organization_Name || "Resource Name"}
      </h1>

      <div style={{ display: "flex", gap: "2rem" }}>
        {/* Left column: resource info */}
        <div style={{ flex: 1 }}>
          <h2>Description</h2>
          <p>{Organization_Description || "No description available."}</p>

          <h2>Additional Info</h2>
          <ul>
            <li>
              <strong>Name:</strong> {Name || "N/A"}
            </li>
            <li>
              <strong>Email/Phone:</strong> {Email_Phone_Number || "N/A"}
            </li>
            <li>
              <strong>Website:</strong> {Organization_Website || "N/A"}
            </li>
            <li>
              <strong>Address:</strong> {Organization_Address || "N/A"}
            </li>
            <li>
              <strong>Public Phone:</strong> {Public_Phone_Number || "N/A"}
            </li>
            <li>
              <strong>Public Email:</strong> {Public_Email || "N/A"}
            </li>
            <li>
              <strong>Preferred Contact:</strong>{" "}
              {Preferred_Method_Of_Organizational_Contact || "N/A"}
            </li>
            <li>
              <strong>Type of Service:</strong> {Type_Of_Service || "N/A"}
            </li>
            <li>
              <strong>Target Population:</strong> {Target_Population || "N/A"}
            </li>
            <li>
              <strong>Neighborhood(s) Served:</strong>{" "}
              {Neighborhood_Of_Organization_Neighborhoods_Primarily_Served ||
                "N/A"}
            </li>
            <li>
              <strong>Days/Hours of Operation:</strong>{" "}
              {Days_Hours_Of_Operation || "N/A"}
            </li>
            <li>
              <strong>Program Cost:</strong>{" "}
              {Program_Cost_To_Participant || "N/A"}
            </li>
            <li>
              <strong>Health Insurance Required?:</strong>{" "}
              {Health_Insurance_Required || "N/A"}
            </li>
          </ul>
        </div>

        {/* Right column: Map */}
        <div style={{ width: "400px", height: "300px", flexShrink: 0 }}>
          <h2>Location</h2>
          <Map
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
            markers={[
              {
                id,
                lat: effectiveLat,
                lng: effectiveLng,
                Organization_Name,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

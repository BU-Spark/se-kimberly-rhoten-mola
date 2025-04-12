"use client";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useRef } from "react";
import { GoogleMap } from "@react-google-maps/api";

const defaultCenter = { lat: 42.3601, lng: -71.0589 };

export interface MarkerData {
  id: string;
  lat: number;
  lng: number;
  Organization_Name?: string;
  Organization_Address?: string;
}

interface MapProps {
  markers?: MarkerData[];
}

export default function Map({ markers = [] }: MapProps) {
  const mapRef = useRef<google.maps.Map | null>(null);
  // Array to hold marker references for cleanup
  const advancedMarkersRef = useRef<any[]>([]);
  // Reuse a single info window for all markers
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

  const onMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
  };

  useEffect(() => {
    if (mapRef.current && "importLibrary" in google.maps) {
      // Clear previous markers from the map
      advancedMarkersRef.current.forEach((marker) => marker.setMap(null));
      advancedMarkersRef.current = [];

      // Create a single info window instance (if it doesn't exist)
      if (infoWindowRef.current === null) {
        infoWindowRef.current = new google.maps.InfoWindow();
      }

      // Import the marker library and create markers
      google.maps
        .importLibrary("marker")
        .then(({ AdvancedMarkerElement }) => {
          markers.forEach((markerData) => {
            const position = {
              lat: markerData.lat || defaultCenter.lat,
              lng: markerData.lng || defaultCenter.lng,
            };

            // Create the advanced marker with gmpClickable set to true.
            const advancedMarker = new AdvancedMarkerElement({
              map: mapRef.current!,
              position,
              title: markerData.Organization_Name,
              gmpClickable: true,
            });

            // Add a click listener on the marker.
            advancedMarker.addListener("click", () => {
              // Close any previously opened info window.
              infoWindowRef.current!.close();

              // Build content for the info window.
              const contentDiv = document.createElement("div");
              contentDiv.style.fontSize = "14px";
              contentDiv.style.lineHeight = "1.5";

              // Add the organization name.
              const nameEl = document.createElement("div");
              nameEl.textContent =
                markerData.Organization_Name || "Unknown Organization";
              nameEl.style.fontWeight = "bold";
              nameEl.style.marginBottom = "4px";
              contentDiv.appendChild(nameEl);

              // Add the organization address.
              const addrEl = document.createElement("div");
              addrEl.textContent =
                markerData.Organization_Address || "Address not available";
              addrEl.style.marginBottom = "4px";
              contentDiv.appendChild(addrEl);

              // Add a hyperlink pointing to this marker's detail page.
              const detailLink = document.createElement("a");
              detailLink.href = `/resource/${markerData.id}`;
              detailLink.textContent = "View Details";
              detailLink.style.display = "block";
              detailLink.style.marginTop = "4px";
              detailLink.style.color = "#0070f3";
              detailLink.style.textDecoration = "underline";
              contentDiv.appendChild(detailLink);

              // Set the info window content and open it anchored at the marker.
              infoWindowRef.current!.setContent(contentDiv);
              infoWindowRef.current!.open(mapRef.current, advancedMarker);
            });

            // Store the marker so we can clear them later if needed.
            advancedMarkersRef.current.push(advancedMarker);
          });
        })
        .catch((error) => {
          console.error("Error importing marker library:", error);
        });
    }
  }, [markers]);

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "400px" }}
      center={
        markers.length > 0
          ? {
              lat: markers[0].lat || defaultCenter.lat,
              lng: markers[0].lng || defaultCenter.lng,
            }
          : defaultCenter
      }
      zoom={12}
      onLoad={onMapLoad}
      options={{ mapId: "DEMO_MAP_ID" }} // Replace with your actual Map ID if available
    >
      {/* Markers are attached via the useEffect */}
    </GoogleMap>
  );
}

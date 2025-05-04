"use client";

/**
 * Map.tsx
 * 
 * Renders a Google Map with advanced markers for each resource.
 * Markers are created using the Google Maps "AdvancedMarkerElement" API.
 * When a marker is clicked, an info window appears with resource details and a link.
 * 
 * Props:
 *   - markers: Array of marker data (id, lat, lng, name, address)
 *   - center: Optional map center
 *   - height: Map container height
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useRef, useState } from "react";
import { GoogleMap } from "@react-google-maps/api";

// Default center: Boston, MA
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
  center?: { lat: number; lng: number };
  height?: string | number;
}

export default function Map({
  markers = [],
  center,
  height = "100%",
}: MapProps) {
  // --- Refs for map and marker management ---
  const mapRef = useRef<google.maps.Map | null>(null);
  // Store references to advanced markers for cleanup
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const advancedMarkersRef = useRef<any[]>([]);
  // Single info window instance for all markers
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // --- Called when the map is loaded ---
  const onMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
    setMapLoaded(true);
    console.log("Map loaded, mapRef set:", map);
  };

  // --- Effect: Add/Remove markers when data or map loads ---
  useEffect(() => {
    // Only run if map is loaded and Google Maps API is available
    if (mapRef.current && mapLoaded && "importLibrary" in google.maps) {
      // Remove previous markers from the map
      advancedMarkersRef.current.forEach((marker) => marker.setMap(null));
      advancedMarkersRef.current = [];

      // Create a single info window instance if not already created
      if (infoWindowRef.current === null) {
        infoWindowRef.current = new google.maps.InfoWindow();
      }

      // Dynamically import the marker library and add markers
      google.maps
        .importLibrary("marker")
        .then((lib) => {
          // Type assertion to satisfy TypeScript
          const { AdvancedMarkerElement } = lib as { AdvancedMarkerElement: typeof google.maps.marker.AdvancedMarkerElement };
          markers.forEach((markerData) => {
            const position = {
              lat: markerData.lat || defaultCenter.lat,
              lng: markerData.lng || defaultCenter.lng,
            };
            // Create an advanced marker for each resource
            const advancedMarker = new AdvancedMarkerElement({
              map: mapRef.current!,
              position,
              title: markerData.Organization_Name,
              gmpClickable: true,
            });
            // Add click listener to show info window
            advancedMarker.addListener("gmp-click", () => {
              infoWindowRef.current!.close();
              // Build info window content
              const contentDiv = document.createElement("div");
              contentDiv.style.fontSize = "14px";
              contentDiv.style.lineHeight = "1.5";
              const nameEl = document.createElement("div");
              nameEl.textContent =
                markerData.Organization_Name || "Unknown Organization";
              nameEl.style.fontWeight = "bold";
              nameEl.style.marginBottom = "4px";
              contentDiv.appendChild(nameEl);
              const addrEl = document.createElement("div");
              addrEl.textContent = markerData.Organization_Address || "Address not available";
              addrEl.style.marginBottom = "4px";
              contentDiv.appendChild(addrEl);
              const detailLink = document.createElement("a");
              detailLink.href = `/resource/${markerData.id}`;
              detailLink.textContent = "View Details";
              detailLink.style.display = "block";
              detailLink.style.marginTop = "4px";
              detailLink.style.color = "#0070f3";
              detailLink.style.textDecoration = "underline";
              contentDiv.appendChild(detailLink);
              infoWindowRef.current!.setContent(contentDiv);
              infoWindowRef.current!.open(mapRef.current, advancedMarker);
            });
            advancedMarkersRef.current.push(advancedMarker);
          });
        })
        .catch((error) => {
          console.error("Error importing marker library:", error);
        });
    }
  }, [markers, mapLoaded]);

  // --- Render the Google Map ---
  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height }}
      center={
        // If a center prop is provided, use it. Otherwise, use marker or default center.
        center ||
        (markers.length > 0
          ? { lat: markers[0].lat, lng: markers[0].lng }
          : defaultCenter)
      }
      zoom={12}
      onLoad={onMapLoad}
      options={{ mapId: "MOLA" }} // Replace with your actual Map ID if available.
    >
      {/* Markers are added via useEffect */}
    </GoogleMap>
  );
}

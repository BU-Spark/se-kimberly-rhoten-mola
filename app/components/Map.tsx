"use client";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useRef, useState } from "react";
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
  center?: { lat: number; lng: number };
  height?: string | number;
}

export default function Map({
  markers = [],
  center,
  height = "100%",
}: MapProps) {
  const mapRef = useRef<google.maps.Map | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const advancedMarkersRef = useRef<any[]>([]);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const onMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
    setMapLoaded(true);
    console.log("Map loaded, mapRef set:", map);
  };

  useEffect(() => {
    console.log(
      "Map effect triggered. Markers:",
      markers,
      "MapLoaded:",
      mapLoaded,
    );
    if (mapRef.current && mapLoaded && "importLibrary" in google.maps) {
      console.log("Clearing previous markers:", advancedMarkersRef.current);
      advancedMarkersRef.current.forEach((marker) => marker.setMap(null));
      advancedMarkersRef.current = [];

      if (infoWindowRef.current === null) {
        infoWindowRef.current = new google.maps.InfoWindow();
        console.log("Created new info window instance.");
      }

      console.log("Importing marker library...");
      google.maps
        .importLibrary("marker")
        .then(({ AdvancedMarkerElement }) => {
          console.log("Marker library imported:", AdvancedMarkerElement);
          markers.forEach((markerData) => {
            const position = {
              lat: markerData.lat || defaultCenter.lat,
              lng: markerData.lng || defaultCenter.lng,
            };
            console.log("Creating advanced marker for:", markerData);
            const advancedMarker = new AdvancedMarkerElement({
              map: mapRef.current!,
              position,
              title: markerData.Organization_Name,
              gmpClickable: true,
            });
            advancedMarker.addListener("gmp-click", () => {
              console.log("Marker clicked:", markerData);
              infoWindowRef.current!.close();
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
              console.log("Setting info window content:", contentDiv);
              infoWindowRef.current!.setContent(contentDiv);
              infoWindowRef.current!.open(mapRef.current, advancedMarker);
              console.log("Opened info window.");
            });
            advancedMarkersRef.current.push(advancedMarker);
            console.log("Stored advanced marker:", advancedMarker);
          });
        })
        .catch((error) => {
          console.error("Error importing marker library:", error);
        });
    } else {
      console.log(
        "Map is not loaded yet or google.maps.importLibrary not available.",
      );
    }
  }, [markers, mapLoaded]);

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

"use client";
// The 'use client' directive is necessary since this component uses browser-specific APIs and hooks.

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// Define the container styles for the map
const containerStyle = {
  width: "100%",
  height: "400px",
};

// Set the initial center point (Boston, in this case)
const center = {
  lat: 42.3601,
  lng: -71.0589,
};

interface MapProps {
  apiKey: string;
}

export default function Map({ apiKey }: MapProps) {
  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
}

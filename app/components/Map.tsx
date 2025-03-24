'use client';

import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: 42.3601,
  lng: -71.0589,
};

interface MarkerData {
  id: string;
  lat?: number;
  lng?: number;
  Organization_Name?: string;
}

interface MapProps {
  apiKey: string;
  markers?: MarkerData[];
}

export default function Map({ apiKey, markers = [] }: MapProps) {
  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={12}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={{
              lat: marker.lat || defaultCenter.lat,
              lng: marker.lng || defaultCenter.lng,
            }}
            title={marker.Organization_Name}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}

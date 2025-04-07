'use client';

import React, { useEffect, useRef } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const libraries = ['marker']; // defined once to avoid reloading warnings
const containerStyle = {
  width: '100%',
  height: '400px',
};

const defaultCenter = {
  lat: 42.3601,
  lng: -71.0589,
};

export interface MarkerData {
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
  const mapRef = useRef<google.maps.Map | null>(null);
  const advancedMarkersRef = useRef<any[]>([]);

  // When the map loads, store its reference
  const onMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
  };

  useEffect(() => {
    if (mapRef.current) {
      // Clear out any existing advanced markers
      advancedMarkersRef.current.forEach((marker) => marker.setMap(null));
      advancedMarkersRef.current = [];

      // Import the advanced marker library (includes AdvancedMarkerElement and PinElement)
      google.maps
        .importLibrary('marker')
        .then(({ AdvancedMarkerElement, PinElement }) => {
          markers.forEach((markerData) => {
            const position = {
              lat: markerData.lat || defaultCenter.lat,
              lng: markerData.lng || defaultCenter.lng,
            };

            // Create a custom PinElement. Here we use the first letter of the organization's name as the glyph.
            const pin = new PinElement({
              scale: 1,
              glyph: markerData.Organization_Name ? markerData.Organization_Name[0] : 'R',
              glyphColor: "#ffffff",
              background: "#007ACC",
              borderColor: "#ffffff",
            });

            // Create the advanced marker with the custom content (pin)
            const advancedMarker = new AdvancedMarkerElement({
              map: mapRef.current!,
              position,
              title: markerData.Organization_Name,
              content: pin.element,
            });
            advancedMarkersRef.current.push(advancedMarker);
          });
        })
        .catch((error) => {
          console.error('Error importing marker library:', error);
        });
    }
  }, [markers]);

  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={libraries}>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '400px' }}
        center={{ lat: 42.3601, lng: -71.0589 }} // Boston
        zoom={12}
        onLoad={onMapLoad}
        options={{ mapId: 'MOLA' }}
      >
        {/* Advanced markers are created in the effect */}
      </GoogleMap>
    </LoadScript>
  );
}
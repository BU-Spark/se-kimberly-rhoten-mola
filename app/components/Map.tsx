'use client';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useRef, useState } from 'react';
import { GoogleMap } from '@react-google-maps/api';
import { colors } from '../styles/constants';

const defaultCenter = { lat: 42.3601, lng: -71.0589 };

export interface MarkerData {
  id: string;
  lat: number;
  lng: number;
  Organization_Name?: string;
  Organization_Address?: string;
  Type_Of_Service?: string | string[];
}

interface MapProps {
  markers?: MarkerData[];
  center?: { lat: number; lng: number };
  onMarkerClick?: (marker: MarkerData) => void;
}

export default function Map({ markers = [], center, onMarkerClick }: MapProps) {
  const mapRef = useRef<google.maps.Map | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const advancedMarkersRef = useRef<any[]>([]);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const onMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
    setMapLoaded(true);
  };

  useEffect(() => {
    if (mapRef.current && mapLoaded && 'importLibrary' in google.maps) {
      advancedMarkersRef.current.forEach(marker => marker.setMap(null));
      advancedMarkersRef.current = [];

      if (infoWindowRef.current === null) {
        infoWindowRef.current = new google.maps.InfoWindow();
      }

      google.maps
        .importLibrary('marker')
        .then(markerLib => {
          // Type assertion to access AdvancedMarkerElement
          const { AdvancedMarkerElement } = markerLib as google.maps.MarkerLibrary;
          markers.forEach(markerData => {
            const position = {
              lat: markerData.lat || defaultCenter.lat,
              lng: markerData.lng || defaultCenter.lng,
            };
            const advancedMarker = new AdvancedMarkerElement({
              map: mapRef.current!,
              position,
              title: markerData.Organization_Name,
              gmpClickable: true,
            });
            advancedMarker.addListener('gmp-click', () => {
              // Call the onMarkerClick callback if provided
              if (onMarkerClick) {
                onMarkerClick(markerData);
              }

              infoWindowRef.current!.close();
              const contentDiv = document.createElement('div');
              contentDiv.style.fontSize = '14px';
              contentDiv.style.lineHeight = '1.5';
              const nameEl = document.createElement('div');
              nameEl.textContent = markerData.Organization_Name || 'Unknown Organization';
              nameEl.style.fontWeight = 'bold';
              nameEl.style.marginBottom = '4px';
              nameEl.style.color = colors.charlesBlue;
              contentDiv.appendChild(nameEl);
              const addrEl = document.createElement('div');
              addrEl.textContent = markerData.Organization_Address || 'Address not available';
              addrEl.style.marginBottom = '4px';
              addrEl.style.color = colors.charlesBlue;
              contentDiv.appendChild(addrEl);

              // Add Type_Of_Service if available
              if (markerData.Type_Of_Service) {
                const serviceEl = document.createElement('div');
                serviceEl.textContent = `Service: ${markerData.Type_Of_Service}`;
                serviceEl.style.marginBottom = '4px';
                serviceEl.style.fontStyle = 'italic';
                contentDiv.appendChild(serviceEl);
              }

              const detailLink = document.createElement('a');
              detailLink.href = `/resource/${markerData.id}`;
              detailLink.textContent = 'View Details';
              detailLink.style.display = 'block';
              detailLink.style.marginTop = '4px';
              detailLink.style.color = colors.charlesBlue;
              detailLink.style.textDecoration = 'underline';
              contentDiv.appendChild(detailLink);
              infoWindowRef.current!.setContent(contentDiv);
              infoWindowRef.current!.open(mapRef.current, advancedMarker);
            });
            advancedMarkersRef.current.push(advancedMarker);
          });
        })
        .catch(error => {
          console.error('Error importing marker library:', error);
        });
    } else {
      // Map or Google Maps API not loaded yet
      console.log('Waiting for map or Google Maps API to load');
    }
  }, [markers, mapLoaded, onMarkerClick]);

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '100%' }}
      center={
        center ||
        (markers.length > 0 ? { lat: markers[0].lat, lng: markers[0].lng } : defaultCenter)
      }
      zoom={12}
      onLoad={onMapLoad}
      options={{
        mapId: 'MOLA',
        streetViewControl: false,
        fullscreenControl: false,
      }}
    ></GoogleMap>
  );
}

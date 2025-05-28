'use client';

import React, { useEffect, useState } from 'react';
import { LoadScript } from '@react-google-maps/api';

export default function GoogleMapsProvider({ children }: { children: React.ReactNode }) {
  const [apiKey, setApiKey] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const response = await fetch('/api/maps-config');
        const data = await response.json();
        setApiKey(data.apiKey);
      } catch (error) {
        console.error('Failed to fetch Maps API key:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApiKey();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={['marker'] as const} version="weekly">
      {children}
    </LoadScript>
  );
}

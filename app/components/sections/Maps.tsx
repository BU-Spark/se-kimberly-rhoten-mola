'use client';

import React from 'react';
import Map, { MarkerData } from '@/app/components/Map';

interface MapSectionProps {
  markers?: MarkerData[];
  center?: { lat: number; lng: number };
}

const MapSection: React.FC<MapSectionProps> = ({ markers = [], center }) => {
  const styles = {
    mapSection: {
      padding: '3rem 0',
      maxWidth: '1200px',
      margin: '0 auto',
      width: '100%',
    },
    header: {
      display: 'flex',
      flexDirection: 'column' as const,
      marginBottom: '2rem',
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      marginBottom: '0.5rem',
      textTransform: 'uppercase' as const,
    },
    divider: {
      height: '4px',
      backgroundColor: '#0a2240',
      width: '100%',
      marginBottom: '1.5rem',
    },
    contentWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem',
      flexWrap: 'wrap' as const,
    },
    description: {
      fontSize: '1.25rem',
      fontStyle: 'italic',
      maxWidth: '60%',
      lineHeight: '1.5',
    },
    goToMapButton: {
      backgroundColor: '#0078d7',
      color: 'white',
      border: 'none',
      padding: '0.75rem 1.5rem',
      fontWeight: '600',
      fontSize: '1.2rem',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '4px',
      textDecoration: 'none',
      minWidth: '200px',
    },
    arrowIcon: {
      marginLeft: '0.75rem',
      fontSize: '1.5rem',
    },
    mapContainer: {
      width: '100%',
      height: '400px',
      border: '1px solid #e0e0e0',
      borderRadius: '4px',
      overflow: 'hidden',
    },
  };

  return (
    <section style={styles.mapSection}>
      <div style={styles.header}>
        <h2 style={styles.title}>MAP</h2>
        <div style={styles.divider}></div>
      </div>

      <div style={styles.contentWrapper}>
        <p style={styles.description}>
          Discover LGBTQIA2S+ events, secure locations, and resources near you with this interactive
          map.
        </p>

        <a href="/map" style={styles.goToMapButton}>
          GO TO MAP
          <span style={styles.arrowIcon}>→</span>
        </a>
      </div>

      <div style={styles.mapContainer}>
        <Map markers={markers} center={center} />
      </div>
    </section>
  );
};

export default MapSection;

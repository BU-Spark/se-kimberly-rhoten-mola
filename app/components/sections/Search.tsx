'use client';

import React from 'react';
import SearchBar from '@/app/components/SearchBar';
import { colors } from '@/app/styles/constants';

interface SearchProps {
  onFilter: (filters: { category?: string; subcategory?: string }) => void;
}

const Search: React.FC<SearchProps> = ({ onFilter }) => {
  const styles = {
    section: {
      position: 'relative',
      width: '100%',
      minHeight: '600px',
      backgroundImage:
        "linear-gradient(rgba(0, 72, 155, 0.7), rgba(0, 72, 155, 0.7)), url('/prideflags.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      padding: '2rem',
    },
    content: {
      maxWidth: '1200px',
      margin: '0 auto',
      width: '100%',
    },
    title: {
      fontSize: '3.7rem',
      fontWeight: '700',
      marginBottom: '1.5rem',
      lineHeight: '1.1',
    },
    subtitle: {
      fontSize: '1.25rem',
      maxWidth: '800px',
      marginBottom: '2.5rem',
      lineHeight: '1.5',
    },
    buttonWrapper: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '2rem',
    },
    button: {
      padding: '1rem 2rem',
      backgroundColor: colors.freedomTrailRed,
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1rem',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      textDecoration: 'none',
      textTransform: 'uppercase',
    },
    svg: {
      width: '20px',
      height: '20px',
      fill: 'white',
    },
  };

  return (
    <>
      <section style={styles.section as React.CSSProperties}>
        <div style={styles.content}>
          <h1 style={styles.title}>
            Mayor&apos;s Office of
            <br />
            LGBTQIA2S+
            <br />
            Advancement
            <br />
            Directory
          </h1>
          <p style={styles.subtitle}>
            Supporting Boston&apos;s LGBTQ+ community through comprehensive resources, services, and
            programs that enhance well-being, provide vital support, and create pathways to thrive.
          </p>
          <SearchBar onFilter={onFilter} />
        </div>
      </section>

      <div style={styles.buttonWrapper}>
        <a
          href="https://www.boston.gov/departments/boston-311"
          style={styles.button as React.CSSProperties}
        >
          <svg style={styles.svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1v3.5a1 1 0 0 1-1 1C10.29 21.01 2.99 13.71 2.99 4a1 1 0 0 1 1-1H7.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.25 1.01l-2.2 2.2z" />
          </svg>
          Click here for emergency resources
        </a>
      </div>
    </>
  );
};

export default Search;

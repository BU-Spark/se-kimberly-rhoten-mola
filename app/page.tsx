"use client";

import Image from "next/image";
import styles from "./page.module.css";
import Map from "./components/Map";
import SearchBar from "./components/SearchBar";

export default function Home() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

  // If you want to filter map markers locally, define a handler:
  const handleFilter = (filters: {
    category?: string;
    subcategory?: string;
  }) => {
    // e.g., query Firestore or pass data to Map
    console.log("Filters from SearchBar:", filters);
    // fetch organizations or pass to your ResourceExplorer, etc.
  };

  return (
    <div className={styles.container}>
      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.logoArea}>
          <Image
            src="/cob_b_white-01.png"
            alt="City of Boston Logo"
            width={60}
            height={60}
          />
          <div className={styles.headerText}>
            <h2>Mayor Michelle Wu</h2>
            <span>Mayor&apos;s Office of LGBTQIA2S+ Advancement</span>
          </div>
        </div>
        <nav className={styles.navMenu}>
          <ul>
            {/* Clicking this goes to the Resource Database page */}
            <li>
              <a href="/database">Database</a>
            </li>
            <li>
              <a href="#">Interactive Map</a>
            </li>
            <li>
              <a href="#">Help</a>
            </li>
          </ul>
        </nav>
      </header>

      {/* MAIN */}
      <main className={styles.main}>
        {/* HERO SECTION */}
        <section className={styles.heroSection}>
          <h1 className={styles.heroTitle}>
            Mayor’s Office of<br />LGBTQIA2S+<br />Advancement<br />Directory
          </h1>
          <p className={styles.heroSubtitle}>
            Supporting Boston’s LGBTQ+ community by providing resources,
            services, and programs that enhance well-being, provide vital
            support, and create pathways to thrive.
          </p>

          {/* NEW SEARCH BAR (with categories) */}
          <SearchBar onFilter={handleFilter} />

          <button className={styles.emergencyButton}>
            CLICK HERE FOR EMERGENCY RESOURCES
          </button>
        </section>

        {/* PLACEHOLDERS */}
        <section className={styles.placeholderSection}>
          <h2>Events</h2>
          <p>[Placeholder for upcoming events list or calendar]</p>
        </section>

        <section className={styles.placeholderSection}>
          <h2>Resource Map</h2>
          {/* If you want to show markers filtered by handleFilter, do so here */}
          <Map apiKey={apiKey} />
        </section>
      </main>

      <footer className={styles.footer}>
        <p>© 2025 City of Boston. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

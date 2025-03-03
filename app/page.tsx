import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.logoArea}>
          {/* Example City of Boston logo (replace with real file path) */}
          <Image
            src="/city-of-boston-logo.png"
            alt="City of Boston Logo"
            width={60}
            height={60}
          />
          {/* Example: show mayor name or a site title in the header */}
          <div className={styles.headerText}>
            <h2>Mayor Michelle Wu</h2>
            <span>Mayor&apos;s Office of LGBTQIA2S+ Advancement</span>
          </div>
        </div>
        <nav className={styles.navMenu}>
          <ul>
            <li>
              <a href="#">Database</a>
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

      <main className={styles.main}>
        <section className={styles.heroSection}>
          <h1 className={styles.heroTitle}>
            Mayor’s Office of LGBTQIA2S+ Advancement Directory
          </h1>
          <p className={styles.heroSubtitle}>
            Supporting Boston’s LGBTQ+ community by providing resources,
            services, and programs that enhance well-being, provide vital
            support, and create pathways to thrive.
          </p>

          {/* SEARCH BAR & BUTTONS */}
          <div className={styles.searchContainer}>
            <input 
              className={styles.searchInput}
              type="text" 
              placeholder="Start typing or select a service" 
            />
            <button className={styles.searchButton}>GO TO DATABASE</button>
          </div>

          <button className={styles.emergencyButton}>
            CLICK HERE FOR EMERGENCY RESOURCES
          </button>
        </section>

        {/* PLACEHOLDERS FOR OTHER CONTENT */}
        <section className={styles.placeholderSection}>
          <h2>Events</h2>
          <p>[Placeholder for upcoming events list or calendar]</p>
        </section>

        <section className={styles.placeholderSection}>
          <h2>Resource Map</h2>
          <p>[Placeholder for interactive map component]</p>
        </section>
      </main>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <p>© 2025 City of Boston. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

import Image from "next/image";
import styles from "./page.module.css";
import Map from "./components/Map";

export default function Home() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;
  return (
    <div className={styles.container}>
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
            Mayor’s Office of<br></br>LGBTQIA2S+<br></br>Advancement<br></br>
            Directory
          </h1>
          <p className={styles.heroSubtitle}>
            Supporting Boston’s LGBTQ+ community by providing resources,
            services, and programs that enhance well-being, provide vital
            support, and create pathways to thrive.
          </p>
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
        <section className={styles.placeholderSection}>
          <h2>Events</h2>
          <p>[Placeholder for upcoming events list or calendar]</p>
        </section>

        <section className={styles.placeholderSection}>
          <h2>Resource Map</h2>
          <p></p>
          <Map apiKey={apiKey} />
        </section>
      </main>
      <footer className={styles.footer}>
        <p>© 2025 City of Boston. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

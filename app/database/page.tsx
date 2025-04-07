"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { db } from "../../firebase/configfirebase";
import { collection, getDocs } from "firebase/firestore";
import ResourceList from "../components/ResourceList";
import SearchBar from "../components/SearchBar";
import styles from "../page.module.css"; // Reuse the main page CSS
import Link from "next/link";

export default function DatabasePage() {
  const [allResources, setAllResources] = useState<any[]>([]);

  useEffect(() => {
    // Fetch all resources on load
    const fetchResources = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Organizations"));
        const data: unknown[] = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        setAllResources(data);
      } catch (err) {
        console.error("Error fetching resources:", err);
      }
    };
    fetchResources();
  }, []);

  const handleFilter = (filters: { category?: string; subcategory?: string }) => {
    console.log("Filters from Database page:", filters);
    // Additional filtering logic can be implemented here if needed
  };

  return (
    <div className={styles.container}>
      {/* HEADER - same as main page */}
      <header className={styles.header}>
        <Link href="/" className={styles.logoArea}>
          <Image
            src="/cob_b_white-01.png"
            alt="City of Boston Logo"
            width={60}
            height={60}
          />
          <div className={styles.headerText}>
            <span>Mayor&apos;s Office of LGBTQIA2S+ Advancement</span>
          </div>
        </Link>
        <nav className={styles.navMenu}>
          <ul>
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

      {/* MAIN CONTENT */}
      <main className={styles.main} style={{ padding: "2rem" }}>
        <h1>LGBTQIA2S+ Resource Database</h1>
        <p>
          Welcome to the LGBTQIA2S+ resource database. Here, you will find
          resources in the Boston area. Apply filters below.
        </p>
        <SearchBar onFilter={handleFilter} />
        <ResourceList resources={allResources} />
      </main>

      <footer className={styles.footer}>
        <p>© 2025 City of Boston. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
"use client";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import Link from "next/link";
import styles from "../page.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logoArea}>
        <Link href="/"></Link>
        <div className={styles.headerText}>
          <Link href="/">
            <span>LGBTQIA2S+ Resource Map</span>
          </Link>
        </div>
      </div>
      <nav className={styles.navMenu}>
        <ul>
          <li>
            <Link href="/map">Map</Link>
          </li>
          <li>
            <Link href="/database">Database</Link>
          </li>
          <li>
            <a href="mailto:lgbtq@boston.gov">Feedback</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

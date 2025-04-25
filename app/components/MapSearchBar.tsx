"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "../page.module.css";

const ALL_SERVICES = [
  "Food",
  "Health and Wellness",
  "Hotlines",
  "Housing",
  "Legal Assistance",
  "STI/HIV Support",
  "Therapeutic Support",
  "Trans Health and Social Services",
  // …etc
];

export default function MapSearchBar({
  onFilter,
}: {
  onFilter: (opts: { text?: string; services?: string[] }) => void;
}) {
  const [text, setText] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);

  // 1️⃣ Close dropdown on outside click
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (
        showFilters &&
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setShowFilters(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [showFilters]);

  // 2️⃣ Whenever text or services change, fire onFilter
  useEffect(() => {
    onFilter({ text, services: selectedServices });
  }, [text, selectedServices, onFilter]);

  // 3️⃣ Checkbox toggle handler
  function toggleService(service: string) {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service],
    );
  }

  return (
    <div className={styles.searchBarWrapper} ref={containerRef}>
      <div className={styles.searchInputs}>
        <input
          type="text"
          placeholder="Start typing or select a service"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className={styles.searchInput}
        />
        <button
          type="button"
          className={styles.searchButton}
          onClick={() => onFilter({ text, services: selectedServices })}
        >
          SEARCH
        </button>
        {/* <button
          type="button"
          className={styles.filterToggle}
          onClick={() => setShowFilters((v) => !v)}
        >
          {showFilters ? "Hide Filters ▲" : "View Filters ▼"}
        </button> */}
      </div>

      {showFilters && (
        <div className={styles.filterDropdown}>
          {ALL_SERVICES.map((svc) => (
            <label key={svc} className={styles.filterLabel}>
              <input
                type="checkbox"
                checked={selectedServices.includes(svc)}
                onChange={() => toggleService(svc)}
              />
              {svc}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
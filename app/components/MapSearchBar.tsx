"use client";

import React, { useState, useRef, useEffect } from "react";
import s from "./SearchBar.module.css";

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

  useEffect(() => {
    onFilter({ text, services: selectedServices });
  }, [text, selectedServices, onFilter]);

  return (
    <div className={s.wrapper} ref={containerRef}>
      <div className={s.controls}>
        <input
          className={s.input}
          placeholder="Start typing or select a service"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type="button"
          className={s.button}
          onClick={() => onFilter({ text, services: selectedServices })}
        >
          SEARCH
        </button>
      </div>
    </div>
  );
}

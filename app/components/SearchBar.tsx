'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '../../firebase/configfirebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

interface Organization {
  id: string;
  Organization_Name: string;
}

export default function SearchBar() {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState<Organization[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Fetch suggestions from Firestore
  const fetchSuggestions = async (text: string) => {
    if (!text.trim()) {
      setSuggestions([]);
      return;
    }
    try {
      console.log("Fetching suggestions for:", text);
      const orgsRef = collection(db, "Organizations");
      const q = query(
        orgsRef,
        where("Organization_Name", ">=", text),
        where("Organization_Name", "<=", text + "\uf8ff"),
      );
      const snapshot = await getDocs(q);
      const results: Organization[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.Organization_Name) {
          results.push({
            id: doc.id,
            Organization_Name: data.Organization_Name,
          });
        }
      });
      console.log("Got", results.length, "matches");
      setSuggestions(results);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  // Handle text input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setSearchText(text);
    setShowSuggestions(true);
    fetchSuggestions(text);
  };

  // Handle Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push(`/database?search=${encodeURIComponent(searchText)}`);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (org: Organization) => {
    setSearchText(org.Organization_Name);
    setShowSuggestions(false);
    router.push(
      `/database?search=${encodeURIComponent(org.Organization_Name)}`,
    );
  };

  // Handle explicit search button click
  const handleSearchClick = () => {
    router.push(`/database?search=${encodeURIComponent(searchText)}`);
  };

  return (
    <div style={{ position: "relative" }}>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <input
          type="text"
          placeholder="Start typing or select a service"
          value={searchText}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          style={{ flex: 1, padding: "0.5rem" }}
        />
        <button onClick={handleSearchClick} style={{ padding: "0.5rem 1rem" }}>
          GO TO DATABASE
        </button>
      </div>

      {/* Dropdown suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          style={{
            position: "absolute",
            top: "110%",
            left: 0,
            right: 0,
            background: "#fff",
            border: "1px solid #ccc",
            zIndex: 999,
            maxHeight: "200px",
            overflowY: "auto",
          }}
        >
          {suggestions.map((org) => (
            <div
              key={org.id}
              onClick={() => handleSuggestionClick(org)}
              style={{ padding: "0.5rem", cursor: "pointer" }}
            >
              {org.Organization_Name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "../../firebase/configfirebase";
import { collection, query, where, getDocs } from "firebase/firestore";

interface Organization {
  id: string;
  Organization_Name: string;
}

export default function SearchBar() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState<Organization[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Hardcoded service filtering options.
  const serviceOptions = [
    "Food",
    "Health and Wellness",
    "Hotlines",
    "Legal Assistance",
    "STI/HIV Support",
    "Therapeutic Support",
    "Trans Health and Social Services",
    "Violence Prevention and Survivor Support",
    "Youth Empowerment",
  ];

  // Fetch suggestions from Firestore based on organization name.
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

  // Handle text input changes.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setSearchText(text);
    setShowDropdown(true);
    fetchSuggestions(text);
  };

  // Handle Enter key: search by the typed organization name.
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push(`/database?search=${encodeURIComponent(searchText)}`);
      setShowDropdown(false);
    }
  };

  // Handle suggestion click: use the suggestion as the search term.
  const handleSuggestionClick = (org: Organization) => {
    setSearchText(org.Organization_Name);
    setShowDropdown(false);
    router.push(
      `/database?search=${encodeURIComponent(org.Organization_Name)}`,
    );
  };

  // Handle click on a service option from the dropdown.
  const handleServiceOptionClick = (serviceType: string) => {
    setSearchText(serviceType);
    setShowDropdown(false);
    router.push(`/database?filter=${encodeURIComponent(serviceType)}`);
  };

  // Handle explicit search button click (using the typed text).
  const handleSearchClick = () => {
    router.push(`/database?search=${encodeURIComponent(searchText)}`);
    setShowDropdown(false);
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
          onFocus={() => setShowDropdown(true)}
          style={{ flex: 1, padding: "0.5rem" }}
        />
        <button onClick={handleSearchClick} style={{ padding: "0.5rem 1rem" }}>
          GO TO DATABASE
        </button>
      </div>

      {/* Dropdown menu for suggestions and service options */}
      {showDropdown && (
        <div
          style={{
            position: "absolute",
            top: "110%",
            left: 0,
            right: 0,
            background: "#fff",
            border: "1px solid #ccc",
            zIndex: 999,
            maxHeight: "300px",
            overflowY: "auto",
          }}
        >
          {/* Display organization name suggestions if available */}
          {suggestions.length > 0 && (
            <>
              {suggestions.map((org) => (
                <div
                  key={org.id}
                  onClick={() => handleSuggestionClick(org)}
                  style={{ padding: "0.5rem", cursor: "pointer" }}
                >
                  {org.Organization_Name}
                </div>
              ))}
              <div
                style={{
                  padding: "0.5rem",
                  fontWeight: "bold",
                  backgroundColor: "#eee",
                }}
              >
                Or Filter by Service:
              </div>
            </>
          )}
          {/* Always show the service filtering options */}
          {serviceOptions.map((option) => (
            <div
              key={option}
              onClick={() => handleServiceOptionClick(option)}
              style={{ padding: "0.5rem", cursor: "pointer" }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

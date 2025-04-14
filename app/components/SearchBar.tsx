"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "../../firebase/configfirebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import styles from "../page.module.css";

interface Organization {
  id: string;
  Organization_Name: string;
}

// These are your 9 categories, but you can add or remove as needed.
const SERVICE_OPTIONS = [
  "Food",
  "Health and Wellness",
  "Hotlines",
  "Housing",
  "Legal Assistance",
  "STI/HIV Support",
  "Therapeutic Support",
  "Trans Health and Social Services",
  "Violence Prevention and Survivor Support",
  "Youth Empowerment",
];

export default function SearchBar() {
  const router = useRouter();

  // Single text input state
  const [searchText, setSearchText] = useState("");

  // Storing search suggestions
  const [suggestions, setSuggestions] = useState<Organization[]>([]);

  // Show/hide of the dropdown
  const [showDropdown, setShowDropdown] = useState(false);

  // Track which service(s) are selected
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  // Function that toggles a checkbox
  const handleServiceChange = (service: string, checked: boolean) => {
    if (checked) {
      // add this service to array
      setSelectedServices((prev) => [...prev, service]);
    } else {
      // remove it
      setSelectedServices((prev) => prev.filter((s) => s !== service));
    }
  };

  // Fetch suggestions for the text input
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setSearchText(text);
    setShowDropdown(true);
    fetchSuggestions(text);
  };

  // Pressing enter in the text input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  // If user clicks on a suggested organization
  const handleSuggestionClick = (org: Organization) => {
    setSearchText(org.Organization_Name);
    setShowDropdown(false);
    // navigate to database, passing "search=org name" (no filter).
    router.push(
      `/database?search=${encodeURIComponent(org.Organization_Name)}`,
    );
  };

  // We can remove the old handleServiceOptionClick because we now have checkboxes

  // Called when user explicitly clicks the search button
  const handleSearchClick = () => {
    // Build a query param string from both searchText and selectedServices
    const params = new URLSearchParams();
    if (searchText.trim()) {
      params.append("search", searchText.trim());
    }
    if (selectedServices.length > 0) {
      params.append("filters", selectedServices.join(",")); 
      // e.g. "Food,Hotlines"
    }
    // e.g. /database?search=Impact&filters=Food,Hotlines
    router.push(`/database?${params.toString()}`);
    setShowDropdown(false);
  };

  return (
    <div style={{ position: "relative" }}>
      <div style={{ display: "flex", gap: "1rem" }}>
        <input
          type="text"
          placeholder="Start typing or select a service"
          value={searchText}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowDropdown(true)}
          className={styles.searchInput}
        />
        <button onClick={handleSearchClick} style={{ padding: "0.5rem 1rem" }}>
          SEARCH
        </button>
      </div>

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
            padding: "0.5rem",
          }}
        >
          {/* Suggestions */}
          {suggestions.length > 0 &&
            suggestions.map((org) => (
              <div
                key={org.id}
                onClick={() => handleSuggestionClick(org)}
                style={{ padding: "0.5rem", cursor: "pointer" }}
              >
                {org.Organization_Name}
              </div>
            ))}

          {/* Optional heading */}
          <div
            style={{
              fontWeight: "bold",
              backgroundColor: "#eee",
              marginTop: suggestions.length > 0 ? "0.5rem" : 0,
              padding: "0.5rem",
            }}
          >
            Filter by Service:
          </div>
          {/* Checkboxes for multiple select */}
          {SERVICE_OPTIONS.map((option) => {
            const isChecked = selectedServices.includes(option);
            return (
              <label
                key={option}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.5rem",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) =>
                    handleServiceChange(option, e.target.checked)
                  }
                />
                {option}
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { db } from "../../firebase/configfirebase";
import { collection, query, where, getDocs } from "firebase/firestore";

interface Organization {
  id: string;
  Organization_Name: string;
}

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
  const searchBarRef = useRef<HTMLDivElement>(null);
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState<Organization[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const handleServiceChange = (service: string, checked: boolean) => {
    setSelectedServices((prev) =>
      checked ? [...prev, service] : prev.filter((s) => s !== service)
    );
  };

  const fetchSuggestions = async (text: string) => {
    if (!text.trim()) {
      setSuggestions([]);
      return;
    }
    try {
      const orgsRef = collection(db, "Organizations");
      const q = query(
        orgsRef,
        where("Organization_Name", ">=", text),
        where("Organization_Name", "<=", text + "\uf8ff")
      );
      const snapshot = await getDocs(q);
      const results: Organization[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        Organization_Name: doc.data().Organization_Name,
      }));
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearchClick();
  };

  const handleSuggestionClick = (org: Organization) => {
    setSearchText(org.Organization_Name);
    setShowDropdown(false);
    router.push(`/database?search=${encodeURIComponent(org.Organization_Name)}`);
  };

  const handleSearchClick = () => {
    const params = new URLSearchParams();
    if (searchText.trim()) params.append("search", searchText.trim());
    if (selectedServices.length > 0) params.append("filters", selectedServices.join(","));
    router.push(`/database?${params.toString()}`);
    setShowDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={searchBarRef}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "1200px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          backgroundColor: "#fff",
          border: "1px solid #e0e0e0",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          height: "66px",
          borderRadius: "0",
        }}
      >
        <div style={{ padding: "0 20px", display: "flex", alignItems: "center" }}>
          {/* Search icon */}
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path
              d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-1.48 1.48l.27.28v.79l4.25 4.25a1.06 1.06 0 0 0 1.49 0c.41-.41.41-1.08 0-1.49L15.5 14zM9.5 14a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9z"
              fill="#666"
            />
          </svg>
        </div>

        <input
          type="text"
          placeholder="Start typing or select a service"
          value={searchText}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowDropdown(true)}
          style={{
            flex: 1,
            height: "100%",
            padding: "0",
            fontSize: "16px",
            border: "none",
            outline: "none",
            backgroundColor: "transparent",
            fontFamily: "'Inter', sans-serif",
            color: "#102738",
          }}
        />

        {/* Italic placeholder */}
        <style jsx>{`
          input::placeholder {
            font-style: italic;
            color: #777;
          }
        `}</style>

        <button
          onClick={handleSearchClick}
          style={{
            height: "100%",
            padding: "0 25px",
            backgroundColor: "#1E88E5",
            color: "white",
            border: "none",
            borderRadius: "0",
            fontWeight: "600",
            fontSize: "16px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: "220px",
            letterSpacing: "0.5px",
            transition: "background-color 0.2s ease",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#1976D2")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#1E88E5")}
        >
          GO TO DATABASE
          <div
            style={{
              marginLeft: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(255,255,255,0.2)",
              width: "28px",
              height: "28px",
              borderRadius: "50%",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" fill="white" />
            </svg>
          </div>
        </button>
      </div>

      {showDropdown && (
        <div
          style={{
            position: "absolute",
            top: "86px",
            left: "20px",
            right: "20px",
            background: "#fff",
            border: "1px solid #eaeaea",
            borderRadius: "0",
            zIndex: 999,
            maxHeight: "350px",
            overflowY: "auto",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            color: "#102738",
          }}
        >
          {suggestions.length > 0 && (
            <div style={{ padding: "10px 0" }}>
              {suggestions.map((org) => (
                <div
                  key={org.id}
                  onClick={() => handleSuggestionClick(org)}
                  style={{
                    padding: "12px 20px",
                    cursor: "pointer",
                    transition: "background-color 0.2s ease",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f5f5f5")}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  {org.Organization_Name}
                </div>
              ))}
            </div>
          )}

          <div
            style={{
              fontWeight: "600",
              backgroundColor: "#f7f7f7",
              padding: "15px 20px",
              borderTop: suggestions.length > 0 ? "1px solid #eaeaea" : "none",
              borderBottom: "1px solid #eaeaea",
            }}
          >
            Filter by Service:
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              padding: "10px",
            }}
          >
            {SERVICE_OPTIONS.map((option) => {
              const isChecked = selectedServices.includes(option);
              return (
                <label
                  key={option}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "12px 10px",
                    cursor: "pointer",
                    backgroundColor: isChecked ? "#e3f2fd" : "transparent",
                    transition: "background-color 0.2s ease",
                    margin: "2px",
                  }}
                  onMouseOver={(e) => !isChecked && (e.currentTarget.style.backgroundColor = "#f5f5f5")}
                  onMouseOut={(e) => !isChecked && (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => handleServiceChange(option, e.target.checked)}
                    style={{
                      width: "18px",
                      height: "18px",
                      margin: 0,
                      accentColor: "#1E88E5",
                      cursor: "pointer",
                    }}
                  />
                  {option}
                </label>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

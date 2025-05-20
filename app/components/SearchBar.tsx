"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { db } from "../../firebase/configfirebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import styles from "../page.module.css";

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
    if (checked) {
      setSelectedServices((prev) => [...prev, service]);
    } else {
      setSelectedServices((prev) => prev.filter((s) => s !== service));
    }
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
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  const handleSuggestionClick = (org: Organization) => {
    setSearchText(org.Organization_Name);
    setShowDropdown(false);
    router.push(
      `/database?search=${encodeURIComponent(org.Organization_Name)}`,
    );
  };

  const handleSearchClick = () => {
    const params = new URLSearchParams();
    if (searchText.trim()) {
      params.append("search", searchText.trim());
    }
    if (selectedServices.length > 0) {
      params.append("filters", selectedServices.join(","));
    }
    router.push(`/database?${params.toString()}`);
    setShowDropdown(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div 
      ref={searchBarRef}
      className="search-container" 
      style={{ 
        position: "relative",
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px"
      }}
    >
      <div className="search-wrapper" style={{ 
        display: "flex", 
        alignItems: "center",
        width: "100%",
        backgroundColor: "white",
        border: "1px solid #e0e0e0",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        height: "66px",
        borderRadius: "0" // Ensure square corners
      }}>
        <div className="search-icon" style={{
          padding: "0 20px",
          display: "flex",
          alignItems: "center"
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="#666"/>
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
            color: "#333"
          }}
        />
        
        <button 
          onClick={handleSearchClick} 
          style={{ 
            height: "100%",
            padding: "0 25px",
            backgroundColor: "#1E88E5",
            color: "white",
            border: "none",
            borderRadius: "0", // Ensure square corners
            fontWeight: "600",
            fontSize: "16px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: "220px",
            letterSpacing: "0.5px",
            transition: "background-color 0.2s ease"
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#1976D2"}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#1E88E5"}
        >
          GO TO DATABASE
          <div style={{ 
            marginLeft: "10px", 
            display: "flex", 
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(255,255,255,0.2)",
            width: "28px",
            height: "28px",
            borderRadius: "50%" // Keep the circle for the arrow icon
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" fill="white"/>
            </svg>
          </div>
        </button>
      </div>

      {showDropdown && (
        <div
          style={{
            position: "absolute",
            top: "86px", // Position below the search bar with some spacing
            left: "20px",
            right: "20px",
            background: "#fff",
            border: "1px solid #eaeaea",
            borderRadius: "0", // Ensure square corners
            zIndex: 999,
            maxHeight: "350px",
            overflowY: "auto",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
          }}
        >
          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div style={{ padding: "10px 0" }}>
              {suggestions.map((org) => (
                <div
                  key={org.id}
                  onClick={() => handleSuggestionClick(org)}
                  style={{ 
                    padding: "12px 20px", 
                    cursor: "pointer",
                    transition: "background-color 0.2s ease"
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#f5f5f5"}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                >
                  {org.Organization_Name}
                </div>
              ))}
            </div>
          )}

          {/* Filter heading */}
          <div
            style={{
              fontWeight: "600",
              backgroundColor: "#f7f7f7",
              padding: "15px 20px",
              borderTop: suggestions.length > 0 ? "1px solid #eaeaea" : "none",
              borderBottom: "1px solid #eaeaea"
            }}
          >
            Filter by Service:
          </div>
          
          {/* Service options grid */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", 
            padding: "10px" 
          }}>
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
                    margin: "2px"
                  }}
                  onMouseOver={(e) => !isChecked && (e.currentTarget.style.backgroundColor = "#f5f5f5")}
                  onMouseOut={(e) => !isChecked && (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  <div style={{
                    position: "relative",
                    width: "18px",
                    height: "18px"
                  }}>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => handleServiceChange(option, e.target.checked)}
                      style={{
                        width: "18px",
                        height: "18px",
                        margin: 0,
                        accentColor: "#1E88E5",
                        cursor: "pointer"
                      }}
                    />
                  </div>
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

"use client";

import "./globals.css";
import GoogleMapsProvider from "./GoogleMapsProvider";
import Header from "./components/Header";
import Footer from "./components/Footer";
import React, { useState } from "react";
import { colors, typography, images } from "./styles/constants";

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

// Extracted styles
const styles = {
  sidebar: {
    position: "fixed",
    top: 0,
    left: 0,
    width: 275,
    height: "100vh",
    background: colors.white,
    zIndex: 200,
    boxShadow: "2px 0 8px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    borderRight: `1px solid ${colors.supportingGrays.light}`,
  } as React.CSSProperties,
  
  logoSection: {
    background: colors.white,
    padding: "50px 0 90px 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderBottom: `1px solid ${colors.supportingGrays.light}`,
  } as React.CSSProperties,
  
  logo: {
    width: "80%",
    height: "auto",
    maxWidth: "85px",
    maxHeight: "85px",
    filter: "none",
  } as React.CSSProperties,
  
  helpLink: {
    background: colors.charlesBlue,
    color: "#FFC72C",
    fontWeight: 900,
    fontFamily: typography.fontFamily.primary,
    fontSize: "1.05rem",
    padding: "30px 0 18px 24px",
    borderBottom: `2px solid ${colors.supportingBlues.darkest}`,
    borderTop: `2px solid ${colors.supportingBlues.darkest}`,
    textDecoration: "none",
    display: "block",
  } as React.CSSProperties,
  
  sidebarNav: {
    flex: 1, 
    display: "flex", 
    flexDirection: "column",
  } as React.CSSProperties,
  
  menuItem: {
    display: "block",
    background: colors.optimisticBlue,
    color: colors.white,
    fontWeight: 900,
    fontFamily: typography.fontFamily.primary,
    fontSize: "1.05rem",
    padding: "30px 0 18px 24px",
    textDecoration: "none",
    borderBottom: `1px solid ${colors.supportingBlues.darkest}`,
  } as React.CSSProperties,
  
  mainContent: {
    transition: "transform 0.3s cubic-bezier(.4,0,.2,1)",
  } as React.CSSProperties,
  
  main: {
    paddingTop: "60px",
  } as React.CSSProperties,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const sidebarWidth = 275;

  // Sidebar menu items
  const sidebarItems = [
    { label: "DATABASE", href: "/database" },
    { label: "MAP", href: "/map" },
    { label: "FEEDBACK", href: "/feedback" },
  ];

  return (
    <html>
      <body>
        <GoogleMapsProvider apiKey={apiKey}>
          {/* Sidebar */}
          {isSidebarOpen && (
            <div style={styles.sidebar}>
              {/* Top logo section */}
              <div style={styles.logoSection}>
                <img src={images.logo_black} alt="Logo" style={styles.logo} />
              </div>
              {/* HELP / 311 section */}
              <a 
                href="tel:311"
                style={styles.helpLink}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = colors.supportingBlues.desaturated}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = colors.charlesBlue}
              >
                HELP / 311
              </a>
              {/* Menu items */}
              <nav style={styles.sidebarNav}>
                {sidebarItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    style={styles.menuItem}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = colors.supportingBlues.desaturated}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = colors.optimisticBlue}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          )}
          {/* Main content wrapper shifts when sidebar is open */}
          <div
            style={{
              ...styles.mainContent,
              transform: isSidebarOpen ? `translateX(${sidebarWidth}px)` : "none",
            }}
          >
            <Header
              isSidebarOpen={isSidebarOpen}
              toggleSidebar={() => setSidebarOpen((open) => !open)}
            />
            <main style={styles.main}>
              {children}
            </main>
            <Footer />
          </div>
        </GoogleMapsProvider>
      </body>
    </html>
  );
}
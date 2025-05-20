"use client";

import React from "react";
import { styled } from "@stitches/react";

// Styled components
const StyledFooter = styled("footer", {
  backgroundColor: "#0C273A",
  color: "white",
  padding: "3rem 2rem 2rem",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const FooterContainer = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  maxWidth: "1200px",
  flexWrap: "nowrap",
  gap: "2rem",
});

const LogoContainer = styled("div", {
  position: "relative",
  marginRight: "2rem",
  transition: "transform 0.3s ease",

  "&:hover": {
    transform: "scale(1.05)",
  }
});

const Logo = styled("span", {
  color: "white",
  fontSize: "3rem",
  fontWeight: "800",
  display: "inline-block",
  fontFamily: "'Inter', sans-serif",
});

const Underline = styled("div", {
  position: "absolute",
  bottom: "0",
  left: "0",
  width: "100%",
  height: "4px",
  background: "#FB4D43",
  borderRadius: "4px",
});

const FooterNav = styled("nav", {
  display: "flex",
  gap: "2rem",
  flexWrap: "nowrap",
});

const FooterLink = styled("a", {
  color: "#51ACFF",
  textDecoration: "none",
  fontSize: "0.875rem",
  fontWeight: "500",
  transition: "all 0.2s",
  position: "relative",
  padding: "0.25rem 0",

  "&:hover": {
    color: "white",
    "&::after": {
      width: "100%",
      opacity: 1,
    }
  },
  "&::after": {
    content: "''",
    position: "absolute",
    bottom: "0",
    left: "0",
    width: "0%",
    height: "2px",
    backgroundColor: "#FB4D43",
    transition: "width 0.3s ease, opacity 0.3s ease",
    opacity: 0,
  }
});

const ReportButton = styled("button", {
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  color: "#FCBC05",
  border: "none",
  borderRadius: "8px",
  padding: "0.75rem 1.25rem",
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
  cursor: "pointer",
  fontWeight: "600",
  transition: "all 0.2s ease",
  backdropFilter: "blur(10px)",

  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(255, 193, 7, 0.15)",
  },

  "&:active": {
    transform: "translateY(0)",
  }
});

const ReportIcon = styled("span", {
  background: "white",
  color: "#FCBC05",
  borderRadius: "50%",
  width: "2.75rem",
  height: "2.75rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
  boxShadow: "0 2px 8px rgba(255, 193, 7, 0.3)",
});

export default function Footer() {
  return (
    <StyledFooter>
      <FooterContainer>
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <LogoContainer>
            <Logo>B</Logo>
            <Underline />
          </LogoContainer>
          <FooterNav>
            <FooterLink href="/">PRIVACY POLICY</FooterLink>
            <FooterLink href="/">CONTACT US</FooterLink>
            <FooterLink href="/">JOBS</FooterLink>
            <FooterLink href="/">PUBLIC RECORDS</FooterLink>
            <FooterLink href="/">LANGUAGE AND DISABILITY ACCESS</FooterLink>
          </FooterNav>
        </div>
        <ReportButton>
          REPORT AN ISSUE
          <ReportIcon>
            <div style={{ fontSize: "0.6rem", lineHeight: "0.85rem", textAlign: "center" }}>
              BOS:<br /><strong style={{ fontSize: "1.15rem" }}>311</strong>
            </div>
          </ReportIcon>
        </ReportButton>
      </FooterContainer>
    </StyledFooter>
  );
}


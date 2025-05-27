"use client";

import React from "react";
import { styled } from "@stitches/react";
import { typography, colors } from "../styles/constants";

// Styled components
const StyledFooter = styled("footer", {
  backgroundColor: colors.charlesBlue,
  color: "white",
  padding: "0.9rem 0.9rem 0.9rem",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
});

const FooterContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  width: "100%",
  gap: "2rem",
});


const TopSection = styled("div", {
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
});

const LeftSection = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  flex: "1",
});

const LogoContainer = styled("div", {
  position: "relative",
  width: "125px",
  height: "125px",
  flexShrink: 0,
  marginTop: "0.25rem",
  
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
});

const FooterNav = styled("nav", {
  display: "flex",
  gap: "0.5rem 2rem", 
  flexWrap: "wrap",
  maxWidth: "50%",
  alignItems: "flex-start",
});

const FooterLink = styled("a", {
  color: colors.supportingBlues.bright,
  textDecoration: "none",
  fontSize: typography.fontSize.small,
  fontWeight: typography.fontWeight.medium,
  fontFamily: typography.fontFamily.primary,
  transition: "all 0.2s",
  position: "relative",
  padding: "0.15rem 0",
  whiteSpace: "nowrap",
  letterSpacing: typography.letterSpacing.wide,

  "&:hover": {
    color: colors.freedomTrailRed,
  }
});

const ReportSection = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  marginLeft: "auto",
  cursor: "pointer",
});

const ReportLink = styled("a", {
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  textDecoration: "none",
});

const ReportText = styled("span", {
  color: "#FCBC05",
  fontSize: typography.fontSize.small,
  fontWeight: typography.fontWeight.regular,
  fontFamily: typography.fontFamily.primary,
  letterSpacing: typography.letterSpacing.wide,
});

const ReportIcon = styled("div", {
  backgroundColor: "white",
  borderRadius: "50%",
  width: "5rem",
  height: "5rem",
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0.5rem",
  overflow: "hidden",
  transition: "background-color 0.3s ease",

  "&:hover": {
    backgroundColor: "#FCBC05",

    "& .bos, & .number": {
      color: colors.white,
    }
  },

  "& .bos": {
    position: "absolute",
    top: "1rem",
    left: "1.2rem",
    color: "#FCBC05",
    textAlign: "left",
    fontSize: "12px",
    fontWeight: typography.fontWeight.extraBold,
    fontFamily: typography.fontFamily.primary,
    transition: "color 0.3s ease",
  },

  "& .number": {
    color: "#FCBC05",
    fontSize: "1.8rem",
    fontFamily: typography.fontFamily.primary,
    fontWeight: typography.fontWeight.extraBold,
    marginTop: "0.6rem",
    textAlign: "center",
    width: "100%",
    transition: "color 0.3s ease",
  }
});



export default function Footer() {
  return (
    <StyledFooter>
      <FooterContainer>
        <TopSection>
          <LeftSection>
            <LogoContainer>
              <img src="/cob_b_white-01.png" alt="Boston Logo" />
            </LogoContainer>
            <FooterNav>
              <FooterLink href="https://www.boston.gov/departments/innovation-and-technology/terms-use-and-privacy-policy-city-boston-digital-services">PRIVACY POLICY</FooterLink>
              <FooterLink href="https://www.boston.gov/departments/mayors-office/contact-boston-city-hall">CONTACT US</FooterLink>
              <FooterLink href="https://www.boston.gov/career-center">JOBS</FooterLink>
              <FooterLink href="https://bostonma.govqa.us/WEBAPP/_rs/(S(den310hnrpqz2rzh5lgbgsby))/SupportHome.aspx">PUBLIC RECORDS</FooterLink>
              <FooterLink href="https://www.boston.gov/departments/language-and-communications-access/notice-accommodations">LANGUAGE AND DISABILITY ACCESS</FooterLink>
            </FooterNav>
          </LeftSection>
          <ReportSection>
            <ReportLink href="https://www.boston.gov/departments/boston-311" target="_blank" rel="noopener noreferrer">
              <ReportText>REPORT AN ISSUE</ReportText>
              <ReportIcon>
                <span className="bos">BOS:</span>
                <span className="number">311</span>
              </ReportIcon>
            </ReportLink>
          </ReportSection>
        </TopSection>
      </FooterContainer>
    </StyledFooter>
  );
}


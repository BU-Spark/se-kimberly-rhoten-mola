"use client";

import React from "react";
import Link from "next/link";

import { styled } from "@stitches/react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

import { colors, typography, spacing, images } from "../styles/constants";

// Styled components
const StyledHeader = styled("header", {
  backgroundColor: colors.white,
  height: "60px",
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: `1px solid ${colors.supportingGrays.light}`,
  padding: "0 16px 0 0",
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
  '@media (max-width: 768px)': {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
});

const LeftSection = styled("div", {
  display: "flex",
  height: "100%",
  alignItems: "center",
});

const MenuButton = styled("button", {
  width: "70px",
  height: "60px",
  backgroundColor: colors.freedomTrailRed,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  border: "none",
  cursor: "pointer",
  color: colors.white,
  padding: 0,
  transition: "background-color 0.1s ease",
  margin: 0,
});

const MenuText = styled("span", {
  color: colors.white,
  fontSize: "0.7rem",
  fontWeight: typography.fontWeight.bold,
  letterSpacing: "0.02em",
  width: "32px",
  textAlign: "center",
  display: "block",
  textTransform: "uppercase",
  lineHeight: 1,
  padding: 0,
  margin: "3px 0 0 0"
});

const LogoSection = styled("div", {
  display: "flex",
  alignItems: "center",
  paddingLeft: spacing.md,
  paddingRight: spacing.sm,
  gap: spacing.xs,
});

const CityText = styled("span", {
  color: colors.black,
  fontWeight: typography.fontWeight.extraBold,
  fontSize: "1.25rem",
  fontFamily: typography.fontFamily.primary, 
});

const OfText = styled("span", {
  color: colors.black,
  fontWeight: typography.fontWeight.regular,
  fontStyle: "italic",
  fontSize: "0.9rem",
  fontFamily: typography.fontFamily.secondary,
});

const BostonText = styled("span", {
  color: colors.black,
  fontWeight: typography.fontWeight.extraBold,
  fontSize: "1.25rem",
  fontFamily: typography.fontFamily.primary, 
  textDecoration: "underline",
  textDecorationColor: colors.freedomTrailRed,
  textUnderlineOffset: "0.15em",
  textDecorationThickness: "3px",
  marginLeft: "0.15em",
});

const Divider = styled("div", {
  height: "30px",
  borderRight: "1px solid black",
  alignSelf: "center",
  margin: `0 ${spacing.sm}`,
  '@media (max-width: 1024px)': {
    display: 'none',
  },
});

const MayorSection = styled("div", {
  display: "none",
  alignItems: "center",
  paddingLeft: spacing.sm,
  '@media (min-width: 1024px)': {
    display: 'flex',
  },
});

const MayorText = styled("span", {
  color: colors.charlesBlue,
  fontWeight: typography.fontWeight.regular,
  fontSize: "1rem",
  fontFamily: typography.fontFamily.secondary, 
  fontStyle: "italic",
});

const RightSection = styled("div", {
  display: "none",
  height: "100%",
  alignItems: "center",
  '@media (min-width: 800px)': {
    display: 'flex',
  },
});

const SearchButton = styled("button", {
  width: "60px",
  height: "100%",
  border: "none",
  backgroundColor: "transparent",
  color: colors.freedomTrailRed,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transform: "scaleX(-1)",
});

const SearchIcon = styled(MagnifyingGlassIcon, {
  width: 42,
  height: 42,
});

// Animated Hamburger/X Icon
const AnimatedMenuIcon = styled("div", {
  width: 32,
  height: 32,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  cursor: "pointer",
  "span": {
    display: "block",
    position: "absolute",
    height: 4,
    width: 24,
    background: colors.white,
    borderRadius: 2,
    transition: "all 0.4s cubic-bezier(.4,0,.2,1)",
  },
  ".bar1": {
    top: 6,
    left: 4,
    transitionProperty: "transform, opacity, background",
  },
  ".bar2": {
    top: 14,
    left: 4,
    transitionProperty: "opacity, transform, background",
  },
  ".bar3": {
    top: 22,
    left: 4,
    transitionProperty: "transform, opacity, background",
  },
  variants: {
    open: {
      true: {
        ".bar1": {
          transform: "translateY(8px) rotate(45deg)",
          transitionDelay: "0s",
        },
        ".bar2": {
          opacity: 0,
          transitionDelay: "0.1s",
        },
        ".bar3": {
          transform: "translateY(-8px) rotate(-45deg)",
          transitionDelay: "0.2s",
        },
      },
      false: {
        ".bar1": {
          transform: "none",
          transitionDelay: "0.2s",
        },
        ".bar2": {
          opacity: 1,
          transitionDelay: "0.1s",
        },
        ".bar3": {
          transform: "none",
          transitionDelay: "0s",
        },
      },
    },
  },
});

// Header navigation menu (simple flex row)
const HeaderNav = styled("nav", {
  display: "flex",
  alignItems: "center",
  gap: spacing.md,
  marginLeft: spacing.md,
});

const HeaderNavLink = styled("a", {
  color: colors.charlesBlue,
  fontFamily: typography.fontFamily.primary,
  fontWeight: typography.fontWeight.regular,
  fontSize: "0.9rem",
  textTransform: "uppercase",
  letterSpacing: "0.04em",
  textDecoration: "none",
  padding: `${spacing.xs} 0`,
  cursor: "pointer",
  position: "relative",
  
  '&:hover, &:focus': {
    color: colors.freedomTrailRed,
  },
});

const CenterSection = styled("div", {
  position: "absolute",
  left: "50%",
  bottom: 0,
  transform: "translateX(-50%) translateY(50%)",
  display: "none",
  alignItems: "center",
  justifyContent: "center",
  height: "auto",
  backgroundColor: colors.white,
  borderRadius: "50%",
  padding: "10px",
  '@media (min-width: 1024px)': {
    display: 'flex',
  },
});

const SealImage = styled("img", {
  height: "90px",
  width: "auto",
});

type HeaderProps = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
};

export default function Header({ isSidebarOpen, toggleSidebar }: HeaderProps) {
  const navItems = [
    { label: "DATABASE", href: "/database" },
    { label: "INTERACTIVE MAP", href: "/map" },
    { label: "FEEDBACK", href: "/feedback" },
  ];

  return (
    <StyledHeader>
      <LeftSection>
        {/* Menu Button with Animated Icon */}
        <MenuButton onClick={toggleSidebar} aria-label={isSidebarOpen ? "Close menu" : "Open menu"}>
          <AnimatedMenuIcon open={isSidebarOpen}>
            <span className="bar1" />
            <span className="bar2" />
            <span className="bar3" />
          </AnimatedMenuIcon>
          <MenuText>{isSidebarOpen ? "CLOSE" : "MENU"}</MenuText>
        </MenuButton>
        {/* Logo */}
        <Link href="https://www.boston.gov/">
          <LogoSection style={{ cursor: "pointer" }}>
            <CityText>
              CITY <OfText>of</OfText> <BostonText>BOSTON</BostonText>
            </CityText>
          </LogoSection>
        </Link>
        {/* Divider */}
        <Divider />
        {/* Mayor Name */}
        <MayorSection>
          <MayorText>Mayor Michelle Wu</MayorText>
        </MayorSection>
      </LeftSection>
      
      <CenterSection>
        <SealImage src={images.digital_seal_black} alt="City of Boston Digital Seal" />
      </CenterSection>

      <RightSection>
        {/* Header Navigation Menu */}
        <HeaderNav>
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} passHref legacyBehavior>
              <HeaderNavLink>{item.label}</HeaderNavLink>
            </Link>
          ))}
        </HeaderNav>
        {/* Search Button */}
        <SearchButton>
          <SearchIcon />
        </SearchButton>
      </RightSection>
    </StyledHeader>
  );
}
"use client";

import React from "react";
import Link from "next/link";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import * as Dialog from "@radix-ui/react-dialog";
import { styled } from "@stitches/react";
import { Cross1Icon, HamburgerMenuIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";

// Styled components
const StyledHeader = styled("header", {
  backgroundColor: "#ffffff",
  height: "12vh",
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const LeftSection = styled("div", {
  display: "flex",
  height: "100%",
  alignItems: "center",
});

const MenuButton = styled("button", {
  width: "118px",
  height: "100%",
  backgroundColor: "#FB4D43",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  border: "none",
  cursor: "pointer",
  color: "#ffffff",
  padding: 0,
});

const MenuIcon = styled(HamburgerMenuIcon, {
  width: 55,
  height: 55,
});

const MenuText = styled("span", {
  color: "#ffffff",
  fontSize: "1rem",
  fontWeight: 800,
  letterSpacing: "0.05em",
});

const LogoSection = styled("div", {
  display: "flex",
  alignItems: "center",
  paddingLeft: "24px",
  paddingRight: "16px",
});

const CityText = styled("span", {
  color: "#102738",
  fontWeight: 700,
  fontSize: "2.2rem",
});

const OfText = styled("span", {
  color: "#102738",
  fontWeight: 500,
  fontStyle: "italic",
  fontSize: "1.9rem",
});

const BostonText = styled("span", {
  color: "#102738",
  fontWeight: 800,
  fontSize: "2.2rem",
  textDecoration: "underline",
  textDecorationColor: "#FB4D43", 
});

const Divider = styled("div", {
  height: "40px",
  borderRight: "1px solid #102738",
  alignSelf: "center",
});

const MayorSection = styled("div", {
  display: "flex",
  alignItems: "center",
  paddingLeft: "16px",
});

const MayorText = styled("span", {
  color: "#102738",
  fontWeight: 400,
  fontSize: "1.25rem",
});

const RightSection = styled("div", {
  display: "flex",
  height: "100%",
  alignItems: "center",
});

const StyledNavigationMenu = styled(NavigationMenu.Root, {
  height: "100%",
  display: "flex",

  "@media (max-width: 768px)": {
    display: "none",
  },
});

const StyledNavigationMenuList = styled(NavigationMenu.List, {
  display: "flex",
  height: "100%",
  listStyle: "none",
  margin: 0,
  padding: 0,
});

const StyledNavigationMenuItem = styled(NavigationMenu.Item, {
  height: "100%",
});

const StyledNavigationMenuLink = styled(NavigationMenu.Link, {
  color: "#102738",
  padding: "0 16px",
  height: "100%",
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
  fontWeight: 500,
  fontSize: "0.95rem",

  "&:hover": {
    color: "#e25c4d",
  },
});

const SearchButton = styled("button", {
  width: "74px",
  height: "100%",
  border: "none",
  backgroundColor: "transparent",
  color: "#288BE5",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  "&:hover": {
    color: "#e25c4d",
  },
});

const SearchIcon = styled(MagnifyingGlassIcon, {
  width: 40,            
  height: 40,
  strokeWidth: 5.5,      
});


// Drawer styled components
const DialogOverlay = styled(Dialog.Overlay, {
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  position: "fixed",
  inset: 0,
});

const DialogContent = styled(Dialog.Content, {
  backgroundColor: "white",
  borderRadius: "0",
  position: "fixed",
  top: 0,
  left: 0,
  bottom: 0,
  width: "250px",
  padding: "25px",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.12)",
});

const DialogTitle = styled(Dialog.Title, {
  margin: 0,
  fontWeight: 600,
  color: "#102738",
  fontSize: "18px",
});

const DialogClose = styled(Dialog.Close, {
  position: "absolute",
  top: "10px",
  right: "10px",
  background: "transparent",
  border: "none",
  cursor: "pointer",
});

const NavigationLink = styled("a", {
  display: "block",
  padding: "12px 0",
  color: "#102738",
  textDecoration: "none",
  borderBottom: "1px solid #e9e9e9",
  fontWeight: 500,

  "&:hover": {
    color: "#e25c4d",
  },
});

export default function Header() {
  const navItems = [
    { label: "DATABASE", href: "/database" },
    { label: "INTERACTIVE MAP", href: "/map" },
    { label: "FEEDBACK", href: "/feedback" },
  ];

  return (
    <StyledHeader>
      <LeftSection>
        {/* Menu Button with Dialog */}
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <MenuButton>
              <MenuIcon />
              <MenuText>MENU</MenuText>
            </MenuButton>
          </Dialog.Trigger>
          
          <Dialog.Portal>
            <DialogOverlay />
            <DialogContent>
              <DialogTitle>
                Navigation Menu
              </DialogTitle>
              <DialogClose>
                <Cross1Icon width={20} height={20} />
              </DialogClose>
              
              <div style={{ marginTop: "40px" }}>
                {navItems.map((item) => (
                  <NavigationLink key={item.label} href={item.href}>
                    {item.label}
                  </NavigationLink>
                ))}
              </div>
            </DialogContent>
          </Dialog.Portal>
        </Dialog.Root>

        {/* Logo */}
        <Link href="/">
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

      <RightSection>
        {/* Navigation Menu */}
        <StyledNavigationMenu>
          <StyledNavigationMenuList>
            {navItems.map((item) => (
              <StyledNavigationMenuItem key={item.label}>
                <StyledNavigationMenuLink asChild>
                  <Link href={item.href}>{item.label}</Link>
                </StyledNavigationMenuLink>
              </StyledNavigationMenuItem>
            ))}
          </StyledNavigationMenuList>
        </StyledNavigationMenu>

        {/* Search Button */}
        <SearchButton>
          <SearchIcon />
        </SearchButton>
      </RightSection>
    </StyledHeader>
  );
}
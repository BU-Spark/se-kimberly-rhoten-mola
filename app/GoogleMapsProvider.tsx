"use client";

import React from "react";
import { LoadScript } from "@react-google-maps/api";

const libraries = ["marker"] as const;

export default function GoogleMapsProvider({
  apiKey,
  children,
}: {
  apiKey: string;
  children: React.ReactNode;
}) {
  return (
    <LoadScript
      googleMapsApiKey={apiKey}
      libraries={libraries}
      version="weekly"
    >
      {children}
    </LoadScript>
  );
}

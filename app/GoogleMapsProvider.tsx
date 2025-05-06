// app/GoogleMapsProvider.tsx
// one‑shot loader for the JS Maps SDK

"use client";

import React from "react";
import { LoadScript } from "@react-google-maps/api";

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
      libraries={["marker"] as const}
      version="weekly"
    >
      {children}
    </LoadScript>
  );
}

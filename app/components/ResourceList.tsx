// components/ResourceList.tsx
"use client";

import Link from "next/link";

interface Resource {
  id: string;
  Organization_Name?: string;
  Organization_Description?: string;
  Organization_Address?: string;
}

interface ResourceListProps {
  resources: Resource[];
}

export default function ResourceList({ resources }: ResourceListProps) {
  if (!resources || resources.length === 0) {
    return <p>No resources found.</p>;
  }

  return (
    <div style={{ marginTop: "1rem" }}>
      {/* result count */}
      <p style={{ marginBottom: "1rem", fontWeight: "bold" }}>
        Showing {resources.length} result(s)
      </p>

      {resources.map((res, idx) => {
        const isLast = idx === resources.length - 1;
        return (
          <div
            key={res.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              padding: "1rem 0",
              borderBottom: isLast ? "none" : "1px solid #ccc",
            }}
          >
            {/* left column */}
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: "0 0 0.5rem 0" }}>
                <Link href={`/resource/${res.id}`}>
                  {res.Organization_Name || "Unnamed Resource"}
                </Link>
              </h3>
              <p style={{ margin: 0, color: "#555" }}>
                {res.Organization_Description || "No description available."}
              </p>
            </div>

            {/* right column */}
            {res.Organization_Address && (
              <div
                style={{
                  marginLeft: "2rem",
                  minWidth: "200px",
                  textAlign: "right",
                  color: "#333",
                }}
              >
                <p style={{ margin: 0 }}>{res.Organization_Address}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

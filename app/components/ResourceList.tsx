"use client";
import s from "./ResourceList.module.css";
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
      <p style={{ marginBottom: "1rem", fontWeight: "bold" }}>
        Showing {resources.length} result(s)
      </p>

      {resources.map((res) => (
        <div key={res.id} className={s.card}>
          <h3 className={s.name}>
            <Link href={`/resource/${res.id}`}>{res.Organization_Name}</Link>
          </h3>

          {res.Organization_Address && (
            <p className={s.address}>{res.Organization_Address}</p>
          )}

          {res.Organization_Description && (
            <p className={s.body}>{res.Organization_Description}</p>
          )}
        </div>
      ))}
    </div>
  );
}

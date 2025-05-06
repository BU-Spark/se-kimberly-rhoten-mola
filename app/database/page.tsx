/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable @typescript-eslint/no-explicit-any
// app/database/page.tsx
// Filterable table view of all organisations
// Fuse.js index for typo‑tolerant free‑text search on name + address.

"use client";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { db } from "../../firebase/configfirebase";
import { collection, getDocs } from "firebase/firestore";
import ResourceList from "../components/ResourceList";
import SearchBar from "../components/SearchBar";
import styles from "../page.module.css";
import Fuse from "fuse.js";

interface Organization {
  id: string;
  Organization_Name: string;
  Organization_Address?: string;
  Type_Of_Service?: string;
  [key: string]: any;
}

export default function DatabasePage() {
  const router = useRouter();
  const [allResources, setAllResources] = useState<Organization[]>([]);
  const [filteredResources, setFilteredResources] = useState<Organization[]>(
    [],
  );

  // URL query helpers

  const searchParams = useSearchParams();
  const searchText = searchParams.get("search") ?? "";
  const filtersParam = searchParams.get("filters") ?? "";

  // fuse index

  const fuse = useMemo(
    () =>
      new Fuse(allResources, {
        keys: [
          { name: "Organization_Name", weight: 0.8 },
          { name: "Organization_Address", weight: 0.2 },
        ],
        threshold: 0.35,
      }),
    [allResources],
  );

  // fetch firestore once
  useEffect(() => {
    (async () => {
      const snap = await getDocs(collection(db, "Organizations"));
      const docs: Organization[] = snap.docs
        .map((d) => ({ id: d.id, ...d.data() }))
        .filter((o) => {
          return (
            o.Organization_Name && o.Organization_Name !== "Unnamed Resource"
          );
        });
      setAllResources(docs);
    })();
  }, []);

  // derive filtered list when query changes
  useEffect(() => {
    if (!searchText && !filtersParam) {
      setFilteredResources(allResources);
      return;
    }

    let list = searchText
      ? fuse.search(searchText).map((r) => r.item)
      : allResources;

    if (filtersParam) {
      const svc = filtersParam.split(",");
      list = list.filter((o) => svc.includes(o.Type_Of_Service ?? ""));
    }
    setFilteredResources(list);
  }, [allResources, searchText, filtersParam]);

  // handle live filter from SearchBar
  const handleFilter = ({ text }: { text?: string }) => {
    if (text === undefined) return;
    const p = new URLSearchParams(searchParams.toString());
    if (text) p.set("search", text);
    else p.delete("search");
    router.push(`/database?${p.toString()}`);
  };

  // Render
  return (
    <div className={styles.container}>
      <main className={styles.main} style={{ padding: "2rem" }}>
        <h1>LGBTQIA2S+ Resource Database</h1>
        <p>
          Welcome to the LGBTQIA2S+ resource database. Here, you will find
          resources in the Boston area.
        </p>

        {/* Search + filter UI */}
        <SearchBar onFilter={handleFilter} />

        {/* 0-results fallback */}
        {filteredResources.length === 0 ? (
          <div style={{ marginTop: "2rem" }}>
            <p>No resources matched your search.</p>
            <button
              onClick={() => router.push("/database")}
              className={styles.button}
            ></button>
          </div>
        ) : (
          <>
            <ResourceList resources={filteredResources} />
          </>
        )}
      </main>
    </div>
  );
}

// hooks/useOrgSearch.ts

/**
 * useOrgSearch
 * 
 * Custom React hook to provide fuzzy search for organizations.
 * Fetches all organizations from Firestore on mount, builds a Fuse.js index,
 * and exposes a query function for live search suggestions.
 */

import { useEffect, useMemo, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import Fuse from "fuse.js";
import { db } from "../../firebase/configfirebase"; // <-- adjust if alias differs

export interface OrgLite {
  id: string;
  name: string;
}

export function useOrgSearch() {
  const [orgs, setOrgs] = useState<OrgLite[]>([]);

  /* ───────────── fetch once on mount ───────────── */
  useEffect(() => {
    async function load() {
      console.log("[useOrgSearch] fetching Organizations …");
      try {
        const snap = await getDocs(collection(db, "Organizations"));
        const data = snap.docs.map(d => ({
          id: d.id,
          name: d.data().Organization_Name,
        }));
        console.log(`[useOrgSearch] fetched ${data.length} docs`);
        setOrgs(data);
      } catch (err) {
        console.error("[useOrgSearch] Firestore error:", err);
      }
    }
    load();
  }, []);

  /* ───────────── build Fuse index whenever list changes ───────────── */
  const fuse = useMemo(() => {
    console.log("[useOrgSearch] building Fuse index");
    return new Fuse(orgs, {
      keys: ["name"],
      threshold: 0.3,
      ignoreLocation: true,
      includeScore: true,        // easier to inspect
    });
  }, [orgs]);

  /* ───────────── public query fn ───────────── */
  function query(text: string): OrgLite[] {
    console.log(`[useOrgSearch] query("${text}")`);
    if (!text.trim()) return [];
    const hits = fuse
      .search(text)
      .slice(0, 10)
      .map((r) => r.item);
    console.log(`[useOrgSearch]  → ${hits.length} hits`);
    return hits;
  }

  return { query };
}
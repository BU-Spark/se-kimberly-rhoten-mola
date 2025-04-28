// components/SearchBar.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useOrgSearch, OrgLite } from "../hooks/useOrgSearch";
import s from "./SearchBar.module.css";
console.log("[SearchBar] CSS keys:", Object.keys(s));

export default function SearchBar() {
  const router = useRouter();
  const { query } = useOrgSearch();

  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState<OrgLite[]>([]);
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const showDropdown = open && text.trim().length;  // only after user types
  const boxRef = useRef<HTMLDivElement>(null);

  /* ---------- outside-click close ---------- */
  useEffect(() => {
    const close = (e: MouseEvent) =>
      boxRef.current &&
      !boxRef.current.contains(e.target as Node) &&
      setOpen(false);
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  /* ---------- input change ---------- */
  function handleChange(v: string) {
    console.log(`[SearchBar] handleChange "${v}"`);
    setText(v);
    setOpen(true);
    const hits = query(v);
    setSuggestions(hits);
    setHighlighted(0);
    console.log(`[SearchBar] suggestions set (${hits.length})`);
  }

  /* ---------- apply / go ---------- */
  function apply() {
    console.log("[SearchBar] apply() called with", text);
    if (!text.trim()) return;

    /* Example navigation; tweak for your filters */
    router.push(`/database?search=${encodeURIComponent(text.trim())}`);
    setOpen(false);
  }

  /* ---------- render ---------- */
  return (
    <div ref={boxRef} className={s.wrapper}>
      <div className={s.controls}>
        <input
          className={s.input}
          value={text}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (!open) return;
            switch (e.key) {
              case "ArrowDown":
                setHighlighted((h) => (h + 1) % suggestions.length);
                break;
              case "ArrowUp":
                setHighlighted(
                  (h - 1 + suggestions.length) % suggestions.length,
                );
                break;
              case "Enter":
                suggestions[highlighted] && setText(suggestions[highlighted].name);
                apply();
                break;
              case "Escape":
                setOpen(false);
                break;
            }
          }}
          placeholder="Start typing…"
        />
        <button className={s.button} onClick={apply}>SEARCH</button>
      </div>

      {open && (
        <ul role="listbox" className={s.listbox}>
          <li className={s.groupLabel}>Organizations</li>

          {suggestions.map((org, i) => (
            <li
              key={org.id}
              role="option"
              className={`${s.option} ${i === highlighted ? s.optionActive : ""}`}
              onMouseEnter={() => setHighlighted(i)}
              onMouseDown={(e) => {
                e.preventDefault();
                router.push(`/resource/${org.id}`);   // deep link
                setOpen(false);
              }}
            >
              {org.name}
            </li>
          ))}

          {text && (
            <li
              role="option"
              className={s.seeAll}
              onMouseDown={(e) => {
                e.preventDefault();
                router.push("/database");
                setOpen(false);
              }}
            >
              🔍 See all results for “{text}”
            </li>
          )}
        </ul>
      )}
    </div>
  );
}

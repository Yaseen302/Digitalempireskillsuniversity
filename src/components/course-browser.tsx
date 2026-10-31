"use client";
import { useState, useEffect } from "react";
import { Search, ArrowRight } from "lucide-react";
import { categories, courses } from "@/data/courses";
import { CourseCard } from "./ui";
export default function CourseBrowser() {
  const [category, setCategory] = useState("All courses");
  const [query, setQuery] = useState("");
  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("category");
    if (value && categories.includes(value)) setCategory(value);
  }, []);
  const filtered = courses.filter(
    (c) =>
      (category === "All courses" || category === c.category) &&
      (c.title + " " + c.description)
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <section className="section container">
      <div className="filter-bar">
        <div className="filters">
          {categories.map((c) => (
            <button
              className={category === c ? "selected" : ""}
              onClick={() => setCategory(c)}
              key={c}
            >
              {c}
            </button>
          ))}
        </div>
        <label className="search">
          <Search size={18} />
          <input
            placeholder="Find your next skill…"
            aria-label="Search courses"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </div>
      <p className="results" aria-live="polite">
        {filtered.length} learning paths to explore
      </p>
      <div className="featured-grid">
        {filtered.map((c) => (
          <CourseCard course={c} key={c.slug} />
        ))}
      </div>
      {!filtered.length && (
        <div className="empty-state">
          <h2>A different search could open a new door.</h2>
          <p>Try another keyword or explore all learning paths.</p>
          <button
            className="button"
            onClick={() => {
              setQuery("");
              setCategory("All courses");
            }}
          >
            Reset filters <ArrowRight size={16} />
          </button>
        </div>
      )}
    </section>
  );
}

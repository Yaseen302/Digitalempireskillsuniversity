"use client";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown, ArrowUpRight, ArrowRight, BookOpen } from "lucide-react";
import PlatformLogo from "./platform-logo";
export default function CourseMenu({
  active,
  onNavigate,
}: {
  active: boolean;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);
  const close = () => {
    setOpen(false);
    onNavigate();
  };
  return (
    <div
      className={`nav-course ${open ? "dropdown-open" : ""}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpen(false);
      }}
    >
      <div className="nav-course-trigger">
        <Link
          className={active ? "active" : ""}
          href="/courses"
          onClick={close}
        >
          Courses
        </Link>
        <button
          aria-label="Explore learning paths"
          aria-expanded={open}
          aria-controls="course-mega-menu"
          onClick={() => setOpen(!open)}
        >
          <ChevronDown size={12} />
        </button>
      </div>
      {open && (
        <div className="course-mega-menu" id="course-mega-menu">
          <div className="mega-heading">
            <div>
              <span className="eyebrow">WHAT WILL YOU BUILD NEXT?</span>
              <h3>Find your next advantage.</h3>
            </div>
            <BookOpen size={25} />
          </div>
          <div className="mega-platforms">
            {[
              ["shopify", "E-commerce essentials"],
              ["amazon", "Marketplace opportunities"],
              ["google", "Digital marketing"],
              ["etsy", "Creative commerce"],
            ].map(([platform, label]) => (
              <Link
                href={`/courses/${platform === "google" ? "google-ads" : platform}`}
                key={platform}
                onClick={close}
              >
                <PlatformLogo platform={platform} />
                <span>
                  {label}
                  <ArrowUpRight size={13} />
                </span>
              </Link>
            ))}
          </div>
          <Link href="/courses" className="mega-all" onClick={close}>
            Explore all learning paths <ArrowRight size={15} />
          </Link>
        </div>
      )}
    </div>
  );
}

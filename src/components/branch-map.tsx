"use client";
import { useState } from "react";
import { MapPin, ChevronDown, ChevronUp } from "lucide-react";
import { branches } from "@/data/site";
export default function BranchMap({
  branch,
}: {
  branch: (typeof branches)[number];
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="branch-map">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={`map-${branch.id}`}
      >
        <MapPin size={15} />
        {open ? "Hide map" : "Show branch map"}
        {open ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
      </button>
      {open && (
        <iframe
          id={`map-${branch.id}`}
          title={`${branch.name} address on Google Maps`}
          src={`https://www.google.com/maps?q=${encodeURIComponent(branch.address)}&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      )}
    </div>
  );
}

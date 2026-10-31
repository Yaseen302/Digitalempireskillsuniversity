"use client";
import { useState, useEffect, useRef } from "react";
import { X, ArrowUpRight } from "lucide-react";
import { branches, whatsappUrl } from "@/data/site";
export function WhatsAppIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.5 3.5A11.88 11.88 0 0 0 12.05 0C5.46 0 .1 5.36.1 11.95c0 2.1.55 4.15 1.6 5.96L0 24l6.25-1.64a11.94 11.94 0 0 0 5.8 1.48h.01C18.65 23.84 24 18.48 24 11.9c0-3.19-1.24-6.17-3.5-8.4ZM12.06 21.82a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.71.97.99-3.62-.24-.37a9.87 9.87 0 0 1-1.52-5.26c0-5.48 4.46-9.94 9.95-9.94a9.87 9.87 0 0 1 7.03 2.92 9.88 9.88 0 0 1 2.91 7.03c0 5.48-4.46 9.86-10.01 9.86Zm5.45-7.43c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.6.14-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.63-.93-2.23-.24-.58-.49-.5-.68-.51l-.58-.01c-.2 0-.53.07-.8.37-.28.3-1.05 1.03-1.05 2.51s1.07 2.91 1.22 3.11c.15.2 2.1 3.2 5.08 4.49.71.3 1.27.49 1.7.63.71.23 1.35.2 1.86.12.57-.09 1.77-.73 2.02-1.44.25-.71.25-1.32.17-1.45-.07-.13-.27-.2-.57-.35Z" />
    </svg>
  );
}
export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const outside = (e: PointerEvent) => {
      if (!box.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open]);
  return (
    <div className="whatsapp-widget" ref={box}>
      {open && (
        <section
          className="whatsapp-panel"
          id="whatsapp-branches"
          aria-label="Choose a WhatsApp branch"
        >
          <div className="whatsapp-panel-header">
            <WhatsAppIcon />
            <div>
              <strong>Let’s talk about your future.</strong>
              <span>Choose your Digital Empire branch</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close WhatsApp options"
            >
              <X size={18} />
            </button>
          </div>
          <div className="whatsapp-panel-body">
            <p>
              Have a course question? Start a conversation with our team on
              WhatsApp.
            </p>
            {branches.map((branch) => (
              <a
                key={branch.id}
                href={whatsappUrl(branch)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>
                  <strong>{branch.name}</strong>
                  <small>{branch.phone}</small>
                </span>
                <ArrowUpRight size={18} />
              </a>
            ))}
            <small>WhatsApp opens in a new tab. Response times may vary.</small>
          </div>
        </section>
      )}
      <button
        className="whatsapp-trigger"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="whatsapp-branches"
        aria-label={open ? "Close WhatsApp chat options" : "Chat on WhatsApp"}
      >
        {open ? <X size={25} /> : <WhatsAppIcon size={27} />}
        <span>Let’s talk</span>
      </button>
    </div>
  );
}

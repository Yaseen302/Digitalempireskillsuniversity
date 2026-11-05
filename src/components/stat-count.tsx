"use client";

import { useEffect, useRef } from "react";

const format = new Intl.NumberFormat("en");

export default function StatCount({ value, finalLabel }: { value: number; finalLabel: string }) {
  const number = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = number.current;
    if (!element || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      element.textContent = "100";

      function tick(now: number) {
        const progress = Math.min((now - start) / 1000, 1);
        if (progress === 1) {
          element!.textContent = finalLabel;
          return;
        }
        element!.textContent = format.format(Math.floor(100 + (value - 100) * progress));
        frame = requestAnimationFrame(tick);
      }

      frame = requestAnimationFrame(tick);
    });

    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, finalLabel]);

  return <><span className="sr-only">{finalLabel}</span><b ref={number} aria-hidden="true" className="font-inherit tabular-nums" style={{ fontWeight: "inherit" }}>{finalLabel}</b></>;
}

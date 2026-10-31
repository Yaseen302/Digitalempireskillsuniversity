"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Globe2,
  Crown,
  Play,
  Pause,
  Layers3,
  Sparkles,
} from "lucide-react";
export default function HeroScene() {
  const stage = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  function move(e: React.PointerEvent<HTMLDivElement>) {
    if (reduced || paused || e.pointerType === "touch") return;
    const rect = e.currentTarget.getBoundingClientRect();
    stage.current?.style.setProperty(
      "--tilt-x",
      `${((e.clientY - rect.top) / rect.height - 0.5) * -8}deg`,
    );
    stage.current?.style.setProperty(
      "--tilt-y",
      `${((e.clientX - rect.left) / rect.width - 0.5) * 10}deg`,
    );
  }
  function reset() {
    stage.current?.style.setProperty("--tilt-x", "0deg");
    stage.current?.style.setProperty("--tilt-y", "0deg");
  }
  return (
    <div
      className={`empire-scene ${paused ? "scene-paused" : ""}`}
      ref={stage}
      onPointerMove={move}
      onPointerLeave={reset}
    >
      <div className="scene-halo" aria-hidden="true" />
      <div className="scene-tilt">
        <div className="scene-artwork">
          <Image
            src="/images/empire-banner.webp"
            alt="Custom 3D Digital Empire banner with a gold crown, laptop and blue glass forms"
            fill
            priority
            sizes="(max-width: 760px) 100vw, 50vw"
          />
          <div className="scene-artwork-vignette" />
        </div>
        <div className="scene-orbit orbit-a" aria-hidden="true" />
        <div className="scene-orbit orbit-b" aria-hidden="true" />
        <div className="scene-label label-one">
          <span>
            <Crown size={18} />
          </span>
          <div>
            <strong>Build your own empire.</strong>
            <small>One practical skill at a time.</small>
          </div>
        </div>
        <div className="scene-label label-two">
          <span>
            <Globe2 size={20} />
          </span>
          <div>
            <strong>Local learning. Global ambition.</strong>
            <small>Karachi · A world of possibilities</small>
          </div>
          <ArrowUpRight size={17} />
        </div>
        <div className="scene-tile tile-commerce">
          <Layers3 size={21} />
          <span>E-commerce</span>
        </div>
        <div className="scene-tile tile-digital">
          <Sparkles size={19} />
          <span>Digital skills</span>
        </div>
        <div className="scene-plinth" aria-hidden="true" />
      </div>
      <div className="scene-caption">
        <span className="scene-live-dot" /> MADE FOR YOUR NEXT CHAPTER
      </div>
      <button
        className="scene-animation-toggle"
        onClick={() => {
          setPaused(!paused);
          reset();
        }}
        aria-pressed={paused}
        aria-label={paused ? "Play 3D animation" : "Pause 3D animation"}
      >
        {paused ? <Play size={13} /> : <Pause size={13} />}
        <span>{paused ? "Play motion" : "Pause motion"}</span>
      </button>
    </div>
  );
}

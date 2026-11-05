"use client";
import Image from "next/image";
import { useState } from "react";
import { Pause, Play, Sparkles } from "lucide-react";
export default function HeroScene({role="CEO & Founder of Digital Empire Skills University"}:{role?:string}) {
 const [paused, setPaused] = useState(false);
 const roleBreak = role.indexOf(" of ");
 const roleTitle = roleBreak === -1 ? role : role.slice(0, roleBreak + 3);
 const organization = roleBreak === -1 ? "" : role.slice(roleBreak + 4);
 return <div className={`empire-scene founder-scene ${paused ? "scene-paused" : ""}`}>
  <div className="founder-glow" aria-hidden="true" />
  <div className="founder-ring" aria-hidden="true" />
  <div className="founder-crown" aria-hidden="true"><div className="original-gold-crown" /></div>
  <div className="founder-image"><Image src="/images/ali-butt-cutout.png" alt="Ali Butt, CEO of Digital Empire Skills University" fill priority sizes="(max-width: 760px) 340px, 440px" /></div>
  <div className="founder-name"><span>THE VISION BEHIND THE EMPIRE</span><strong>Ali Butt</strong><p className="founder-role" style={{
    fontFamily: "Arial, Helvetica, sans-serif",
    fontSize: "clamp(14px, 1.25vw, 17px)",
    fontWeight: 700,
    lineHeight: 1.3,
    letterSpacing: "-0.02em",
   }}>
    {roleTitle}{organization && <><br />{organization}</>}
   </p></div>
  <div className="founder-seal"><Sparkles size={15} /><span>Learn. Lead. Build your empire.</span></div>
  <button className="scene-animation-toggle" onClick={()=>setPaused(!paused)} aria-pressed={paused} aria-label={paused ? "Play crown animation" : "Pause crown animation"}>{paused ? <Play size={13}/> : <Pause size={13}/>}<span>{paused ? "Play motion" : "Pause motion"}</span></button>
 </div>;
}


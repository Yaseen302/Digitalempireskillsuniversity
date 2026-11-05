"use client";
import { useState } from "react";
import { Pause, Play, TrendingUp } from "lucide-react";
import PlatformLogo from "./platform-logo";
import { SocialIcon } from "./social-links";
const platforms=["shopify","amazon","google","meta","etsy","ebay","youtube","walmart","tiktok-shop","aliexpress","alibaba","forex"];
function Brand({name}:{name:string}){
 if (name === "meta") {
   return (
     <span className="flex flex-col items-center gap-1">
       <span className="market-wordmark inline-flex items-center gap-2.5" style={{ color: "#17252e" }}>
       <svg width="54" height="36" viewBox="0 0 54 36" fill="none" aria-hidden="true">
         <path d="M27 14C22 7 19 4 14 4C7 4 3 14 3 23C3 29 5 32 9 32C15 32 19 24 27 14C33 6 36 4 41 4C48 4 51 14 51 23C51 29 49 32 45 32C39 32 34 24 27 14Z" stroke="#0866ff" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
       </svg>
       Meta
       </span>
       <span className="flex items-center gap-2.5" style={{ lineHeight: 1 }}>
         <span role="img" aria-label="Facebook" className="text-[#0866ff]"><SocialIcon name="Facebook" /></span>
         <span role="img" aria-label="Instagram" className="text-[#d62976]"><SocialIcon name="Instagram" /></span>
         <svg role="img" aria-label="WhatsApp" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#12854b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
           <path d="M3 21l1.3-4.6a9 9 0 1 1 3.4 3.4L3 21Z M9 8c-.7 0-1.3.7-1 2 .6 2.8 3.2 5.2 6 5.8 1.2.2 2-.6 2-1.3l-2.6-1.5-1 1c-1.4-.6-2.3-1.5-2.9-2.9l1-1L9 8Z" />
         </svg>
         <svg role="img" aria-label="Messenger" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#0866ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
           <path d="M3 11.5a9 9 0 1 1 5 8L4 21v-4.5a8 8 0 0 1-1-5Z M7.5 14l3-4 3 2 3-2" />
         </svg>
         <svg role="img" aria-label="Threads" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#17252e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
           <path d="M19.5 8.5C18.8 4.7 16 3 12 3c-5.2 0-8 3.4-8 9s2.8 9 8 9c4.3 0 7-2.1 7-5.2 0-2.8-2.2-4.3-5.7-4.3-2.8 0-4.3 1.1-4.3 2.8 0 1.4 1.1 2.2 2.5 2.2 2.7 0 4-2.1 4-5 0-3-1.3-4.5-3.6-4.5-1.3 0-2.4.5-3.2 1.5" />
         </svg>
       </span>
     </span>
   );
 }
 if(name==="forex")return <span className="market-wordmark forex-wordmark"><TrendingUp aria-hidden="true"/>Forex Trading</span>;
 if(name==="tiktok-shop")return <span className="market-wordmark tiktok-wordmark"><PlatformLogo platform="tiktok"/><b>Shop</b></span>;
 if(name==="aliexpress")return <span className="market-wordmark aliexpress-wordmark">Ali<span>Express</span></span>;
 if(name==="alibaba")return <span className="market-wordmark alibaba-wordmark">Alibaba<span>.com</span></span>;
 return <PlatformLogo platform={name}/>;
}
export default function PlatformMarquee(){
 const [paused,setPaused]=useState(false);
 return <section className={`marketplace-marquee ${paused?"marquee-paused":""}`} aria-label="Platforms and skills we teach">
 <div className="marketplace-window"><div className="marketplace-track">{[0,1].map(copy=><div className="marketplace-group" key={copy} aria-hidden={copy===1?true:undefined}>{platforms.map(name=><div className="marketplace-logo" key={name}><Brand name={name}/></div>)}</div>)}</div></div>
 <button className="marquee-toggle" onClick={()=>setPaused(!paused)} aria-pressed={paused} aria-label={paused?"Play platform marquee":"Pause platform marquee"}>{paused?<Play size={14}/>:<Pause size={14}/>}</button></section>;
}

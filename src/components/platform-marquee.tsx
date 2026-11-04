"use client";
import { useState } from "react";
import { Pause, Play, TrendingUp } from "lucide-react";
import PlatformLogo from "./platform-logo";
const platforms=["shopify","amazon","google","etsy","ebay","youtube","walmart","tiktok-shop","aliexpress","alibaba","forex"];
function Brand({name}:{name:string}){
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

"use client";
import {useEffect,useState,useRef} from "react";
import {usePathname} from "next/navigation";
const preferenceKey="de-analytics-choice";
export function AnalyticsPreferences(){return <button type="button" className="analytics-preferences" onClick={()=>window.dispatchEvent(new Event("de-analytics-preferences"))}>Change analytics preference</button>;}
export default function TrafficTracker(){
 const path=usePathname(),[choice,setChoice]=useState<string|null>(null),[open,setOpen]=useState(false);const sent=useRef("");
 useEffect(()=>{let selected="declined";try{selected=localStorage.getItem(preferenceKey)||"";}catch{}const privacy=navigator.doNotTrack==="1"||(navigator as Navigator&{globalPrivacyControl?:boolean}).globalPrivacyControl===true;if(privacy)selected="declined";setChoice(selected);setOpen(!selected);const show=()=>setOpen(true);window.addEventListener("de-analytics-preferences",show);return()=>window.removeEventListener("de-analytics-preferences",show);},[]);
 useEffect(()=>{if(choice!=="allowed"||!path||path.startsWith("/admin")||path.startsWith("/api")||window.top!==window.self||new URLSearchParams(location.search).has("cmsPreview"))return;
 let id="";try{const prev=JSON.parse(sessionStorage.getItem("de-visit")||"null");id=prev&&Date.now()-prev.time<1800000?prev.id:crypto.randomUUID();sessionStorage.setItem("de-visit",JSON.stringify({id,time:Date.now()}));}catch{return;}
 const source=(()=>{const utm=new URLSearchParams(location.search).get("utm_source");if(utm&&/^[a-zA-Z0-9_.-]{1,60}$/.test(utm))return utm.toLowerCase();try{const u=new URL(document.referrer);return u.hostname===location.hostname?"Direct":u.hostname;}catch{return "Direct";}})();
 const send=(type:string)=>{if(document.visibilityState!=="visible")return;fetch("/api/analytics/collect",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:crypto.randomUUID(),session:id,type,path,source}),keepalive:true}).catch(()=>{});};
 const view=()=>{const key=id+":"+path;if(sent.current!==key){sent.current=key;send("pageview");}};
 if(document.visibilityState==="visible")view();
 const visible=()=>{if(document.visibilityState==="visible"){view();send("heartbeat");}};document.addEventListener("visibilitychange",visible);
 const timer=setInterval(()=>send("heartbeat"),60000);
 const click=(e:MouseEvent)=>{const link=(e.target as Element)?.closest?.("a[href]");if(!link)return;try{const host=new URL(link.getAttribute("href")||"",location.href).hostname;if(["wa.me","api.whatsapp.com","web.whatsapp.com"].includes(host))send("whatsapp");}catch{}};
 document.addEventListener("click",click);return()=>{clearInterval(timer);document.removeEventListener("click",click);document.removeEventListener("visibilitychange",visible);};
 },[choice,path]);
 const decide=(v:string)=>{try{localStorage.setItem(preferenceKey,v);}catch{}setChoice(v);setOpen(false);};
 if(!open||path?.startsWith("/admin")||typeof window!=="undefined"&&window.top!==window.self)return null;
 return <aside className="analytics-consent" aria-label="Analytics preference"><strong>Help us improve your experience</strong><p>Allow basic visit analytics: pages, device type and approximate city/country. No advertising pixels.</p><div><button onClick={()=>decide("declined")}>No thanks</button><button onClick={()=>decide("allowed")}>Allow analytics</button><a href="/privacy">Privacy</a></div></aside>;
}

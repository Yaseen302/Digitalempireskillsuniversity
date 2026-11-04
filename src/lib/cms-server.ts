import "server-only";
import {createClient} from "@supabase/supabase-js";
import {cookies} from "next/headers";
import {unstable_cache} from "next/cache";
import {defaultContent,validateContent, type SiteContent} from "./cms-model";
export function database(){const url=process.env.SUPABASE_URL,key=process.env.SUPABASE_SERVICE_ROLE_KEY;if(!url||!key)throw Error("Database is not configured");return createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});}
export function configured(){return !!(process.env.SUPABASE_URL&&process.env.SUPABASE_SERVICE_ROLE_KEY&&process.env.ADMIN_EMAILS);}
export function allowed(email?:string){return !!email&& (process.env.ADMIN_EMAILS||"").split(",").map(s=>s.trim().toLowerCase()).includes(email.toLowerCase());}
export async function adminUser(){const jar=await cookies(),token=jar.get("de_admin")?.value;if(!token)return null;try{const {data,error}=await database().auth.getUser(token);return !error&&allowed(data.user?.email)?data.user:null;}catch{return null;}}
const cachedContent=unstable_cache(async()=>{try{const {data,error}=await database().from("site_content").select("published").eq("id","homepage").single();if(error||!data?.published)return defaultContent;return validateContent(data.published);}catch{return defaultContent;}},["homepage-cms-v1"],{tags:["site-content"],revalidate:60});
export async function publishedContent():Promise<SiteContent>{return cachedContent();}
export async function pageContent(preview=false){if(preview&&await adminUser()){const{data}=await database().from("site_content").select("draft").eq("id","homepage").single();return data?.draft?validateContent(data.draft):defaultContent;}return publishedContent();}

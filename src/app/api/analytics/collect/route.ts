import {NextRequest,NextResponse} from "next/server";
import {createHmac} from "node:crypto";
import {adminUser,database} from "@/lib/cms-server";
export const runtime="nodejs";
const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
export async function POST(req:NextRequest){
 let sameOrigin=false;try{const u=new URL(req.headers.get("origin")||"");sameOrigin=["https:","http:"].includes(u.protocol)&&u.host===req.headers.get("host");}catch{}if(!sameOrigin)return new NextResponse(null,{status:403});
 if(req.headers.get("dnt")==="1"||req.headers.get("sec-gpc")==="1")return new NextResponse(null,{status:204});
 if(/bot|crawler|spider|headless|slurp|preview|lighthouse/i.test(req.headers.get("user-agent")||""))return new NextResponse(null,{status:204});
 if(req.cookies.has("de_admin")&&await adminUser())return new NextResponse(null,{status:204});
 const raw=await req.text();if(raw.length>2000)return new NextResponse(null,{status:413});
 let v;try{v=JSON.parse(raw);}catch{return new NextResponse(null,{status:400});}
 if(!v||!uuid.test(v.id)||!uuid.test(v.session)||!["pageview","heartbeat","whatsapp"].includes(v.type)||typeof v.path!=="string"||!/^\/(?!\/)/.test(v.path)||v.path.length>300||/[?#\x00-\x1f]/.test(v.path)||/^\/(admin|api)(\/|$)/.test(v.path))return new NextResponse(null,{status:400});
 let source=typeof v.source==="string"&&/^[a-zA-Z0-9_.-]{1,100}$/.test(v.source)?v.source:"Direct";
 const ua=req.headers.get("user-agent")||"",device=/iPad|Tablet/i.test(ua)?"Tablet":/Mobile|Android|iPhone/i.test(ua)?"Mobile":"Desktop";
 function clean(value:string|null){try{return decodeURIComponent(value||"").replace(/[\x00-\x1f]/g,"").slice(0,100)||"Unknown";}catch{return "Unknown";}}
 const trusted=process.env.VERCEL==="1";const country=trusted?clean(req.headers.get("x-vercel-ip-country")):"Unknown",city=trusted?clean(req.headers.get("x-vercel-ip-city")):"Unknown";
 const ip=trusted?(req.headers.get("x-vercel-forwarded-for")||req.headers.get("x-forwarded-for")||"unknown").split(",")[0]:"local";
 const day=new Date().toISOString().slice(0,10);const key=process.env.SUPABASE_SERVICE_ROLE_KEY;if(!key)return new NextResponse(null,{status:503});
 const rateHash=createHmac("sha256",key).update(day+":"+ip).digest("hex");
 try{const{error}=await database().rpc("record_site_analytics",{payload:{id:v.id,session:v.session,type:v.type,path:v.path,source,device,country,city,rate_hash:rateHash}});return new NextResponse(null,{status:error?503:204});}catch{return new NextResponse(null,{status:503});}
}

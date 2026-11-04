import {NextRequest,NextResponse} from "next/server";
import {adminUser,allowed,configured,database} from "@/lib/cms-server";
export const runtime="nodejs";
function originOK(req:NextRequest){return req.headers.get("origin")===new URL(req.url).origin;}
export async function GET(){const user=await adminUser();return NextResponse.json({authenticated:!!user,email:user?.email,configured:configured()},{headers:{"Cache-Control":"no-store"}});}
export async function POST(req:NextRequest){
 if(!originOK(req))return NextResponse.json({error:"Invalid origin"},{status:403});
 if(!configured())return NextResponse.json({error:"Admin setup is incomplete. Configure Supabase and ADMIN_EMAILS in Vercel."},{status:503});
 const raw=await req.text();if(raw.length>2000)return NextResponse.json({error:"Invalid request"},{status:400});let body;try{body=JSON.parse(raw);}catch{return NextResponse.json({error:"Invalid request"},{status:400});}
 if(typeof body.email!=="string"||typeof body.password!=="string"||!allowed(body.email))return NextResponse.json({error:"Invalid email or password."},{status:401});
 const db=database();const{data,error}=await db.auth.signInWithPassword({email:body.email,password:body.password});
 if(error||!data.session||!allowed(data.user?.email))return NextResponse.json({error:"Invalid email or password."},{status:401});
 const res=NextResponse.json({ok:true});res.cookies.set("de_admin",data.session.access_token,{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"strict",path:"/",maxAge:data.session.expires_in});return res;
}
export async function DELETE(req:NextRequest){if(!originOK(req))return NextResponse.json({error:"Invalid origin"},{status:403});const res=NextResponse.json({ok:true});res.cookies.set("de_admin","",{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"strict",path:"/",maxAge:0});return res;}

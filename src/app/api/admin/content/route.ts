import {NextRequest,NextResponse} from "next/server";
import {adminUser,database} from "@/lib/cms-server";
import {defaultContent,validateContent} from "@/lib/cms-model";
import {revalidateTag} from "next/cache";
export const runtime="nodejs";
export async function GET(){if(!await adminUser())return NextResponse.json({error:"Sign in required"},{status:401});const {data,error}=await database().from("site_content").select("*").eq("id","homepage").single();if(error)return NextResponse.json({error:"CMS tables are not ready. Run supabase/admin-cms.sql."},{status:503});return NextResponse.json({draft:data.draft||defaultContent,published:data.published||defaultContent,version:data.version,publishedAt:data.published_at},{headers:{"Cache-Control":"no-store"}});}
export async function PUT(req:NextRequest){
 if(req.headers.get("origin")!==new URL(req.url).origin)return NextResponse.json({error:"Invalid origin"},{status:403});
 if(!await adminUser())return NextResponse.json({error:"Session expired. Sign in again."},{status:401});
 const raw=await req.text();if(raw.length>350000)return NextResponse.json({error:"Content too large"},{status:413});
 try{const body=JSON.parse(raw),draft=validateContent(body.draft);if(!Number.isSafeInteger(body.version)||!["save","publish"].includes(body.action))throw Error("Invalid request");
 const update:Record<string,unknown>={draft,version:body.version+1,updated_at:new Date().toISOString()};if(body.action==="publish"){update.published=draft;update.published_at=new Date().toISOString();}
 const {data,error}=await database().from("site_content").update(update).eq("id","homepage").eq("version",body.version).select("version,published_at").maybeSingle();
 if(error)return NextResponse.json({error:"Could not save content."},{status:500});if(!data)return NextResponse.json({error:"Another editor changed this page. Reload before saving."},{status:409});if(body.action==="publish")revalidateTag("site-content",{expire:0});return NextResponse.json({ok:true,version:data.version,publishedAt:data.published_at});
 }catch{return NextResponse.json({error:"Content is invalid. Check section fields and limits."},{status:400});}
}

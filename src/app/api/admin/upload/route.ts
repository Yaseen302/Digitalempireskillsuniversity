import {NextRequest,NextResponse} from "next/server";import {adminUser,database} from "@/lib/cms-server";import {randomUUID} from "node:crypto";
export const runtime="nodejs";
export async function POST(req:NextRequest){
 if(req.headers.get("origin")!==new URL(req.url).origin)return NextResponse.json({error:"Invalid origin"},{status:403});if(!await adminUser())return NextResponse.json({error:"Sign in required"},{status:401});
 if(Number(req.headers.get("content-length")||0)>4300000)return NextResponse.json({error:"Maximum image size is 4 MB."},{status:413});
 const form=await req.formData();const file=form.get("file");if(!(file instanceof File)||file.size>4*1024*1024||file.size===0)return NextResponse.json({error:"Choose an image smaller than 4 MB."},{status:400});
 const bytes=Buffer.from(await file.arrayBuffer());let ext="";if(bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])))ext="png";else if(bytes[0]===255&&bytes[1]===216&&bytes[2]===255)ext="jpg";else if(bytes.toString("ascii",0,4)==="RIFF"&&bytes.toString("ascii",8,12)==="WEBP")ext="webp";if(!ext)return NextResponse.json({error:"Only PNG, JPEG and WebP images are supported."},{status:400});
 const db=database(),path=`gallery/${randomUUID()}.${ext}`;const{error}=await db.storage.from("site-media").upload(path,bytes,{contentType:ext==="jpg"?"image/jpeg":`image/${ext}`,cacheControl:"31536000",upsert:false});if(error)return NextResponse.json({error:"Upload failed. Confirm the site-media storage bucket."},{status:500});const{data}=db.storage.from("site-media").getPublicUrl(path);return NextResponse.json({id:randomUUID(),url:data.publicUrl,alt:file.name.replace(/\.[^.]+$/,"")});
}

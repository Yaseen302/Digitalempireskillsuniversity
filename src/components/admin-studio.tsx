"use client";
import { courses } from "@/data/courses";
import { courseVideoSource } from "@/lib/course-video";
import AdminAnalytics from "./admin-analytics";
import {useEffect,useState,useRef} from "react";
import {defaultContent,sectionLabels,type SiteContent,type Block} from "@/lib/cms-model";
import {LayoutDashboard,PanelsTopLeft,Inbox,Images,Star,Settings,Plus,GripVertical,ArrowUp,ArrowDown,Eye,EyeOff,Save,Upload,Trash2,LogOut,Monitor,Smartphone,Search,CheckCircle2,ExternalLink,Menu} from "lucide-react";
type Lead={id:string;created_at:string;kind:string;name:string;email:string;phone:string;subject:string;message:string;course:string;country:string;status:string};
export default function AdminStudio(){
const [videoCourse, setVideoCourse] = useState("shopify");
const [successVideoUrl, setSuccessVideoUrl] = useState("");
const [showPassword, setShowPassword] = useState(false);
const[auth,setAuth]=useState<boolean|null>(null),[configured,setConfigured]=useState(true),[email,setEmail]=useState(""),[password,setPassword]=useState(""),[tab,setTab]=useState("overview"),[content,setContent]=useState<SiteContent>(defaultContent),[version,setVersion]=useState(0),[publishedAt,setPublishedAt]=useState<string|null>(null),[selected,setSelected]=useState("hero"),[busy,setBusy]=useState(false),[notice,setNotice]=useState(""),[error,setError]=useState(""),[dirty,setDirty]=useState(false),[ready,setReady]=useState(false),[leads,setLeads]=useState<Lead[]>([]),[query,setQuery]=useState(""),[mobile,setMobile]=useState(false),[preview,setPreview]=useState(0),[addType,setAddType]=useState("text");
const[design,setDesign]=useState(false);
const drag=useRef<string|null>(null);const fileRef=useRef<HTMLInputElement>(null);
async function request(path:string,options?:RequestInit){const res=await fetch(path,{...options,headers:{"Content-Type":"application/json",...options?.headers}});const data=await res.json();if(res.status===401){setAuth(false);setReady(false);}if(!res.ok)throw Error(data.error||"Request failed");return data;}
async function load(){setError("");try{const data=await request("/api/admin/content");setContent(data.draft);setVersion(data.version);setPublishedAt(data.publishedAt);setDirty(false);setReady(true);}catch(e){setError((e as Error).message);}}
async function inbox(){try{const data=await request("/api/admin/inquiries");setLeads(data.inquiries);}catch(e){setError((e as Error).message);}}
useEffect(()=>{if(new URLSearchParams(window.location.search).get("design")==="1"){setDesign(true);setAuth(true);return;}fetch("/api/admin/session").then(r=>r.json()).then(d=>{setAuth(d.authenticated);setConfigured(d.configured);if(d.email)setEmail(d.email);}).catch(()=>{setAuth(false);setError("Could not connect to the admin service.");});},[]);
useEffect(()=>{if(auth&&!design){load();inbox();}},[auth,design]);
useEffect(()=>{if(!auth||design||tab!=="inbox")return;const timer=setInterval(inbox,15000);return()=>clearInterval(timer);},[auth,tab,design]);
useEffect(()=>{function warn(e:BeforeUnloadEvent){if(dirty){e.preventDefault();e.returnValue="";}}window.addEventListener("beforeunload",warn);return()=>window.removeEventListener("beforeunload",warn);},[dirty]);
function change(next:SiteContent){setContent(next);setDirty(true);setNotice("");}
function update(key:keyof SiteContent,value:unknown){change({...content,[key]:value});}
function blockUpdate(id:string,value:Partial<Block>){change({...content,sections:content.sections.map(b=>b.id===id?{...b,...value}:b)});}
function move(id:string,to:number){const arr=[...content.sections],index=arr.findIndex(b=>b.id===id);if(index<0||to<0||to>=arr.length)return;const [block]=arr.splice(index,1);arr.splice(to,0,block);change({...content,sections:arr});}
async function save(action:"save"|"publish"){
  const invalidVideo = courses.find(course => {
    const url = content.courseVideos[course.slug]?.trim();
    return url && !courseVideoSource(url);
  });
  if (invalidVideo) {
    setError(`Enter a supported video link for ${invalidVideo.title}.`);
    setVideoCourse(invalidVideo.slug);
    setTab("course-videos");
    return;
  }
  setBusy(true);setError("");setNotice("");try{const d=await request("/api/admin/content",{method:"PUT",body:JSON.stringify({draft:content,version,action})});setVersion(d.version);setPublishedAt(d.publishedAt);setDirty(false);setNotice(action==="publish"?"Published. The website now uses this version.":"Draft saved. Preview is ready.");setPreview(Date.now());}catch(e){setError((e as Error).message);}finally{setBusy(false);}}
async function upload(file:File, destination:"gallery"|"successPhotos" = "gallery"){setBusy(true);setError("");try{if(!["image/png","image/jpeg","image/webp"].includes(file.type)||file.size>12*1024*1024)throw Error("Choose a PNG, JPEG or WebP image under 12 MB.");const bitmap=await createImageBitmap(file);const scale=Math.min(1,1800/Math.max(bitmap.width,bitmap.height));const canvas=document.createElement("canvas");canvas.width=Math.round(bitmap.width*scale);canvas.height=Math.round(bitmap.height*scale);const ctx=canvas.getContext("2d");if(!ctx)throw Error("Image processing is unavailable.");ctx.drawImage(bitmap,0,0,canvas.width,canvas.height);bitmap.close();const blob=await new Promise<Blob>((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(Error("Could not optimize image.")),"image/webp",.84));const optimized=new File([blob],file.name.replace(/\.[^.]+$/,"")+".webp",{type:"image/webp"});const form=new FormData();form.append("file",optimized);const res=await fetch("/api/admin/upload",{method:"POST",body:form});const d=await res.json();if(!res.ok)throw Error(d.error);change({...content,[destination]:[...content[destination],d]});setNotice(destination === "successPhotos" ? "Screenshot uploaded. Publish to show it on Student Success." : "Image uploaded. Add a Gallery section and publish to show it.");}catch(e){setError((e as Error).message);}finally{setBusy(false);}}
function field(label:string,key:keyof SiteContent,multi=false){return <label className="cms-field">{label}{multi?<textarea rows={5} value={String(content[key])} onChange={e=>update(key,e.target.value)}/>:<input value={String(content[key])} onChange={e=>update(key,e.target.value)}/>}</label>;}
const block=content.sections.find(b=>b.id===selected);
if(auth===null)return <div className="cms-loading">Opening Digital Empire Studio…</div>;
if(!auth)return <div className="cms-login"><div className="cms-login-brand">DE<span>DIGITAL EMPIRE<br/><b>CONTENT STUDIO</b></span></div><form onSubmit={async e=>{e.preventDefault();setBusy(true);setError("");try{await request("/api/admin/session",{method:"POST",body:JSON.stringify({email,password})});setPassword("");setShowPassword(false);setAuth(true);}catch(e){setError((e as Error).message);}finally{setBusy(false);}}}><span className="cms-kicker">YOUR WEBSITE. YOUR WORKSPACE.</span><h1>Welcome back.</h1><p>Sign in to manage your website, content and admissions.</p>{!configured&&<div className="cms-alert">Setup required: connect Supabase, run the CMS migration and configure the allowed admin email in Vercel. Login remains disabled until setup is complete.</div>}{error&&<div role="alert" className="cms-alert">{error}</div>}<label className="cms-field">Email<input type="email" autoComplete="username" required value={email} onChange={e=>setEmail(e.target.value)}/></label><div className="cms-field">
  <label htmlFor="studio-password">Password</label>
  <div style={{ position: "relative" }}>
    <input id="studio-password" type={showPassword ? "text" : "password"} autoComplete="current-password"
      required value={password} onChange={e => setPassword(e.target.value)}
      style={{ width: "100%", paddingInlineEnd: 46 }} />
    <button type="button" aria-label={showPassword ? "Hide password" : "Show password"}
      aria-controls="studio-password" onClick={() => setShowPassword(visible => !visible)}
      style={{ position: "absolute", insetBlock: 0, insetInlineEnd: 0, width: 44, display: "grid", placeItems: "center", color: "#52627a", background: "transparent", border: 0, cursor: "pointer" }}>
      {showPassword ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
    </button>
  </div>
</div><button className="cms-primary" disabled={busy||!configured}>{busy?"Signing in…":"Sign in to your studio"}</button><a href="/">Back to website <ExternalLink size={14}/></a><small>Admin accounts are created in your Supabase project. Public sign-up is disabled here.</small></form><div className="cms-login-footer">Digital Empire Skills University · Karachi</div></div>;
return <div className="cms-shell"><aside className="cms-sidebar"><a className="cms-brand" href="/admin"><span>DE</span><div>Digital Empire<small>Website studio</small></div></a><div className="cms-store"><span className="cms-store-dot"/>University website<small>Vercel production</small></div><nav>{[["overview",LayoutDashboard,"Overview"],["editor",PanelsTopLeft,"Page editor"],["analytics",Eye,"Analytics"],["inbox",Inbox,"Form inbox"],["gallery",Images,"Gallery"],["success-stories",Star,"Success Stories"],["course-videos",Monitor,"Course videos"],["reviews",Star,"Reviews"],["settings",Settings,"Settings"]].map(([id,Icon,label])=>{const I=Icon as typeof Inbox;return <button key={String(id)} className={tab===id?"active":""} onClick={()=>{setTab(String(id));setError("");}}><I size={18}/>{String(label)}{id==="inbox"&&leads.filter(l=>l.status==="new").length>0&&<b>{leads.filter(l=>l.status==="new").length}</b>}</button>})}</nav><div className="cms-sidebar-bottom"><a href="/" target="_blank" rel="noopener noreferrer"><ExternalLink size={16}/> View website</a><button onClick={async()=>{try{await request("/api/admin/session",{method:"DELETE"});setAuth(false);setContent(defaultContent);setLeads([]);}catch(e){setError((e as Error).message);}}}><LogOut size={16}/> Sign out</button></div></aside>
<div className="cms-workspace"><header className="cms-topbar"><div><span className="cms-breadcrumb">Digital Empire /</span><b>{tab==="editor"?"Homepage":tab.charAt(0).toUpperCase()+tab.slice(1)}</b><span className={dirty?"cms-status dirty":"cms-status"}>{dirty?"Unsaved changes":"Saved"}</span></div><div className="cms-top-actions"><button disabled={busy||!ready} onClick={()=>save("save")}><Save size={15}/>Save draft</button><button className="cms-primary" disabled={busy||!ready} onClick={()=>save("publish")}><Upload size={15}/>{busy?"Working…":"Publish"}</button></div></header>
{design&&<div className="cms-notice" role="status">Design preview only. Changes in this preview are temporary; saving, publishing, uploads and inbox require the connected admin account.</div>}{error&&<div className="cms-alert" role="alert">{error}</div>}{notice&&<div className="cms-notice" role="status"><CheckCircle2 size={16}/>{notice}</div>}
{tab==="analytics"&&<AdminAnalytics design={design}/>}
{tab==="overview"&&<main className="cms-main"><div className="cms-page-heading"><div><span className="cms-kicker">YOUR WORKSPACE</span><h1>Make your next update.</h1><p>Manage your content, follow up with learners and keep your website fresh.</p></div><button className="cms-primary" onClick={()=>setTab("editor")}><PanelsTopLeft size={16}/>Customize homepage</button></div><div className="cms-metrics">{[[content.sections.filter(b=>b.enabled).length,"Enabled sections"],[content.gallery.length,"Gallery photos"],[content.reviews.length,"Reviews"],[leads.filter(l=>l.status==="new").length,"New inquiries"]].map(([n,l])=><div key={l}><span>{l}</span><strong>{n}</strong></div>)}</div><div className="cms-overview-grid"><section className="cms-card"><h2>Your homepage, in your hands.</h2><p>Drag sections into order, edit your banner and About Us, and add photo galleries or reviews. Save a draft before publishing.</p><div className="cms-mini-blocks">{content.sections.filter(b=>b.enabled).slice(0,6).map(b=><div key={b.id}><GripVertical size={15}/>{sectionLabels[b.type]}</div>)}</div><button onClick={()=>setTab("editor")}>Open page editor →</button></section><section className="cms-card"><h2>Publishing checklist</h2><ul className="cms-checklist"><li><CheckCircle2/>Review your copy and images</li><li><CheckCircle2/>Use genuine, attributed reviews</li><li><CheckCircle2/>Save and preview your draft</li><li><CheckCircle2/>Publish when you are ready</li></ul><p>Last published: {publishedAt?new Date(publishedAt).toLocaleString():"No CMS version published yet"}</p><small>Existing website content stays visible until your first publish.</small></section></div></main>}
{tab==="editor"&&<div className="cms-editor"><section className="cms-sections"><div className="cms-panel-title"><h2>Homepage sections</h2><span>{content.sections.length}</span></div><p className="cms-help">Drag to reorder. Use arrows on touch or keyboard.</p><div className="cms-block-list">{content.sections.map((b,i)=><div key={b.id} className={selected===b.id?"cms-block selected":"cms-block"} draggable onDragStart={()=>{drag.current=b.id;}} onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();if(drag.current)move(drag.current,i);drag.current=null;}}><button className="cms-block-name" onClick={()=>setSelected(b.id)}><GripVertical size={15}/><span>{b.title||sectionLabels[b.type]}<small>{b.enabled?"Visible":"Hidden"}</small></span></button><div className="cms-order"><button aria-label={`Move ${sectionLabels[b.type]} up`} disabled={i===0} onClick={()=>move(b.id,i-1)}><ArrowUp size={13}/></button><button aria-label={`Move ${sectionLabels[b.type]} down`} disabled={i===content.sections.length-1} onClick={()=>move(b.id,i+1)}><ArrowDown size={13}/></button></div></div>)}</div><div className="cms-add"><select aria-label="Section type to add" value={addType} onChange={e=>setAddType(e.target.value)}><option value="text">Text section</option><option value="gallery">Photo gallery</option><option value="reviews">Student reviews</option></select><button disabled={!ready&&!design} onClick={()=>{const id=crypto.randomUUID();change({...content,sections:[...content.sections,{id,type:addType,enabled:true,title:sectionLabels[addType],text:"",image:""}]});setSelected(id);}}><Plus size={15}/>Add section</button></div></section>
<section className="cms-preview-area"><div className="cms-preview-toolbar"><span>Saved draft preview</span><div><button aria-label="Desktop preview" onClick={()=>setMobile(false)} className={!mobile?"active":""}><Monitor size={16}/></button><button aria-label="Mobile preview" onClick={()=>setMobile(true)} className={mobile?"active":""}><Smartphone size={16}/></button><button onClick={()=>{setPreview(Date.now());}} aria-label="Refresh saved preview"><Eye size={16}/></button></div></div><div className={mobile?"cms-preview-frame mobile":"cms-preview-frame"}><iframe key={preview} src={"/?cmsPreview=1&v="+preview} title="Saved homepage draft preview"/></div><p>Save draft to update this preview. Publish to update the public website.</p></section>
<aside className="cms-inspector">{block?<><div className="cms-panel-title"><h2>{sectionLabels[block.type]}</h2></div><label className="cms-toggle"><input type="checkbox" checked={block.enabled} onChange={e=>blockUpdate(block.id,{enabled:e.target.checked})}/>Show section</label>{block.type==="hero"?<>{field("Heading","heroTitle")}{field("Highlighted line","heroAccent")}{field("Description","heroText",true)}{field("Founder title","founderRole")}</>:block.type==="about"?<>{field("Heading","aboutTitle")}{field("About text","aboutText",true)}</>:["text","gallery","reviews"].includes(block.type)?<><label className="cms-field">Heading<input value={block.title} onChange={e=>blockUpdate(block.id,{title:e.target.value})}/></label><label className="cms-field">Description<textarea value={block.text} rows={5} onChange={e=>blockUpdate(block.id,{text:e.target.value})}/></label>{block.type==="text"&&<label className="cms-field">Image<select value={block.image} onChange={e=>blockUpdate(block.id,{image:e.target.value})}><option value="">No image</option>{content.gallery.map(m=><option value={m.url} key={m.id}>{m.alt||m.id}</option>)}</select></label>}{block.type==="gallery"&&<p className="cms-help">Photos are managed in Gallery. This block displays all gallery images.</p>}{block.type==="reviews"&&<p className="cms-help">Review entries are managed in Reviews. This block displays your published collection.</p>}<button className="cms-danger" onClick={()=>{change({...content,sections:content.sections.filter(b=>b.id!==block.id)});setSelected("hero");}}><Trash2 size={14}/>Remove section</button></>:<p className="cms-help">This built-in section can be moved or hidden. Its custom layout is preserved.</p>}</>:<p>Select a section to edit.</p>}</aside></div>}
{tab==="course-videos" && (
  <main className="cms-main">
    <div className="cms-page-heading"><div><h1>Course videos</h1><p>Choose a course and add a public YouTube video or a direct HTTPS MP4 or WebM link. Click Publish to show it on the course page.</p></div></div>
    <section className="cms-card">
      <label>Course
        <select value={videoCourse} onChange={event => setVideoCourse(event.target.value)}>
          {courses.map(course => <option key={course.slug} value={course.slug}>{course.title}</option>)}
        </select>
      </label>
      <label>Video link
        <input type="url" value={content.courseVideos[videoCourse] ?? ""} disabled={!ready || busy} onChange={event => change({
          ...content,
          courseVideos: { ...content.courseVideos, [videoCourse]: event.target.value },
        })} />
      </label>
      {content.courseVideos[videoCourse]?.trim() && !courseVideoSource(content.courseVideos[videoCourse]) && (
        <p className="cms-help">Use a public YouTube link or an HTTPS link ending in .mp4 or .webm.</p>
      )}
      <p className="cms-help">Clear the link and publish to remove the video.</p>
    </section>
  </main>
)}
{tab==="success-stories" && (
  <main className="cms-main">
    <div className="cms-page-heading">
      <div><h1>Success Stories</h1><p>Add WhatsApp screenshots and student videos here, then click Publish.</p></div>
      <a className="cms-secondary" href="/student-success" target="_blank" rel="noopener noreferrer">View Student Success</a>
    </div>
    <section className="cms-card">
      <h2>WhatsApp screenshots</h2>
      <label className="cms-field">Upload a screenshot
        <input type="file" accept="image/png,image/jpeg,image/webp" disabled={!ready || busy || content.successPhotos.length >= 50} onChange={event => {
          const file = event.target.files?.[0];
          if (file) void upload(file, "successPhotos");
          event.target.value = "";
        }} />
      </label>
      <div className="cms-media-grid">
        {content.successPhotos.map(photo => (
          <article key={photo.id} className="cms-card">
            <img src={photo.url} alt={photo.alt} />
            <label className="cms-field">Image description
              <input disabled={busy} value={photo.alt} onChange={event => update("successPhotos", content.successPhotos.map(item => item.id === photo.id ? {...item, alt: event.target.value} : item))} />
            </label>
            <button className="cms-danger" disabled={busy} onClick={() => update("successPhotos", content.successPhotos.filter(item => item.id !== photo.id))}>Remove screenshot</button>
          </article>
        ))}
      </div>
    </section>
    <section className="cms-card">
      <h2>Student videos</h2>
      <label className="cms-field">Public YouTube link or direct HTTPS MP4/WebM link
        <input type="url" value={successVideoUrl} onChange={event => setSuccessVideoUrl(event.target.value)} />
      </label>
      <button className="cms-primary" disabled={!ready || busy || !successVideoUrl.trim() || content.successVideos.length >= 50} onClick={() => {
        const url = successVideoUrl.trim();
        if (!courseVideoSource(url)) { setError("Enter a supported YouTube, MP4 or WebM link."); return; }
        setError("");
        update("successVideos", [...content.successVideos, {id: crypto.randomUUID(), url, alt: ""}]);
        setSuccessVideoUrl("");
      }}>Add video</button>
      {content.successVideos.map((video, index) => (
        <article className="cms-card" key={video.id}>
          <a href={video.url} target="_blank" rel="noopener noreferrer">Open video {index + 1}</a>
          <label className="cms-field">Video title
            <input disabled={busy} value={video.alt} onChange={event => update("successVideos", content.successVideos.map(item => item.id === video.id ? {...item, alt: event.target.value} : item))} />
          </label>
          <button className="cms-danger" disabled={busy} onClick={() => update("successVideos", content.successVideos.filter(item => item.id !== video.id))}>Remove video</button>
        </article>
      ))}
    </section>
  </main>
)}
{tab==="gallery"&&<main className="cms-main"><div className="cms-page-heading"><div><h1>Gallery</h1><p>Upload photos, add descriptive alt text and display them in a gallery section.</p></div><button className="cms-primary" disabled={busy||!ready} onClick={()=>fileRef.current?.click()}><Upload size={16}/>Upload image</button></div><input ref={fileRef} type="file" accept="image/png,image/jpeg,image/webp" hidden onChange={e=>{const file=e.target.files?.[0];if(file)upload(file);e.target.value="";}}/><div className="cms-dropzone" onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();if(ready&&e.dataTransfer.files[0])upload(e.dataTransfer.files[0]);}}><Images size={30}/><h2>Drop an image here</h2><p>PNG, JPEG or WebP · up to 12 MB · optimized before upload · only upload photos you can publish</p></div><div className="cms-media-grid">{content.gallery.map(m=><article className="cms-card" key={m.id}><img src={m.url} alt={m.alt}/><label className="cms-field">Image description<input value={m.alt} onChange={e=>update("gallery",content.gallery.map(x=>x.id===m.id?{...x,alt:e.target.value}:x))}/></label><button className="cms-danger" onClick={()=>update("gallery",content.gallery.filter(x=>x.id!==m.id))}>Remove from gallery</button></article>)}</div>{!content.gallery.length&&<p className="cms-empty">No photos uploaded yet. Add a Gallery block in the page editor to display photos.</p>}</main>}
{tab==="reviews"&&<main className="cms-main"><div className="cms-page-heading"><div><h1>Reviews</h1><p>Add learner feedback with its original source. Public Facebook Reel or video links appear in Student Review Reels when the Community section is visible. Use a direct facebook.com/reel/ or facebook.com/videos/ link, then publish.</p></div><button disabled={!ready&&!design} className="cms-primary" onClick={()=>update("reviews",[...content.reviews,{id:crypto.randomUUID(),name:"",text:"",rating:5,source:"",url:""}])}><Plus size={16}/>Add review</button></div><div className="cms-review-grid">{content.reviews.map(r=><article className="cms-card" key={r.id}>{(["name","text","source","url"] as const).map(key=><label key={key} className="cms-field">{({name:"Reviewer name",text:"Review text",source:"Source (e.g. Google)",url:"Original review or Facebook video URL"})[key]}{key==="text"?<textarea rows={4} value={r[key]} onChange={e=>update("reviews",content.reviews.map(x=>x.id===r.id?{...x,[key]:e.target.value}:x))}/>:<input type={key==="url"?"url":"text"} value={r[key]} onChange={e=>update("reviews",content.reviews.map(x=>x.id===r.id?{...x,[key]:e.target.value}:x))}/>}</label>)}<label className="cms-field">Rating<select value={r.rating} onChange={e=>update("reviews",content.reviews.map(x=>x.id===r.id?{...x,rating:Number(e.target.value)}:x))}>{[5,4,3,2,1].map(n=><option value={n} key={n}>{n} stars</option>)}</select></label><button className="cms-danger" onClick={()=>update("reviews",content.reviews.filter(x=>x.id!==r.id))}>Remove review</button></article>)}</div>{!content.reviews.length&&<div className="cms-empty">No review entries yet. Nothing is fabricated or pre-filled.</div>}</main>}
{tab==="inbox"&&<main className="cms-main"><div className="cms-page-heading"><div><h1>Form inbox</h1><p>Contact, consultation and course applications. Refreshes every 15 seconds while open.</p></div><button disabled={design} onClick={inbox}>Refresh</button></div><label className="cms-search"><Search size={16}/><input placeholder="Search name, email or course" value={query} onChange={e=>setQuery(e.target.value)}/></label><div className="cms-leads">{leads.filter(l=>[l.name,l.email,l.course,l.phone].join(" ").toLowerCase().includes(query.toLowerCase())).map(l=><details className="cms-card" key={l.id}><summary><span><b>{l.name}</b><small>{l.course||l.subject||l.kind}</small></span><span>{l.status}</span><time>{new Date(l.created_at).toLocaleDateString()}</time></summary><div className="cms-lead-detail"><p><b>Email:</b> <a href={`mailto:${l.email}`}>{l.email}</a></p><p><b>Phone:</b> {l.phone}</p><p><b>Request:</b> {l.kind} · {l.country}</p><p>{l.message}</p><label className="cms-field">Follow-up status<select value={l.status} onChange={async e=>{try{await request("/api/admin/inquiries",{method:"PATCH",body:JSON.stringify({id:l.id,status:e.target.value})});await inbox();}catch(err){setError((err as Error).message);}}}>{["new","contacted","enrolled","closed"].map(s=><option key={s}>{s}</option>)}</select></label></div></details>)}</div>{!leads.length&&<div className="cms-empty">No saved inquiries yet. New website form submissions will appear here.</div>}</main>}
{tab==="settings"&&<main className="cms-main"><h1>Workspace settings</h1><section className="cms-card"><h2>Access &amp; publishing</h2><p>Signed in as <b>{email}</b></p><p>Admin access is limited to the email allowlist configured in Vercel. Passwords and accounts are managed in Supabase Authentication.</p><p>Content is stored in Supabase. Draft changes stay private; publishing updates the homepage cache. Uploaded images are public assets—do not upload private documents.</p><p>Sessions expire automatically. Unsaved work stays in this tab if you need to sign in again.</p><a className="cms-link" href="/" target="_blank" rel="noopener noreferrer">View production website ↗</a></section></main>}
</div></div>;
}

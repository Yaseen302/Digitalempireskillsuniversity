export type Block={id:string;type:string;enabled:boolean;title:string;text:string;image:string};
export type Review={id:string;name:string;text:string;rating:number;source:string;url:string};
export type Media={id:string;url:string;alt:string};
export type SiteContent={heroTitle:string;heroAccent:string;heroText:string;founderRole:string;aboutTitle:string;aboutText:string;sections:Block[];reviews:Review[];gallery:Media[];courseVideos:Record<string,string>};
export const sectionLabels:Record<string,string>={hero:"Homepage banner",ribbon:"Campus ribbon",marquee:"Platform logos",about:"About us",paths:"Learning path cards",courses:"Featured courses",story:"Who this is for","ecommerce-kit":"E-commerce benefits",steps:"Learning steps",community:"Community",faq:"Questions & answers",cta:"Call to action",text:"Text section",gallery:"Photo gallery",reviews:"Student reviews"};
export const defaultContent:SiteContent={heroTitle:"Learn skills.",heroAccent:"Change your life.",heroText:"Master the digital skills, business strategies, and practical knowledge to build your future in the global digital economy.",founderRole:"CEO & Founder of Digital Empire Skills University",aboutTitle:"About Us",aboutText:"At Digital Empire Skills University, we believe every ambition deserves a chance to grow. We help learners build practical skills in e-commerce, digital marketing and online business. From our Saddar and Gulshan-e-Iqbal campuses in Karachi, we encourage you to learn with purpose, practise with confidence and take the first step towards a brighter future.",sections:["hero","ribbon","marquee","about","paths","courses","story","ecommerce-kit","steps","community","faq","cta"].map(type=>({id:type,type,enabled:true,title:"",text:"",image:""})),reviews:[],gallery:[],courseVideos:{}};
const text=(v:unknown,max:number)=>typeof v==="string"?v.trim().slice(0,max):"";
export function safeUrl(v:unknown){const s=text(v,1500);try {const u=new URL(s);return u.protocol==="https:"&&!u.username&&!u.password?s:"";}catch{return "";}}
export function validateContent(v:unknown):SiteContent{
 if(!v||typeof v!=="object")throw Error("Invalid content");const x=v as Record<string,unknown>;
 if(!Array.isArray(x.sections)||x.sections.length>36||!Array.isArray(x.reviews)||x.reviews.length>100||!Array.isArray(x.gallery)||x.gallery.length>100)throw Error("Content exceeds allowed limits");
 const sections=x.sections.map((raw:Record<string,unknown>)=>{if(!raw||!sectionLabels[String(raw.type)])throw Error("Unknown section");return {id:text(raw.id,80),type:String(raw.type),enabled:raw.enabled===true,title:text(raw.title,180),text:text(raw.text,5000),image:safeUrl(raw.image)};});
 if(sections.some(b=>!b.id)||new Set(sections.map(b=>b.id)).size!==sections.length)throw Error("Section IDs must be unique");
 const fixed=sections.filter(b=>!["text","gallery","reviews"].includes(b.type));if(new Set(fixed.map(b=>b.type)).size!==fixed.length)throw Error("Built-in sections cannot be duplicated");
 // Add the new built-in section to older drafts and published pages once.
 if (!sections.some(block => block.type === "ecommerce-kit")) {
   const storyIndex = sections.findIndex(block => block.type === "story");
   const block = defaultContent.sections.find(block => block.type === "ecommerce-kit")!;
   let id = block.id;
   while (sections.some(section => section.id === id)) id += "-new";
   sections.splice(storyIndex === -1 ? sections.length : storyIndex + 1, 0, { ...block, id });
 }
 const courseVideos = Object.fromEntries(
   x.courseVideos && typeof x.courseVideos === "object" && !Array.isArray(x.courseVideos)
     ? Object.entries(x.courseVideos).slice(0, 100).flatMap(([slug, value]) => {
         const url = safeUrl(value);
         return /^[a-z0-9-]{1,80}$/.test(slug) && url ? [[slug, url]] : [];
       })
     : [],
 );
 return {courseVideos,heroTitle:text(x.heroTitle,180),heroAccent:text(x.heroAccent,180),heroText:text(x.heroText,1500),founderRole:text(x.founderRole,180),aboutTitle:text(x.aboutTitle,180),aboutText:text(x.aboutText,5000),sections,reviews:x.reviews.map((r:Record<string,unknown>)=>({id:text(r.id,80),name:text(r.name,100),text:text(r.text,2000),rating:Math.min(5,Math.max(1,Number(r.rating)||5)),source:text(r.source,80),url:safeUrl(r.url)})),gallery:x.gallery.map((m:Record<string,unknown>)=>({id:text(m.id,80),url:safeUrl(m.url),alt:text(m.alt,200)})).filter(m=>m.url)};
}

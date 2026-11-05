import { Fragment } from "react";
import StatCount from "@/components/stat-count";
import { pageContent } from "@/lib/cms-server";
import { defaultContent } from "@/lib/cms-model";
import ContentBlock from "@/components/content-block";
import { SocialIcon } from "@/components/social-links";
import PlatformLogo from "@/components/platform-logo";
import PlatformMarquee from "@/components/platform-marquee";
import HeroScene from "@/components/hero-scene";
import { branches, whatsappUrl, mapsUrl } from "@/data/site";
import Reveal from "@/components/reveal";
import ReviewReels from "@/components/review-reels";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  MessageCircle,
  MapPin,
  BookOpen,
  Globe2,
  Package,
  Headphones,
  Truck,
  Settings2,
  BriefcaseBusiness,
  Compass,
  GraduationCap,
} from "lucide-react";
import { Button, CourseCard } from "@/components/ui";
import { courses } from "@/data/courses";
export const metadata = { title: {absolute:"Digital Skills & E-commerce Courses in Karachi | Digital Empire"}, description:"Learn Shopify, Amazon, Etsy, Meta Ads, WordPress and digital business skills at Digital Empire Skills University in Karachi. Saddar and Gulshan campuses.", alternates: { canonical: "/" } };
const suppliedTestimonials = [
  ["Muhammad Ahmed","Shopify","Digital Empire mein Shopify ka experience bohat acha raha. Teachers ne har step asaan tareeqe se samjhaya. Ab mujhe apna online store banana aur manage karna aata hai."],
  ["Ayesha Khan","Etsy","I started with no experience on Etsy. The instructors were supportive, and the hands-on training helped me understand how the platform works."],
  ["Muhammad Usman","Amazon","Amazon FBA aur FBM dono achi tarah samajh aa gaye. Training structured thi, is liye beginner ke taur par mere liye lessons follow karna asaan raha."],
  ["Fatima Noor","Shopify","I’m glad I joined the Shopify course. I can now upload products, organize them into collections, and design my own storefront."],
  ["Muhammad Bilal","Forex Trading","Forex ke basics se advanced topics tak achi guidance mili. Chart analysis aur risk management ko jis tarah samjhaya gaya, us se dono concepts clear ho gaye."],
  ["Sana Malik","Etsy","I liked the learning environment at Digital Empire. The course gave me practical experience setting up an Etsy shop, researching products, and improving listings."],
  ["Muhammad Hamza","Amazon","Amazon business ke baare mein kaafi kuch seekha. Mere liye product research, sourcing aur account management wali training sab se zyada helpful rahi."],
  ["Zainab Ali","Shopify","The instructors took the time to answer my questions in detail. Building a Shopify website feels much easier now."],
  ["Muhammad Saad","Forex Trading","Practical charts par examples dekh kar market structure aur technical analysis samajhna mere liye asaan ho gaya."],
  ["Hira Ahmed","Etsy","The course was easy to follow as a beginner. I especially appreciated the clear explanation of digital and physical products on Etsy."],
  ["Muhammad Taha","Shopify","Store setup ki practical training kaafi helpful rahi. Ab domain connect karne, theme customize karne aur payments set up karne ke steps clear hain."],
  ["Maryam Sheikh","Amazon","The Amazon VA course helped me understand product research, listing creation, and how to use Seller Central."],
  ["Muhammad Farhan","Forex Trading","Candlesticks, support aur resistance, aur risk management ko simple language mein samjhaya gaya. Is se trading ke basics samajhne mein kaafi madad mili."],
  ["Eman Fatima","Shopify","I wanted to start an online business and needed a place to begin. The practical Shopify sessions at Digital Empire gave me a clear direction."],
  ["Muhammad Abdullah","Etsy","Etsy shop banane se le kar listings behtar karne tak, har step seekhne ko mila. Overall, course ka experience acha raha."],
  ["Laiba Noor","Amazon","The instructors explained each topic in detail. By the end of the course, I had a clearer understanding of how an e-commerce business works."],
  ["Muhammad Huzaifa","Shopify","Shopify store banane ke saath website customization aur store management bhi seekha. Practical assignments se meri skills improve hui hain."],
  ["Mahnoor Fatima","Forex Trading","The course helped me learn how to read charts, identify entry and exit points, and think about risk before placing a trade."],
  ["Muhammad Zubair","Amazon","Training ka tareeqa professional tha. Amazon ke different business models aur unke day-to-day workflows pehle se zyada clear ho gaye."],
  ["Alina Shah","Shopify & Etsy","I learned how both Shopify and Etsy work. The instructors were approachable and guided me throughout the course. I’d recommend it to anyone getting started."],
].map(([name, course, text], index) => ({
  id: "supplied-testimonial-" + (index + 1),
  name,
  course,
  text,
  rating: 0,
}));

export default async function Home({searchParams}:{searchParams:Promise<{cmsPreview?:string}>}) {
 const preview=(await searchParams).cmsPreview==="1";const content=await pageContent(preview);
 const savedReviews = content.reviews
   .filter(review => review.name.trim() && review.text.trim())
   .map(review => ({ ...review, course: "" }));
 const savedNames = new Set(savedReviews.map(review => review.name.trim().toLowerCase()));
 const studentReviews = [
   ...savedReviews,
   ...suppliedTestimonials.filter(review => !savedNames.has(review.name.toLowerCase())),
 ];
 const reviewRows = studentReviews.length >= 4
   ? [studentReviews.filter((_, index) => index % 2 === 0), studentReviews.filter((_, index) => index % 2 === 1)]
   : [studentReviews];
 const sections:Record<string,React.ReactNode>={"hero": (      <section className="hero hero--immersive editorial-hero">
        <div className="container hero-layout">
          <div className="hero-copy">
            <div className="hero-label">
              <span /> THE NEXT CHAPTER IS YOURS TO BUILD.
            </div>
            <h1>{content.heroTitle}<br/><span>{content.heroAccent}</span></h1>
            <p>{content.heroText}</p>
            <div className="hero-actions">
              <Button href="/courses">Explore our courses</Button>
              <a className="hero-whatsapp" href={whatsappUrl(branches[0])} target="_blank" rel="noopener noreferrer"><span className="whatsapp-button-icon"><MessageCircle size={20}/></span><span>Contact on WhatsApp</span><span className="whatsapp-button-arrow"><ArrowUpRight size={19}/></span></a>
            </div>

          </div>
          <div className="hero-showcase">
            <div className="showcase-heading">
              <span>THE DIGITAL EMPIRE EXPERIENCE</span>
              <span>EST. FOR YOUR FUTURE ↗</span>
            </div>
            <HeroScene role={content.founderRole}/>
            <div className="showcase-footer">
              <span style={{ marginInlineStart: "auto" }}>01 — ∞</span>
            </div>
          </div>
        </div>
        <div className="container empire-stats" aria-label="Digital Empire community and campuses">
          <div className="empire-stat rating-stat"><span className="stat-label"><span className="google-stat-mark" aria-hidden="true">G</span> GOOGLE RATINGS</span><div className="branch-rating"><a href={mapsUrl(branches[1])} target="_blank" rel="noopener noreferrer"><strong>4.8<small>/5</small></strong><span><span className="rating-stars" aria-label="4.8 out of 5 stars">★★★★★</span><b>Gulshan · 21 reviews</b></span></a><a href={mapsUrl(branches[0])} target="_blank" rel="noopener noreferrer"><strong>4.4<small>/5</small></strong><span><span className="rating-stars" aria-label="4.4 out of 5 stars">★★★★☆</span><b>Saddar · 8 reviews</b></span></a></div></div>
          <div className="empire-stat"><span className="stat-label">SOCIAL COMMUNITY</span><strong className="stat-value"><StatCount value={204000} finalLabel="204K" /><span>+</span></strong><p>Combined followers &amp; subscribers</p><div className="stat-socials"><a href="https://www.facebook.com/alibuttempire" target="_blank" rel="noopener noreferrer" aria-label="Ali Butt Empire on Facebook"><SocialIcon name="Facebook"/></a><a href="https://www.instagram.com/digitalempireuniversity/" target="_blank" rel="noopener noreferrer" aria-label="Digital Empire on Instagram"><SocialIcon name="Instagram"/></a><a href="https://www.youtube.com/@alibuttempire" target="_blank" rel="noopener noreferrer" aria-label="Ali Butt Empire on YouTube"><SocialIcon name="YouTube"/></a><a href="https://www.tiktok.com/@digitalempireuniversity" target="_blank" rel="noopener noreferrer" aria-label="Digital Empire on TikTok"><span className="stat-tiktok">♪</span></a></div><small className="stat-detail">Across Digital Empire &amp; Ali Butt accounts</small></div>
          <div className="empire-stat">
            <span className="stat-label"><BookOpen size={16} aria-hidden="true" /> STUDENT SUCCESS</span>
            <strong className="stat-value"><StatCount value={1000} finalLabel="1,000" /><span>+</span></strong>
            <p>Students trained</p>
            <a className="stat-link flex-wrap" href={mapsUrl(branches[1])} target="_blank" rel="noopener noreferrer">
              <span className="rating-stars" aria-hidden="true">★★★★★</span>
              Read Google reviews <ArrowUpRight size={13} aria-hidden="true" />
            </a>
            <div className="mt-4 border-t border-white/15 pt-3">
              <div className="mb-2 text-[10px] font-semibold tracking-wide text-white">The reason for success</div>
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-white">
                <span>10% Theory</span>
                <strong className="text-[#f2cc76]">90% Practical</strong>
              </div>
              <div className="mt-2 flex h-1 overflow-hidden rounded-full bg-white/20" aria-hidden="true">
                <span className="ml-[10%] w-[90%] rounded-full bg-[#f2cc76]" />
              </div>
            </div>
          </div>
          <div className="empire-stat"><span className="stat-label"><MapPin size={16}/> KARACHI CAMPUSES</span><strong className="stat-value">2</strong><p>Saddar &amp; Gulshan-e-Iqbal</p><Link className="stat-link" href="/contact">Find your campus <ArrowUpRight size={15}/></Link></div>
        </div><p className="stats-source-note container">Ratings and social counts from supplied profile screenshots · 4 November 2026. Combined account counts may include the same people across platforms.</p>
      </section>),
"ribbon": (      <div className="campus-ribbon">
        <div className="container">
          <span>
            <span className="campus-dot" /> YOUR AMBITION HAS A PLACE TO GROW
          </span>
          <div>
            {branches.map((branch) => (
              <a
                key={branch.id}
                href={whatsappUrl(branch)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {branch.name} <ArrowUpRight size={13} />
              </a>
            ))}
            <Link href="/contact">
              Visit our Karachi campuses <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>),
"marquee": (      <PlatformMarquee />),
"about": (
      <section className="home-about-centered" aria-labelledby="home-about-title" style={{ paddingInline: 0, textAlign: "left" }}>
        <div className="container">
          <div className="mb-3 text-center text-xs font-bold tracking-widest text-[#073aab] uppercase">About Us</div>
          <h2 id="home-about-title" className="text-center">
            {content.aboutTitle === defaultContent.aboutTitle ? "Digital Empire Skills University" : content.aboutTitle}
          </h2>
          <p style={{ maxWidth: "none", fontSize: "clamp(14px, 1.2vw, 16px)", color: "#52627a", textWrap: "pretty" }}>
            {content.aboutText === defaultContent.aboutText
              ? "At our Saddar and Gulshan-e-Iqbal campuses in Karachi, we help Pakistan’s youth build practical skills in e-commerce, digital marketing and online business. Through guided practice, learners gain the confidence to offer services, start businesses and explore opportunities beyond their local market. We’re especially committed to helping women build skills and work from home on their own terms. More than 1,000 learners have trained with us, each taking a step toward a more independent future."
              : content.aboutText}
          </p>
        </div>
      </section>
    ),
"paths": (      <section className="container learning-bento">
        <Link className="bento-commerce" href="/courses?category=E-commerce"><span className="eyebrow">01 / ONLINE BUSINESS</span><h3><small className="mb-1 block text-sm font-semibold leading-tight tracking-normal">Learn</small>E-commerce &amp;<br/>Freelancing</h3><div className="bento-brands"><PlatformLogo platform="shopify"/><PlatformLogo platform="amazon"/><PlatformLogo platform="etsy"/></div><span className="bento-link">Explore e-commerce <ArrowUpRight size={20}/></span></Link>
        <Link className="bento-business bento-forex" href="/forex-trading"><span className="eyebrow">02 / TRADING EDUCATION</span><h3><small className="mb-1 block text-sm font-semibold leading-tight tracking-normal">Learn</small>Forex and<br/>Crypto Trading</h3><div className="bento-chart" aria-hidden="true"><span/><span/><span/><span/><span/><span/><span/><span/></div><span className="bento-link">Explore forex trading <ArrowUpRight size={20}/></span></Link>
        <Link className="bento-marketing" href="/courses?category=Digital%20Marketing"><span className="eyebrow">03 / GROWTH &amp; TECHNOLOGY</span><h3><small className="mb-1 block text-sm font-semibold leading-tight tracking-normal">Learn</small>Digital Marketing<br/>&amp; AI Tools</h3><div className="marketing-orbits" aria-hidden="true"><span/><span/><span/><ArrowUpRight size={65}/></div><span className="bento-link">Explore digital marketing <ArrowUpRight size={20}/></span></Link>
      </section>),
"courses": (      <section className="section container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">YOUR SKILLS. YOUR ADVANTAGE.</span>
            <h2>
              Find the path that
              <br />
              moves you <span>forward.</span>
            </h2>
          </div>
          <div>
            <p>
              From your first idea to your next big move.
              <br />
              Build skills that open doors to what’s next.
            </p>
            <Link className="inline-link" href="/courses">
              Explore all courses <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
        <Reveal>
          <div className="featured-grid">
            {courses.slice(0, 9).map((c) => (
              <CourseCard key={c.slug} course={c} />
            ))}
          </div>
        </Reveal>
        <div className="course-note">
          <Compass size={19} />
          <span>
            Not sure where to start? Let’s find the right path for you.
          </span>
          <Link href="/book-a-call">
            Talk to our team <ArrowRight size={15} />
          </Link>
        </div>
      </section>),
"story": (
      <section className="bg-white py-12 sm:py-16 lg:py-24" aria-labelledby="ecommerce-benefits-title">
        <div className="container relative isolate mx-auto overflow-hidden rounded-[28px] bg-[#08172b] shadow-[0_28px_65px_-28px_#08172b70]" style={{ maxWidth: 1150 }}>
          <figure className="relative m-0 h-[320px] overflow-hidden bg-[#112d50] lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-[49%]">
            <Image src="/images/ali-butt-cutout.png" alt="Ali Butt, Founder and CEO of Digital Empire" fill
              sizes="(max-width: 1023px) 90vw, 565px" className="object-cover object-[center_55%] lg:object-[center_60%]" />
            <div className="absolute inset-0 bg-[linear-gradient(0deg,#08172b,transparent_55%)] lg:bg-[linear-gradient(90deg,#08172b,transparent_45%),linear-gradient(0deg,#08172b,transparent_60%)]" aria-hidden="true" />
            <figcaption className="absolute bottom-5 right-6 text-right lg:bottom-8 lg:right-9">
              <strong className="block text-sm text-white">Ali Butt</strong>
              <span className="text-xs text-[#f2cc76]">Founder &amp; CEO · Digital Empire</span>
            </figcaption>
          </figure>
          <div className="relative z-10 px-5 py-8 sm:px-9 sm:py-11 lg:w-[59%] lg:px-12 lg:py-12">
            <div className="mb-4 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#f2cc76]">
              <span className="h-px w-7 bg-current" aria-hidden="true" />
              Who this is for
            </div>
            <h2 id="ecommerce-benefits-title" style={{ color: "#fff", fontSize: "clamp(2.05rem, 4vw, 3.35rem)", lineHeight: 1.04, margin: 0 }}>
              <em className="block font-semibold" style={{ color: "#f2cc76" }}>This program</em>
              is for you if…
            </h2>
            <div className="my-5 h-[2px] w-12 bg-[#f2cc76]" aria-hidden="true" />
            <p className="max-w-md" style={{ color: "#ccd9eb", fontSize: 14, lineHeight: 1.55, margin: 0 }}>
              Want to build an online business or work with international clients? Learn practical skills you can use from home, with the flexibility to work around your commitments.
            </p>
            <ul className="mt-6 grid list-none grid-cols-1 gap-2 p-0 min-[440px]:grid-cols-2 sm:grid-cols-3">
              {[
                "You want to work from home",
                "You want to build around family commitments",
                "You want to start an online store",
                "You want to offer freelance services",
                "You want to find clients abroad",
                "You want to sell products internationally",
                "You want to turn a hobby into a business",
                "You want to learn how Shopify stores work",
                "You want to explore Amazon and Etsy",
                "You want to research what customers buy",
                "You want to price your products",
                "You want to write better product listings",
                "You want to market your own products",
                "You want to build a freelance portfolio",
                "You want to learn alongside work or studies",
                "You want to choose hours that suit you",
                "You want to practise with guided projects",
                "You want to build toward financial independence"
              ].map((benefit) => (
                <li key={benefit} className="flex min-h-[55px] items-start gap-2 rounded-[11px] border border-white/15 bg-[#172941]/95 px-3 py-2.5 text-xs font-semibold leading-snug text-[#edf4ff]">
                  <span className="mt-[5px] size-[5px] shrink-0 rounded-full bg-[#f2cc76]" aria-hidden="true" />
                  {benefit}
                </li>
              ))}
            </ul>
            <Link href="/courses?category=E-commerce" className="mt-6 inline-flex items-center gap-3 rounded-lg bg-[#f2cc76] px-4 py-3 text-sm font-bold hover:bg-[#ffe09c]" style={{ color: "#08172b" }}>
              Explore e-commerce courses <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    ),
"ecommerce-kit": (
      <section className="bg-[radial-gradient(ellipse_at_top_right,#153c72,#0b2346_45%,#07172e_85%)] py-14 sm:py-20" aria-labelledby="ecommerce-kit-title">
        <div className="container mx-auto" style={{ maxWidth: 1080 }}>
          <div className="mb-10 text-center">
            <span className="inline-flex rounded-full border border-[#f2cc76]/35 bg-[#f2cc76]/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#f2cc76]">Why choose us</span>
            <h2 id="ecommerce-kit-title" className="mt-4" style={{ fontFamily: "Georgia, serif", color: "#fff", fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.14 }}>
              Everything You Need to Succeed in E-commerce
            </h2>
            <p style={{ color: "#ccd9eb", marginTop: 12 }}>Learn the skills to plan, launch and manage an online business.</p>
          </div>
          <ol className="m-0 grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { Icon: BookOpen, title: "Practical training", description: "Build confidence through guided tasks in store setup, product listings and order management." },
              { Icon: Globe2, title: "Marketplace knowledge", description: "Explore how Shopify, Amazon and Etsy work so you can choose where to sell." },
              { Icon: Package, title: "Product research", description: "Compare demand, sourcing costs and margins before deciding what to sell." },
              { Icon: Headphones, title: "Guidance as you learn", description: "Get feedback on practice tasks and ask questions when you reach a new step." },
              { Icon: Truck, title: "From listing to delivery", description: "Learn how to prepare listings, handle orders and plan shipping and returns." },
              { Icon: Settings2, title: "Business automation", description: "Explore tools that simplify routine work, from tracking stock to organizing orders." },
            ].map(({ Icon, title, description }, index) => (
              <li key={title} className="relative isolate overflow-hidden rounded-3xl border border-white/15 border-l-4 border-l-[#f2cc76] bg-[linear-gradient(145deg,#18365c,#0d2445)] p-6 shadow-[0_14px_32px_-18px_#0009] sm:min-h-[220px]">
                <span className="absolute right-5 top-3 -z-10 font-serif text-7xl font-bold leading-none text-white/10" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <span className="mb-5 grid size-12 place-items-center rounded-2xl border border-[#f2cc76]/25 bg-[#f2cc76]/10 text-[#f2cc76]" aria-hidden="true"><Icon size={21} /></span>
                <h3 style={{ color: "#fff", fontFamily: "Georgia, serif", fontSize: "1.3rem", margin: "0 0 10px" }}>{title}</h3>
                <p style={{ color: "#d0dcf0", fontSize: 14, lineHeight: 1.65, margin: 0 }}>{description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    ),
"steps": null,
"community": (
      <>
      <ReviewReels reviews={content.reviews} />
      {studentReviews.length > 0 && (
        <section className="student-testimonials bg-[#f3f6fb] py-14 sm:py-20" aria-labelledby="student-testimonials-title">
          <style>{`
            .student-testimonials .review-track { display: flex; width: max-content; animation: student-review-scroll 48s linear infinite; }
            .student-testimonials .review-track.reverse { animation-direction: reverse; }
            .student-testimonials .review-scroll { scrollbar-width: none; }
            .student-testimonials .review-scroll::-webkit-scrollbar { display: none; }
            .student-testimonials .review-set { display: flex; flex: none; gap: 16px; padding: 0 16px 0 0; min-width: 100vw; }
            .student-testimonials .review-set > li { flex: 1 0 clamp(240px, 25vw, 320px); }
            .student-testimonials .review-rows:hover .review-track,
            .student-testimonials .review-rows:focus-within .review-track,
            .student-testimonials .review-pause:checked ~ .review-rows .review-track { animation-play-state: paused; }
            @keyframes student-review-scroll { to { transform: translateX(-50%); } }
            @media (prefers-reduced-motion: reduce) {
              .student-testimonials .review-track { animation: none; }
            }
          `}</style>
          <div className="container mb-7 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#073aab]">Testimonials</span>
            <h2 id="student-testimonials-title" style={{ color: "#0b285b", fontFamily: "Georgia, serif", marginTop: 8 }}>What Our Students Say</h2>

          </div>
          {studentReviews.length > 1 && (
            <input id="pause-student-reviews" type="checkbox" className="review-pause peer ml-[max(1.5rem,calc((100%-1320px)/2))] accent-[#0b285b]" />
          )}
          {studentReviews.length > 1 && <label htmlFor="pause-student-reviews" className="ml-2 text-sm font-semibold text-[#0b285b]">Pause scrolling</label>}
          <div className="review-rows mt-4 space-y-4">
            {reviewRows.map((row, rowIndex) => (
              <div key={rowIndex} className="review-scroll overflow-x-auto px-4 pb-2" tabIndex={0} aria-label={"Student reviews, row " + (rowIndex + 1)}>
                <div className={row.length > 1 ? (rowIndex === 1 ? "review-track reverse" : "review-track") : "mx-auto w-full max-w-sm"}>
                  {(row.length > 1 ? [false, true] : [false]).map(duplicate => (
                    <ul key={String(duplicate)} aria-hidden={duplicate || undefined} className={row.length > 1 ? "review-set m-0 list-none" : "m-0 list-none p-0"}>
                      {row.map(review => (
                        <li key={review.id} className="flex max-w-sm flex-col rounded-3xl border border-[#e0e8f4] bg-white p-6 shadow-sm">
                          <div className="mb-4 flex items-center justify-between gap-3">
                            <span aria-hidden="true" className="grid size-10 place-items-center rounded-xl bg-[#fff2d4] font-serif text-3xl text-[#785719]">“</span>
                            {review.rating > 0 && <span aria-label={review.rating + " out of 5 stars"} className="text-sm tracking-wide text-[#785719]">{"★".repeat(Math.round(review.rating))}</span>}
                          </div>
                          <blockquote className="m-0 mb-6 flex-1 whitespace-pre-line text-sm leading-relaxed" style={{ color: "#52627a" }}>{review.text}</blockquote>
                          <div className="flex items-center gap-3">
                            <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-full bg-[#eaf0fb] font-bold text-[#073aab]">{Array.from(review.name)[0]}</span>
                            <div>
                              <strong className="block text-sm text-[#0b285b]">{review.name}</strong>
                              <span className="block text-xs text-[#52627a]">{review.course ? review.course + " · Digital Empire Student" : "Digital Empire Student"}</span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
      </>
    ),
"faq": null,
"cta": null};
 return <>{preview&&<meta name="robots" content="noindex,nofollow"/>}{content.sections.filter(b=>b.enabled).map(block=><Fragment key={block.id}>{Object.hasOwn(sections, block.type) ? sections[block.type] : <ContentBlock block={block} content={content}/>}</Fragment>)}</>;
}

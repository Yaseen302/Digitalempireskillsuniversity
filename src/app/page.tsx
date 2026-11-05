import { Fragment } from "react";
import StatCount from "@/components/stat-count";
import { adminUser, pageContent } from "@/lib/cms-server";
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
  MousePointer2,
  BookOpen,
  Globe2,
  Package,
  Headphones,
  Truck,
  Settings2,
  BriefcaseBusiness,
  Compass,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { Button, CourseCard, CTA } from "@/components/ui";
import { courses } from "@/data/courses";
export const metadata = { title: {absolute:"Digital Skills & E-commerce Courses in Karachi | Digital Empire"}, description:"Learn Shopify, Amazon, Etsy, Meta Ads, WordPress and digital business skills at Digital Empire Skills University in Karachi. Saddar and Gulshan campuses.", alternates: { canonical: "/" } };
export default async function Home({searchParams}:{searchParams:Promise<{cmsPreview?:string}>}) {
 const preview=(await searchParams).cmsPreview==="1";const content=await pageContent(preview);
 const studentReviews = content.reviews.filter(review => review.name.trim() && review.text.trim());
 const showReviewSamples = preview && studentReviews.length === 0 && Boolean(await adminUser());
 if (showReviewSamples) {
   const topics = ["Shopify store setup", "Amazon product research", "Etsy listings", "Digital marketing", "Freelancing", "AI tools"];
   studentReviews.push(...topics.map((topic, index) => ({
     id: "sample-" + index,
     name: "Sample review " + (index + 1),
     text: "Preview card for " + topic + ". Published student feedback will appear here.",
     rating: 0,
     source: "",
     url: "",
   })));
 }
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
        <Link className="bento-commerce" href="/courses?category=E-commerce"><span className="eyebrow">01 / ONLINE BUSINESS</span><h3>E-commerce &amp;<br/>Freelancing</h3><div className="bento-brands"><PlatformLogo platform="shopify"/><PlatformLogo platform="amazon"/><PlatformLogo platform="etsy"/></div><span className="bento-link">Explore e-commerce <ArrowUpRight size={20}/></span></Link>
        <Link className="bento-business bento-forex" href="/forex-trading"><span className="eyebrow">02 / TRADING EDUCATION</span><h3>Forex Trading</h3><div className="bento-chart" aria-hidden="true"><span/><span/><span/><span/><span/><span/><span/><span/></div><span className="bento-link">Explore forex trading <ArrowUpRight size={20}/></span></Link>
        <Link className="bento-marketing" href="/courses?category=Digital%20Marketing"><span className="eyebrow">03 / GROWTH &amp; TECHNOLOGY</span><h3>Digital Marketing<br/>&amp; AI Tools</h3><div className="marketing-orbits" aria-hidden="true"><span/><span/><span/><ArrowUpRight size={65}/></div><span className="bento-link">Explore digital marketing <ArrowUpRight size={20}/></span></Link>
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
"steps": (      <section className="section container">
        <div className="center-heading">
          <span className="eyebrow">SMALL STEPS. BIG POSSIBILITIES.</span>
          <h2>Your ambition. A clear path forward.</h2>
          <p>
            You don’t need to have it all figured out. You just need a place to
            start.
          </p>
        </div>
        <div className="steps">
          {[
            [
              Compass,
              "Explore your options",
              "Find the skills that match your interests.",
            ],
            [
              MousePointer2,
              "Choose your path",
              "Turn your goals into a learning direction.",
            ],
            [
              BookOpen,
              "Learn by doing",
              "Put knowledge into practice, step by step.",
            ],
            [
              Sparkles,
              "Build your future",
              "Take your new skills into your next chapter.",
            ],
          ].map(([Icon, title, text], i) => {
            const I = Icon as typeof Compass;
            return (
              <div key={i}>
                <span className="step-number">0{i + 1}</span>
                <I size={26} />
                <h3>{title as string}</h3>
                <p>{text as string}</p>
              </div>
            );
          })}
        </div>
      </section>),
"community": (
      <>
      <ReviewReels reviews={content.reviews} />
      <section className="community">
        <div className="container community-inner">
          <div>
            <span className="eyebrow gold">A COMMUNITY WITH AMBITION</span>
            <h2>
              Different starting points.
              <br />A shared drive to grow.
            </h2>
            <p>
              Student stories belong to the people who live them. As our
              community grows, this space will feature their experiences, in
              their own words.
            </p>
            <Link className="inline-link" href="/contact">
              Share your learning story <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="community-quote">
            <span>“</span>
            <h3>
              Build Skills.
              <br />
              Build Income.
              <br />
              <em>Build Empire.</em>
            </h3>
            <small>THE DIGITAL EMPIRE VISION</small>
          </div>
        </div>
      </section>
      {studentReviews.length > 0 && (
        <section className="student-testimonials bg-[#f3f6fb] py-14 sm:py-20" aria-labelledby="student-testimonials-title">
          <style>{`
            .student-testimonials .review-track { display: flex; width: max-content; animation: student-review-scroll 48s linear infinite; }
            .student-testimonials .review-track.reverse { animation-direction: reverse; }
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
            {showReviewSamples && <p className="text-sm font-semibold text-[#52627a]">Layout preview · Sample cards only</p>}
          </div>
          {studentReviews.length > 1 && (
            <input id="pause-student-reviews" type="checkbox" className="review-pause peer ml-[max(1.5rem,calc((100%-1320px)/2))] accent-[#0b285b]" />
          )}
          {studentReviews.length > 1 && <label htmlFor="pause-student-reviews" className="ml-2 text-sm font-semibold text-[#0b285b]">Pause scrolling</label>}
          <div className="review-rows mt-4 space-y-4">
            {reviewRows.map((row, rowIndex) => (
              <div key={rowIndex} className="overflow-x-auto px-4 pb-2" tabIndex={0} aria-label={"Student reviews, row " + (rowIndex + 1)}>
                <div className={row.length > 1 ? "review-track " + (rowIndex === 1 ? "reverse" : "") : "mx-auto w-full max-w-sm"}>
                  {(row.length > 1 ? [false, true] : [false]).map(duplicate => (
                    <ul key={String(duplicate)} aria-hidden={duplicate || undefined} className={row.length > 1 ? "review-set m-0 list-none" : "m-0 list-none p-0"}>
                      {row.map(review => (
                        <li key={review.id} className="flex max-w-sm flex-col rounded-3xl border border-[#e0e8f4] bg-white p-6 shadow-sm">
                          <div className="mb-4 flex items-center justify-between gap-3">
                            <span aria-hidden="true" className="grid size-10 place-items-center rounded-xl bg-[#fff2d4] font-serif text-3xl text-[#785719]">“</span>
                            {!showReviewSamples && <span aria-label={review.rating + " out of 5 stars"} className="text-sm tracking-wide text-[#785719]">{"★".repeat(Math.round(review.rating))}</span>}
                          </div>
                          <blockquote className="m-0 mb-6 flex-1 whitespace-pre-line text-sm leading-relaxed" style={{ color: "#52627a" }}>{review.text}</blockquote>
                          <div className="flex items-center gap-3">
                            <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-full bg-[#eaf0fb] font-bold text-[#073aab]">{Array.from(review.name)[0]}</span>
                            <div>
                              <strong className="block text-sm text-[#0b285b]">{review.name}</strong>
                              <span className="block text-xs text-[#52627a]">{showReviewSamples ? "Preview sample" : "Digital Empire Student"}</span>
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
"faq": (      <section className="section container home-faq">
        <div>
          <span className="eyebrow">BEFORE YOUR FIRST STEP</span>
          <h2>
            Big questions.
            <br />
            <span>Honest answers.</span>
          </h2>
          <p>Clarity helps you make the right decision.</p>
          <Link href="/contact" className="inline-link">
            Ask us anything <ArrowUpRight size={17} />
          </Link>
        </div>
        <div>
          {[
            [
              "Where should I start?",
              "Start with what interests you. Explore our courses, or speak with our team to find a path that fits your experience and goals.",
            ],
            [
              "Can I visit a campus?",
              "Yes. We have branches in Saddar and Gulshan-e-Iqbal, Karachi. Call your preferred branch before visiting so the team can guide you.",
            ],
            [
              "What are the course fees and timings?",
              "Our admissions team confirms the current fees, duration, delivery format and schedules for each intake before enrollment.",
            ],
            [
              "Will a course guarantee income?",
              "No. Education develops knowledge and skills. Business, career and trading outcomes depend on your circumstances, effort and market conditions.",
            ],
          ].map(([question, answer]) => (
            <details className="module" key={question}>
              <summary>
                {question}
                <span>+</span>
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>),
"cta": (      <CTA />)};
 return <>{preview&&<meta name="robots" content="noindex,nofollow"/>}{content.sections.filter(b=>b.enabled).map(block=><Fragment key={block.id}>{sections[block.type]||<ContentBlock block={block} content={content}/>}</Fragment>)}</>;
}

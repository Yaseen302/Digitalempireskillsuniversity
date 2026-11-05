import { Fragment } from "react";
import { pageContent } from "@/lib/cms-server";
import { defaultContent } from "@/lib/cms-model";
import ContentBlock from "@/components/content-block";
import { SocialIcon } from "@/components/social-links";
import PlatformLogo from "@/components/platform-logo";
import PlatformMarquee from "@/components/platform-marquee";
import HeroScene from "@/components/hero-scene";
import { branches, whatsappUrl, mapsUrl } from "@/data/site";
import Reveal from "@/components/reveal";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  MessageCircle,
  MapPin,
  Globe2,
  MousePointer2,
  BookOpen,
  Users,
  BriefcaseBusiness,
  Compass,
  GraduationCap,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { Button, CourseCard, CTA } from "@/components/ui";
import { courses } from "@/data/courses";
export const metadata = { title: {absolute:"Digital Skills & E-commerce Courses in Karachi | Digital Empire"}, description:"Learn Shopify, Amazon, Etsy, Meta Ads, WordPress and digital business skills at Digital Empire Skills University in Karachi. Saddar and Gulshan campuses.", alternates: { canonical: "/" } };
export default async function Home({searchParams}:{searchParams:Promise<{cmsPreview?:string}>}) {
 const preview=(await searchParams).cmsPreview==="1";const content=await pageContent(preview);
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
          <div className="empire-stat"><span className="stat-label">SOCIAL COMMUNITY</span><strong className="stat-value">204K<span>+</span></strong><p>Combined followers &amp; subscribers</p><div className="stat-socials"><a href="https://www.facebook.com/alibuttempire" target="_blank" rel="noopener noreferrer" aria-label="Ali Butt Empire on Facebook"><SocialIcon name="Facebook"/></a><a href="https://www.instagram.com/digitalempireuniversity/" target="_blank" rel="noopener noreferrer" aria-label="Digital Empire on Instagram"><SocialIcon name="Instagram"/></a><a href="https://www.youtube.com/@alibuttempire" target="_blank" rel="noopener noreferrer" aria-label="Ali Butt Empire on YouTube"><SocialIcon name="YouTube"/></a><a href="https://www.tiktok.com/@digitalempireuniversity" target="_blank" rel="noopener noreferrer" aria-label="Digital Empire on TikTok"><span className="stat-tiktok">♪</span></a></div><small className="stat-detail">Across Digital Empire &amp; Ali Butt accounts</small></div>
          <div className="empire-stat">
            <span className="stat-label"><BookOpen size={16} aria-hidden="true" /> STUDENT SUCCESS</span>
            <strong className="stat-value">1,000<span>+</span></strong>
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
          <div className="mb-3 text-xs font-bold tracking-widest text-[#073aab] uppercase">About Us</div>
          <h2 id="home-about-title">
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
        <Link className="bento-commerce" href="/courses?category=E-commerce"><span className="eyebrow">01 / E-COMMERCE</span><h3>Build your store.<br/>Grow your ambition.</h3><div className="bento-brands"><PlatformLogo platform="shopify"/><PlatformLogo platform="amazon"/><PlatformLogo platform="etsy"/></div><span className="bento-link">Explore e-commerce <ArrowUpRight size={20}/></span></Link>
        <Link className="bento-business bento-forex" href="/forex-trading"><span className="eyebrow">02 / FOREX TRADING</span><h3>Understand the chart.<br/>Build your discipline.</h3><div className="bento-chart" aria-hidden="true"><span/><span/><span/><span/><span/><span/><span/><span/></div><span className="bento-link">Explore forex trading <ArrowUpRight size={20}/></span></Link>
        <Link className="bento-marketing" href="/courses?category=Digital%20Marketing"><span className="eyebrow">03 / DIGITAL MARKETING</span><h3>Reach the right people.<br/>Make your brand matter.</h3><div className="marketing-orbits" aria-hidden="true"><span/><span/><span/><ArrowUpRight size={65}/></div><span className="bento-link">Explore digital marketing <ArrowUpRight size={20}/></span></Link>
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
"story": (      <section className="about-home section">
        <div className="container about-grid">
          <div className="about-image">
            <Image
              src="/images/learning.jpg"
              alt="A learner developing digital skills with a laptop"
              fill
              sizes="(max-width: 760px) 90vw, 45vw"
            />
            <div className="image-note">
              <span>THE DIGITAL EMPIRE MINDSET</span>
              <strong>
                Learn with purpose.
                <br />
                Build with confidence.
              </strong>
            </div>
          </div>
          <div>
            <span className="eyebrow">
              MORE THAN A COURSE. A NEW DIRECTION.
            </span>
            <h2>
              Big ambitions.
              <br />
              Real-world <span>skills.</span>
            </h2>
            <p>
              We believe your future should be shaped by your ambition. At
              Digital Empire, we make digital learning practical, purposeful,
              and connected to the world beyond the classroom.
            </p>
            <p>
              Explore ideas. Put knowledge into practice. Build the confidence
              to take your next step.
            </p>
            <div className="about-ticks">
              <span>
                <ShieldCheck /> Practical, step-by-step learning
              </span>
              <span>
                <Users /> A supportive learning community
              </span>
              <span>
                <Globe2 /> A business-minded, global outlook
              </span>
            </div>
            <Button href="/about">Get to know Digital Empire</Button>
          </div>
        </div>
      </section>),
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
"community": (      <section className="community">
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
      </section>),
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

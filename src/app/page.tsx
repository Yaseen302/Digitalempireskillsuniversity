import PlatformLogo from "@/components/platform-logo";
import HeroScene from "@/components/hero-scene";
import { branches, whatsappUrl } from "@/data/site";
import Reveal from "@/components/reveal";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
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
export default function Home() {
  return (
    <>
      <section className="hero hero--immersive editorial-hero">
        <div className="container hero-layout">
          <div className="hero-copy">
            <div className="hero-label">
              <span /> THE NEXT CHAPTER IS YOURS TO BUILD.
            </div>
            <h1>
              Learn skills.
              <br />
              Change <span>your life.</span>
            </h1>
            <p>
              Master the digital skills, business strategies, and practical
              knowledge to build your future in the global digital economy.
            </p>
            <div className="hero-actions">
              <Button href="/courses">Explore our courses</Button>
              <Link className="text-button" href="/book-a-call">
                Book a consultation <ArrowUpRight size={17} />
              </Link>
            </div>
            <div className="hero-points">
              <span>
                <Check /> Practical learning
              </span>
              <span>
                <Check /> Global opportunities
              </span>
              <span>
                <Check /> Your pace, your path
              </span>
            </div>
          </div>
          <div className="hero-showcase">
            <div className="showcase-heading">
              <span>THE DIGITAL EMPIRE EXPERIENCE</span>
              <span>EST. FOR YOUR FUTURE ↗</span>
            </div>
            <HeroScene />
            <div className="showcase-footer">
              <span>
                <span /> AMBITION, MEET OPPORTUNITY.
              </span>
              <span>01 — ∞</span>
            </div>
          </div>
        </div>
        <div className="container hero-bottom">
          <span>BUILT FOR THE WAY THE WORLD WORKS</span>
          <div>
            <BookOpen /> Learn with purpose
          </div>
          <div>
            <Users /> Grow with a community
          </div>
          <div>
            <BriefcaseBusiness /> Build your next opportunity
          </div>
        </div>
      </section>
      <div className="campus-ribbon">
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
      </div>
      <section className="platform-strip premium-platforms">
        <div className="container">
          <div className="platform-intro">
            <span className="eyebrow">REAL PLATFORMS. REAL-WORLD SKILLS.</span>
            <h2>
              Learn where the
              <br />
              <strong>world does business.</strong>
            </h2>
          </div>
          <div className="platform-logo-row">
            {["shopify", "amazon", "google", "etsy", "ebay", "youtube"].map(
              (platform) => (
                <div className="platform-brand" key={platform}>
                  <PlatformLogo platform={platform} />
                </div>
              ),
            )}
          </div>
        </div>
      </section>
      <section className="container section"><span className="eyebrow">PRACTICAL TRAINING IN KARACHI</span><h2>E-commerce, marketing and website skills</h2><p>Explore courses in online selling, digital marketing, website development and creative production at our Saddar and Gulshan-e-Iqbal campuses. Speak with admissions about the current syllabus, course fees and available class formats.</p><div className="outcomes">{courses.filter(c => ["shopify","amazon","etsy","ebay","daraz","walmart","meta","wordpress","woocommerce","magento","erp","oms","graphic-design","video-editing"].includes(c.slug)).map(c => <p key={c.slug}><Link className="inline-link" href={`/courses/${c.slug}`}>{c.title} course in Karachi <ArrowUpRight size={15}/></Link></p>)}</div><p>Need help with a business project? <Link className="inline-link" href="/services">Explore our digital services</Link>. For free guidance, visit <a className="inline-link" href="https://www.youtube.com/@alibuttempire" target="_blank" rel="noopener noreferrer">our YouTube channel</a>. Contact admissions for paid course enrollment.</p></section><section className="editorial-intro container section">
        <div>
          <span className="eyebrow">A DIFFERENT KIND OF EDUCATION</span>
          <h2>
            The world is changing.
            <br />
            <span>Be ready for what’s next.</span>
          </h2>
        </div>
        <div>
          <p>
            Your ideas deserve more than a someday. Build practical skills,
            explore digital business, and turn your curiosity into a clear next
            step.
          </p>
          <Link className="inline-link" href="/about">
            Discover the Digital Empire approach <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <section className="container learning-bento">
        <Link className="bento-commerce" href="/courses?category=E-commerce">
          <span className="eyebrow">01 / DIGITAL COMMERCE</span>
          <h3>
            Don’t just shop.
            <br />
            Build the store.
          </h3>
          <div className="bento-brands">
            <PlatformLogo platform="shopify" />
            <PlatformLogo platform="amazon" />
            <PlatformLogo platform="etsy" />
          </div>
          <span className="bento-link">
            Explore e-commerce <ArrowUpRight size={20} />
          </span>
        </Link>
        <Link
          className="bento-marketing"
          href="/courses?category=Digital%20Marketing"
        >
          <span className="eyebrow">02 / DIGITAL MARKETING</span>
          <h3>
            Make your ideas
            <br />
            impossible to ignore.
          </h3>
          <div className="marketing-orbits" aria-hidden="true">
            <span />
            <span />
            <span />
            <ArrowUpRight size={65} />
          </div>
          <span className="bento-link">
            Explore marketing <ArrowUpRight size={20} />
          </span>
        </Link>
        <Link
          className="bento-business"
          href="/courses?category=Digital%20Business"
        >
          <span className="eyebrow">03 / DIGITAL BUSINESS</span>
          <h3>
            Your skill.
            <br />
            Your next opportunity.
          </h3>
          <p>Think independently. Create thoughtfully. Build with intention.</p>
          <span className="bento-link">
            Explore digital business <ArrowUpRight size={20} />
          </span>
        </Link>
      </section>
      <section className="section container">
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
      </section>
      <section className="about-home section">
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
      </section>
      <section className="section container">
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
      </section>
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
      <section className="section container home-faq">
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
      </section>
      <CTA />
    </>
  );
}

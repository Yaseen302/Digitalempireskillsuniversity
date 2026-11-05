import { courseSeo } from "@/data/course-seo";
import CourseVideo from "@/components/course-video";
import { publishedContent } from "@/lib/cms-server";
import { branches, site, whatsappUrl } from "@/data/site";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  BookOpen,
  Clock,
  Monitor,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import { courses } from "@/data/courses";
import { Button, CTA } from "@/components/ui";
export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = courses.find((c) => c.slug === slug);
  return {
    title: c ? `${c.title} Course in Karachi` : "Course not found",
    description: c ? (courseSeo[slug]?.description || `${c.title} course in Karachi. Contact Digital Empire Skills University for fees and schedule.`) : undefined,
    openGraph: { title: `${c?.title || "Course"} Course in Karachi`, description: courseSeo[slug]?.description, url: `/courses/${slug}` },
    alternates: { canonical: `/courses/${slug}` },
  };
}
export default async function Course({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = courses.find((c) => c.slug === slug);
  if (!c) notFound();
  const { courseVideos } = await publishedContent();
  return (
    <>
      <section className="page-intro">
        <div className="container">
          <div className="breadcrumbs">
            <Link href="/">Home</Link> / <Link href="/courses">Courses</Link> /{" "}
            {c.title}
          </div>
          <span className="eyebrow gold">{c.category}</span>
          <h1>{c.title} Course in Karachi</h1>
          <p>
            {courseSeo[slug]?.description || c.description}
          </p>
          <Button href={`/apply?course=${c.slug}`} light>
            Apply for this course
          </Button>
        </div>
      </section>
      <section className="section container detail-grid">
        <div>
          <span className="eyebrow">A PRACTICAL STARTING POINT</span>
          <h2>Make your next step count.</h2>
          <p>
            This learning path introduces the core concepts behind{" "}
            {c.title.toLowerCase()}, with a focus on practical application and
            thoughtful decision-making. Ask admissions for the current syllabus,
            trainer availability and delivery schedule before enrolling.
          </p>
          {courseSeo[slug] && <section><h3>Topics to discuss with your trainer</h3><p>Ask admissions which of these topics are included in the current {c.title} syllabus and practical projects.</p><ul>{courseSeo[slug].topics.map(topic => <li key={topic}>{topic}</li>)}</ul></section>}
          <h3>What you’ll work towards</h3>
          <div className="outcomes">
            {[
              "Understand essential concepts and terminology",
              "Explore relevant tools and common workflows",
              "Develop a structured practical project",
              "Recognize risks and plan responsible next steps",
            ].map((x) => (
              <p key={x}>
                <CheckCircle2 size={18} />
                {x}
              </p>
            ))}
          </div>
          <CourseVideo url={courseVideos[slug]} title={c.title} />
          <h2 className="curriculum-title">{c.title} Course Outline</h2>
          <p className="muted">
            Indicative learning structure. The admissions team will confirm the
            detailed syllabus.
          </p>
          {c.modules.map((m) => (
            <details className="module" key={m.title}>
              <summary>
                {m.title}
                <span>+</span>
              </summary>
              <ul>
                {m.lessons.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </details>
          ))}
          <a className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#087a42] px-5 py-3 font-semibold text-white hover:bg-[#066334]" href={whatsappUrl(branches[0], `Assalam o Alaikum! I would like to know more about the ${c.title} course.`)} target="_blank" rel="noopener noreferrer">
            <MessageCircle size={19} aria-hidden="true" /> Contact on WhatsApp
          </a>
          <h2 className="curriculum-title">Study in Saddar or Gulshan-e-Iqbal</h2><p>Contact our Karachi admissions team to confirm the current {c.title} course fees, class timings, trainer and online or campus availability. <Link href="/contact">View campus addresses and contact details</Link>.</p>
          <h2 className="curriculum-title">Good questions. Clear answers.</h2>
          {[
            ["What are the course fees?", "Contact admissions for the current fee, payment terms and intake. We do not advertise these paid courses as free."],
            ["Where can I find free guidance?", "Free guidance is available on our Ali Butt Empire YouTube channel. Contact admissions for structured course enrollment."],
            [
              "Do I need previous experience?",
              "This path is designed as a beginner-friendly introduction. Tell our team about your experience so they can advise on suitability.",
            ],
            [
              "How long is the course?",
              c.duration +
                ". Duration and lesson schedules are confirmed before enrollment.",
            ],
            [
              "Can I study online?",
              c.format +
                ". Availability depends on the course and current intake.",
            ],
            [
              "Does the course guarantee earnings?",
              "No. Outcomes depend on your practice, circumstances, market conditions and decisions. Trading involves financial risk and education is not investment advice.",
            ],
          ].map(([q, a]) => (
            <details className="module" key={q}>
              <summary>
                {q}
                <span>+</span>
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
        <aside className="course-sidebar">
          <div className={`course-art ${c.color}`}>
            <span className="platform">{c.word}</span>
          </div>
          <div className="sidebar-content">
            <h3>Your next chapter starts here.</h3>
            <p>
              <BookOpen size={18} />
              {c.level}
            </p>
            <p>
              <Clock size={18} />
              {c.duration}
            </p>
            <p>
              <Monitor size={18} />
              {c.format}
            </p>
            <Button href={`/apply?course=${c.slug}`}>Request enrollment</Button>
            <Link
              className="inline-link"
              href={`/book-a-call?course=${c.slug}`}
            >
              Have a question? Let’s talk <ArrowRight size={15} />
            </Link>
          </div>
        </aside>
      </section>
      <section className="container section"><h2>Explore related learning paths</h2><div className="outcomes">{courses.filter(other => other.category === c.category && other.slug !== c.slug).slice(0,4).map(other => <p key={other.slug}><Link className="inline-link" href={`/courses/${other.slug}`}>{other.title} course <ArrowRight size={15}/></Link></p>)}</div><p>Looking for free guidance? Visit <a href="https://www.youtube.com/@alibuttempire" target="_blank" rel="noopener noreferrer">Ali Butt Empire on YouTube</a>. Course fees are confirmed by admissions.</p></section><CTA />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            name: c.title,
            description: courseSeo[slug]?.description || c.description,
            url: site.url + "/courses/" + c.slug,
            inLanguage: ["en", "ur"],
            provider: {
              "@type": "Organization",
              name: "Digital Empire Skills University",
              "@id": site.url + "/#organization",
              url: site.url,
            },
          }),
        }}
      />
    </>
  );
}

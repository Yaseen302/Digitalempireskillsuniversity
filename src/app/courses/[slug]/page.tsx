import { notFound } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  BookOpen,
  Clock,
  Monitor,
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
    title: c?.title,
    description: c?.description,
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
  return (
    <>
      <section className="page-intro">
        <div className="container">
          <div className="breadcrumbs">
            <Link href="/">Home</Link> / <Link href="/courses">Courses</Link> /{" "}
            {c.title}
          </div>
          <span className="eyebrow gold">{c.category}</span>
          <h1>{c.title}</h1>
          <p>
            {c.description} Develop a practical foundation, explore essential
            workflows, and plan your next step with intention.
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
          <h2 className="curriculum-title">Your learning roadmap</h2>
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
          <h2 className="curriculum-title">Good questions. Clear answers.</h2>
          {[
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
      <CTA />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            name: c.title,
            description: c.description,
            provider: {
              "@type": "Organization",
              name: "Digital Empire Skills University",
            },
          }),
        }}
      />
    </>
  );
}

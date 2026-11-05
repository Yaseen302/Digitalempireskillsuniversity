import { courseSeo } from "@/data/course-seo";
import CourseVideo from "@/components/course-video";
import { publishedContent } from "@/lib/cms-server";
import { branches, site, whatsappUrl } from "@/data/site";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  BookOpen,
  Clock,
  Monitor,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import { courses } from "@/data/courses";
import { Button } from "@/components/ui";
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
          <CourseVideo url={courseVideos[slug]} title={c.title} />
          <h2 className="curriculum-title">{c.title} Course Outline</h2>
          <p className="muted">
            Indicative learning structure. The admissions team will confirm the
            detailed syllabus.
          </p>
          <ol className="my-6 grid list-decimal gap-4 pl-6">
            {courseSeo[slug]?.topics?.length ? courseSeo[slug].topics.map(topic => (
              <li className="pl-1" key={topic}>{topic}</li>
            )) : c.modules.map(module => (
              <li className="pl-1" key={module.title}>
                <strong>{module.title.replace(/^\d+\s*·\s*/, "")}</strong>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  {module.lessons.map(lesson => <li key={lesson}>{lesson}</li>)}
                </ul>
              </li>
            ))}
          </ol>
          <a className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#087a42] px-5 py-3 font-semibold text-white hover:bg-[#066334]" href={whatsappUrl(branches[0], `Assalam o Alaikum! I would like to know more about the ${c.title} course.`)} target="_blank" rel="noopener noreferrer">
            <MessageCircle size={19} aria-hidden="true" /> Contact on WhatsApp
          </a>
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

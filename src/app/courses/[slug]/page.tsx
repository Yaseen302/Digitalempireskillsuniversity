import Image from "next/image";
import PlatformLogo from "@/components/platform-logo";
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
  const isShopify = slug === "shopify";
  return (
    <>
      {isShopify ? (
        <section className="bg-[#081c40] bg-gradient-to-br from-[#081c40] to-[#143d75] py-14 sm:py-20">
          <div className="container grid items-center gap-10 lg:grid-cols-2">
            <div>
              <div className="mb-6 flex items-center gap-2 text-sm text-[#dce8fb]">
                <Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/courses">Courses</Link>
              </div>
              <span className="eyebrow gold">Hands-on training · Karachi</span>
              <h1 className="my-5" style={{ color: "#fff", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", lineHeight: 1.06 }}>
                Build Your Online Store with <span style={{ color: "#f2cc76" }}>Shopify</span>
              </h1>
              <p className="mb-7 max-w-xl leading-relaxed" style={{ color: "#dce8fb" }}>
                Learn how to set up a Shopify storefront, organize products and manage payments and orders through guided practice.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Button href="/apply?course=shopify" light>Apply for Shopify training</Button>
                <a className="rounded-lg border border-white/30 px-4 py-3 text-sm font-semibold" style={{ color: "#fff" }} href="#course-outline">View course outline</a>
              </div>
            </div>
            <div className="overflow-hidden rounded-3xl border border-white/20 bg-[#0b2247] shadow-xl">
              <div className="flex items-center justify-between gap-4 bg-white px-5 py-3">
                <PlatformLogo platform="shopify" />
                <span className="text-sm font-semibold text-[#124391]">Digital Empire · Karachi</span>
              </div>
              <Image src="/images/classroom-4.jpg" alt="A Digital Empire classroom group" width={900} height={675} sizes="(min-width: 1024px) 48vw, 100vw" className="block aspect-[16/10] w-full object-cover object-[center_60%]" priority />
              <div className="flex flex-wrap justify-between gap-2 px-5 py-4 text-sm text-[#dce8fb]">
                <span>Practical classroom training</span><span>Saddar &amp; Gulshan-e-Iqbal</span>
              </div>
            </div>
          </div>
        </section>
      ) : (
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
      )}
      <section className="section container detail-grid">
        <div>
          <CourseVideo url={courseVideos[slug]} title={c.title} />
          <h2 id="course-outline" className="curriculum-title scroll-mt-28">{c.title} Course Outline</h2>
          <p className="muted">
            Indicative learning structure. The admissions team will confirm the
            detailed syllabus.
          </p>
          <ol className={isShopify ? "my-6 grid list-none gap-3 p-0" : "my-6 grid list-decimal gap-4 pl-6"}>
            {courseSeo[slug]?.topics?.length ? courseSeo[slug].topics.map((topic, index) => (
              <li className={isShopify ? "flex items-center gap-4 rounded-xl border border-[#dce6f4] bg-[#f5f8fc] p-4 font-semibold" : "pl-1"} key={topic}>
                {isShopify && <span className="rounded-lg bg-[#081c40] px-3 py-2 text-sm text-[#f2cc76]" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>}
                <span className={isShopify ? "first-letter:uppercase" : undefined}>{topic}</span>
              </li>
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

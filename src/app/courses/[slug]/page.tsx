import Image from "next/image";
import PlatformLogo from "@/components/platform-logo";
import { courseSeo } from "@/data/course-seo";
import CourseVideo from "@/components/course-video";
import { publishedContent } from "@/lib/cms-server";
import { branches, site, whatsappUrl } from "@/data/site";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Check,
  BookOpen,
  Clock,
  Monitor,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import { courses } from "@/data/courses";
import { Button } from "@/components/ui";
const shopifyModules = [
  { title: "E-commerce Basics", image: "ecommerce-basics-400x400.webp" },
  { title: "Shopify Store Setup", image: "shopify%20setup.webp" },
  { title: "Product & Niche Research", image: "product-research-400x400.webp" },
  { title: "Sourcing & Business Models", image: "private-label-400x400.webp" },
  { title: "Themes & Store Design", image: "shoipify-store-design-400x400.webp" },
  { title: "Product Listings & Collections", image: "shoipify-store-design-400x400.webp" },
  { title: "Payments & Checkout", image: "payments-400x400.webp" },
  { title: "Shipping & Fulfillment", image: "courier-400x400.webp" },
  { title: "Order Management", image: "ecommerce-basics-400x400.webp" },
  { title: "Customer Service", image: "customer-service-400x400.webp" },
  { title: "Store SEO", image: "seo-basics-400x400.webp" },
  { title: "Social Media Marketing", image: "ads-400x400.webp" },
  { title: "Content Creation", image: "content-creation-400x400.webp" },
  { title: "Analytics & Tracking", image: "analytics-400x400.webp" },
  { title: "Launch Checklist", image: "shopify%20setup.webp" },
  { title: "Guided Store Project", image: "product-research-400x400.webp" },
];

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
      {isShopify ? (
        <>
          <section id="course-outline" aria-labelledby="shopify-outline-title" className="scroll-mt-28 bg-[#f4f7fc] py-14 sm:py-20">
            <div className="container">
              <div className="mb-9 text-center">
                <span className="eyebrow">Shopify training roadmap</span>
                <h2 id="shopify-outline-title" className="mt-3">Shopify Course Outline</h2>
              </div>
              <CourseVideo url={courseVideos[slug]} title={c.title} />
              <ol role="list" className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
                {shopifyModules.map(({ title, image }, index) => (
                  <li key={title} className="overflow-hidden rounded-3xl border border-[#dce6f4] bg-white p-4 shadow-sm transition-shadow hover:shadow-lg">
                    <Image
                      src={`https://easycommerce.pk/wp-content/themes/easycommerce-theme/assets/images/${image}`}
                      alt=""
                      width={400}
                      height={400}
                      unoptimized
                      className="block aspect-square w-full rounded-2xl bg-[#f4f7fc] object-contain"
                    />
                    <div className="px-1 pb-2 pt-4">
                      <span className="text-xs font-bold tracking-widest text-[#124391]">{String(index + 1).padStart(2, "0")}</span>
                      <h3 className="mt-2 text-lg">{title}</h3>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-8 text-center">
                <a className="button whatsapp-link" href={whatsappUrl(branches[0], "Assalam o Alaikum! I would like to know more about Shopify training.")} target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={19} aria-hidden="true" /> Contact on WhatsApp
                </a>
              </div>
            </div>
          </section>
          <section className="container grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-2">
            <div>
              <span className="eyebrow">Practical training in Karachi</span>
              <h2 className="mt-3">From your first product to a working storefront</h2>
              <p className="mt-4">Practise how to build a store, present products and handle orders with guidance from Digital Empire.</p>
            </div>
            <ul className="m-0 grid list-none gap-3 p-0">
              {["Set up and customize a Shopify storefront", "Research products and organize collections", "Plan checkout, shipping and fulfillment", "Build a launch plan and track store performance"].map(item => (
                <li key={item} className="flex items-center gap-3 rounded-xl border border-[#dce6f4] bg-[#f4f7fc] p-4 font-semibold">
                  <Check size={20} className="shrink-0 text-[#087a42]" aria-hidden="true" />{item}
                </li>
              ))}
            </ul>
          </section>
        </>
      ) : (
      <section className="section container detail-grid">
        <div>
          <CourseVideo url={courseVideos[slug]} title={c.title} />
          <h2 id="course-outline" className="curriculum-title scroll-mt-28">{c.title} Course Outline</h2>
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
      )}
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

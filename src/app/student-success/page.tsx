import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { publishedContent } from "@/lib/cms-server";

export const metadata = {
  title: "Student Success Stories",
  description: "Student feedback and learning milestones from Digital Empire Skills University.",
  alternates: { canonical: "/student-success" },
};

export default async function StudentSuccess() {
  const { gallery } = await publishedContent();
  return (
    <main>
      <section className="bg-[#081c40] bg-gradient-to-br from-[#081c40] to-[#124391] py-16 text-center sm:py-24">
        <div className="container">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#f2cc76]/40 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#f2cc76]">
            <MessageCircle size={16} aria-hidden="true" /> Student Success
          </span>
          <h1 className="my-5 text-4xl sm:text-6xl" style={{ color: "#fff" }}>
            Student Success <span style={{ color: "#f2cc76" }}>Stories</span>
          </h1>
          <p className="mx-auto max-w-xl leading-relaxed" style={{ color: "#dce8fb" }}>
            Hear from Digital Empire students about what they learned, what they built and the milestones they reached along the way.
          </p>
        </div>
      </section>
      <section className="bg-[#f4f7fc] py-12 sm:py-20" aria-labelledby="feedback-title">
        <div className="container">
          <div className="mb-8 text-center">
            <span className="eyebrow">From our students</span>
            <h2 id="feedback-title" className="mt-3 text-3xl sm:text-4xl">WhatsApp Feedback</h2>
          </div>
          {gallery.length ? (
            <ul className="m-0 grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {gallery.map(({ id, url, alt }, index) => (
                <li key={id} className="rounded-2xl border border-[#dce6f4] bg-white p-3 shadow-sm">
                  <a href={url} target="_blank" rel="noopener noreferrer" className="block rounded-xl" aria-label={`Open full image: ${alt || `student gallery image ${index + 1}`}`}>
                    {/* Gallery image hosts are managed through the CMS. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} alt={alt || `Student gallery image ${index + 1}`} loading="lazy" className="aspect-[4/5] w-full rounded-xl bg-[#edf3fb] object-contain" />
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mx-auto max-w-xl rounded-2xl border border-dashed border-[#b9cbea] bg-white px-6 py-8 text-center">
              Student screenshots will appear here as they are shared.
            </p>
          )}
          <div className="mt-9 text-center">
            <Link className="inline-link" href="/courses">Explore our courses <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}

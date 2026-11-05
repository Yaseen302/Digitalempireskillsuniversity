import { courseVideoSource } from "@/lib/course-video";
import CourseVideo from "@/components/course-video";
import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { publishedContent } from "@/lib/cms-server";

export const metadata = {
  title: "Student Success Stories",
  description: "Student feedback and learning milestones from Digital Empire Skills University.",
  alternates: { canonical: "/student-success" },
};

function socialPlayer(value: string) {
  const url = new URL(value);
  const host = url.hostname.replace(/^(www|m)\./, "");
  if (host === "facebook.com" || host === "fb.watch") {
    return "https://www.facebook.com/plugins/video.php?" + new URLSearchParams({
      href: value, show_text: "false", autoplay: "false",
    });
  }
  const instagram = url.pathname.match(/^\/(reel|p|tv)\/([\w-]+)\/?$/);
  if (host === "instagram.com" && instagram) {
    return `https://www.instagram.com/${instagram[1]}/${instagram[2]}/embed/`;
  }
  const tiktok = url.pathname.match(/^\/@[^/]+\/video\/(\d+)\/?$/);
  if (host === "tiktok.com" && tiktok) {
    return `https://www.tiktok.com/player/v1/${tiktok[1]}`;
  }
  return null;
}

export default async function StudentSuccess() {
  const { successPhotos, successVideos } = await publishedContent();
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
        </div>
      </section>
      <section className="bg-[#f4f7fc] py-12 sm:py-20" aria-label="Student success media">
        <div className="container">
          {successPhotos.length > 0 && (
            <ul className="m-0 grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {successPhotos.map(({ id, url, alt }, index) => (
                <li key={id} className="rounded-2xl border border-[#dce6f4] bg-white p-3 shadow-sm">
                  <a href={url} target="_blank" rel="noopener noreferrer" className="block rounded-xl" aria-label={`Open full image: ${alt || `student gallery image ${index + 1}`}`}>
                    {/* Gallery image hosts are managed through the CMS. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} alt={alt || `Student gallery image ${index + 1}`} loading="lazy" className="aspect-[4/5] w-full rounded-xl bg-[#edf3fb] object-contain" />
                  </a>
                </li>
              ))}
            </ul>
          )}
          {successVideos.length > 0 && (
            <ul className="my-6 grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {successVideos.map((video, index) => {
                const title = video.alt || `Student story ${index + 1}`;
                const embed = socialPlayer(video.url);
                return (
                <li key={video.id} className="rounded-2xl border border-[#dce6f4] bg-white p-3 shadow-sm">
                  {courseVideoSource(video.url) ? (
                    <CourseVideo url={video.url} title={video.alt || `Student story ${index + 1}`} story />
                  ) : (
                    <>
                      <h3 className="mb-3 text-lg">{title}</h3>
                      {embed && (
                        <iframe src={embed} title={title} loading="lazy" allow="encrypted-media; picture-in-picture; fullscreen" allowFullScreen className="aspect-[9/16] w-full rounded-xl border-0 bg-[#081c40]" />
                      )}
                    </>
                  )}
                  <a className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#124391]" href={video.url} target="_blank" rel="noopener noreferrer">
                    Open original <ArrowUpRight size={17} aria-hidden="true" />
                  </a>
                </li>
                );
              })}
            </ul>
          )}
          <div className="mt-9 text-center">
            <Link className="inline-link" href="/courses">Explore our courses <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}

"use client";

import { useRef } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Play } from "lucide-react";
import type { Review } from "@/lib/cms-model";

const featuredReels = [
  "1089112973984402",
  "1098602963135173",
  "1422007916235393",
  "2291358721643072",
  "1675805277211450",
].map(id => ({ name: "", url: "https://www.facebook.com/reel/" + id + "/" }));

function facebookVideo(value: string) {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || !["facebook.com", "www.facebook.com", "m.facebook.com"].includes(url.hostname)) return null;
    if (/^\/(?:reel|(?:[^/]+\/)?videos)\/\d+\/?$/.test(url.pathname)) return "https://www.facebook.com" + url.pathname.replace(/\/$/, "") + "/";
    const id = url.searchParams.get("v");
    if (["/watch", "/watch/", "/video.php"].includes(url.pathname) && id && /^\d+$/.test(id)) return "https://www.facebook.com/watch/?v=" + id;
    return null;
  } catch {
    return null;
  }
}

export default function ReviewReels({ reviews }: { reviews: Review[] }) {
  const track = useRef<HTMLOListElement>(null);
  const seen = new Set<string>();
  const videos = [...reviews, ...featuredReels].flatMap(review => {
    const url = facebookVideo(review.url);
    if (!url || seen.has(url)) return [];
    seen.add(url);
    return [{ ...review, url }];
  });

  if (!videos.length) return null;

  function slide(direction: number) {
    const list = track.current;
    const card = list?.firstElementChild;
    if (!list || !card) return;
    list.scrollBy({ left: direction * (card.getBoundingClientRect().width + 16), behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  return (
    <section className="bg-[#f3f6fb] py-14 sm:py-20" aria-labelledby="student-reels-title">
      <div className="container">
        <div className="mb-8 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[#073aab]">In their own words</span>
          <h2 id="student-reels-title" style={{ color: "#0b285b", fontFamily: "Georgia, serif", margin: "8px 0" }}>Student Review Reels</h2>
          <p>Watch learners share their experiences at Digital Empire.</p>
        </div>
        <div className="relative">
          <ol ref={track} tabIndex={0} aria-label="Student review videos" className="m-0 flex snap-x snap-mandatory list-none gap-4 overflow-x-auto px-0 pb-4">
            {videos.map((video, index) => {
              const title = video.name || "Student review " + (index + 1);
              const embed = "https://www.facebook.com/plugins/video.php?" + new URLSearchParams({ href: video.url, show_text: "false", autoplay: "false" });
              return (
                <li key={video.url} className="w-[min(76vw,250px)] md:w-[calc((100%_-_32px)/3)] xl:w-[calc((100%_-_64px)/5)] shrink-0 snap-start overflow-hidden rounded-2xl border border-[#dbe4f1] bg-white">
                  <div className="relative grid aspect-[9/16] place-items-center bg-[radial-gradient(ellipse_at_top_right,#214b85,#081a35_70%)]">
                    {video.url === "https://www.facebook.com/reel/1098602963135173/" ? (
                      <a href={video.url} target="_blank" rel="noopener noreferrer"
                        className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-5 text-center focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white"
                        style={{ color: "#fff" }} aria-label={"Watch " + title + " on Facebook"}>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#f2cc76]">Digital Empire University</span>
                        <span className="grid size-16 place-items-center rounded-full bg-[#f2cc76] text-[#081a35]"><Play size={25} fill="currentColor" aria-hidden="true" /></span>
                        <span className="text-sm font-semibold">Watch on Facebook <ArrowUpRight size={14} className="inline" aria-hidden="true" /></span>
                      </a>
                    ) : (
                      <iframe title={title} src={embed} loading="lazy"
                      allow="encrypted-media; picture-in-picture; fullscreen" allowFullScreen
                      className="absolute inset-0 h-full w-full border-0" />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="m-0 text-base font-bold text-[#0b285b]">{title}</h3>
                    <a href={video.url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#073aab]">
                      Watch on Facebook <ArrowUpRight size={13} aria-hidden="true" />
                    </a>
                  </div>
                </li>
              );
            })}
          </ol>
          {videos.length > 1 && <div className="mt-2 flex justify-center gap-3">
            <button type="button" aria-label="Previous review" onClick={() => slide(-1)} className="grid size-10 place-items-center rounded-full border border-[#dbe4f1] bg-white text-[#0b285b]"><ChevronLeft size={20} /></button>
            <button type="button" aria-label="Next review" onClick={() => slide(1)} className="grid size-10 place-items-center rounded-full border border-[#dbe4f1] bg-white text-[#0b285b]"><ChevronRight size={20} /></button>
          </div>}
        </div>
      </div>
    </section>
  );
}

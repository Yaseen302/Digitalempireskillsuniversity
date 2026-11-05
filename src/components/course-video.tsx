import { courseVideoSource } from "@/lib/course-video";

export default function CourseVideo({ url, title }: { url?: string; title: string }) {
  const source = url && courseVideoSource(url);
  if (!source) return null;

  return (
    <section className="my-8" aria-label={`${title} course video`}>
      <h2 className="mb-4">Course Video</h2>
      {source.kind === "youtube" ? (
        <iframe className="aspect-video w-full rounded-xl border-0" src={source.url} title={`${title} course video`} loading="lazy" allowFullScreen />
      ) : (
        <video className="aspect-video w-full rounded-xl bg-black" src={source.url} controls playsInline preload="none" aria-label={`${title} course video`} />
      )}
    </section>
  );
}

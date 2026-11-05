import { courseVideoSource } from "@/lib/course-video";

export default function CourseVideo({ url, title, story = false }: { url?: string; title: string; story?: boolean }) {
  const source = url && courseVideoSource(url);
  if (!source) return null;

  return (
    <section className={story ? undefined : "my-8"} aria-label={story ? title : `${title} course video`}>
      {story ? <h3 className="mb-3 text-lg">{title}</h3> : <h2 className="mb-4">Course Video</h2>}
      {source.kind === "youtube" ? (
        <iframe className="aspect-video w-full rounded-xl border-0" src={source.url} title={story ? title : `${title} course video`} loading="lazy" allowFullScreen />
      ) : (
        <video className="aspect-video w-full rounded-xl bg-black" src={source.url} controls playsInline preload="none" aria-label={story ? title : `${title} course video`} />
      )}
    </section>
  );
}

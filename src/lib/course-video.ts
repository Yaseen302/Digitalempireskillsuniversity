import { safeUrl } from "./cms-model";

export function courseVideoSource(value: string): { kind: "youtube" | "file"; url: string } | null {
  const safe = safeUrl(value);
  if (!safe) return null;
  const url = new URL(safe);
  let id: string | null = null;
  if (url.hostname === "youtu.be") id = url.pathname.split("/")[1];
  if (["youtube.com", "www.youtube.com", "m.youtube.com"].includes(url.hostname)) {
    const [, route, videoId] = url.pathname.split("/");
    if (route === "watch") id = url.searchParams.get("v");
    if (route === "shorts" || route === "embed") id = videoId;
  }
  if (id && /^[a-zA-Z0-9_-]{11}$/.test(id)) {
    return { kind: "youtube", url: `https://www.youtube-nocookie.com/embed/${id}` };
  }
  return /\.(mp4|webm)$/i.test(url.pathname) ? { kind: "file", url: safe } : null;
}

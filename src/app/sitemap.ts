import { site } from "@/data/site";
import { courses } from "@/data/courses";
export default function sitemap() {
  const base = site.url;
  return [
    "",
    "/about",
    "/courses",
    "/services",
    "/forex-trading",
    "/contact",
    "/book-a-call",
    "/apply",
    "/privacy",
    "/terms",
    ...courses.map((c) => `/courses/${c.slug}`),
  ].map((path) => ({ url: base + path }));
}

import { PageIntro, CTA } from "@/components/ui";
import CourseBrowser from "@/components/course-browser";
export const metadata = {
  title: "Explore Courses",
  description:
    "Explore practical courses in e-commerce, digital marketing, digital business and trading education.",
  alternates: { canonical: "/courses" },
};
export default function Courses() {
  return (
    <>
      <PageIntro
        label="EXPLORE YOUR POSSIBILITIES"
        title="One new skill. A whole new direction."
        text="Find a learning path that brings your interests, ambitions, and next steps together."
      />
      <CourseBrowser />
      <CTA />
    </>
  );
}

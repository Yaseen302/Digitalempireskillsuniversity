import { PageIntro } from "@/components/ui";
import InquiryForm from "@/components/inquiry-form";
export const metadata = {
  title: "Apply Now",
  description:
    "Start your learning journey with an enrollment inquiry at Digital Empire.",
  alternates: { canonical: "/apply" },
};
export default function Apply() {
  return (
    <>
      <PageIntro
        label="YOUR AMBITION STARTS HERE"
        title="Take your first practical step."
        text="Tell us what you’d like to learn. Our admissions team will share the current course details, schedule, availability and fees before you commit."
      />
      <section className="section container narrow">
        <InquiryForm kind="application" />
      </section>
    </>
  );
}

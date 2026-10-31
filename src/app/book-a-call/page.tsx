import { Check, Monitor, MessageCircle, Compass } from "lucide-react";
import { PageIntro } from "@/components/ui";
import InquiryForm from "@/components/inquiry-form";
export const metadata = {
  title: "Book a Consultation",
  description:
    "Speak with our team and discover the right learning path for your goals.",
  alternates: { canonical: "/book-a-call" },
};
export default function Booking() {
  return (
    <>
      <PageIntro
        label="A CONVERSATION ABOUT WHAT’S NEXT"
        title="Let’s build your digital future together."
        text="Speak with our team and discover the right learning path for your goals."
      />
      <section className="section container form-layout">
        <aside>
          <span className="eyebrow">CLARITY BEFORE COMMITMENT</span>
          <h2>
            A little guidance.
            <br />A clearer direction.
          </h2>
          <p>
            You bring your ambition. We’ll help you explore where it could take
            you.
          </p>
          <div className="about-ticks">
            <span>
              <Compass /> Explore courses that fit your goals
            </span>
            <span>
              <Monitor /> Request an online consultation
            </span>
            <span>
              <MessageCircle /> Share a number for WhatsApp follow-up
            </span>
            <span>
              <Check /> Understand the next enrollment steps
            </span>
          </div>
          <div className="contact-note">
            <h3>What happens next?</h3>
            <p>
              Submit your preferences. Our team reviews availability and
              contacts you to agree a time. No appointment is reserved by this
              form.
            </p>
          </div>
        </aside>
        <InquiryForm kind="consultation" />
      </section>
    </>
  );
}

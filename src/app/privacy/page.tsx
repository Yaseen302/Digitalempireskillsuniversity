import { PageIntro } from "@/components/ui";
export const metadata = {
  description:
    "How Digital Empire handles inquiry information, consent and website privacy.",
  title: "Privacy Policy",
  alternates: { canonical: "/privacy" },
};
export default function Privacy() {
  return (
    <>
      <PageIntro
        label="YOUR INFORMATION, HANDLED WITH CARE"
        title="Privacy policy"
        text="How information submitted through this website is used."
      />
      <article className="section container legal">
        <h2>Information you share</h2>
        <p>
          Contact, enrollment and consultation forms collect your name, email,
          phone number, and the information you choose to provide about your
          interests and availability. Do not submit sensitive identity or
          payment information.
        </p>
        <h2>Why we use it</h2>
        <p>
          Your information is used to respond to your request, discuss relevant
          courses and arrange a consultation when requested. A submitted
          consultation preference is not a confirmed appointment.
        </p>
        <h2>Storage and service providers</h2>
        <p>
          When configured, submissions are stored using Supabase and delivered
          to the admissions team through our email provider, Resend. Vercel
          provides hosting. These providers may process data in other countries
          under their respective privacy terms.
        </p>
        <h2>Your choices</h2>
        <p>
          You can request access, correction or deletion of your inquiry by
          contacting the team through the contact page. Retention periods and
          the institution’s legal contact must be confirmed before public
          launch.
        </p>
        <h2>Cookies and analytics</h2>
        <p>
          This website does not currently load advertising pixels or optional
          analytics. If optional tracking is introduced, the privacy notice and
          consent controls must be updated before activation.
        </p>
      </article>
    </>
  );
}

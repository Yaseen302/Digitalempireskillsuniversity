import { PageIntro } from "@/components/ui";
export const metadata = {
  description:
    "Website terms, course information and consultation request conditions at Digital Empire.",
  title: "Terms & Conditions",
  alternates: { canonical: "/terms" },
};
export default function Terms() {
  return (
    <>
      <PageIntro
        label="CLEAR EXPECTATIONS"
        title="Terms & conditions"
        text="Please review these website terms before making an inquiry."
      />
      <article className="section container legal">
        <h2>Educational information</h2>
        <p>
          Course descriptions introduce proposed learning topics. Admissions
          must confirm the current syllabus, trainer, delivery format, duration,
          fees and availability before enrollment. An inquiry does not create an
          enrollment contract.
        </p>
        <h2>Learning outcomes</h2>
        <p>
          No earnings, employment, business performance or investment outcome is
          guaranteed. Trading education is informational and is not personalized
          financial advice. Trading can result in financial losses.
        </p>
        <h2>Consultation requests</h2>
        <p>
          Your preferred date and time are a request. A meeting is confirmed
          only when the team explicitly agrees a slot with you.
        </p>
        <h2>Institutional status</h2>
        <p>
          The use of the Digital Empire Skills University brand name does not
          itself establish accreditation, government recognition, or
          degree-awarding authority.
        </p>
        <h2>Enrollment terms</h2>
        <p>
          Payment, cancellation, refund and certification terms must be supplied
          and accepted separately before any payment. This website does not
          collect payments.
        </p>
        <h2>Questions</h2>
        <p>
          Contact the team through the contact page for clarification. The
          institution’s legal entity and applicable jurisdiction must be
          confirmed before public launch.
        </p>
      </article>
    </>
  );
}

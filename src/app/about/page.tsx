import Image from "next/image";
import {
  Compass,
  HeartHandshake,
  Lightbulb,
  Globe2,
  BookOpen,
  Users,
} from "lucide-react";
import { PageIntro, CTA } from "@/components/ui";
export const metadata = {
  title: "About Us",
  description:
    "Discover the practical learning philosophy behind Digital Empire Skills University.",
  alternates: { canonical: "/about" },
};
export default function About() {
  return (
    <>
      <PageIntro
        label="THE AMBITION BEHIND THE EMPIRE"
        title="A bigger future begins with a practical skill."
        text="We bring purposeful learning and a business-minded outlook together, helping aspiring digital professionals find their direction."
      />
      <section className="section container about-grid">
        <div className="about-image">
          <Image
            src="/images/learning.jpg"
            alt="A learner focused on a practical laptop project"
            fill
            sizes="(max-width:760px) 90vw,45vw"
          />
        </div>
        <div>
          <span className="eyebrow">OUR STORY & PURPOSE</span>
          <h2>
            Knowledge is a beginning.
            <br />
            <span>Practice is progress.</span>
          </h2>
          <p>
            Digital Empire Skills University is a digital skills training brand
            built around a simple idea: learning should help you take meaningful
            action.
          </p>
          <p>
            Our focus is on the tools, ways of thinking, and practical knowledge
            that connect education with digital business. Whether you’re
            exploring e-commerce, marketing, or a new professional direction,
            your curiosity has a place here.
          </p>
          <p className="small-note">
            The brand name does not imply verified accreditation or
            degree-awarding status. Contact admissions for details about any
            specific certification.
          </p>
        </div>
      </section>
      <section className="soft-section">
        <div className="container mission-grid">
          <article>
            <Compass />
            <span className="eyebrow">OUR MISSION</span>
            <h2>Make practical learning purposeful.</h2>
            <p>
              Help learners understand digital opportunities, build applicable
              skills, and approach their next steps with confidence and
              responsibility.
            </p>
          </article>
          <article>
            <Globe2 />
            <span className="eyebrow">OUR VISION</span>
            <h2>Ambition without boundaries.</h2>
            <p>
              A community of curious, capable learners who use digital knowledge
              to shape their own professional and entrepreneurial futures.
            </p>
          </article>
        </div>
      </section>
      <section className="section container">
        <div className="center-heading">
          <span className="eyebrow">WHAT GUIDES US</span>
          <h2>Values that show up in the work.</h2>
        </div>
        <div className="values-grid">
          {[
            [
              Lightbulb,
              "Curiosity",
              "Ask better questions. Explore new ideas. Keep learning.",
            ],
            [
              BookOpen,
              "Practicality",
              "Connect concepts to tasks you can work through.",
            ],
            [
              HeartHandshake,
              "Integrity",
              "Clear expectations and responsible decision-making.",
            ],
            [
              Users,
              "Community",
              "Learn through shared perspectives and encouragement.",
            ],
          ].map(([Icon, title, text], i) => {
            const I = Icon as typeof Users;
            return (
              <article key={i}>
                <I />
                <h3>{title as string}</h3>
                <p>{text as string}</p>
              </article>
            );
          })}
        </div>
      </section>
      <section className="container teaching">
        <span className="eyebrow">OUR TEACHING APPROACH</span>
        <h2>Understand. Practice. Reflect. Repeat.</h2>
        <p>
          We organize learning around clear foundations, guided workflows,
          practical projects and reflection. Course-specific teaching formats
          and trainer details are confirmed by admissions for each intake.
        </p>
        <div className="trainer-note">
          <Users />
          <div>
            <h3>Meet the people behind your learning</h3>
            <p>
              Ask our team for the verified trainer profiles and current
              teaching schedule for your chosen course.
            </p>
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}

import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import { PageIntro } from "@/components/ui";
import InquiryForm from "@/components/inquiry-form";
import SocialLinks from "@/components/social-links";
import BranchMap from "@/components/branch-map";
import { WhatsAppIcon } from "@/components/whatsapp";
import { site, branches, mapsUrl, whatsappUrl } from "@/data/site";
export const metadata = {
  title: "Contact Us & Karachi Branches",
  description:
    "Contact Digital Empire in Saddar and Gulshan-e-Iqbal, Karachi. Find branch addresses, call our team or start a WhatsApp conversation.",
  alternates: { canonical: "/contact" },
};
export default function Contact() {
  return (
    <>
      <PageIntro
        label="LET’S BUILD YOUR NEXT CHAPTER"
        title="A conversation away from what’s next."
        text="Visit us in Saddar or Gulshan-e-Iqbal, ask a course question, or tell us about the future you want to build."
      />
      <section className="section container branch-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">
              TWO KARACHI LOCATIONS. ONE SHARED AMBITION.
            </span>
            <h2>
              Find your way to <span>Digital Empire.</span>
            </h2>
          </div>
          <p>
            Connect directly with your preferred branch.
            <br />
            Please call ahead to arrange your visit.
          </p>
        </div>
        <div className="branch-grid">
          {branches.map((branch, index) => (
            <article className="branch-card" key={branch.id}>
              <div className="branch-card-top">
                <span className="branch-number">0{index + 1}</span>
                <span className="eyebrow">KARACHI, PAKISTAN</span>
                <MapPin size={23} />
              </div>
              <h3>{branch.name}</h3>
              <p className="branch-address">{branch.address}</p>
              <a
                className="branch-phone"
                href={`tel:${branch.phone.replace(/\s/g, "")}`}
              >
                <Phone size={17} />
                {branch.phone}
              </a>
              <div className="branch-actions">
                <a
                  className="button whatsapp-link"
                  href={whatsappUrl(branch)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon size={17} />
                  Chat on WhatsApp <ArrowUpRight size={15} />
                </a>
                <a
                  className="inline-link"
                  href={mapsUrl(branch)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get directions <ArrowUpRight size={15} />
                </a>
              </div>
              <BranchMap branch={branch} />
            </article>
          ))}
        </div>
      </section>
      <section className="section container form-layout contact-form-section">
        <aside>
          <span className="eyebrow">EVERY BIG IDEA STARTS WITH HELLO</span>
          <h2>
            Your questions.
            <br />
            Our next conversation.
          </h2>
          <p>
            Not sure which course to choose? Tell us about your interests and
            we’ll help you explore a practical next step.
          </p>
          <div className="contact-item">
            <Mail />
            <div>
              <h3>Email our team</h3>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </div>
          </div>
          <div className="contact-socials">
            <h3>Follow the Digital Empire journey</h3>
            <SocialLinks text />
          </div>
          <div className="contact-note">
            <h3>Prefer to talk it through?</h3>
            <p>
              Share your goals in a consultation request. Our team will get in
              touch to agree a time.
            </p>
            <a className="inline-link" href="/book-a-call">
              Book a call <ArrowUpRight size={16} />
            </a>
          </div>
        </aside>
        <InquiryForm kind="contact" />
      </section>
    </>
  );
}

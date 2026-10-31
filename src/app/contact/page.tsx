import CampusVisual from "@/components/campus-visual";
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
      <section className="contact-editorial-hero container">
        <div>
          <span className="eyebrow">EVERY NEXT CHAPTER STARTS WITH HELLO.</span>
          <h1>
            Big ambitions.
            <br />
            <span>Let’s talk.</span>
          </h1>
          <p>
            A question, an idea, a new direction. Wherever you are in your
            journey, we’ll help you find your next practical step.
          </p>
          <div className="contact-hero-actions">
            <a className="button" href="#send-a-message">
              Start a conversation <ArrowUpRight size={17} />
            </a>
            <a className="inline-link" href={`mailto:${site.email}`}>
              Email our team <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="contact-hero-note">
            <span /> SADDAR & GULSHAN-E-IQBAL · KARACHI
          </div>
        </div>
        <CampusVisual />
      </section>
      <section className="contact-channel-bar container">
        <a href={`mailto:${site.email}`}>
          <Mail size={22} />
          <div>
            <span>WRITE TO US</span>
            <strong>{site.email}</strong>
          </div>
          <ArrowUpRight size={18} />
        </a>
        {branches.map((branch) => (
          <a
            key={branch.id}
            href={whatsappUrl(branch)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon size={24} />
            <div>
              <span>{branch.name.toUpperCase()}</span>
              <strong>{branch.phone}</strong>
            </div>
            <ArrowUpRight size={18} />
          </a>
        ))}
      </section>
      <section className="section container branch-section" id="our-campuses">
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
              <div
                className={`branch-architectural branch-architectural-${branch.id}`}
                aria-hidden="true"
              >
                <div className="architectural-grid" />
                <span className="architectural-city">KARACHI</span>
                <span className="architectural-label">{branch.area}</span>
                <MapPin size={35} />
              </div>
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
      <section
        className="section container form-layout contact-form-section"
        id="send-a-message"
      >
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
      <section className="contact-next-step container">
        <span className="eyebrow gold">YOUR AMBITION HAS A PLACE HERE.</span>
        <h2>
          You don’t have to
          <br />
          figure it out alone.
        </h2>
        <p>
          Explore your options with our team. A conversation is a good place to
          begin.
        </p>
        <a className="button light" href="/book-a-call">
          Find your learning path <ArrowUpRight size={17} />
        </a>
      </section>
    </>
  );
}

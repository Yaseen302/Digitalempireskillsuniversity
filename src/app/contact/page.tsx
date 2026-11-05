import CampusVisual from "@/components/campus-visual";
import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import InquiryForm from "@/components/inquiry-form";
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
      <section className="container scroll-mt-28 py-10 sm:py-14" id="send-a-message" aria-labelledby="contact-form-title">
        <div className="mx-auto mb-7 max-w-xl text-center">
          <span className="eyebrow">Contact Us</span>
          <h1 id="contact-form-title" className="my-3">Send us a message</h1>
          <p>Tell us which course you’re interested in or how we can help.</p>
        </div>
        <div className="mx-auto max-w-2xl">
          <InquiryForm kind="contact" />
        </div>
      </section>
      <section className="contact-editorial-hero container">
        <div>
          <span className="eyebrow">EVERY NEXT CHAPTER STARTS WITH HELLO.</span>
          <h2>
            Big ambitions.
            <br />
            <span>Let’s talk.</span>
          </h2>
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

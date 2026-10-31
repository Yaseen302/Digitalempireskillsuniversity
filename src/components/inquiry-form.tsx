"use client";
import { useState, useEffect } from "react";
import { ArrowUpRight, CheckCircle2, LoaderCircle } from "lucide-react";
import { courses } from "@/data/courses";
import { branches, whatsappUrl, site } from "@/data/site";
import { WhatsAppIcon } from "./whatsapp";
export default function InquiryForm({
  kind,
}: {
  kind: "contact" | "consultation" | "application";
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [selected, setSelected] = useState("");
  const [branchId, setBranchId] = useState(branches[0].id);
  const [handoffUrl, setHandoffUrl] = useState("");
  function prepareWhatsApp(button: HTMLButtonElement) {
    const form = button.form;
    if (!form?.reportValidity()) return;
    const data = Object.fromEntries(new FormData(form));
    const branch = branches.find((b) => b.id === branchId) || branches[0];
    const course =
      courses.find((c) => c.slug === data.course)?.title ||
      (data.course === "guidance" ? "Help choosing a course" : "");
    const parts = [
      `Assalam o Alaikum! I have a ${kind} inquiry for Digital Empire — ${branch.name}.`,
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      data.subject ? `Subject: ${data.subject}` : "",
      data.country ? `Country: ${data.country}` : "",
      course ? `Course: ${course}` : "",
      data.date
        ? `Preferred date: ${data.date}, time: ${data.time} (${Intl.DateTimeFormat().resolvedOptions().timeZone}). Please confirm availability.`
        : "",
      data.message ? `Message: ${data.message}` : "",
    ];
    setHandoffUrl(whatsappUrl(branch, parts.filter(Boolean).join("\n")));
  }
  useEffect(() => {
    setSelected(
      new URLSearchParams(window.location.search).get("course") || "",
    );
  }, []);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const data = Object.fromEntries(new FormData(e.currentTarget));
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          kind,
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        }),
      });
      const result = await res.json();
      if (!res.ok)
        throw new Error(
          result.error || "Unable to send your request. Please try again.",
        );
      setDone(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  }
  if (done)
    return (
      <div className="form-success" role="status">
        <CheckCircle2 size={46} />
        <h2>Your request is with us.</h2>
        <p>
          {kind === "consultation"
            ? "Our team will review your preferred time and get in touch. Your meeting is only confirmed once the team agrees a slot with you."
            : "Thank you for reaching out. Our team will review your request and respond using your contact details."}
        </p>
        <button className="button" onClick={() => setDone(false)}>
          Send another request
        </button>
      </div>
    );
  return (
    <form className="inquiry-form" onSubmit={submit}>
      <span className="eyebrow">
        {kind === "contact"
          ? "LET’S START A CONVERSATION"
          : kind === "application"
            ? "TAKE THE FIRST STEP"
            : "YOUR NEXT CHAPTER STARTS HERE"}
      </span>
      <h2>
        {kind === "contact"
          ? "Send us a message."
          : kind === "application"
            ? "Tell us about your ambitions."
            : "Let’s find your learning path."}
      </h2>
      <div className="form-grid">
        <label>
          Full name
          <input
            name="name"
            autoComplete="name"
            placeholder="Your full name"
            required
            minLength={2}
            maxLength={100}
          />
        </label>
        <label>
          Email address
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
            maxLength={254}
          />
        </label>
        <label>
          {kind === "contact" ? "Phone number" : "WhatsApp number"}
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+92 300 1234567"
            required
            pattern="\+?[0-9 ()-]{7,25}"
            maxLength={26}
          />
        </label>
        {kind === "contact" ? (
          <label>
            Subject
            <input
              name="subject"
              placeholder="How can we help?"
              required
              maxLength={150}
            />
          </label>
        ) : (
          <label>
            Country
            <input
              name="country"
              autoComplete="country-name"
              placeholder="Your country"
              required
              maxLength={100}
            />
          </label>
        )}
      </div>
      {kind !== "contact" && (
        <label>
          Interested course
          <select
            name="course"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            required
          >
            <option value="">Choose your learning path</option>
            <option value="guidance">I’d like help choosing</option>
            {courses.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.title}
              </option>
            ))}
          </select>
        </label>
      )}
      {kind === "consultation" && (
        <>
          <div className="form-grid">
            <label>
              Preferred date
              <input
                name="date"
                type="date"
                min={new Date().toLocaleDateString("en-CA")}
                required
              />
            </label>
            <label>
              Preferred time
              <input name="time" type="time" required />
            </label>
          </div>
          <p className="form-note">
            Times use your device’s time zone. This is a request, not a reserved
            appointment. Our team will confirm availability with you.
          </p>
        </>
      )}
      <label>
        {kind === "contact"
          ? "Your message"
          : "Anything else you’d like us to know?"}
        <textarea
          name="message"
          placeholder="Tell us a little about your goals…"
          rows={4}
          required={kind === "contact"}
          maxLength={3000}
        />
      </label>
      <label className="honeypot" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <label className="consent">
        <input name="consent" type="checkbox" required />
        <span>
          I agree to the <a href="/privacy">privacy policy</a> and consent to
          being contacted about my request.
        </span>
      </label>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <button className="button" type="submit" disabled={busy}>
        {busy ? (
          <>
            <LoaderCircle className="spin" size={17} />
            Sending your request…
          </>
        ) : (
          <>
            {kind === "contact"
              ? "Send message"
              : kind === "application"
                ? "Request enrollment"
                : "Request a consultation"}
            <ArrowUpRight size={17} />
          </>
        )}
      </button>
      <div className="whatsapp-form-option">
        <div>
          <WhatsAppIcon size={19} />
          <strong>Prefer to send these details on WhatsApp?</strong>
        </div>
        <label>
          Choose your branch
          <select
            value={branchId}
            onChange={(e) => {
              setBranchId(e.target.value);
              setHandoffUrl("");
            }}
          >
            {branches.map((branch) => (
              <option key={branch.id} value={branch.id}>
                {branch.name}
              </option>
            ))}
          </select>
        </label>
        <button
          className="button whatsapp-link"
          type="button"
          onClick={(e) => prepareWhatsApp(e.currentTarget)}
        >
          Prepare WhatsApp message <ArrowUpRight size={16} />
        </button>
        {handoffUrl && (
          <div className="whatsapp-handoff" role="status">
            <strong>Your message is ready.</strong>
            <p>
              Open WhatsApp and press Send there. Your details have not been
              sent or saved by this step. Consultation times need confirmation
              from our team.
            </p>
            <a href={handoffUrl} target="_blank" rel="noopener noreferrer">
              Open WhatsApp to send <ArrowUpRight size={15} />
            </a>
          </div>
        )}
      </div>
      <div className="form-direct-contact">
        <span>Prefer to contact us directly?</span>
        <div>
          {branches.map((branch) => (
            <a
              key={branch.id}
              href={whatsappUrl(branch)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon size={14} />
              {branch.name}
            </a>
          ))}
          <a href={`mailto:${site.email}`}>Email our team</a>
        </div>
      </div>
      <p className="form-note">
        Your information is used to respond to your inquiry. No earnings or
        admission outcome is guaranteed.
      </p>
    </form>
  );
}

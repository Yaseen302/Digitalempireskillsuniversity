import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { courses } from "@/data/courses";
export const runtime = "nodejs";
export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");
  let sameOrigin = false;
  try {
    const parsed = new URL(origin || "");
    sameOrigin =
      ["http:", "https:"].includes(parsed.protocol) &&
      parsed.host === req.headers.get("host");
  } catch {}
  if (!sameOrigin)
    return NextResponse.json(
      { error: "Please submit the form from this website." },
      { status: 403 },
    );
  if (Number(req.headers.get("content-length") || 0) > 16000)
    return NextResponse.json(
      { error: "Your message is too long." },
      { status: 413 },
    );
  let raw;
  try {
    const text = await req.text();
    if (text.length > 16000)
      return NextResponse.json(
        { error: "Your message is too long." },
        { status: 413 },
      );
    raw = JSON.parse(text);
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!raw || typeof raw !== "object" || Array.isArray(raw))
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  if (raw.website) return NextResponse.json({ ok: true });
  const clean = (key: string, max: number) =>
    typeof raw[key] === "string" ? raw[key].trim().slice(0, max) : "";
  const kind = clean("kind", 20),
    name = clean("name", 100),
    email = clean("email", 254),
    phone = clean("phone", 26),
    message = clean("message", 3000),
    subject = clean("subject", 150),
    country = clean("country", 100),
    course = clean("course", 80),
    date = clean("date", 10),
    time = clean("time", 5),
    timeZone = clean("timeZone", 100);
  if (
    !["contact", "consultation", "application"].includes(kind) ||
    name.length < 2 ||
    !/^\S+@\S+\.\S+$/.test(email) ||
    !/^\+?[0-9 ()-]{7,25}$/.test(phone) ||
    raw.consent !== "on" ||
    (kind === "contact" && (!subject || !message)) ||
    (kind !== "contact" &&
      (!country ||
        !["guidance", ...courses.map((c) => c.slug)].includes(course)))
  )
    return NextResponse.json(
      { error: "Please check all required fields and your contact details." },
      { status: 400 },
    );
  if (
    kind === "consultation" &&
    (!/^\d{4}-\d{2}-\d{2}$/.test(date) ||
      !/^([01]\d|2[0-3]):[0-5]\d$/.test(time) ||
      !Number.isFinite(Date.parse(date)) ||
      Date.parse(date) < Date.now() - 86400000)
  )
    return NextResponse.json(
      { error: "Please choose a valid upcoming date and time." },
      { status: 400 },
    );
  const url = process.env.SUPABASE_URL,
    key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (
    !url ||
    !key ||
    !process.env.RESEND_API_KEY ||
    !process.env.NOTIFICATION_EMAIL ||
    !process.env.NOTIFICATION_FROM
  )
    return NextResponse.json(
      {
        error:
          "Online requests are not available yet. Please try again once our admissions service is connected.",
      },
      { status: 503 },
    );
  const db = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  // Database function enforces a shared, transactional rate limit across server instances.
  const { data, error } = await db.rpc("submit_inquiry", {
    payload: {
      kind,
      name,
      email,
      phone,
      message,
      subject,
      country,
      course,
      preferred_date: date || null,
      preferred_time: time || null,
      time_zone: timeZone,
      consent: true,
    },
  });
  if (error) {
    const limited = error.message.includes("rate_limit");
    return NextResponse.json(
      {
        error: limited
          ? "Too many requests. Please try again in an hour."
          : "We couldn’t save your request. Please try again.",
      },
      { status: limited ? 429 : 500 },
    );
  }
  const escaped = (s: string) =>
    s.replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c]!,
    );
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.NOTIFICATION_FROM,
        to: [process.env.NOTIFICATION_EMAIL],
        subject: `New Digital Empire ${kind} request`,
        reply_to: email,
        html:
          `<h2>New ${kind} request</h2><p>Reference: ${escaped(String(data))}</p>` +
          Object.entries({
            name,
            email,
            phone,
            subject,
            country,
            course,
            date,
            time,
            timeZone,
            message,
          })
            .map(([k, v]) => `<p><b>${k}</b>: ${escaped(v)}</p>`)
            .join(""),
      }),
    });
    if (response.ok)
      await db
        .from("inquiries")
        .update({ notification_sent: true })
        .eq("id", data);
  } catch {
    /* Saved request remains available to admissions even if email delivery fails. */
  }
  return NextResponse.json({ ok: true, reference: data }, { status: 201 });
}

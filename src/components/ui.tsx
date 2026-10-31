import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Crown, ArrowRight } from "lucide-react";
import { courses } from "@/data/courses";
export function Logo() {
  return (
    <Link className="logo" href="/" aria-label="Digital Empire home">
      <Image
        className="logo-image"
        src="/images/digital-empire-logo.webp"
        alt="Digital Empire Skill University"
        width={228}
        height={85}
        priority
      />
    </Link>
  );
}
export function Button({
  href,
  children,
  light = false,
}: {
  href: string;
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <Link className={`button ${light ? "light" : ""}`} href={href}>
      {children}
      <ArrowUpRight size={17} />
    </Link>
  );
}
export function CourseCard({
  course: c,
}: {
  course: (typeof courses)[number];
}) {
  return (
    <Link className="course-card" href={`/courses/${c.slug}`}>
      <div className={`course-art ${c.color}`}>
        <span className="art-grid" />
        <span className="platform">
          {c.word === "SHOPIFY" ? (
            <span className="shopping-bag">S</span>
          ) : null}
          {c.word}
        </span>
        <span className="art-tag">THE NEXT CHAPTER IS YOURS</span>
        <ArrowUpRight className="art-arrow" size={24} />
      </div>
      <div className="course-content">
        <span className="eyebrow">{c.category}</span>
        <h3>{c.title}</h3>
        <p>{c.description}</p>
        <div className="course-bottom">
          <span>Practical learning</span>
          <span>
            Explore course <ArrowRight size={15} />
          </span>
        </div>
      </div>
    </Link>
  );
}
export function PageIntro({
  label,
  title,
  text,
}: {
  label: string;
  title: string;
  text: string;
}) {
  return (
    <section className="page-intro">
      <div className="container">
        <span className="eyebrow gold">{label}</span>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
    </section>
  );
}
export function CTA() {
  return (
    <section className="container cta">
      <div>
        <span className="eyebrow gold">YOUR NEXT CHAPTER</span>
        <h2>Your digital future starts here.</h2>
        <p>Big ambitions start with one practical step. Let’s take yours.</p>
      </div>
      <Button href="/book-a-call" light>
        Find your learning path
      </Button>
    </section>
  );
}

"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import CourseMenu from "./course-menu";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, MessageCircle, ArrowRight } from "lucide-react";
import { Logo } from "./ui";
import { site, branches, whatsappUrl } from "@/data/site";
import WhatsAppWidget from "./whatsapp";
import SocialLinks from "./social-links";
export function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 20);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <>
      <div className="announcement premium-announcement">
        <div className="container">
          <span>
            <span className="announcement-dot" /> KARACHI CAMPUSES · GLOBAL
            AMBITIONS
          </span>
          <span>
            Learn today. <strong>Earn tomorrow.</strong>
          </span>
          <Link href="/contact">
            Find your campus <ArrowUpRight size={12} />
          </Link>
        </div>
      </div>
      <header className={`premium-header ${scrolled ? "header-scrolled" : ""}`}>
        <div className="container nav">
          <div className="header-brand">
            <Logo />
          </div>
          <button
            className="menu-toggle"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
          >
            {open ? <X /> : <Menu />}
          </button>
          <nav className={open ? "open" : ""}>
            {[
              ["/", "Home"],
              ["/about", "About us"],
              ["/courses", "Courses"],
              ["/contact", "Contact"],
              ["/book-a-call", "Book a call"],
            ].map(([href, label]) =>
              href === "/courses" ? (
                <CourseMenu
                  key={href}
                  active={path.startsWith("/courses")}
                  onNavigate={() => setOpen(false)}
                />
              ) : (
                <Link
                  key={href}
                  href={href}
                  className={`${path === href ? "active" : ""} ${href === "/book-a-call" ? "nav-consultation" : ""}`}
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              ),
            )}
            <Link
              className="nav-apply mobile-apply"
              href="/apply"
              onClick={() => setOpen(false)}
            >
              Apply now <ArrowUpRight size={16} />
            </Link>
          </nav>
          <Link className="header-apply" href="/apply">
            Start your journey <ArrowUpRight size={17} />
          </Link>
        </div>
      </header>
    </>
  );
}
export function Footer() {
  return (
    <footer>
      <div className="container footer-grid">
        <div>
          <Logo />
          <p>
            Practical skills. Real possibilities.
            <br />
            Your next chapter starts with learning.
          </p>
          <SocialLinks />
          <span className="footer-tag">
            Build Skills. Build Income. Build Empire.
          </span>
        </div>
        <div>
          <h4>Explore</h4>
          <Link href="/about">About Digital Empire</Link>
          <Link href="/courses">Our courses</Link>
          <Link href="/book-a-call">Book a consultation</Link>
          <Link href="/contact">Get in touch</Link>
        </div>
        <div>
          <h4>Learning paths</h4>
          <Link href="/courses?category=E-commerce">E-commerce</Link>
          <Link href="/courses?category=Digital%20Marketing">
            Digital marketing
          </Link>
          <Link href="/courses?category=Digital%20Business">
            Digital business
          </Link>
          <Link href="/courses?category=Trading%20Education">
            Trading education
          </Link>
        </div>
        <div>
          <h4>Let’s talk about your future</h4>
          <p>
            Have a goal in mind? We’ll help you
            <br />
            find where to begin.
          </p>
          <Link className="footer-contact" href="/contact">
            Contact our team <ArrowUpRight size={17} />
          </Link>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          {branches.map((branch) => (
            <div className="footer-branch" key={branch.id}>
              <strong>{branch.name}</strong>
              <span>{branch.area}</span>
              <a href={`tel:${branch.phone.replace(/\s/g, "")}`}>
                {branch.phone}
              </a>
              <a
                href={whatsappUrl(branch)}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp <ArrowUpRight size={12} />
              </a>
            </div>
          ))}
        </div>
      </div>
      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} Digital Empire Skills University
        </span>
        <div>
          <Link href="/privacy">Privacy policy</Link>
          <Link href="/terms">Terms & conditions</Link>
        </div>
        <span>Learn today. Earn tomorrow.</span>
      </div>
      <WhatsAppWidget />
    </footer>
  );
}

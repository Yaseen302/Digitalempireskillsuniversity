"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import CourseMenu from "./course-menu";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, MessageCircle, ArrowRight, LockKeyhole } from "lucide-react";
import { Logo } from "./ui";
import { site, branches, whatsappUrl, mapsUrl } from "@/data/site";
import WhatsAppWidget from "./whatsapp";
import SocialLinks from "./social-links";
export function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 20);
    update();
    window.addEventListener("scroll", update, { passive: true });  return () => window.removeEventListener("scroll", update);
  }, []);
  if(path.startsWith("/admin")) return null;
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
          <Link className="header-apply" href="/contact">
            Contact Us <ArrowUpRight size={17} />
          </Link>
        </div>
      </header>
    </>
  );
}
export function Footer() {
  const path = usePathname();
  if (path.startsWith("/admin")) return null;

  return (
    <footer style={{ background: "#f6f8fb", padding: "40px 0 28px" }}>
      <div className="container rounded-[32px] px-6 py-9 sm:px-10 sm:py-12"
        style={{ maxWidth: 1100, color: "#fff", background: "linear-gradient(130deg, #081c40, #124391)", boxShadow: "0 20px 48px -30px #081c40" }}>
        <div className="grid gap-9 md:grid-cols-[1.2fr_0.85fr_1fr]">
          <div>
            <div className="inline-flex rounded-xl bg-white px-3 py-2"><Logo /></div>
            <p className="mt-4" style={{ color: "#dce8fb", fontSize: 14 }}>Practical training in e-commerce, digital marketing and online business in Karachi.</p>
            <h4 className="mb-3 mt-5 font-bold" style={{ color: "#f2cc76" }}>Karachi campuses</h4>
            {branches.map(branch => (
              <div key={branch.id} className="mb-4 text-sm leading-relaxed" style={{ color: "#dce8fb" }}>
                <strong className="block text-white">{branch.name}</strong>
                <span className="block">{branch.address}</span>
                <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
                  <a href={mapsUrl(branch)} target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "#f2cc76" }}>Get directions</a>
                  <a href={`tel:${branch.phone.replace(/\s/g, "")}`} style={{ color: "#fff" }}>{branch.phone}</a>
                </div>
              </div>
            ))}
          </div>
          <div>
            <h4 className="mb-3 font-serif text-xl font-bold" style={{ color: "#fff" }}>Training</h4>
            <ul className="m-0 grid list-none gap-3 p-0 text-sm">
              {[
                ["/courses?category=E-commerce", "E-commerce & Freelancing"],
                ["/forex-trading", "Forex Trading"],
                ["/courses?category=Digital%20Marketing", "Digital Marketing & AI Tools"],
                ["/courses", "All courses"],
              ].map(([href, label]) => (
                <li key={href}><Link className="hover:underline" href={href} style={{ color: "#e4edff" }}>{label}</Link></li>
              ))}
            </ul>
            <h4 className="mb-3 mt-7 font-serif text-xl font-bold" style={{ color: "#fff" }}>Services</h4>
            <Link className="text-sm hover:underline" href="/services" style={{ color: "#e4edff" }}>Our services</Link>
          </div>
          <div>
            <h4 className="mb-3 font-serif text-xl font-bold" style={{ color: "#fff" }}>Get in touch</h4>
            <div className="grid gap-3">
              <a className="flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#f2cc76] px-4 py-2 text-sm font-bold hover:bg-[#ffe09c]" href={whatsappUrl(branches[0])} target="_blank" rel="noopener noreferrer" style={{ color: "#081c40" }}>
                <MessageCircle size={17} aria-hidden="true" /> WhatsApp us
              </a>
              <Link className="flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-4 py-2 text-sm font-bold hover:bg-white/20" href="/contact" style={{ color: "#fff" }}>
                Contact us <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </div>
            <a className="mt-4 inline-block break-all text-sm hover:underline" href={`mailto:${site.email}`} style={{ color: "#e4edff" }}>{site.email}</a>
            <h4 className="mb-2 mt-5 text-sm font-bold" style={{ color: "#f2cc76" }}>Follow us</h4>
            <SocialLinks />
          </div>
        </div>
        <div className="mt-7 flex flex-col items-center gap-3 border-t border-white/20 pt-5 text-center text-xs" style={{ color: "#dce8fb" }}>
          <span>© {new Date().getFullYear()} Digital Empire Skills University. All rights reserved.</span>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <Link href="/privacy" style={{ color: "inherit" }}>Privacy policy</Link>
            <Link href="/terms" style={{ color: "inherit" }}>Terms &amp; conditions</Link>
            <Link className="inline-flex items-center gap-1.5" href="/admin" style={{ color: "#f2cc76" }}><LockKeyhole size={13} aria-hidden="true" /> Admin Login</Link>
          </div>
        </div>
      </div>
      <WhatsAppWidget />
    </footer>
  );
}

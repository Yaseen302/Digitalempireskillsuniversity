import TrafficTracker from "@/components/traffic-tracker";
import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/plus-jakarta-sans";
import "./globals.css";
import "./editorial.css";
import "./cms-public.css";
import { branches, socials, site } from "@/data/site";
import { Header, Footer } from "@/components/chrome";
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  verification: { google: "uc1BC9eJusZGvRn0XHjD560xjflH9E9_6HVw2XR1VsI" },
  title: {
    default: "Digital Skills & E-commerce Courses in Karachi | Digital Empire",
    template: "%s | Digital Empire",
  },
  description:
    "Shopify, Amazon, Etsy, digital marketing and web development courses in Karachi. Visit Digital Empire Skills University in Saddar or Gulshan-e-Iqbal.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Digital Empire Skills University",
    images: [
      {
        url: "/images/empire-banner.webp",
        width: 1400,
        height: 933,
        alt: "Digital Empire — Build Skills. Build Income. Build Empire.",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <TrafficTracker />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "@id": site.url + "/#organization",
              logo: site.url + "/images/digital-empire-logo.webp",
              areaServed: { "@type": "City", name: "Karachi" },
              name: site.name,
              email: site.email,
              sameAs: socials
                .filter((s) => s.label !== "Facebook")
                .map((s) => s.url),
              contactPoint: branches.map((branch) => ({
                "@type": "ContactPoint",
                telephone: branch.phone,
                contactType: "admissions",
                areaServed: "PK",
                availableLanguage: ["English", "Urdu"],
              })),
              location: branches.map((branch) => ({
                "@type": "Place",
                name: branch.name,
                address: {
                  "@type": "PostalAddress",
                  streetAddress: branch.address,
                  addressLocality: "Karachi",
                  addressCountry: "PK",
                },
              })),
              url: site.url,
            }),
          }}
        />
      </body>
    </html>
  );
}

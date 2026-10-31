import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/plus-jakarta-sans";
import "./globals.css";
import { branches, socials, site } from "@/data/site";
import { Header, Footer } from "@/components/chrome";
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Digital Empire Skills University | Learn Today. Earn Tomorrow.",
    template: "%s | Digital Empire",
  },
  description:
    "Build practical digital skills in e-commerce, digital marketing and online business. Explore your next learning path with Digital Empire.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Digital Empire Skills University",
    images: [
      {
        url: "/images/empire-banner.webp",
        width: 1536,
        height: 1024,
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
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

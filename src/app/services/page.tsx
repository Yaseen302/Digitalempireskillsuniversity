import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata = {
  title: "E-commerce, Software, SEO & Digital Marketing Services in Karachi",
  description: "Explore Digital Empire’s Shopify development, Amazon and Etsy management, SEO, Meta Ads, ERP, mobile app development and creative services in Karachi.",
  alternates: { canonical: "/services" },
};

const groups = [
  {
    "id": "e-commerce-marketplace-services",
    "title": "E-commerce Marketplace Services",
    "description": "Get help choosing a marketplace, preparing listings and organizing inventory and fulfillment. Share your target market, platform and existing catalog so we can discuss where you need support.",
    "items": [
      "Amazon FBA / FBM",
      "Amazon Wholesale",
      "Amazon Private Label",
      "Amazon Account Management",
      "Shopify Store Development",
      "Shopify Dropshipping",
      "Shopify Private Label",
      "Walmart Marketplace",
      "eBay Store Management",
      "Etsy Store Management",
      "TikTok Shop Setup & Management",
      "Daraz Store Management",
      "AliExpress Sourcing",
      "Alibaba Sourcing",
      "Temu Seller Business Guidance",
      "Noon Marketplace",
      "SHEIN Marketplace Guidance",
      "Product Hunting & Research",
      "Product Listing Optimization",
      "Product Launch & Scaling",
      "International Dropshipping",
      "Wholesale Business Setup",
      "Print on Demand (POD)",
      "Digital Products Selling"
    ]
  },
  {
    "id": "software-technology-development",
    "title": "Software & Technology Development",
    "description": "Build a storefront, business application or integration around how your team works. Tell us which systems you already use and which tasks you want to simplify.",
    "items": [
      "Website Development",
      "E-commerce Website Development",
      "Custom Web Application Development",
      "ERP Development",
      "SaaS Development",
      "CRM Development",
      "OMS Development",
      "POS Software Development",
      "Inventory Management Software",
      "Warehouse Management System (WMS)",
      "HRM Software",
      "Accounting Software",
      "Billing Software",
      "School Management System",
      "Hospital Management System",
      "Restaurant Management System",
      "Booking Management System",
      "Custom Dashboard Development",
      "API Development & Integration",
      "AI Software Development",
      "AI Chatbot Development",
      "WhatsApp Automation",
      "Workflow Automation",
      "Payment Gateway Integration",
      "Shopify App Development",
      "WordPress Plugin Development"
    ]
  },
  {
    "id": "mobile-app-development",
    "title": "Mobile App Development",
    "description": "Plan a mobile app for customers, vendors or your internal team. Bring the main tasks users need to complete and the devices you want to support.",
    "items": [
      "Android App Development",
      "iOS App Development",
      "Cross-Platform App Development",
      "Flutter App Development",
      "React Native Development",
      "E-commerce Mobile Apps",
      "Business Management Apps",
      "Delivery Rider Apps",
      "Customer Apps",
      "Vendor Apps",
      "Custom Mobile Applications",
      "App Maintenance & Support"
    ]
  },
  {
    "id": "digital-marketing-advertising",
    "title": "Digital Marketing & Advertising",
    "description": "Plan campaigns around your audience, offer and budget. Discuss account setup, tracking and reporting before launching paid campaigns.",
    "items": [
      "Meta Ads (Facebook & Instagram)",
      "Google Ads",
      "TikTok Ads",
      "Snapchat Ads",
      "Pinterest Ads",
      "LinkedIn Ads",
      "YouTube Ads",
      "Performance Marketing",
      "Media Buying",
      "PPC Management",
      "Lead Generation",
      "Conversion Campaigns",
      "Retargeting Campaigns",
      "Influencer Marketing",
      "Affiliate Marketing",
      "Email Marketing",
      "SMS Marketing",
      "WhatsApp Marketing",
      "Marketing Automation",
      "Marketing Strategy & Consulting"
    ]
  },
  {
    "id": "seo-organic-growth",
    "title": "SEO & Organic Growth",
    "description": "Improve how customers discover your store, website or listings. Start with the pages you want to improve and the searches that matter to your customers.",
    "items": [
      "Technical SEO",
      "On-Page SEO",
      "Off-Page SEO",
      "Local SEO",
      "International SEO",
      "E-commerce SEO",
      "Shopify SEO",
      "WordPress SEO",
      "Amazon SEO",
      "Etsy SEO",
      "YouTube SEO",
      "Keyword Research",
      "Competitor Analysis",
      "Link Building",
      "Content SEO",
      "Google Business Profile Optimization"
    ]
  },
  {
    "id": "branding-business-launch",
    "title": "Branding & Business Launch",
    "description": "Develop a brand and prepare it for launch. Share your target customer, product range and timeline to discuss positioning, packaging and sourcing.",
    "items": [
      "Brand Launch",
      "Brand Identity Development",
      "Business Naming",
      "Logo Design",
      "Brand Strategy",
      "Brand Positioning",
      "Product Branding",
      "Private Label Branding",
      "Packaging Design",
      "Product Packaging",
      "Business Plan Development",
      "Business Model Development",
      "Market Research",
      "Competitor Research",
      "Product Sourcing",
      "Supplier Hunting",
      "Product Manufacturing Coordination",
      "Business Consulting"
    ]
  },
  {
    "id": "company-registration-legal-setup",
    "title": "Company Registration & Legal Setup",
    "description": "Ask about company registration and business setup assistance. Requirements vary by jurisdiction, and regulated work depends on availability through qualified professionals.",
    "items": [
      "USA LLC Formation",
      "UK LTD Formation",
      "USA EIN Assistance",
      "UK Company Registration",
      "Pakistan Business Registration",
      "NTN Registration",
      "STRN Registration",
      "FBR Registration Assistance",
      "SECP Company Registration",
      "Sole Proprietorship Registration",
      "Trademark Registration Assistance",
      "Brand Registration",
      "Payoneer Business Setup Guidance",
      "International Business Setup",
      "Business Compliance Assistance"
    ]
  },
  {
    "id": "creative-content-production",
    "title": "Creative & Content Production",
    "description": "Commission product photos, video or graphics for your store, social channels or advertising. Bring a brief with the formats and deadlines you need.",
    "items": [
      "Graphic Designing",
      "Video Editing",
      "Motion Graphics",
      "2D Animation",
      "3D Animation",
      "Product Video Creation",
      "Product Photography",
      "Commercial Video Ads",
      "UGC Content Creation",
      "Social Media Reels",
      "YouTube Video Editing",
      "Podcast Editing",
      "Corporate Videos",
      "Brand Promotional Videos",
      "AI Video Creation",
      "AI Image Generation",
      "Thumbnail Designing",
      "Social Media Post Designing",
      "Presentation Designing"
    ]
  },
  {
    "id": "ui-ux-product-design",
    "title": "UI/UX & Product Design",
    "description": "Design a website, app or dashboard around the tasks your users need to complete. Explore wireframes and prototypes before committing to development.",
    "items": [
      "UI Design",
      "UX Design",
      "Website UI/UX",
      "Mobile App UI/UX",
      "SaaS Dashboard Design",
      "Admin Panel Design",
      "Wireframing",
      "Prototyping",
      "Figma Design",
      "Design Systems",
      "Landing Page Design",
      "Website Redesign",
      "User Journey Mapping",
      "Conversion-Focused Design"
    ]
  },
  {
    "id": "cro-analytics",
    "title": "CRO & Analytics",
    "description": "Identify where visitors drop off and set up tracking for the actions that matter. Discuss your current traffic, funnel and measurement setup.",
    "items": [
      "Conversion Rate Optimization (CRO)",
      "Landing Page Optimization",
      "Funnel Development",
      "Sales Funnel Optimization",
      "A/B Testing",
      "Heatmap Analysis",
      "User Behavior Analysis",
      "Google Analytics 4",
      "Google Tag Manager",
      "Meta Pixel Setup",
      "Conversion API Setup",
      "Server-Side Tracking",
      "E-commerce Analytics",
      "Revenue Tracking",
      "Attribution Tracking"
    ]
  },
  {
    "id": "logistics-e-commerce-operations",
    "title": "Logistics & E-commerce Operations",
    "description": "Organize inventory, dispatch, returns and support across your selling channels. Share your current order volume, courier setup and operational constraints.",
    "items": [
      "Warehouse Setup",
      "Fulfillment Services",
      "Order Fulfillment",
      "Inventory Management",
      "Stock Management",
      "Courier Integration",
      "COD Management",
      "Returns Management",
      "Reverse Logistics",
      "Order Processing",
      "Customer Support Outsourcing",
      "Call Center Setup",
      "Product Inspection",
      "Packaging & Labeling",
      "International Shipping Solutions",
      "3PL Solutions",
      "Dropshipping Fulfillment"
    ]
  },
  {
    "id": "social-media-management",
    "title": "Social Media Management",
    "description": "Plan and manage content for the channels where your audience spends time. Discuss posting schedules, community replies and reporting.",
    "items": [
      "Facebook Page Management",
      "Instagram Management",
      "TikTok Account Management",
      "YouTube Channel Management",
      "LinkedIn Management",
      "Pinterest Management",
      "Social Media Strategy",
      "Community Management",
      "Content Calendar",
      "Social Media Growth",
      "Influencer Collaboration",
      "Personal Branding",
      "Corporate Social Media Management"
    ]
  },
  {
    "id": "training-consultancy",
    "title": "Training & Consultancy",
    "description": "Explore practical training or one-to-one guidance for your business. Tell us what you already know and what you want to learn or build next.",
    "items": [
      "Amazon Training",
      "Shopify Training",
      "Etsy Training",
      "eBay Training",
      "Walmart Training",
      "TikTok Shop Training",
      "Digital Marketing Training",
      "SEO Training",
      "Web Development Training",
      "App Development Training",
      "Graphic Designing Training",
      "Video Editing Training",
      "AI Tools Training",
      "Freelancing Training",
      "E-commerce Business Consultancy",
      "Business Mentorship"
    ]
  }
];

export default function Services() {
  return (
    <>
      <section className="bg-[#081c40] bg-gradient-to-br from-[#081c40] to-[#143d75] py-14 text-center sm:py-20">
        <div className="container">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest" style={{ color: "#f2cc76" }}>Digital Empire · Karachi</p>
          <h1 className="mx-auto max-w-4xl" style={{ color: "#fff" }}>E-commerce, Software &amp; Digital Marketing Services</h1>
          <p className="mx-auto mt-5 max-w-2xl" style={{ color: "#dce8fb" }}>Talk to our Karachi team about building a store, managing marketplaces, developing software or growing your business online.</p>
          <Link className="button light mt-6" href="/contact">Discuss your project <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
      </section>
      <section className="container py-12 sm:py-16" aria-label="Services directory">
        <nav className="mb-10 flex flex-wrap gap-2" aria-label="Service categories">
          {groups.map(({id,title}) => <a key={id} href={`#${id}`} className="rounded-full border border-[#dce6f4] bg-[#f4f7fc] px-4 py-2 text-sm font-semibold text-[#124391] hover:bg-[#e3edfa]">{title}</a>)}
        </nav>
        <div className="grid items-start gap-5 lg:grid-cols-2">
          {groups.map(({id,title,description,items}) => (
            <article key={id} id={id} className="scroll-mt-32 rounded-3xl border border-[#dce6f4] bg-white p-6 shadow-sm sm:p-8">
              <h2 className="mb-3 text-2xl">{title}</h2>
              <p className="mb-5 leading-relaxed">{description}</p>
              <ul className="grid list-none gap-2 p-0 sm:grid-cols-2">
                {items.map(item => <li key={item} className="rounded-lg border border-[#e5ecf5] bg-[#f5f8fc] px-3 py-2 text-sm text-[#0b285b]">{item}</li>)}
              </ul>
            </article>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link className="button" href="/contact">Contact our Karachi team <ArrowUpRight size={17} aria-hidden="true" /></Link>
          <Link className="inline-link" href="/courses">Explore courses</Link>
        </div>
      </section>
    </>
  );
}

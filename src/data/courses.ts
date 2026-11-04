export const categories = [
  "All courses",
  "E-commerce",
  "Digital Marketing",
  "Digital Business",
  "Trading Education",
];
const entries = [
  [
    "Shopify E-commerce",
    "Build a store. Build your own brand.",
    "E-commerce",
    "shopify",
    "SHOPIFY",
    "green",
  ],
  [
    "Amazon FBA & FBM",
    "Turn product research into a business.",
    "E-commerce",
    "amazon",
    "amazon",
    "orange",
  ],
  [
    "Digital Marketing",
    "Connect brands with the right people.",
    "Digital Marketing",
    "marketing",
    "Digital marketing",
    "blue",
  ],
  [
    "Etsy E-commerce",
    "Bring your creative business to life.",
    "E-commerce",
    "etsy",
    "Etsy",
    "orange",
  ],
  [
    "eBay Business",
    "Discover the world of online selling.",
    "E-commerce",
    "ebay",
    "ebay",
    "blue",
  ],
  [
    "TikTok Shop",
    "Where content meets commerce.",
    "E-commerce",
    "tiktok",
    "TikTok Shop",
    "dark",
  ],
  [
    "YouTube Automation",
    "Build a thoughtful content operation.",
    "Digital Business",
    "youtube",
    "YouTube",
    "red",
  ],
  [
    "Walmart Marketplace",
    "Explore a new marketplace opportunity.",
    "E-commerce",
    "walmart",
    "Walmart",
    "blue",
  ],
  [
    "Forex Trading",
    "Understand markets. Manage your risk.",
    "Trading Education",
    "forex",
    "Forex education",
    "dark",
  ],
  [
    "Meta Ads",
    "Plan, create and measure social campaigns.",
    "Digital Marketing",
    "meta",
    "Meta Ads",
    "blue",
  ],
  [
    "Google Ads",
    "Reach people at the moment of intent.",
    "Digital Marketing",
    "google",
    "Google Ads",
    "green",
  ],
  [
    "Social Media Marketing",
    "Build an engaged brand community.",
    "Digital Marketing",
    "social",
    "Social media",
    "orange",
  ],
  [
    "Performance Marketing",
    "Make data part of your decisions.",
    "Digital Marketing",
    "performance",
    "Performance",
    "blue",
  ],
  [
    "Freelancing and Online Business",
    "Turn your skills into a professional service.",
    "Digital Business",
    "freelancing",
    "Freelancing",
    "green",
  ],
  [
    "Technical Analysis",
    "Learn to interpret market charts.",
    "Trading Education",
    "technical",
    "Technical analysis",
    "dark",
  ],
  [
    "Price Action",
    "Study price movement and market structure.",
    "Trading Education",
    "price-action",
    "Price action",
    "dark",
  ],
  [
    "Risk Management",
    "Put responsible decision-making first.",
    "Trading Education",
    "risk",
    "Risk management",
    "dark",
  ],
];
entries.push(["Daraz E-commerce","Explore Daraz Seller Center, product listings, pricing, order fulfillment and marketplace operations.","E-commerce","daraz","Daraz E-commerce","blue"]);
entries.push(["WordPress","Explore WordPress website setup, themes, plugins, page building, backups and website maintenance.","Digital Business","wordpress","WordPress","blue"]);
entries.push(["WooCommerce","Explore WooCommerce product catalogs, checkout configuration, shipping, payments and store management.","E-commerce","woocommerce","WooCommerce","blue"]);
entries.push(["Magento / Adobe Commerce","Explore Magento catalog structure, store administration, checkout workflows and commerce project planning.","E-commerce","magento","Magento / Adobe Commerce","blue"]);
entries.push(["ERP Systems","Explore ERP business workflows, inventory records, purchasing, sales processes and reporting.","Digital Business","erp","ERP Systems","blue"]);
entries.push(["Order Management Systems (OMS)","Explore order management, stock synchronization, fulfillment, returns and multi-channel operations.","Digital Business","oms","Order Management Systems (OMS)","blue"]);
entries.push(["Graphic Designing","Explore graphic design fundamentals, typography, layout, brand identity and portfolio development.","Digital Business","graphic-design","Graphic Designing","blue"]);
entries.push(["Video Editing","Explore video editing workflows, timeline organization, cuts, audio, captions and export settings.","Digital Business","video-editing","Video Editing","blue"]);
export const courses = entries.map(
  ([title, description, category, slug, word, color]) => ({
    title,
    description,
    category,
    slug,
    word,
    color,
    level: "Beginner friendly",
    duration: "Contact admissions for the current schedule",
    format: "Ask admissions about available learning formats",
    modules: [
      {
        title: "01 · Foundations & opportunities",
        lessons: [
          "Understand the landscape and terminology",
          "Define your goals and learning plan",
        ],
      },
      {
        title: "02 · Tools & practical workflows",
        lessons: [
          "Get familiar with essential tools",
          "Follow a guided practical workflow",
        ],
      },
      {
        title: "03 · Planning & execution",
        lessons: [
          "Develop a practical project plan",
          "Review quality, risks and responsible practice",
        ],
      },
      {
        title: "04 · Your next steps",
        lessons: [
          "Present your learning project",
          "Build a plan for continued practice",
        ],
      },
    ],
  }),
);
export { site } from "./site";

/** Public institution information supplied by the owner. Keep future updates here. */
export const branches = [
  {
    id: "saddar",
    name: "Saddar Branch",
    area: "Saddar, Karachi",
    phone: "+92 332 3605392",
    whatsapp: "923323605392",
    address:
      "Office No. 408, 4th Floor, Building Panorama Centre 1, Opposite Zainab Market, Near Askari Bank, Atrium Mall, Saddar, Karachi.",
  },
  {
    id: "gulshan",
    name: "Gulshan Branch",
    area: "Gulshan-e-Iqbal, Karachi",
    phone: "+92 327 2452001",
    whatsapp: "923272452001",
    address:
      "Office No. 206, 2nd Floor, Gulshan Trade Center, Near MCB Bank & Sindh Bank, Gulshan-e-Iqbal, Karachi, Pakistan.",
  },
];
export const socials = [
  {
    label: "Instagram",
    url: "https://www.instagram.com/digitalempireuniversity/",
  },
  {
    label: "Facebook",
    url: "https://www.facebook.com/photo/?fbid=221140227705469&set=a.118439044642255",
  },
  { label: "YouTube", url: "https://www.youtube.com/@alibuttempire" },
];
export const site = {
  name: "Digital Empire Skills University",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://digital-empire-skills-university.vercel.app",
  tagline: "Learn Today. Earn Tomorrow.",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "digitalempire999@gmail.com",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || branches[0].phone,
  address: process.env.NEXT_PUBLIC_BRANCH_ADDRESS || branches[0].address,
};
export function whatsappUrl(
  branch: (typeof branches)[number],
  message = "Assalam o Alaikum! I would like to know more about courses at Digital Empire Skills University.",
) {
  return `https://wa.me/${branch.whatsapp}?text=${encodeURIComponent(message)}`;
}
export function mapsUrl(branch: (typeof branches)[number]) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.address)}`;
}

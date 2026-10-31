# Validation report

Validated in the current cloud workspace on 2026-10-31.

- Production build: passed (Next.js 16.4.3, webpack; 31 generated entries including metadata and 17 course detail paths).
- TypeScript: passed `npm run typecheck`.
- Chromium integration suite: **8 tests passed**.
- Pages checked: Home, About, Courses, Contact, Book a Call, Apply, Privacy, Terms and Shopify course detail.
- Courses: discovery, category filtering, search, no-result recovery, detail navigation and curriculum accordion passed.
- Mobile: navigation and horizontal-overflow checks passed at 390px on six representative pages. Desktop and mobile screenshots inspected.
- Brand and artwork: transparent crown wordmark and custom 3D hero banner loaded successfully. 3D motion pause/play and reduced-motion handling passed.
- Contact data: both supplied Karachi addresses, `+92 332 3605392`, `+92 327 2452001`, email, public Instagram profile and maps embedding controls passed.
- WhatsApp: branch picker opens/closes and resolves to each correct international number. Form handoff includes the entered details and selected branch without falsely claiming a send, database save or booking confirmation. Actual sending is done by the visitor in WhatsApp.
- Online forms: validation, unavailable-backend state, malformed request rejection and cross-origin rejection passed.
- Custom 404, robots and sitemap responses passed. Canonical and sitemap URLs default to the owner-supplied production domain.
- Browser runtime errors: none observed on homepage and contact-page checks.

## External services and launch status

The owner supplied `https://digital-empire-skills-university.vercel.app/` and the Vercel team workspace. A direct request to that deployment encountered a proxy 403 destination restriction. The exact Vercel hosts were saved in the environment draft; applying/publishing the settings remains a user action. No authenticated Vercel CLI configuration, Vercel token variable or outbound deployment identity was available.

No Supabase project or Resend credentials were provided. Live database insertion, migration execution, notification delivery and production form delivery remain unrun. The SQL migration and server integrations are included. The online submission endpoint returns 503 until required settings exist; visitors can use the verified email, phone or WhatsApp handoff now.

No live Core Web Vitals or Safari/Firefox measurements were run. Confirm actual syllabuses, duration, fees, trainer availability and legal policies before accepting enrollment. Trainer images will be supplied later. Illustrative photos do not represent actual facilities or testimonials.

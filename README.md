# Digital Empire Skills University

A custom Next.js 16 / React / TypeScript / Tailwind website. Includes five main pages, 17 searchable course paths, statically generated course pages, admission inquiries, consultation requests, policy pages and technical SEO.

## Local development

Requires Node.js 22 or 24 and npm. Use the existing checkout; cloud tasks are already isolated, so do not create a worktree unless explicitly requested.

```sh
npm ci
npm run dev
```

```sh
npm run typecheck
npm run build
npm start
```

Webpack is selected because the managed environment restricts Turbopack's worker port bindings. All assets and fonts are served locally. The homepage uses a custom generated 3D banner with CSS perspective, pointer tilt, gently floating layers and orbit animation. Motion can be paused, respects reduced-motion preferences, and does not require WebGL. Student imagery is illustrative, not a testimonial or institutional photograph.

## Connect inquiries

1. Create a Supabase project and run `supabase/schema.sql` in its SQL editor. The table has RLS enabled and no anonymous access. Its service-only function atomically limits submissions to four per email per hour.
2. Create a Resend account and verify a sending domain.
3. Copy `.env.example` to `.env.local` and set the values privately, or configure them in Vercel. Service-role and Resend keys are server-only. Never prefix these keys with `NEXT_PUBLIC_`.
4. Configure `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `NOTIFICATION_EMAIL`, and `NOTIFICATION_FROM`. No secret values are included in this repository.
5. Verify a real form submission is stored and a notification arrives. Requests are saved before notification; failed email delivery leaves `notification_sent=false` for follow-up. Email is an institution notification, not a false booking confirmation.

Forms support a WhatsApp handoff now: fill the fields, choose Saddar or Gulshan, prepare a message and open WhatsApp to send it yourself. This does not claim a database save or confirmed booking. The online server submission returns an explicit unavailable error until integrations are configured. Client and server validation, same-origin checks, size limits, consent and a honeypot are included. The database limit protects an individual email; configure Vercel Firewall rate limiting on `/api/inquiries` before public launch to address distributed abuse. Monitor unsent notifications and define the institutional retention policy.

## Content and identity

- Update `src/data/courses.ts` for course copy and learning paths. Indicative curriculum must be checked against the actual syllabus before accepting enrollments.
- Public contact information, both Karachi branches, international phone numbers and supplied social links are centralized in `src/data/site.ts`. The Instagram login redirect is normalized to the public profile. The Facebook link intentionally opens the exact supplied photo; a Facebook Page URL was not provided. Google Maps load only when the visitor expands a branch map.
- The supplied crown/wordmark is reproduced as a transparent website logo asset. A custom 3D navy/blue/gold banner is included in `public/images/empire-banner.webp`. Trainer photos will be supplied later.
- Real student reviews and trainer identities are intentionally unpublished until verified content is supplied.
- Confirm the legal entity, retention period, refund/enrollment terms and jurisdiction before public launch. No accreditation or earnings claims are made.
- Optional analytics are not loaded. Introduce consent controls before adding nonessential cookies/pixels. Urdu can be added via localized app routes and a shared translation/content layer; no unlaunched hreflang variants are emitted.

## Vercel deployment

1. Push this source to your GitHub repository and import it into your existing Vercel project. Select Next.js, root directory `.`, build command `npm run build`.
2. Add the server-only integration variables in Vercel project settings and public contact variables. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS domain without a trailing slash. Redeploy after changes to public variables.
3. Connect the custom domain in Vercel, apply the DNS records Vercel provides, and wait for certificate issuance. DNS values depend on your account/domain and cannot be guessed.
4. Run route, form, metadata and mobile checks on the deployment URL. Submit one real inquiry and confirm its database record and email delivery. Verify course dates, prices and formats with admissions.

The owner supplied `https://digital-empire-skills-university.vercel.app/` as the production URL and `https://vercel.com/yaseen302s-projects` as the Vercel workspace. The supplied production origin is the default for canonical, sitemap and social metadata; `NEXT_PUBLIC_SITE_URL` can override it for a future custom domain. A public site URL does not provide authenticated deployment access. Direct remote checks encountered a cloud egress policy denial. Required exact hosts have been saved in the environment configuration draft and need review/save/publication in environment settings. Supabase and Resend credentials remain absent. No live deployment verification is claimed.

## Verification

`npm run build` generates all course paths; `npm run typecheck` checks types. Browser integration checks are in `tests/website.spec.ts`. They test live pages, filters, navigation, errors and backend validation, without pretending a disconnected database can receive submissions.

## Updating the existing Vercel site

In Vercel, open the Digital Empire project → Settings → Git and connect `Yaseen302/Digitalempireskillsuniversity` with production branch `main`, if not already connected. Changes pushed to that branch can then trigger Vercel automatically. Check the deployment status in Vercel; a successful Git push alone does not prove a deployment succeeded. Do not post Vercel tokens, Supabase service-role keys or email API keys in chat.

## Premium platform branding

The sticky header includes a keyboard-operable course menu and a compact scroll state. Original SVG platform logos are used in the homepage brand strip, floating 3D scene and applicable course cards. Sources are recorded in `public/logos/SOURCES.md`. Assets preserve their brand colors and proportions. Animation pause and reduced-motion support apply to the enhanced scene.

## Editorial layout

`src/app/editorial.css` contains the final editorial theme, applied after the shared base styles. Desktop navigation is centered independently of the logo and CTA widths. Below 1000px it switches to the mobile menu. Home includes learning-path bento links and FAQs; Contact includes a larger campus introduction, direct channels, branch illustrations and maps. Decorative campus artwork is schematic; actual directions use the supplied addresses on Google Maps.

The homepage hero has been restored to the earlier full-width navy design at the owner’s request. The centered navigation, expanded homepage sections and redesigned contact page are retained.

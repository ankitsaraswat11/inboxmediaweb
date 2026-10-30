# Inbox Media - Angular website
Run: `npm install && npm start` (http://localhost:4200). Build: `npm run build`.

## Structure
Standalone components + Angular Router (lazy routes). Content lives in `src/app/data.ts`.
Pages: Home, Capabilities, AI Solutions, About (ecosystem), Contact / Book a Demo.

## Before launch (as per the presentation)
- Set the real enquiry endpoint in `contact.component.ts` (`ENQUIRY_ENDPOINT`). Test end to end: validation passing in the browser does not mean the lead reached the company.
- Verify claims internally: positioning, tagline, brand relationships, certification, "15+ years". None are used as facts here.
- Add logos, brand colours, case studies, Industries and Integrations pages once content is approved.
- SEO: run `ng add @angular/ssr` for SSR/prerendering, then add sitemap and canonical URLs. Preserve existing URLs via redirects.
- Add analytics for the KPIs on slide 12.

## Update
Added: animated hero, reusable `app-flow` flowchart on every page, `/roadmap` page. Related brand names removed from the project.
Homepage v3: draggable channel nodes in the hero, drag/arrow carousel for capabilities, AI solution tabs, and a sticky 5-step section guide (Who we are, What we do, AI solutions, How it works, Get started).

## v4: reference-style redesign
Navy sticky navbar with dropdown panels and mobile burger menu, pill + gradient hero with draggable channels, keyword ticker, image cards, multi-column footer. Responsive breakpoints: 1024, 900, 560 px. Images live in `public/images`.

## v5: inboxmedia.in structure and theme
Navigation, content, sections and footer follow https://inboxmedia.in/. The logo is loaded from the site's own URL (`logo-white.svg`); download it into `public/images/` for production and change `LOGO` in `app.component.ts`.
Colours are CSS variables at the top of `src/styles.css` (--navy, --blue, --accent). They were inferred from the site's asset names (deep purple / deep orange), not read from its stylesheet: replace them with the official brand hex values.

## v6: fixes from the review documents
A. Contact: single enquiry wizard (demo / proposal / message), only relevant fields, consent, honeypot spam field, honest success/error. Link into it with `/contact?type=demo|proposal|message`. Still needs the real endpoint, server-side validation, rate limiting and lead-delivery testing.
B. AI Solutions: per-product workflow, integrations, deployment, implementation scope and evidence. "To be confirmed" fields are deliberately unfilled.
C. Homepage: "What are you trying to solve?" paths.
D. Certifications page: certificate number, body, scope, validity shown as pending approval.
E. Timeline: "Since 2009" plus a computed year count (`FOUNDED` in `data.ts`). Confirm the wording and exact anniversary. Removed the hard-coded "15+ years" and "2x ISO" claims from the homepage.
F. SEO: per-route meta descriptions, canonical links, Organization JSON-LD, robots.txt, sitemap.xml, Integrations and Resources pages. Add SSR with `ng add @angular/ssr`.
Visual direction: light pages, dark sections for hero and AI showcase, calmer cards, diagram instead of card grids. Colours remain proposed tokens, not official brand values.

# eazyaccess.org — plan

**Decided (16 Nov 2026):**
- Show six projects. Athari Press is left out until its shop opens.
- Promise a reply within 2 working days.
- Enquiries go to info@eazyaccess.org.
- The old Eazy Access brand is obsolete.

## 0. Ponytail pass
- **Removed:**
  - a framework (Next/Astro): the site is one static HTML/CSS page
  - JS animation libraries: native scroll-driven CSS, View Transitions and `@starting-style` do the motion
  - a CMS and a database: six projects are hard-coded
  - reCAPTCHA: Turnstile does the job
  - a separate page per case study: out of scope
- **Kept:** one Worker for the contact form. The page has to send email somewhere, and a mailto link alone loses people (Locomotive and Lusion both do this).

## 1. Gate map
| Gate | Boundary | Wrong value that could slip through | Check that fails loudly | Owner |
|---|---|---|---|---|
| A | Form to Worker | Bot or spam post | Worker rejects a missing or invalid Turnstile token; test posts without one → 403 | T5 |
| B | Form to Worker | Oversized or malformed fields, header injection in the email or name | Server-side length and format checks, CR/LF stripped; tests post bad email, 10 kB message, `\r\nBcc:` → 400 | T5 |
| C | Worker to Email Service | Enquiry accepted (200) but email never sent | Worker returns 200 only after the send succeeds, otherwise 502 and the page shows the direct email link; test forces a send failure | T5 |
| D | Worker to visitor's inbox | Auto-reply goes to an attacker-chosen address many times (relay abuse) | Auto-reply only after Turnstile passes, rate limit per IP; test sends 6 posts in 1 min → 429 | T5 |
| E | Personal data | Enquiry contents logged or stored | Nothing persisted, no body logged; grep the Worker for `console.log(body)` | T5 |
| F | DNS | eazyaccess.org still points at Azure, or a change breaks shop.eazyaccess.org or email routing | Ask before the change; afterwards `dig` plus a fetch of `/` and shop.eazyaccess.org both return 200 | T6 |
| G | Page to visitor | Contact form missing or off-screen on a phone | Playwright at 375×812: contact action in the first screen, form within 1.2 screens, targets ≥24×24 | T7 |

## 2. Task graph
| Task | One job | Owns | Needs | Runs alongside |
|---|---|---|---|---|
| T1 | Inventory and screenshots | inventory/ | — | T2 (done) |
| T2 | Motion and layout research | inventory/RESEARCH.md | — | T1 (done) |
| T3 | Brand: two directions, then tokens and guideline boards in Paper | Paper file | T1, T2, your pick | — |
| T4 | Page design at 1440 and 375 in Paper, critiqued | Paper file | T3 | — |
| T5 | Contact Worker with Turnstile, Email Service, rate limit | worker/ | — | T4 |
| T6 | Static page build and deploy, DNS (asks first) | site/, wrangler.jsonc | T4, T5 | — |
| T7 | Verification: Lighthouse, axe, 375×812, real phone enquiry, slopmonster | report | T6 | — |

## 3. Handover
Each task records the files it changed, the check command and its output, and the gates it closed. A fresh-context reviewer checks that before the next task starts.

## Split into pages (17 Nov 2026)

Ponytail pass: no framework or templating dependency. One ~40-line `build.mjs` (node stdlib) wraps page fragments in `pages/` with the shared head, header, menu and footer, and writes `public/`. Without it, ten pages would each carry their own copy of the header and footer. Wrangler runs it on dev and deploy.

| Gate | Boundary | Wrong value that could cross silently | Check that fails loudly | Owner |
|---|---|---|---|---|
| G1 | page → Worker | Turnstile key not swapped on /contact in local dev (HTMLRewriter only runs on run_worker_first paths) | test: every built page with `.cf-turnstile` is in `run_worker_first` | T2 |
| G2 | Worker → browser (no-JS) | 303 still sends visitors to `/?contact=…` on the old one-page home | existing redirect test tightened to `/contact?contact=sent` | T2 |
| G3 | page → page | an internal link to a page that doesn't exist (404) | test: every `href="/…"` in `public/` resolves to a built file | T2 |
| G4 | rule | a page that's only a jump link, or two pages sharing a title | test: every page has a unique `<title>`, a description and a canonical, and main nav links are paths, not `#` | T2 |
| G5 | browser | main.js throwing on pages without the form or menu pieces | load every page at 375 and 1440, zero console errors | T5 |
| G6 | copy → reader | a feature or number on a work page with no source | each work-page claim traced to a file or live URL in the research notes; slopmonster 5/5 | T4 |
| G7 | existing gates A–E | contact gates regress after the move | the existing 20 Worker tests | T2 |

| Task | One job | Files it owns | Needs | Runs alongside |
|---|---|---|---|---|
| T1 | Research the six products from their repos | none (reports only) | — | T2, T3 |
| T2 | Build script, layout, gates G1–G4 + G7 | build.mjs, pages/_layout, test/site.test.js, wrangler.jsonc, src/contact.js redirect | — | T1 |
| T3 | Home, /work/, /how-we-work, /contact, legal pages as fragments | pages/*.html, styles.css, main.js | T2 | T1 |
| T4 | Six /work/<name> pages | pages/work/*.html | T1, T3 | — |
| T5 | Measure 375×812, console, slopmonster, deploy, test email | qa/ | T4 | — |

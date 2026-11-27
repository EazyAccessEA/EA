# CLAUDE.md — eazy/access (v4, Nov 2026)

## Identity
eazy/access is a small UK studio that designs and builds websites, shops and tools. It's one person. The portfolio is six of the studio's own live products. There are no paying clients yet, so never imply there are.

The old "permanent capital vehicle" positioning, the founder letter and `eazyaccess-*.jsx` are **obsolete**. Don't build from them. The old Next.js `site/` was deleted on 22 Nov 2026 (owner's decision).

## What the site is
A multi-page marketing site at eazyaccess.org, following the global "No long-scroll sites" rule: a short home page, one page per project under `/work/<name>`, How we work, and Contact. Contact is the single goal on every page. The v4 build in `public/` is still one long page; it must be split before it counts as done.

Promises the copy may make (confirmed by the owner, 16 Nov 2026; the two-working-day reply promise was withdrawn on 23 Nov 2026, so never use it):
- One person: whoever replies is the person building the site.
- The client owns the domain, hosting and logins from day one. A client's agreement can change this (owner, 26 Nov 2026): for a Shopify shop built as a client transfer store, the studio holds the store until launch and then transfers it, and the agreement says so and discloses Shopify's referral commission (clause in `inventory/shopify/plan.md`).
- A fixed price per stage, and nothing extra unless the client agrees it in writing.
- The launch date is agreed before work starts.

Don't promise that clients can edit their own site. The owner hasn't confirmed it.

Company details (for the legal pages only, never the home page): EAZY ACCESS LTD, registered in England and Wales, company number 13205428, registered office 71–75 Shelton Street, Covent Garden, London WC2H 9JQ, ICO registration ZC137268. Enquiry emails are kept for two years after last contact. Working hours (shown in the site's status line): Monday to Friday, 09:00–17:00 UK time.

## Design (source: Paper file "Eazy Access — brand and site", page "v4 — our own")
- **Ground** `#F3F3F1`, **ink** `#0B0B0C`, **secondary text** `#3F3F44` / `#5E5E62`, **rule** `#E2E2DF`, **dark pill** `#141416`.
- **Slash orange** `#E8663A` is the only accent.
- **Type:**
  - Degular Display 600 for display.
  - Degular 400/500 for body.
  - IvyPresto Display Italic for the one orange accent word per heading.
  - Fonts come from the owner's Adobe Fonts web project, which must use Adobe's embed code. Never self-host them.
- **Wordmark:** `public/brand/wordmark-*.svg`, outlined from Degular Display Semibold.
  - The slash is drawn at 22.1° from vertical with a 0.108em stroke, matching the "y" diagonal.
  - Never retype it as text.
- **Hero (v6.2, Paper "v5 — pages"):** one 2.6 s sequence per visit, ending still. The headline lines rise out of their masks, the slash slides in along its own axis, and the wordmark opens outward from the slash. A hairline grid leans at the slash angle (after 21st.dev Grid Pulse, MIT). An orange pulse runs once along the slash's column; on desktop, cells light where the mouse passes. Phones: the wordmark sits above the sticky bar, and the header wordmark hides while the big one is on screen. Reduced motion shows the final frame.
- **Work:** each site on a tilted phone, set on a panel in that site's own brand colour.
- **Paper and Affinity together:**
  - **Paper** is for screens: site pages, components, email templates, and social and ad layouts. Its theme in "Eazy Access — brand and site" is the source of truth for colour, type and spacing.
  - **Affinity** is for vector and print: the wordmark and slash geometry, icons, illustration, photo editing, and anything printed (business cards, signage, print PDFs with bleed and CMYK).
  - **Handoff:** draw vectors in Affinity, export them as SVG into `public/brand/`, then place them in Paper. Never redraw an Affinity asset in Paper or code.
  - **One palette:** Affinity swatches and text styles copy the Paper theme. When a brand value changes, update the Paper theme first, then Affinity, then the CSS.

## Stack
- Static `public/` (HTML, CSS, a little JS), served by a Cloudflare Worker (`src/worker.js`) as static assets.
- `/api/contact` posts to the Worker. It checks Turnstile, validates, sends through the Resend API (free tier) to info@eazyaccess.org, then sends a fixed-text auto-reply. Mail itself stays on Google Workspace; never move MX records.
- **Every email we send uses our style**: the branded layout in `src/email.js` (wordmark PNG from the site's origin, ground `#F3F3F1`, white card, ink text, one orange IvyPresto-style accent word per heading via a Georgia fallback, company details in the footer), plus a plain-text part. Email clients can't load Adobe Fonts, so type falls back to system sans. Inline styles and tables only.
- `npm test` runs the Worker's gate tests (node:test). Every gate has a test that has been shown to fail.
- Hosting: Cloudflare. DNS for eazyaccess.org is changed only after the owner approves.
- **Agreements are signed in DocuSeal** at sign.eazyaccess.org: DocuSeal 3.4.0 in Docker (container `docuseal`) on the Hetzner server in Helsinki (`ssh hetzner`), data in `/opt/docuseal/data/docuseal` (SQLite and attachments), no outside database or storage. It sends its emails through Resend over SMTP (smtp.resend.com, port 587) from info@eazyaccess.org. Its emails use our house layout from `ops/docuseal/mailer.html.erb`, mounted read-only over DocuSeal's own layout (see `ops/docuseal/README.md`; DocuSeal's attribution line stays). Its data is in the server's nightly restic backup (Hetzner Object Storage hel1, plus Cloudflare R2 EU), and the uptime monitor checks sign.eazyaccess.org. The privacy notice covers what it records (name, email, signature, IP, browser, time zone, times).
- **VAT:** EAZY ACCESS LTD isn't registered for VAT. Every agreement and invoice says so in words: "We aren't registered for VAT, so no VAT is added."

## Rules before calling anything done
- Measure at 375×812 and report the numbers:
  - Where the primary action sits.
  - Every tap target at least 24×24.
- Run Lighthouse and axe, and report the numbers.
- Edit reader-facing copy with the `humanizer` skill. Check every claim against the confirmed promises above. Never invent proof, metrics or testimonials. Ads get a five-second test with real people before they run.
- Never log or store enquiry contents.

## Git
Feature branches. Concise, imperative commit messages. No AI attribution in commits or PRs.

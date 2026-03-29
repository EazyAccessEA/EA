<p align="center">
  <br />
  <strong>E A Z Y A C C E S S</strong>
  <br />
  <em>The permanent home for British software.</em>
  <br />
  <br />
  <a href="https://eazyaccess.org">eazyaccess.org</a>
</p>

---

EazyAccess is a permanent capital vehicle for British software. We build and acquire tools for the serious, practical parts of British life — documents, education, agriculture, family finance — and hold them permanently.

No venture capital. No exit pressure. No timeline except: *is this better than it was last year?*

<br />

## The Portfolio

| Product | Domain | What it does |
|---------|--------|-------------|
| **OneSchool** | [oneschool.co.uk](https://oneschool.co.uk) | Unified operating system for UK primary schools |
| **HushRealm** | [hushrealm.co.uk](https://hushrealm.co.uk) | Private document vault for life's important papers |
| **PagePerfect** | [pageperfect.studio](https://pageperfect.studio) | Professional document publishing without a designer |
| **FarmCompanion** | [farmcompanion.co.uk](https://farmcompanion.co.uk) | The definitive directory of UK farms |
| **AllowanceGuard** | [allowanceguard.com](https://allowanceguard.com) | Family financial control and allowance management |

Five products today. Thirty within fifteen years. Every one held permanently.

<br />

## Six Convictions

1. **No dark patterns.** Earn trust before asking for anything.
2. **British by substance.** Not American software with a £ sign.
3. **Permanent ownership.** We will never sell.
4. **Design is respect.** Bad design is a values problem.
5. **Privacy is infrastructure.** GDPR is the floor, not the ceiling.
6. **Fewer things, done better.** Simple is the hardest thing to build.

<br />

## Repository

```
EA/
├── site/                    Next.js 14 production site
│   ├── src/app/             App Router pages
│   ├── src/components/      UI + Brand components
│   ├── src/lib/             Products, domains, types
│   └── tailwind.config.ts   Design tokens
├── CLAUDE.md                Design standards & project rules
└── README.md                This file
```

Reference files (not deployed):

| File | Purpose |
|------|---------|
| `eazyaccess-brand.jsx` | Brand system specification |
| `eazyaccess-complete.jsx` | Original portfolio specification |
| `eazyaccess-v4-oneschool.jsx` | V4 light-theme visual reference |
| `eazyaccess-founder-document (2).md` | Founder letter (philosophical source of truth) |

<br />

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 3.4 + CSS custom properties |
| Fonts | Cormorant (display), Outfit (body), Geist Mono (utility) |
| Animation | CSS transitions + Intersection Observer only |
| Deployment | Vercel |

No external animation libraries. No CSS-in-JS. No runtime styling overhead.

<br />

## Development

```bash
cd site
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000).

### Build

```bash
npm run build    # Production build
npm start        # Serve production build
npm run lint     # ESLint
```

### Deploy

The site is configured for `eazyaccess.org` via Vercel. Deploy the `site/` directory.

<br />

## Design System

The parent site uses a **warm light theme** — trust, establishment, permanence.

### Palette

| Token | Hex | Role |
|-------|-----|------|
| Background | `#FDFCFA` | Page background |
| Surface | `#F4F1EC` | Alternating sections, cards |
| Ink | `#141210` | Primary text |
| Mid | `#5C5852` | Body text |
| Accent | `#C8622A` | Ember — the master accent |
| Void | `#0A0A0C` | Dark sections, footer |

Each product carries its own brand palette scoped via `data-brand` attribute.

### Typography

**Cormorant** (italic) for display. **Outfit** for body. **Geist Mono** for metadata.

Body text is 15–17px at weight 400 minimum. Eyebrows are 11px minimum. Display type never exceeds 100px. These are hard rules documented in `CLAUDE.md`.

### Standards

Complete design standards — typography scales, spacing minimums, animation parameters, section structure, and inviolable rules — are documented in [`CLAUDE.md`](./CLAUDE.md). That file is the authoritative reference for all design and development decisions.

<br />

## Architecture Decisions

**Why permanent capital vehicle, not startup?** Startups optimise for exit. Every product you've loved that got worse was a startup that exited. We optimise for twenty-year ownership.

**Why light theme?** The warm palette signals establishment and trust — John Lewis, not a VC pitch. The one exception: the "We Will Never Sell" section uses a dark background for deliberate contrast.

**Why no animation libraries?** CSS transitions and Intersection Observer handle everything this site needs. External libraries add weight, complexity, and an aesthetic that fights the restraint this brand requires.

**Why 5 homepage sections, not more?** A homepage is a curated first impression, not a comprehensive overview. Every section earns its place by answering a visitor's question. Revenue projections and platform architecture live on inner pages.

<br />

## The Test

Every decision — product, design, content, code — is tested against:

> *Does this serve the organisation we are trying to build in fifteen years, or only the one we have today?*

<br />

---

<p align="center">
  <sub>
    EazyAccess Ltd · United Kingdom · est. 2025
    <br />
    No venture capital. No products sold. No data sold. Ever.
  </sub>
</p>

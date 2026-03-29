# CLAUDE.md — EazyAccess

## Identity

EazyAccess is a permanent capital vehicle for British software. Not a startup. Not a fund. A portfolio of tools built and acquired for the serious, practical parts of British life — held permanently, never sold.

The ambition: £1B valuation over 15 years through patient, revenue-funded growth. 30+ products across 7 domains. The model is Constellation Software meets 37signals, made British.

**The six convictions (non-negotiable):**
1. No dark patterns. Earn trust before asking for anything.
2. British life deserves British software — not American software with a £ sign.
3. Permanent ownership beats exit-seeking. We will never sell.
4. Design is respect. Bad design is a values problem.
5. Privacy is infrastructure, not a feature. GDPR is the floor.
6. Simple is the hardest thing to build. Fewer things, done better.

## Repository Structure

```
EA/
├── site/                        # Next.js 14 production site (eazyaccess.org)
│   ├── src/
│   │   ├── app/                 # App Router pages
│   │   ├── components/
│   │   │   ├── ui/              # Shared UI (Nav, Footer, Button, FadeIn)
│   │   │   └── brand/           # Brand components (LogoMark, ProductCard, etc.)
│   │   └── lib/                 # Data layer (products, domains, types)
│   ├── public/brand/            # Logo SVGs, press assets
│   └── tailwind.config.ts
├── eazyaccess-brand.jsx         # Brand system reference (do not deploy)
├── eazyaccess-complete.jsx      # Portfolio spec reference (do not deploy)
├── eazyaccess-v4-oneschool.jsx  # V4 light-theme reference with OneSchool (do not deploy)
├── eazyaccess-founder-document (2).md  # The founder letter (source of truth for philosophy)
└── CLAUDE.md                    # This file
```

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS 3.4 + CSS custom properties (design tokens)
- **Fonts (parent site):** Cormorant (display/italic), Outfit (body/sans), Geist Mono (utility)
- **Fonts (sub-brand product pages):** DM Serif Display (display), DM Sans (body)
- **Animations:** CSS transitions + Intersection Observer (NO external animation libraries)
- **Deployment:** Vercel
- **Package manager:** npm

## Design System

### Theme Direction
The parent site (eazyaccess.org) uses a **light, warm theme** — not dark. The light palette signals trust, establishment, and permanence (John Lewis, not a VC-backed startup). The ONE exception: the "We Will Never Sell" section uses a dark background for dramatic contrast.

### Master Palette (Light Theme)
| Token | Hex | Usage |
|-------|-----|-------|
| `--color-bg` | `#FDFCFA` | Page background |
| `--color-surface` | `#F4F1EC` | Cards, raised surfaces |
| `--color-surface-deep` | `#EDE8E0` | Deeper surface |
| `--color-rule` | `#DDD8D0` | Borders, dividers |
| `--color-rule-light` | `#EDE9E3` | Subtle dividers |
| `--color-ink` | `#141210` | Primary text |
| `--color-ink-mid` | `#3D3A36` | Secondary text |
| `--color-mid` | `#6E6A64` | Tertiary text |
| `--color-faint` | `#A8A49E` | Ghost text, labels |
| `--color-ghost` | `#D4CFC8` | Decorative numerals |
| `--color-accent` | `#C8622A` | Ember — master accent |
| `--color-accent-dark` | `#A84F20` | Accent hover state |
| `--color-accent-bg` | `#F6EDE4` | Accent background tint |

### Product Brand Colors
Each product has its own palette scoped via `data-brand="slug"`:
- **HushRealm** — Purple (#5B4FD4), dark bg
- **PagePerfect** — Prussian Blue (#1B3D5C), parchment bg
- **FarmCompanion** — Leaf Green (#3A6824), oat bg
- **AllowanceGuard** — Gold (#9C7200), warm white bg
- **OneSchool** — Teal Blue (#1A5276), ice bg

### Typography Hierarchy
- **Display:** Cormorant italic, `clamp(48px, 7vw, 88px)` for hero, smaller for sections
- **Eyebrow:** Outfit, 10px, weight 500, `letter-spacing: 0.2em`, uppercase
- **Body:** Outfit, 13-15px, weight 300-400, `line-height: 1.8`
- **Heading:** Outfit, 15-17px, weight 600
- **Mono:** Geist Mono, 10px, for URLs, data labels, metadata

### Animation Pattern
All scroll animations use a single `FadeIn` client component:
- Intersection Observer with configurable threshold
- CSS transition: `opacity 0.6-0.9s ease`, `transform: translateY(10-20px)`
- Staggered children via `transitionDelay`
- Once triggered, stays visible (observer disconnects)
- NO spring physics, NO Framer Motion, NO GSAP

## Products (5 Active)

| # | Name | Domain | Category | Status |
|---|------|--------|----------|--------|
| 1 | HushRealm | hushrealm.co.uk | Private Document Vault | Define & Build |
| 2 | PagePerfect | pageperfect.studio | Document Publishing | Build |
| 3 | FarmCompanion | farmcompanion.co.uk | UK Farm Directory | Build |
| 4 | AllowanceGuard | allowanceguard.com | Family FinTech | Define |
| 5 | OneSchool | oneschool.co.uk | School Management Platform | Define & Build |

## Seven Domains

1. Life Administration (HushRealm, AllowanceGuard) — £15-20M ARR potential
2. Education (OneSchool) — £5-10M ARR potential
3. Professional Publishing (PagePerfect) — £3-8M ARR potential
4. British Land & Agriculture (FarmCompanion) — £2-5M ARR potential
5. Small British Business — Planned
6. British Property — Planned
7. Health Administration — Planned

## Site Pages

| Route | Purpose | Priority |
|-------|---------|----------|
| `/` | Homepage — 8 sections, the full story | Critical |
| `/products` | Portfolio overview | High |
| `/products/[slug]` | Individual product pages (5) | High |
| `/philosophy` | The 6 decisions — adapted from founder document | Critical |
| `/founders` | Letter to founders considering selling | Critical |
| `/about` | Company story | Medium |
| `/press` | Press kit, assets, contact | Medium |
| `/privacy` | Privacy policy | Required |

## Platform Infrastructure (Referenced, Not Built Yet)

- **EazyAccess ID** — Single identity across all products
- **EazyAccess Vault** — Encrypted document storage (built for HushRealm, shared across portfolio)
- **EazyAccess Pay** — Unified billing, family subscription plan
- **EazyAccess Acquire** — Acquisition playbook and integration process

## Coding Conventions

### Components
- Use `"use client"` only when needed (scroll listeners, state, Intersection Observer)
- Server components by default
- Components in `src/components/ui/` (shared) or `src/components/brand/` (brand-specific)
- Props interfaces defined inline or co-located — no separate types file unless shared

### Styling
- Tailwind for layout and spacing
- CSS custom properties for colors and design tokens
- Inline styles only when dynamic (hover states in client components)
- No CSS modules, no styled-components

### Content
- All product data lives in `src/lib/products.ts`
- Domain data lives in `src/lib/domains.ts`
- Copy is written in components, not in separate content files (yet)
- Tone: "37signals meets a very good British solicitor" — direct, considered, completely without hype

### Brand Voice Rules
- Say less than you could
- Authority, not arrogance
- Human, not corporate
- Never: "industry-leading", "best-in-class", "excited to announce", "leverage", "synergy"
- Always: short sentences, active voice, concrete specifics over vague claims

## Git Workflow

- Feature branches: `claude/<feature-name>-<id>`
- Commit messages: concise, imperative mood
- Push to feature branch, never directly to main
- No force pushes without explicit permission

## What NOT to Build

- No waitlist/email capture yet (earn trust first)
- No pricing on parent site (each product handles its own)
- No blog yet (Phase 2)
- No authentication (Phase 2)
- No analytics beyond basic Vercel Analytics
- No cookie banners (we don't use cookies — state this clearly)
- No chatbots, no popups, no dark patterns of any kind

## Reference Documents

When making design or content decisions, consult in this order:
1. This CLAUDE.md (authoritative)
2. `eazyaccess-founder-document (2).md` (philosophical source of truth)
3. `eazyaccess-v4-oneschool.jsx` (visual/layout reference for light theme)
4. `eazyaccess-brand.jsx` (brand system reference)
5. `eazyaccess-complete.jsx` (original portfolio spec)

## The Test

Every decision about products, design, content, and code should be tested against:
> "Does this serve the organisation we are trying to build in fifteen years, or only the one we have today?"

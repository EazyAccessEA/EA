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

---

## Design Standards (Inviolable)

These standards were established by a council of 6 expert designers and are **non-negotiable**. Any future change must meet or exceed these standards. Do not regress on any of these rules.

### The Six Design Principles

1. **Whitespace is confidence.** Generous spacing signals quality. Never compress sections to "fit more in." If it feels spacious, it is correct.
2. **Every section earns its place.** If content reads like a pitch deck or investor material, it does not belong on a public-facing page. The homepage answers visitor questions, not board questions.
3. **Typography is readable first.** Body text must be legible at a glance. Thin, small text is not "elegant" — it is a barrier.
4. **Fewer elements, each perfect.** Removing decoration, divider lines, and visual noise always improves the design. Restraint is the highest skill.
5. **Sections need visual distinction.** Alternating backgrounds, not thin rules, create rhythm between sections.
6. **Animation is subtle.** Premium animation is barely noticeable. Large movements and long durations feel cheap.

### Master Palette (Light Theme)

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-bg` | `#FDFCFA` | Page background |
| `--color-surface` | `#F4F1EC` | Alternating sections, card backgrounds |
| `--color-surface-deep` | `#EDE8E0` | Deeper surface |
| `--color-rule` | `#DDD8D0` | Borders, card outlines |
| `--color-rule-light` | `#EDE9E3` | Subtle borders (hover targets) |
| `--color-ink` | `#141210` | Primary text |
| `--color-ink-mid` | `#3D3A36` | Secondary text |
| `--color-mid` | `#5C5852` | Body text (raised from #6E6A64 for readability) |
| `--color-faint` | `#918D87` | Labels, eyebrows (raised from #A8A49E for readability) |
| `--color-ghost` | `#C8C3BC` | Decorative numerals, ghost labels |
| `--color-accent` | `#C8622A` | Ember — master accent |
| `--color-accent-dark` | `#A84F20` | Accent hover state |
| `--color-accent-bg` | `#F6EDE4` | Accent background tint |

**Do not** lower the contrast of `--color-mid` or `--color-faint`. These were raised specifically for WCAG readability.

### Product Brand Colors

Each product has its own palette scoped via `data-brand="slug"`:
- **HushRealm** — Purple (#5B4FD4)
- **PagePerfect** — Prussian Blue (#1B3D5C)
- **FarmCompanion** — Leaf Green (#3A6824)
- **AllowanceGuard** — Gold (#9C7200)
- **OneSchool** — Teal Blue (#1A5276)

### Typography Standards (Enforced)

| Role | Font | Size | Weight | Line Height | Notes |
|------|------|------|--------|-------------|-------|
| **Hero display** | Cormorant italic | `clamp(64px, 10vw, 100px)` | 400 | 0.92 | letterSpacing: -0.02em. Never exceed 100px. |
| **Section display** | Cormorant italic | `clamp(32px, 4.5vw, 52px)` | 400 | 1.02–1.08 | Used for section headings on homepage |
| **Inner page display** | Cormorant italic | `clamp(42px, 6vw, 72px)` | 400 | 0.95 | Hero on philosophy, about, founders, etc. |
| **Eyebrow** | Outfit | **11px minimum** | 500 | — | uppercase, tracking 0.18–0.2em. Never below 11px. |
| **Body (prose pages)** | Outfit | **16px** | 400 | 1.85 | Founders, philosophy, about body copy |
| **Body (homepage)** | Outfit | **15px** | 400 | 1.75–1.8 | Cards, descriptions, shorter blocks |
| **Body (hero)** | Outfit | **17px** | 400 | 1.75 | Homepage hero paragraph |
| **Card body** | Outfit | **14–15px** | 400 | 1.7–1.75 | Product cards, platform cards |
| **Heading (inline)** | Outfit | 15px | 600 | — | tracking-tight, used for card/section subheads |
| **Mono** | Geist Mono | 10px | — | — | URLs, metadata, data labels |

**Hard rules:**
- Body text weight is **400 minimum**. Never use weight 300 for body text — it fails readability.
- Body text size is **14px minimum** anywhere on the site. Never below 14px for readable content.
- Eyebrow text is **11px minimum**. Never below 11px.
- Display type maximum is **100px** on homepage, **72px** on inner pages. Never exceed these.

### Spacing Standards (Enforced)

| Context | Value | Notes |
|---------|-------|-------|
| **Homepage section padding** | `py-32` to `py-36` (128–144px) | Generous vertical rhythm |
| **Inner page section padding** | `py-20` to `py-24` (80–96px) | Comfortable but not excessive |
| **Hero top padding** | `pt-28` (112px) on inner pages | Accounts for 64px nav + breathing room |
| **Hero bottom padding** | `pb-20` (80px) on inner pages | Space before first content section |
| **Homepage hero** | `min-h-[92vh]` with flexbox centering | Full-viewport impact |
| **Card grid gaps** | `gap-5` (20px) | Never tighter than 20px between cards |
| **Content max-width (homepage)** | `1080px` | Wider for portfolio display |
| **Content max-width (prose)** | `740px` | Comfortable reading width |
| **Horizontal page padding** | `px-6 md:px-12` | Consistent across all pages |
| **Element inner spacing** | Cards `p-7` to `p-8`, callouts `p-6` to `p-7` | Generous inner padding |

**Hard rules:**
- Homepage sections must use `py-32` minimum. Never compress to `py-16` or `py-20`.
- Card gaps must be `gap-5` (20px) minimum. Never use `gap-3` or `gap-3.5`.
- The hero must be at least `min-h-[92vh]`. Never reduce below `85vh`.
- Horizontal padding is always `px-6 md:px-12`. Never use `md:px-10`.

### Section Rhythm (Enforced)

Sections alternate between `--color-bg` and `--color-surface` backgrounds to create visual distinction. This replaces thin horizontal rules (`h-px bg-rule-light`) between sections.

**Hard rules:**
- Do **not** add `<div className="h-px bg-rule-light" />` dividers between homepage sections. Use background alternation.
- Inner pages may use background alternation OR a single divider between hero and content — not both.
- The "We Will Never Sell" / dark CTA section always uses `--color-void` background. This is the ONE exception to the light theme.
- Footer always uses `--color-void` background.

### Border Radius Standard

| Element | Radius | Notes |
|---------|--------|-------|
| Cards | `16px` (outer) or `14px` (inner/nested) | Product cards use 16px, philosophy/platform cards use 14px |
| Stat boxes / nested elements | `10px` | Inside cards |
| Buttons | `6px` (`--radius-button`) | Consistent across all buttons |
| Color swatches | `10px` | Brand palette display |

**Hard rule:** Do not mix arbitrary radii. Use 16px, 14px, 10px, or 6px. No 8px, 12px, or other values.

### Navigation Standards

- Height: **64px**. Never reduce below 60px.
- Background on scroll: `rgba(253,252,250,0.92)` with `blur(20px)`.
- Border on scroll: `1px solid var(--color-rule-light)` — subtle, not heavy.
- Max content width matches page: `1080px`.
- Desktop nav link size: `13px`, weight 400 (active: 500).
- Contact CTA: `12px`, font-medium, tracking-wide, border accent, ghost style.

### Animation Standards (FadeIn Component)

| Property | Value | Notes |
|----------|-------|-------|
| `translateY` | **14px** | Subtle. Never exceed 16px. |
| `duration` | **600ms** | Brisk but smooth. Never exceed 700ms. |
| `easing` | `cubic-bezier(0.25, 0.1, 0.25, 1)` | Natural deceleration. Never use linear or basic `ease`. |
| `stagger delay` | 50–70ms between siblings | Light stagger for lists/grids |
| `threshold` | 0.1 | Trigger early for smooth appearance |

**Hard rules:**
- No spring physics, no Framer Motion, no GSAP, no Lottie. CSS transitions only.
- `prefers-reduced-motion: reduce` must be respected — show content immediately with no animation.
- FadeIn fires once and disconnects the observer. Never re-trigger.

### Top Accent Bar

- Fixed, `z-[600]`, `h-[2px]`, solid `var(--color-accent)`.
- **Do not** use a gradient. Solid color is more confident.

### Noise Texture Overlay

- `z-index: 100` (not 9999). Low enough to never interfere with interactions.
- `opacity: 0.018`. Barely perceptible. Never exceed 0.025.
- `pointer-events: none`. Always.

### Things That Must NOT Exist on the Site

- Scroll indicators ("Scroll" text with animated lines) — cliché, removed permanently
- Decorative radial gradient blobs — generic SaaS decoration, removed permanently
- Thin horizontal rules between every section — replaced with background alternation
- `!important` in CSS hover states — removed, never reintroduce
- `font-weight: 300` on body text — too thin, never use for readable content
- Revenue/ARR projections on the homepage — internal material, lives on About page only
- Platform infrastructure details on homepage — lives on About page only
- Domain/market tables on homepage — investor material, not visitor content

---

## Homepage Structure (5 Sections Only)

The homepage tells a story in exactly 5 sections. This structure is intentional and must not grow.

| # | Section | Background | Purpose |
|---|---------|------------|---------|
| 1 | **Hero** | `--color-bg` | "Access everything." + one paragraph + two CTAs. 92vh. |
| 2 | **Products** | `--color-surface` | 5 product cards in 2-column grid + platform synergy note |
| 3 | **Thesis** | `--color-bg` | "We are the permanent home for British software" + 4 blocks |
| 4 | **Philosophy preview** | `--color-surface` | 6 philosophy cards in 3-column grid + link to full page |
| 5 | **We Will Never Sell** | `--color-void` | Dark section, dramatic, with 4 key facts |

**Hard rule:** Do not add a 6th section to the homepage. If new content is needed, it belongs on an inner page (About, a new page, etc.). The homepage is a curated first impression, not a comprehensive overview.

## Site Pages

| Route | Purpose | Priority |
|-------|---------|----------|
| `/` | Homepage — 5 sections, curated first impression | Critical |
| `/products` | Portfolio overview (wider layout, 1080px) | High |
| `/products/[slug]` | Individual product pages (5) — prose layout, 740px | High |
| `/philosophy` | The 6 decisions — adapted from founder document | Critical |
| `/founders` | Letter to founders considering selling | Critical |
| `/about` | Company story + platform infrastructure + key facts | Medium |
| `/press` | Press kit, assets, contact | Medium |
| `/contact` | Contact form with sidebar | Medium |
| `/privacy` | Privacy policy | Required |

## Products (5 Active)

| # | Name | Domain | Category | Status |
|---|------|--------|----------|--------|
| 1 | OneSchool | oneschool.co.uk | School Management Platform | Define & Build |
| 2 | HushRealm | hushrealm.co.uk | Private Document Vault | Define & Build |
| 3 | PagePerfect | pageperfect.studio | Document Publishing | Build |
| 4 | FarmCompanion | farmcompanion.co.uk | UK Farm Directory | Build |
| 5 | AllowanceGuard | allowanceguard.com | Family FinTech | Define |

## Seven Domains

1. Life Administration (HushRealm, AllowanceGuard) — £15-20M ARR potential
2. Education (OneSchool) — £5-10M ARR potential
3. Professional Publishing (PagePerfect) — £3-8M ARR potential
4. British Land & Agriculture (FarmCompanion) — £2-5M ARR potential
5. Small British Business — Planned
6. British Property — Planned
7. Health Administration — Planned

## Platform Infrastructure (Referenced, Not Built Yet)

- **EazyAccess ID** — Single identity across all products
- **EazyAccess Vault** — Encrypted document storage (built for HushRealm, shared across portfolio)
- **EazyAccess Pay** — Unified billing, family subscription plan
- **EazyAccess Acquire** — Acquisition playbook and integration process

Platform infrastructure details live on the **About** page, not the homepage.

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
- Transition durations should be explicit: `duration-300` or `duration-400`

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
- No scroll indicators, no decorative gradient blobs, no animated backgrounds
- No external animation libraries (Framer Motion, GSAP, Lottie, etc.)

## Reference Documents

When making design or content decisions, consult in this order:
1. This CLAUDE.md (authoritative — **design standards section overrides all other references**)
2. `eazyaccess-founder-document (2).md` (philosophical source of truth)
3. `eazyaccess-v4-oneschool.jsx` (visual/layout reference for light theme)
4. `eazyaccess-brand.jsx` (brand system reference)
5. `eazyaccess-complete.jsx` (original portfolio spec)

## The Test

Every decision about products, design, content, and code should be tested against:
> "Does this serve the organisation we are trying to build in fifteen years, or only the one we have today?"

Every design decision should be tested against:
> "Would a council of world-class designers defend this choice, or merely tolerate it?"

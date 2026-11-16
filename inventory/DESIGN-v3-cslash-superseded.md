# Design System: eazy/access

Direction C, "Slash". Chosen 16 Nov 2026. Checked against taste-design and impeccable-reference (craft-floor, new-work §3 Persuade).

## 1. Visual Theme & Atmosphere
A dark screening room where six colourful live sites glow. The slash from the wordmark is the one idea, and it runs through everything: the logo, the diagonal cut of the work reel, the button icon, and the motion. It is confident and asymmetric, with nothing decorative that the slash doesn't justify.

Settings: density 4 (gallery-airy with a dense reel), variance 8 (offset asymmetric, never centred), motion 6 (fluid CSS, one authored moment).

**Why dark:** visitors judge the work, and screenshots of colourful sites read best on a near-black ground. Dark is chosen for the content, not because the category expects it.

## 2. Color Palette & Roles
| Name | Hex | Role |
|---|---|---|
| Screening Black | #0A0A0A | Page ground. Never pure #000. |
| Reel Charcoal | #1A1A1A | Behind screenshots while they load, and form fields |
| Rule Graphite | #262626 | 1px structural lines, nav divider |
| Projector White | #EDEDED | Primary text (16.9:1 on ground) |
| Dimmed Grey | #A3A3A3 | Secondary text (7.9:1 on ground, 6.9:1 on charcoal). Tinted from the foreground, never a cool grey |
| Slash Orange | #E8663A | The only accent: primary action, the slash, focus ring, text selection. Saturation 79%. Black text on it is 6.0:1 |

Banned: a second accent, gradients, glows, and any purple or neon.

## 3. Typography Rules
- **Display: Instrument Sans Condensed** (wdth 75, weight 600).
  - Hero 96px (6rem) at most, `clamp(3.5rem, 8vw, 6rem)`.
  - Tracking −0.04em (the floor). Line-height 0.92.
  - Balanced headings (`text-wrap: balance`).
- **Body: Instrument Sans** (wdth 100) 17–19px, line-height 1.55, measure 60–68ch, weight 400/500.
- **Wordmark:** "eazy" + slash + "access", in display style. The slash is drawn as an SVG stroke at 14° in Slash Orange, never typed.
- **Banned:** Inter, uppercase mono labels, eyebrows above headings, `LABEL // YEAR`, section numbers.

## 4. Component Stylings
- **Primary button:**
  - Slash Orange fill, black label, square corners, 52–60px tall.
  - A drawn slash icon on the right.
  - Active state: translateY(1px). No glow.
  - Only one primary action is visible per viewport.
- **Nav (desktop):**
  - Solid #0A0A0A bar with a 1px graphite rule underneath.
  - Wordmark on the left; Work (6) / Process / Studio in the centre; primary button on the right.
  - Sticky. It hides on scroll down and returns on scroll up (CSS scroll-driven animation, with a JS fallback).
- **Nav (mobile, <768px):**
  - Wordmark, plus a 48px "Menu" button with a drawn two-line icon.
  - A sticky bottom bar holds the primary action: 58px, full width minus 12px gutters, in thumb reach. It hides once the contact form is in view, so there are never two primary actions on screen.
  - **Open menu:** a full-screen Slash Orange sheet.
    - Links at 68px display size, separated by 1px rules.
    - Email and the reply promise at the bottom, then the primary action as a black block.
    - Focus is trapped while open, Esc closes it, and focus returns to the Menu button.
- **Work reel:**
  - Screenshots in strips rotated 14°, sitting in their own column, never under text.
  - Each strip links to the live site, with its name and a one-line description in an accessible label.
- **Inputs:**
  - Label above the field, helper text under the label, error text below the field.
  - 56px fields on Reel Charcoal, 1px graphite border, 2px orange focus ring at a 3px offset.
- **Chips (form choices):** radio inputs styled as square blocks; the selected one is orange-filled.

## 5. Layout Principles
- CSS Grid, max width 1400px, 48px side gutters on desktop and 20px on mobile.
- **Hero:** a split, with the left 7/12 for text and action and the right 5/12 for the diagonal reel. Never centred. Text and images never overlap.
- **Work section:** an asymmetric zig-zag, with alternating wide (8/12) and narrow (4/12) rows. Phone screenshots go in the narrow slots. No three equal cards.
- **Contact:** a split, with the promise and email on the left and the form on the right. It collapses to one column below 768px.
- Section spacing is `clamp(4rem, 10vw, 8rem)`, with more space above a heading than below it.
- Full-height sections use `min-height: 100dvh`. No horizontal scroll at any width.

## 6. Motion & Interaction
- **The one authored moment:** the diagonal reel drifts against scroll, with strips moving at slightly different rates (CSS `animation-timeline: scroll()`, transform only).
- Hovering a strip unclips it, using `clip-path`, to show the full screenshot.
- Everything else is still. There are no identical entrance animations on each section.
- Easing is exponential ease-out (`cubic-bezier(0.16, 1, 0.3, 1)`), 200–400ms, starting from a visible default.
- `prefers-reduced-motion` freezes the reel and turns off clip transitions.

## 7. Browser Surfaces
- Text selection: orange background, black text.
- Caret: orange.
- Focus ring: 2px orange outline at a 3px offset.
- Link underline offset: 5px.
- Scrollbar thumb: #262626.

## 8. Anti-Patterns (Banned)
No:
- emojis or Unicode glyphs used as icons
- Inter
- pure black
- glows or gradient text
- hard offset shadows
- eyebrows or kickers above headings, or section numbers
- three equal cards
- made-up metrics or testimonials (all six sites are real and our own, and labelled that way)
- "Elevate", "Seamless" or "Unleash"
- "Scroll to explore" or bouncing chevrons
- centred hero
- a modal for the contact form
- more than one primary action per viewport

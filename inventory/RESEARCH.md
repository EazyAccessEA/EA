# Studio site research (15 Nov 2026)

Fetched with Scrapling as static HTML and CSS. Nothing was rendered, so hover and scroll behaviour is read from the code, not watched.

**Sources loaded:** basement.studio, locomotive.ca, darkroom.engineering, cuberto.com, lusion.co, obys.agency, immersive-g.com, studiofreight.com, linear.app.
**Failed:** rallyinteractive.com (empty) and rally.space (studio closed).

## What to take
- **Case studies:** show 3–5 projects, each with large media, one outcome line and service tags. Examples: Basement (4 featured), Darkroom ("A Small Sample, Just Three Builds"), Cuberto (cover mp4 plus one sentence).
- **Contact form:** Darkroom /contact has numbered steps. Build-or-fix chips, then budget chips, timeline chips, description, email, and an email link alongside. A smaller first offer (a "two-week discovery sprint") gives unsure visitors an easier first step.
- **Reply-time promise:** none of the 9 studios states one (Cuberto's "We'll contact you shortly" is the nearest). We can fill that gap.
- **Contact placement:** "Let's talk" sits in the header on every page (Basement, Locomotive, Lusion).
- **Motion that works in native CSS:**
  - `animation-timeline: scroll()` / `view()` inside `@supports` (Darkroom)
  - `::view-transition-*` at about 0.2s (Darkroom)
  - `@starting-style` with a clip-path reveal (Cuberto, Locomotive)
  - All of it turned off under `prefers-reduced-motion`
- **Type:** pair a serif or sans display face with a mono for labels (Basement Geist + Geist Mono, Studio Freight JJannon + Publico Mono). Size type fluidly with `clamp()`. Use bracketed counts as labels ("Showcase(26)").

## What to avoid
- **Content that needs JavaScript to appear:** the Studio Freight homepage shows almost no text without JS.
- **Inaccessible proof:** client logos with `alt=""` (Basement), 39 images with no alt (Immersive Garden), project lists repeated for a marquee (Obys).
- **No reduced-motion handling:** none found on the canvas and smooth-scroll sites (Immersive Garden, Obys).
- **Heavy pages:** Linear's HTML is 1.2 MB with 47 stylesheets; Basement loads 31 scripts.
- **reCAPTCHA** on the form (Cuberto). Turnstile does the same job and needs no Google script.
- **Contact with no form**, only mailto links (Locomotive, Lusion).

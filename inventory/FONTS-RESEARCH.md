# Font research: eazy/access (16 Nov 2026)

## 1. What award sites actually use
Fonts were read from the live pages of 35 rendered Awwwards sites (2026 Site of the Day and nominees). The raw probe data is in the scratchpad (results.json).

| Family | Sites | Foundry or source |
|---|---|---|
| Neue Haas Grotesk (Text/Display) | Signal-A, Revelatio, Trionn | Monotype (also on Adobe Fonts) |
| PP Neue Montreal | Hobro, Digitalists, Nothin | Pangram Pangram |
| Suisse Int'l / Suisse BP | Warm & Fuzzy, Lama Lama | Swiss Typefaces |
| Aeonik | Units, Ref Digital | CoType |
| PP Editorial New (serif accent) | Signal-A, Normal is Boring | Pangram Pangram |
| PP Mori | Boc | Pangram Pangram |
| Helvetica Now | Extrafazant | Monotype |
| Others, once each | NewGrotesk, Owners Wide, Exat, Thunder, Girthy/Satoshi, Elza, PP Supply, Habitus, Juana | various |
| Halden template | Avenir Next | Linotype |

**Free Google fonts are rare among winners:** only Inter (3, always next to a paid display face), Libre Franklin, IBM Plex and Instrument Serif. The premium look comes mostly from paid foundry grotesks.

## 2. Banned
- Our own sites' faces: Inter Tight, Geist, Inter Display, Bricolage Grotesque, Clash Display, Source Sans 3.
- Inter, Helvetica Now (too common).

## 3. Availability on this Mac (Paper)
- **Render now (free):** Instrument Sans, Instrument Serif, Hanken Grotesk, Familjen Grotesk, Schibsted Grotesk, Host Grotesk, Funnel Display.
- **Not available until activated or licensed:** Neue Haas Grotesk Display/Text, PP Neue Montreal, PP Mori, Suisse Int'l, Aeonik, Söhne, ABC Diatype, Degular, Halyard Display, Ivy Presto Display, PP Editorial New.

## 4. Licences (primary sources, fetched 16 Nov 2026)
**Adobe Fonts** (helpx.adobe.com/fonts/using/font-licensing.html; .../web/font-licensing/webfont-licensing.html):
- **Logos:** "Yes. You can use the fonts in any desktop program … to create images or vector artwork, which you can then use for any purpose." An outlined logo keeps working after you cancel.
- **Web:** via Adobe's embed code only. No self-hosting: "If local hosting … is needed, you must purchase a license from the foundry". No pageview limit. Web fonts stop working if the subscription lapses.

| Family | On Adobe Fonts | Logo | Web | Bought separately |
|---|---|---|---|---|
| Neue Haas Grotesk Display + Text | Yes | Yes (Adobe) | Adobe embed | MyFonts family £345 |
| Degular (+ Display) | Yes | Yes (Adobe) | Adobe embed | $179 per family |
| Halyard Display | Yes | Yes (Adobe; Darden also allows logos) | Adobe embed | not captured |
| Ivy Presto Display (accent) | Yes | Yes (Adobe) | Adobe embed | not captured |
| Söhne (Klim) | No | Yes (desktop licence) | Self-host, 20k views | ~$60 per style per licence, no expiry; WOFF2 35–42 KB per style |
| Suisse Int'l | No | Yes (one all-in licence) | Unlimited | ~75 CHF per style, perpetual |
| Aeonik | No | Yes | Self-host, 10k views | £50 + £50 per style |
| ABC Diatype | No | Free logo licence under 50 people | Unlimited | price not found |
| PP Neue Montreal / Mori / Editorial New | No | Separate Logo licence ($960–1,960) | Separate | Company licences expire yearly. Avoid. |

**Conclusion:** the Adobe route costs nothing extra and covers logo and web use. The best paid upgrade if Adobe faces lose the test is Söhne or Suisse Int'l (perpetual, logo included, self-hosted, which is faster).

## 5. Tests (16 Nov 2026)
- **Letter test, premium:** font-tests/letter-test-premium.png (drawn from the activated Adobe files).
- **Hero test:** three pairings rendered in a real browser with the real fonts, at 1440 and 375 (font-tests/hero-X|Y|Z-*.png).
  - X = Neue Haas Grotesk Display + Text
  - Y = Degular Display + Degular
  - Z = Halyard Display
  - All three use IvyPresto Display Italic as the accent.
- **Blind judge** (Artisan agent, unlabelled and shuffled): **winner Y, Degular**. Ranking: Degular > Halyard > Neue Haas.
  - Neue Haas was judged "the most generic", too close to Helvetica.
  - Fix it asked for: a drawn slash, because the font's own slash reads as a pipe.

## 6. Decision
- **Wordmark and display:** Degular Display Semibold, letter-spacing −0.018em in the wordmark.
- **Body:** Degular Regular and Medium.
- **Accent:** IvyPresto Display Italic, sized at about 1.1em of the sans.
- **Drawn slash** (measured from the font file with fontTools):
  - Angle 22.1° from vertical, matching the "y" diagonal.
  - Stroke 0.108em, matching the stems.
  - Equal optical gap on both sides.
- **Logo files:** brand/wordmark-ink.svg, wordmark-white.svg, wordmark-mono.svg. These are outlined, so they're allowed by the Adobe licence and keep working without the subscription.

| Check | Result |
|---|---|
| Legible at 16px | Pass (brand/wordmark-check.png) |
| Not one of our six sites' fonts or a default | Pass |
| Not mistakable for Halden (Avenir Next) | Pass |
| Licence for logo and web | Pass (Adobe FAQ quoted in §4) |
| At most 2 families and 4 files | Pass (Degular superfamily + IvyPresto: Display Semibold, Regular, Medium, Italic) |
| Under 150 KB and font layout shift under 0.02 | Not yet measured. Adobe serves the files; test in the code build. |

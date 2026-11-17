# Research notes: FarmCompanion and Flintmere (17 Nov 2026, subagent read of repos + live sites)

## FarmCompanion
- What: UK farm-shop directory: map, seasonal produce, county and best-of pages. www.farmcompanion.co.uk.
- Who/problem: UK shoppers looking for a real farm shop near them, open now, plus what's in season; mostly on phones, arriving from search (farm-companion/PRODUCT.md "Users"). Visitors arrive by typing one business name (docs/assistant/execution-ledger.md:4040).
- Built (verified): farm pages with "Get directions" / "Show on map" (src/lib/farm-page-actions.ts); "Opening hours not confirmed" stated plainly (ledger:4046); Leaflet/MapLibre map; search (src/lib/farm-search.ts); Meilisearch; /best, /counties, /map, seasonal pages (live).
- Stack: Next.js 16.4.1, React 19, Prisma 5.22 (farm-frontend/package.json); Vercel fra1 (vercel.json); Postgres, Redis, Meilisearch, object storage on Coolify/Hetzner (README.md).
- Decisions:
  1. Search Console showed shop pages take 374 of 431 clicks; hubs ~0. So the nav redesign was dropped and the farm page became the product (ledger:4040).
  2. Button position, ledger:4056 at 375x812: first action at 851px (phone) became "Show on map" at 374px; 2nd/3rd 894/1073 became 433/491; controls under 24x24 went from 7 to 0. Cause: 60vh editorial hero (ledger:4042). Measured on dev server.
  3. /map?q= crashed for nine months on null address/county; the first test passed against broken code (|| short-circuit), was rewritten and failed correctly (ledger:4093-4105).
  4. No row holds parsed hours, so hours block rendered nothing on all 3,504 pages; pages now say so (ledger:4046).
- Measured: 482 unit tests pass (ledger:4105). Search Console 431 clicks / 93 days (ledger:3983-3989).
- DO NOT PUBLISH: "280 counties" (wrong, live, AnimatedHero.tsx:75); any farm total or "verified" (sources disagree: 1,300+ / 3,504 / 2,181 / 1,233); morfa farm shop name without owner OK; credential files (ledger:4744 "ROTATION OWED").

## Flintmere
- What: scanner (catalog.flintmere.com) checking a Shopify store's public catalogue: GTIN checksum validity, titles, consistency, crawlability; partial score. £197 hand-prepared "Catalog Letter" (live).
- Who: UK food merchants on Shopify. A wrong GTIN gets a Google Shopping listing disapproved; a missing one limits visibility (ADR 0030 Amendment 4).
- Built (verified): packages/scoring seven pillars; isValidGtin Mod-10 (identifiers.ts); public scan reads 4 of 7 pillars (55% weight); read-only Merchant Center connect (ADR 0023).
- Stack: Next.js 15, Remix, Prisma 5.22, Postgres 18, Tailwind v4; Hetzner CCX33 Nuremberg via Coolify (decisions/0032); Gemini europe-west1 with OpenAI fallback; Resend, Stripe, Sentry; 113 test files.
- Decisions: suppression-probability estimate retired because Google publishes no rate to derive it from (ADR 0030 A4); llms.txt cut from 40 to 10 points because Shopify auto-generates it (ADR 0030 A5); diagnostic showed 0% ingredients/nutrition/allergens on three real brands because products.json doesn't carry them (ADR 0031).
- DO NOT PUBLISH: price/VAT/unit-price checking (copy only, no code); any customers or wins (none; £0 revenue, ADR 0029); third-party brand names; infra IDs/IPs/key files.

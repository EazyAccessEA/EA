# Research notes: Sagheerah, deeper.tools, PagePerfect, Call and Consequence (17 Nov 2026, subagent read of repos + live sites)

## Sagheerah (shop.sagheerah.com only; sagheerah.com is a coming-soon page)
- What: shop for the Hafsah two-piece jilbab with its own Worker checkout. 13 sizes (7 children's 36–48, 2 teen 50/52, 4 adult 54–60), 18 cloths (pieces.ts:221–238), £35 / £45 / £75 / £85. 9 of 13 sizes are for girls.
- Built (verified): size/price picker + basket; Stripe Checkout via /api/checkout; signed webhook, v1 signatures only, stale timestamps rejected, one-byte KV record per event id with 30-day TTL (no customer data stored) (worker/index.ts); postage recomputed server-side £4.95/£9.75/£13.95, free from £100, cap 20 (checkout.ts:158); UK addresses only; acceptance email via Resend after payment (Consumer Contracts Regulations 2013 regs 16/18 durable medium; cancellation text verbatim from policies.ts); returns/delivery/terms/privacy/size guide/cloth/notes pages; turn-down hem SVG diagram.
- Decisions: a request once bought a £75 adult jilbab for £35 by posting variant=children with an adult length; each variant now lists the exact sizes it prices and the Worker checks it (pieces.ts:50–72). Tests guard rules: type-ladder.test.ts, no-client-router.test.ts (keeps cross-document view transitions), deploy fails if "DECISION NEEDED" reaches out/.
- Stack: Next.js 15.3.4 static export, React 19, Tailwind 4, vitest; Cloudflare Worker + KV + Resend; custom domain shop.sagheerah.com.
- Measured: Add to basket at 1.13 screens (piece page), 0.70 (/basket), 375×812 (CLAUDE.md, Aug). 405 tests passed (Aug).
- DO NOT PUBLISH: founding year (sources disagree), "made in Birmingham", founder's name, the model photo (one navy photo recoloured), reviews, Stripe live-mode status, KV ids.

## deeper.tools
- What: free Apache-2.0 skill; /deeper rewrites a task into the version a top professional would ask for, same scope, asks before running. Install `npx skills add EazyAccessEA/deeper`. Credits Felix Rieseberg's 13 Oct 2026 article.
- Built: SKILL.md v1.1.2; Claude Code plugin manifests; Astro 7.4.5 site (/start, /docs, /patterns, /research, /changelog, journal of 4 articles), every score read from examples/raw at build time; signup in D1 with hashed IP + daily salt, 5/day, honeypot, nightly purge, no email sent yet; cookie-less analytics.
- Decisions: v1.1 because in 40 of the owner's own runs 33 asked for a deliverable the user hadn't; first scope guard weakened method, rewritten and re-tested. Security audit flagged npx search → removed in 1.1.1, restored in 1.1.2 with the risk documented. Pre-registered blind test, 32 answers: no arm beat another (deeper 5.56 vs plain 5.81 of 6) — the owner published the null result.
- DO NOT PUBLISH: any "better answers" claim; marketing folder; App Store review contents; be-ambitious; Vecteezy hero.

## PagePerfect (live repo ~/Projects/pageperfect-journal)
- What: journal of 23 essays on typography and book layout; every disputable claim has a note naming sources and grading evidence A–E. Also a paperback, "The Rivers Nobody Measured" (Amazon).
- Built (live): 23 essays, category filter; /book/ with free sample PDF; editorial gates A–K (lint.js, verify-quotes.js, verify-book.js via tools/gates.sh).
- Decisions: every claim traced and essays rewritten to what sources support; 10 essays that sold the product retired (retired/README.md). A missing font is a build failure (missing Alegreya made a spine ten pages wider than the interior). Claims about the PDF are read from built PDFs (tools/cross-repo-check.js). First handover claimed zero PDF/UA errors before a validator ran; all four editions failed when one did — now checked.
- Stack: Next.js 15 static export on a Cloudflare Worker; book typeset in Typst 0.15.1, Alegreya.
- DO NOT PUBLISH: page count, price, note count, word count (sources disagree); "Est. 2024"; KDP AI declaration status; proof not seen on paper.

## Call and Consequence (callandconsequence.com)
- What: illustrated, narrated documentaries about business decisions; every figure links to its filing or interview. Live films: JCPenney, Webvan, MoviePass, each with chapters, sources, full transcript.
- Built: build_film.py fails on an unlinked figure (figure → claim-ledger row) or chapters/sources mismatch; qa/check.py checks third-party requests, CSP, reduced motion, JS off, overflow and tap targets at 375px; hover/focus source card on each figure.
- Decisions: no cookies, trackers or music; synthetic voice disclosed on /method/. Webvan "$2.65 million" was narrated as "two dollars 65 million dollars" and passed the voice check → re-narrated, fixes at the spoken-text layer. Workers static assets, not Pages (apex CNAME).
- Stack: static site on Cloudflare Worker, React 18 + motion islands via Vite, CSP default-src 'self'.
- Measured (1 Nov, before 16 Nov redesign, JCPenney only): PSI mobile 100/100/100/100, LCP 1.1s; 0 third-party resources. Re-measure before quoting.
- DO NOT PUBLISH: legal review or right-of-reply claims (waived/incomplete); "Episode 5" label; named individuals; views.

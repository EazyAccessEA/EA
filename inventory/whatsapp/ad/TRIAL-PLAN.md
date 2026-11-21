# £300, 30-day ad trial: where and how (21 Nov 2026)

## Channel: Meta click-to-WhatsApp

`private/funding/channel_model.py` (kept out of git) gives the expected result of £300 on each channel. Inputs come from `channel-benchmarks.md`; the close rates are estimates.

| | Enquiries (bad / mid / good) | Chance of zero enquiries, mid case | Ad cost per client, mid case |
|---|---|---|---|
| Google Search | 0.5 / 1.7 / 5.1 | 19% | £594 |
| Meta click-to-WhatsApp | 3 / 13 / 70 | ~0% | £112 |

Google Search costs £3–£12 a click for web design terms. £300 buys too few clicks for the month to show whether the channel works, even when it does. Meta gives enough conversations to judge the ads within the month.

**Rule that could change this.** Before launch, open a free Google Ads account and run Keyword Planner for "web designer birmingham", "website design birmingham" and "web design birmingham", Birmingham + 25 miles. If the top-of-page low bid is **£2.50 or less** on the main terms, re-run `channel_model.py` with those numbers before choosing. Spending nothing is needed to see the forecast. Meta Ads Manager's reach estimate for the audience below should show at least 100,000 people; if it doesn't, widen to 40 miles.

## Setup
- One campaign. Objective: Engagement → Messaging conversations → WhatsApp.
- One ad set: Birmingham + 25 miles, ages 25–65+, Facebook and Instagram feeds only. £10 a day for 30 days.
- Three ads in that ad set: A, B and C (`trial-a/b/c-1080.png`, copy in `copy-trial-300.md`). Let Meta share the spend between them.
- The pre-filled message is in `copy-trial-300.md`. The WhatsApp greeting and away messages are in `../profile.md`.
- Tracking: Meta counts "messaging conversations started" itself, with no pixel or site code. Log real enquiries by hand (below). There's no landing page, so there's no page to measure at 375×812. The WhatsApp chat is where people land.

## Before the first pound (all must be true)
- [ ] **VAT application submitted** and the effective date of registration has started. Until then "£1,250 + VAT" isn't a price you can charge (gov.uk: "You cannot include VAT on your invoices until you get your VAT registration number, but you can increase your prices to account for the VAT").
- [ ] Terms updated on the registration date: `git apply private/funding/vat-terms.patch`, replace `[VAT DATE]`, then `node build.mjs`, `npm test` and deploy.
- [x] Terms carry the 14-day cancellation notice and model form for consumer clients (already in `pages/terms-of-business.html`).
- [ ] Five-second test (`five-second-test.md`) run on each of A, B and C, with 5 small-business owners each. Pass: at least 4 of 5 name the offer, the price and the next step without prompting. Drop any ad that fails.
- [ ] Meta's ad review approves all three.
- [ ] The old `feed-1080.png` ("inc VAT") is not uploaded anywhere.

## Rules, fixed before launch
- No edits for the first 7 days.
- **Stop** an ad if it has spent £50 with no conversation started.
- **Stop the trial** if, after £100 in total, a conversation costs more than £10 to start.
- **Pass:** at least one stage-one invoice paid within 45 days of launch.
- **Fail:** £300 spent and no paid invoice. Then the problem is the offer or the channel, and more money won't fix it.
- Benchmarks to beat: link click-through rate 1.59% (UK median, Superads, Jul 2025–Jul 2026); cost per conversation £4.50 (mid case).

## Weekly log (fill in from Ads Manager and the WhatsApp chats)
| Week | Spent | Conversations | Real enquiries | Stage-one invoices paid | Best ad |
|---|---|---|---|---|---|
| 1 | | | | | |
| 2 | | | | | |
| 3 | | | | | |
| 4 | | | | | |

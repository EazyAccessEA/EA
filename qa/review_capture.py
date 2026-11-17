"""Pre-launch design review: every page at six widths, plus the interactive states.
Usage: python3 qa/review_capture.py [base-url]. Screenshots go to qa/review/shots/ (git-ignored)."""
import asyncio, os, sys
from playwright.async_api import async_playwright

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:8788"
OUT = "qa/review/shots"
PAGES = ["/", "/work/", "/work/farmcompanion", "/work/sagheerah", "/work/flintmere", "/work/deeper",
         "/work/pageperfect", "/work/callandconsequence", "/how-we-work", "/contact", "/privacy", "/cookies", "/terms"]
WIDTHS = [(375, 812), (390, 844), (768, 1024), (1024, 768), (1440, 900), (1920, 1080)]
name = lambda p: (p.strip("/") or "home").replace("/", "-")

async def shot(b, path, w, h, tag, prep=None, **kw):
    pg = await b.new_page(viewport={"width": w, "height": h}, **kw)
    await pg.goto(BASE + path, wait_until="load"); await pg.wait_for_timeout(1800)
    if prep: await prep(pg)
    await pg.screenshot(path=f"{OUT}/{tag}.png", full_page=prep is None)
    await pg.close()

async def main():
    os.makedirs(OUT, exist_ok=True)
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for w, h in WIDTHS:
            for path in PAGES:
                await shot(b, path, w, h, f"{w}-{name(path)}")
        # States
        async def fan_hover(pg):
            await pg.locator(".fan-section").scroll_into_view_if_needed(); await pg.locator(".fan-sheet").nth(2).hover(); await pg.wait_for_timeout(900)
        async def fan_focus(pg):
            await pg.locator(".fan-sheet").nth(0).focus(); await pg.keyboard.press("Tab"); await pg.wait_for_timeout(900)
        async def tool_mid(pg):
            await pg.locator(".tools").scroll_into_view_if_needed(); await pg.locator(".tile", has_text="Stripe").click(); await pg.wait_for_timeout(220)
        async def tool_settled(pg):
            await pg.locator(".tools").scroll_into_view_if_needed(); await pg.locator(".tile", has_text="Stripe").click(); await pg.wait_for_timeout(1100)
        async def deck_jump(pg):
            await pg.locator(".tools").scroll_into_view_if_needed(); await pg.locator(".rail-btn", has_text="Checks").click(); await pg.wait_for_timeout(1100)
        async def menu_open(pg):
            await pg.locator(".menu-btn").click(); await pg.wait_for_timeout(700)
        async def form_errors(pg):
            await pg.evaluate("document.querySelector('.form-card').noValidate=true")
            await pg.locator(".send").click(); await pg.wait_for_timeout(1500)
        async def sheets_open(pg):
            await pg.wait_for_timeout(400)
        await shot(b, "/", 1440, 900, "state-fan-hover", fan_hover)
        await shot(b, "/", 1440, 900, "state-fan-focus", fan_focus)
        await shot(b, "/", 1440, 900, "state-tool-mid", tool_mid)
        await shot(b, "/", 1440, 900, "state-tool-settled", tool_settled)
        await shot(b, "/", 375, 812, "state-deck-jump", deck_jump)
        await shot(b, "/", 375, 812, "state-menu-open", menu_open)
        await shot(b, "/contact", 1440, 900, "state-form-errors", form_errors)
        await shot(b, "/contact?contact=sent", 375, 812, "state-form-sent", sheets_open)
        await shot(b, "/work/#deeper", 1440, 900, "state-sheets-deeper", sheets_open)
        await shot(b, "/nope", 1440, 900, "state-404", sheets_open)
        # Reduced motion and blocked fonts (system fallback)
        await shot(b, "/", 1440, 900, "state-reduced-motion", None, reduced_motion="reduce")
        ctx = await b.new_context(viewport={"width": 1440, "height": 900})
        await ctx.route("**/use.typekit.net/**", lambda r: r.abort()); await ctx.route("**/p.typekit.net/**", lambda r: r.abort())
        pg = await ctx.new_page(); await pg.goto(BASE + "/"); await pg.wait_for_timeout(1500)
        await pg.screenshot(path=f"{OUT}/state-fonts-blocked.png"); await ctx.close()
        await b.close()
    print("done", len(os.listdir(OUT)))

asyncio.run(main())

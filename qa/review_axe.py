"""axe-core on every page at 375 and 1440. Prints violations by impact. Usage: python3 qa/review_axe.py [base-url]"""
import asyncio, json, sys
from playwright.async_api import async_playwright

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:8788"
AXE = "https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.10.2/axe.min.js"
PAGES = ["/", "/work/", "/work/farmcompanion", "/work/sagheerah", "/work/flintmere", "/work/deeper",
         "/work/pageperfect", "/work/callandconsequence", "/how-we-work", "/contact", "/privacy", "/cookies", "/terms"]

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for w, h in [(375, 812), (1440, 900)]:
            for path in PAGES:
                pg = await b.new_page(viewport={"width": w, "height": h}, reduced_motion="reduce")
                await pg.goto(BASE + path, wait_until="load", timeout=120000); await pg.wait_for_timeout(1200)
                await pg.add_script_tag(url=AXE)
                r = await pg.evaluate("axe.run(document,{runOnly:['wcag2a','wcag2aa','wcag21aa','wcag22aa','best-practice']})")
                v = [(x["impact"], x["id"], len(x["nodes"]), x["nodes"][0]["target"][0] if x["nodes"] else "") for x in r["violations"]]
                print(w, path, json.dumps(v))
                await pg.close()
        await b.close()

asyncio.run(main())

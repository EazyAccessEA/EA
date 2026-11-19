"""Every page at 1440x900 and 375x812: overflow, small tap targets, console errors, primary action position.
Usage: python3 qa/pages.py [base-url]. Screenshots go to qa/pages/ (git-ignored)."""
import asyncio, json, os, sys
from playwright.async_api import async_playwright

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:8788"
PAGES = ["/", "/work/", "/work/farmcompanion", "/work/sagheerah", "/work/flintmere", "/work/deeper",
         "/work/pageperfect", "/work/callandconsequence", "/how-we-work", "/contact", "/privacy", "/cookies", "/terms"]
JS = """()=>{const vis=e=>{const s=getComputedStyle(e),b=e.getBoundingClientRect();return s.display!=='none'&&s.visibility!=='hidden'&&b.width>0&&b.height>0&&!e.closest('[hidden]')};
const r=e=>{const b=e.getBoundingClientRect();return {y:Math.round(b.top+scrollY),w:Math.round(b.width),h:Math.round(b.height)}};
const inline=e=>e.tagName==='A'&&e.closest('p,dd,li')&&e.closest('p,dd,li').textContent.trim().length>e.textContent.trim().length+3;
const small=[...document.querySelectorAll('a,button,input,textarea,label')].filter(vis).filter(e=>!inline(e)).map(e=>({t:(e.getAttribute('aria-label')||e.innerText||e.name||'').trim().slice(0,28),...r(e)})).filter(o=>o.w<24||o.h<24);
const q=s=>{const e=[...document.querySelectorAll(s)].find(vis);return e?r(e):null};
return {overflowX:document.documentElement.scrollWidth-innerWidth,pageH:document.documentElement.scrollHeight,sticky:q('.sticky-talk'),band:q('.band-cta'),form:q('.form-card'),send:q('.send'),small}}"""

async def main():
    os.makedirs("qa/pages", exist_ok=True)
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for w, h, tag in [(1440, 900, "desk"), (375, 812, "mob")]:
            for path in PAGES:
                pg = await b.new_page(viewport={"width": w, "height": h}, device_scale_factor=1)
                errs = []
                pg.on("console", lambda m: errs.append(m.text) if m.type == "error" else None)
                pg.on("pageerror", lambda e: errs.append(str(e)))
                await pg.goto(BASE + path, wait_until="load")
                await pg.wait_for_timeout(2600)
                name = (path.strip("/") or "home").replace("/", "-")
                await pg.screenshot(path=f"qa/pages/{tag}-{name}.png", full_page=True)
                res = await pg.evaluate(JS)
                res["errors"] = [e for e in errs if "turnstile" not in e.lower() and "challenges.cloudflare" not in e]
                print(tag, path, json.dumps(res))
                await pg.close()
        await b.close()

asyncio.run(main())

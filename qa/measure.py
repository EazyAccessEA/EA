import asyncio, json, sys
from playwright.async_api import async_playwright
URL="http://localhost:8788/"
JS="""()=>{const r=e=>{const b=e.getBoundingClientRect();return {x:Math.round(b.x),y:Math.round(b.y+scrollY),w:Math.round(b.width),h:Math.round(b.height)}};
const vis=e=>{const s=getComputedStyle(e);const b=e.getBoundingClientRect();return s.display!=='none'&&s.visibility!=='hidden'&&b.width>0&&b.height>0&&!e.closest('[hidden]')};
const tgt=[...document.querySelectorAll('a,button,input,textarea,label')].filter(vis).filter(e=>!(e.tagName==='A'&&e.closest('p')));
const small=tgt.map(e=>({t:(e.innerText||e.name||e.tagName).trim().slice(0,30),...r(e)})).filter(o=>o.w<24||o.h<24);
const q=s=>{const e=document.querySelector(s);return e&&vis(e)?r(e):null};
return {pageH:document.documentElement.scrollHeight,overflowX:document.documentElement.scrollWidth>innerWidth,
 sticky:q('.sticky-talk'),talkPill:q('.talk-pill'),menuBtn:q('.menu-btn'),firstChip:q('.chips label'),form:q('.form-card'),send:q('.send'),h1:q('h1'),smallTargets:small}}"""
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch()
    for w,h,tag in [(1440,900,'desktop'),(375,812,'mobile')]:
      pg=await b.new_page(viewport={'width':w,'height':h},device_scale_factor=2)
      await pg.goto(URL,wait_until='load'); await pg.wait_for_timeout(2500)
      await pg.screenshot(path=f'qa/{tag}-first.png')
      await pg.screenshot(path=f'qa/{tag}-full.png',full_page=True)
      print(tag,json.dumps(await pg.evaluate(JS)))
      if tag=='mobile':
        await pg.click('.menu-btn'); await pg.wait_for_timeout(400); await pg.screenshot(path='qa/mobile-menu.png')
      await pg.close()
    await b.close()
asyncio.run(main())

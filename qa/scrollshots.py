import asyncio
from playwright.async_api import async_playwright
async def m():
  async with async_playwright() as p:
    b=await p.chromium.launch()
    for w,h,tag in [(1440,900,'desktop'),(375,812,'mobile')]:
      pg=await b.new_page(viewport={'width':w,'height':h},device_scale_factor=1)
      await pg.goto('http://localhost:8788/',wait_until='load'); await pg.wait_for_timeout(1500)
      for sel in ['#work','.row','.wide-narrow','.banner','#how','.in-writing','#contact']:
        await pg.evaluate(f"document.querySelector('{sel}').scrollIntoView({{block:'start'}})"); await pg.wait_for_timeout(900)
        await pg.screenshot(path=f"scroll-{tag}-{sel.strip('#.')}.png")
      await pg.close()
    await b.close()
asyncio.run(m())

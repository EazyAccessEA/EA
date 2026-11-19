import asyncio
from playwright.async_api import async_playwright
async def m():
  async with async_playwright() as p:
    b=await p.chromium.launch(); pg=await b.new_page(viewport={'width':375,'height':812})
    await pg.goto('http://localhost:8788/#contact',wait_until='load'); await pg.wait_for_timeout(4000)
    # 1) empty submit -> field errors
    await pg.click('.send'); await pg.wait_for_timeout(2500)
    print('empty:', await pg.inner_text('.form-status'), '| name err:', await pg.is_visible('#e-name'))
    await pg.evaluate("window.turnstile&&turnstile.reset()"); await pg.wait_for_timeout(3000)
    # 2) valid submit
    for sel in ['input[value=shop]']:
      await pg.evaluate(f"document.querySelector('{sel}').scrollIntoView({{block:'center'}})"); await pg.wait_for_timeout(600)
    await pg.check('input[value=shop]')
    print('chip selected:', await pg.is_checked('input[value=shop]'))
    await pg.fill('#f-name','Test Owner'); await pg.fill('#f-email','owner@example.com')
    await pg.fill('#f-msg','We sell spices online and need a faster shop that works on phones.')
    await pg.click('.send'); await pg.wait_for_timeout(4000)
    print('valid:', await pg.inner_text('.form-status'))
    await pg.screenshot(path='form-sent.png')
    await b.close()
asyncio.run(m())

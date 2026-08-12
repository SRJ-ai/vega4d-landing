/*
  Behaviour checks against the running dev server: reduced motion, keyboard traversal,
  and client-side form validation. Reports to stdout; writes one reduced-motion capture.

  The live database insert is deliberately not exercised here, so a verification run never
  writes a row into the real contacts table.

  Usage: node scripts/verify.mjs [baseUrl]
*/

import { chromium } from 'playwright';

const baseUrl = process.argv[2] ?? 'http://localhost:5173';
const browser = await chromium.launch();

/* ---------------------------------------------------------- reduced motion ---- */
{
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto(baseUrl, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  const first = await page.screenshot({ clip: { x: 840, y: 150, width: 560, height: 400 } });
  await page.waitForTimeout(1400);
  const second = await page.screenshot({ clip: { x: 840, y: 150, width: 560, height: 400 } });

  const identical = Buffer.compare(first, second) === 0;
  console.log(`reduced motion: hero canvas static across 1.4s = ${identical}`);
  console.log(`reduced motion: page errors = ${errors.length}`);

  await page.screenshot({ path: '.impeccable/review/desktop-reduced-motion.png' });
  await context.close();
}

/* --------------------------------------------------------------- keyboard ---- */
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto(baseUrl, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  const seen = [];
  for (let i = 0; i < 26; i += 1) {
    await page.keyboard.press('Tab');
    const info = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return null;
      const style = getComputedStyle(el);
      return {
        tag: el.tagName.toLowerCase(),
        label: (el.getAttribute('aria-label') || el.textContent || el.id || '').trim().slice(0, 34),
        outline: `${style.outlineStyle} ${style.outlineWidth}`,
      };
    });
    if (info) seen.push(info);
  }

  const noRing = seen.filter((s) => s.outline.startsWith('none'));
  console.log(`keyboard: ${seen.length} stops reached, ${noRing.length} without a focus ring`);
  seen.slice(0, 24).forEach((s) => console.log(`  ${s.tag} "${s.label}" [${s.outline}]`));
  await context.close();
}

/* ------------------------------------------------------- form validation ---- */
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto(baseUrl, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);

  await page.locator('#access').scrollIntoViewIfNeeded();
  await page.locator('form button[type="submit"]').click();
  await page.waitForTimeout(500);

  const emptyErrors = await page.locator('form p[id$="-error"]').allTextContents();
  console.log(`form: empty submit produced ${emptyErrors.length} errors`);
  emptyErrors.forEach((e) => console.log(`  ${e}`));

  await page.fill('#field-firstName', 'Priya');
  await page.fill('#field-lastName', 'Raghunathan');
  await page.fill('#field-email', 'priya@lab');
  await page.fill('#field-message', 'Bimanual policy for cable routing work.');
  await page.locator('form button[type="submit"]').click();
  await page.waitForTimeout(400);

  const badEmail = await page.locator('#field-email-error').textContent().catch(() => null);
  console.log(`form: invalid email error = ${JSON.stringify(badEmail)}`);

  await page.screenshot({ path: '.impeccable/review/desktop-form-errors.png' });
  await context.close();
}

await browser.close();

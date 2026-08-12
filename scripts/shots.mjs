/*
  Capture review screenshots of the running dev server.

  Usage: node scripts/shots.mjs [outDir] [baseUrl]

  Writes desktop.png (1440x900, full page) and mobile.png (390x844, full page) plus
  per-section crops used during design review. Not part of the app build.
*/

import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';

const outDir = process.argv[2] ?? '.impeccable/review';
const baseUrl = process.argv[3] ?? 'http://localhost:5173';

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
];

const SECTIONS = ['#top', '#pipeline', '#instrument', '#datasets', '#access'];

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();

for (const vp of VIEWPORTS) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
    colorScheme: 'dark',
  });
  const page = await context.newPage();
  const errors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', (err) => errors.push(String(err)));

  await page.goto(baseUrl, { waitUntil: 'networkidle' });
  // Let the entrance timeline finish before anything is captured.
  await page.waitForTimeout(2600);

  await page.screenshot({ path: `${outDir}/${vp.name}.png`, fullPage: true });

  for (const id of SECTIONS) {
    const handle = await page.$(id);
    if (!handle) continue;
    await handle.scrollIntoViewIfNeeded();
    await page.waitForTimeout(900);
    const label = id.replace('#', '');
    await page.screenshot({ path: `${outDir}/${vp.name}-${label}.png` });
  }

  console.log(`${vp.name}: captured. console errors: ${errors.length}`);
  errors.forEach((e) => console.log(`  ${e}`));
  await context.close();
}

await browser.close();

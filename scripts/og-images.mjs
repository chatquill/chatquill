// Renders each SVG cover to a 1200x630 JPEG for social share previews
// (crawlers do not render SVG). Run `npm run og` after adding or changing a cover.
import { chromium } from '@playwright/test';
import { mkdirSync, readdirSync, readFileSync } from 'node:fs';

const dir = 'public/images';
mkdirSync(`${dir}/og`, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });

for (const file of readdirSync(dir).filter((f) => f.endsWith('.svg'))) {
  const src = `data:image/svg+xml;base64,${readFileSync(`${dir}/${file}`).toString('base64')}`;
  await page.setContent(`<body style="margin:0"><img src="${src}" style="display:block;width:1200px;height:630px;object-fit:cover">`);
  await page.locator('img').evaluate((img) => img.decode());
  await page.screenshot({ path: `${dir}/og/${file.replace('.svg', '.jpg')}`, type: 'jpeg', quality: 85 });
}

await browser.close();

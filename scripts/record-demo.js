// Demo video recorder for BlueBird Agent
// Drives chromium through landing → features → architecture → chat → API call
// Records via Playwright's built-in recordVideo (no Xvfb needed)

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const URL = 'https://bluebird-agent.vercel.app';
const OUT_DIR = path.join(__dirname, 'demo-assets', 'raw');
const VIEWPORT = { width: 1280, height: 720 };
const TARGET_DURATION = 92_000; // ~92s to match voiceover (93s)

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function smoothScroll(page, toY, duration) {
  await page.evaluate(({ toY, duration }) => {
    return new Promise((resolve) => {
      const startY = window.scrollY;
      const distance = toY - startY;
      const start = performance.now();
      function step() {
        const t = Math.min(1, (performance.now() - start) / duration);
        // ease-in-out cubic
        const e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        window.scrollTo(0, startY + distance * e);
        if (t < 1) requestAnimationFrame(step);
        else resolve();
      }
      requestAnimationFrame(step);
    });
  }, { toY, duration });
}

async function typeSlowly(locator, text, perChar = 35) {
  for (const ch of text) {
    await locator.type(ch);
    await sleep(perChar);
  }
}

(async () => {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await chromium.launch({
    headless: true, // headed not needed; recordVideo captures the page
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });

  const ctx = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2,
    recordVideo: {
      dir: OUT_DIR,
      size: VIEWPORT,
    },
    colorScheme: 'dark',
  });

  const page = await ctx.newPage();
  const startTs = Date.now();
  const elapsed = () => Date.now() - startTs;

  console.log('[1/7] Loading landing page...');
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 30_000 });
  await sleep(3000); // hold on hero (matches "BlueBird Agent. An autonomous...")

  console.log('[2/7] Scroll → Features...');
  await smoothScroll(page, 720, 1500);
  await sleep(2500);
  await smoothScroll(page, 1100, 1200);
  await sleep(3500); // matches "It listens to sixteen channels..."

  console.log('[3/7] Scroll → Live Demo terminal...');
  const demoY = await page.evaluate(() => {
    const el = document.querySelector('#demo');
    return el ? el.getBoundingClientRect().top + window.scrollY - 60 : 1600;
  });
  await smoothScroll(page, demoY, 1500);
  await sleep(2500);

  // Click Terminal tab
  try {
    await page.getByRole('button', { name: /Terminal/i }).click({ timeout: 3000 });
    await sleep(3500);
  } catch { /* tab may not be present */ }

  // Click Swap tab
  try {
    await page.getByRole('button', { name: /Swap by Agent/i }).click({ timeout: 3000 });
    await sleep(4000);
  } catch {}

  console.log('[4/7] Scroll → Architecture...');
  const archY = await page.evaluate(() => {
    const el = document.querySelector('#architecture');
    return el ? el.getBoundingClientRect().top + window.scrollY - 60 : 2400;
  });
  await smoothScroll(page, archY, 1500);
  await sleep(5000); // hold on diagram

  console.log('[5/7] Scroll → Stats + CTA...');
  const statsY = await page.evaluate(() => {
    const el = document.querySelector('#stats');
    return el ? el.getBoundingClientRect().top + window.scrollY - 60 : 3200;
  });
  await smoothScroll(page, statsY, 1500);
  await sleep(3000);
  await smoothScroll(page, statsY + 500, 1500);
  await sleep(3000);

  console.log('[6/7] Navigate to /chat and send a real query...');
  await page.goto(`${URL}/chat`, { waitUntil: 'networkidle', timeout: 30_000 });
  await sleep(2500);

  const inputLocator = page.locator('input[placeholder*="BlueBird"]');
  await inputLocator.click();
  await typeSlowly(inputLocator, 'What makes you different from a normal chatbot?');
  await sleep(700);
  await page.locator('button[type="submit"]').click();

  // Wait for streaming response to populate (max 18s)
  const respLocator = page.locator('div.bg-white\\/5.text-white\\/85').first();
  try {
    await respLocator.waitFor({ state: 'visible', timeout: 18_000 });
  } catch {}
  await sleep(8000); // let streaming finish + viewer read

  console.log('[7/7] Closing...');
  // Pad to target duration
  const remaining = TARGET_DURATION - elapsed();
  if (remaining > 0) await sleep(remaining);

  await ctx.close();
  await browser.close();

  // Find produced video file
  const files = fs.readdirSync(OUT_DIR).filter(f => f.endsWith('.webm'));
  if (files.length === 0) {
    console.error('No video produced.');
    process.exit(1);
  }
  const videoPath = path.join(OUT_DIR, files[0]);
  console.log(`\n✓ Video recorded: ${videoPath}`);
  console.log(`  Total elapsed: ${(elapsed() / 1000).toFixed(1)}s`);
})().catch((e) => {
  console.error('Recording failed:', e.message);
  process.exit(1);
});

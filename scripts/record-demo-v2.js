// Demo video v2 — sinkron dengan narration_andrew.ogg (175s)
// Chapter timing crafted to match voiceover beats

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const URL = process.env.DEMO_URL || 'https://bluebird-agent.vercel.app';
const OUT_DIR = path.join(__dirname, 'demo-assets', 'raw_v2');
const VIEWPORT = { width: 1280, height: 720 };
const TARGET_DURATION = 178_000; // 178s, slight buffer over 175s narration

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function smoothScroll(page, toY, duration) {
  await page.evaluate(({ toY, duration }) => {
    return new Promise((resolve) => {
      const startY = window.scrollY;
      const distance = toY - startY;
      const start = performance.now();
      function step() {
        const t = Math.min(1, (performance.now() - start) / duration);
        const e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        window.scrollTo(0, startY + distance * e);
        if (t < 1) requestAnimationFrame(step);
        else resolve();
      }
      requestAnimationFrame(step);
    });
  }, { toY, duration });
}

async function scrollToSelector(page, selector, fallbackY = 0, durationMs = 1800) {
  const y = await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    return el ? el.getBoundingClientRect().top + window.scrollY - 60 : null;
  }, selector);
  await smoothScroll(page, y ?? fallbackY, durationMs);
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
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });

  const ctx = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2,
    recordVideo: { dir: OUT_DIR, size: VIEWPORT },
    colorScheme: 'dark',
  });

  const page = await ctx.newPage();
  const startTs = Date.now();
  const elapsed = () => Date.now() - startTs;
  const log = (msg) => console.log(`[${(elapsed()/1000).toFixed(1)}s] ${msg}`);

  // ============================================================
  // CHAPTER 1 (0:00 – 0:18) — HOOK on Hero
  // Narration: "Hey. Let me show you something I've been building.
  //   It's called BlueBird Agent. The goal is pretty simple..."
  // ============================================================
  log('CH1: Loading landing page (Hero)');
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 30_000 });
  await sleep(8000);
  // tiny hint of motion to keep it alive
  await smoothScroll(page, 80, 1500);
  await sleep(8500);

  // ============================================================
  // CHAPTER 2 (0:18 – 0:48) — How It Works (Listen / Classify / Execute)
  // Narration: "So here's what it actually does. A Telethon userbot...
  //   sixteen curated channels... Telegram bot? Easy. Web flow? Different.
  //   Gleam-style quest? Probably skip..."
  // ============================================================
  log('CH2: How It Works');
  await scrollToSelector(page, '#how', 720, 2000);
  await sleep(13_000); // dwell on 3 cards while narration explains
  // small parallax to keep visual energy
  await page.mouse.move(640, 360, { steps: 10 });
  await sleep(15_000);

  // ============================================================
  // CHAPTER 3 (0:48 – 1:14) — Features
  // Narration: "...then a cron-driven worker engine picks up whatever's queued
  //   and runs the matching state machine. Captchas. Telegram bots. Wallet."
  // ============================================================
  log('CH3: Features');
  await scrollToSelector(page, '#features', 1500, 1800);
  await sleep(13_000);
  await smoothScroll(page, await page.evaluate(() => window.scrollY + 380), 1500);
  await sleep(11_000);

  // ============================================================
  // CHAPTER 4 (1:14 – 1:34) — Live Demo terminal/swap
  // Narration: "When the run is done, the agent posts a recap..."
  // ============================================================
  log('CH4: Live Demo');
  await scrollToSelector(page, '#demo', 2400, 1800);
  await sleep(3500);
  try {
    await page.getByRole('button', { name: /Terminal/i }).click({ timeout: 2500 });
    await sleep(7000);
  } catch {}
  try {
    await page.getByRole('button', { name: /Swap by Agent/i }).click({ timeout: 2500 });
    await sleep(7000);
  } catch {
    await sleep(7000);
  }

  // ============================================================
  // CHAPTER 5 (1:34 – 1:54) — Code Showcase + Architecture
  // Narration: "Three things matter about how this is built. First, boring code.
  //   Second, auditable. Third, it's already running."
  // ============================================================
  log('CH5: Code Showcase');
  // Code Showcase has no id; scroll by approximate position via Architecture anchor backwards
  const archY = await page.evaluate(() => {
    const el = document.querySelector('#architecture');
    return el ? el.getBoundingClientRect().top + window.scrollY - 60 : 3000;
  });
  // Land between Live Demo end and Architecture start (CodeShowcase sits there)
  await smoothScroll(page, Math.max(archY - 700, 2500), 1800);
  await sleep(11_000);

  log('CH5b: Architecture diagram');
  await smoothScroll(page, archY, 1500);
  await sleep(9000);

  // ============================================================
  // CHAPTER 6 (1:54 – 2:14) — Stats
  // Narration: "...the userbot is online right now, in production..."
  // ============================================================
  log('CH6: Stats');
  await scrollToSelector(page, '#stats', 4200, 1800);
  await sleep(11_000);
  await smoothScroll(page, await page.evaluate(() => window.scrollY + 380), 1500);
  await sleep(7000);

  // ============================================================
  // CHAPTER 7 (2:14 – 2:55) — /chat live query
  // Narration: "...the chat is right here. Type something. Ask it anything..."
  // ============================================================
  log('CH7: /chat live query');
  await page.goto(`${URL}/chat`, { waitUntil: 'networkidle', timeout: 30_000 });
  await sleep(3500);

  const inputLocator = page.locator('input[placeholder*="BlueBird"]');
  await inputLocator.click();
  await typeSlowly(inputLocator, 'What makes BlueBird Agent different from a chatbot?', 40);
  await sleep(900);
  await page.locator('button[type="submit"]').click();
  // Let response stream + viewer read
  const respLocator = page.locator('div.bg-white\\/5.text-white\\/85').first();
  try {
    await respLocator.waitFor({ state: 'visible', timeout: 20_000 });
  } catch {}
  await sleep(15_000);

  // ============================================================
  // CLOSING / pad
  // Narration: "Thanks for watching."
  // ============================================================
  const remaining = TARGET_DURATION - elapsed();
  if (remaining > 0) {
    log(`Padding ${(remaining/1000).toFixed(1)}s to reach target`);
    await sleep(remaining);
  } else {
    log(`Already over target by ${(-remaining/1000).toFixed(1)}s, closing now`);
  }

  await ctx.close();
  await browser.close();

  const files = fs.readdirSync(OUT_DIR).filter(f => f.endsWith('.webm'));
  if (files.length === 0) {
    console.error('No video produced.');
    process.exit(1);
  }
  const videoPath = path.join(OUT_DIR, files[0]);
  console.log(`\n✓ Video recorded: ${videoPath}`);
  console.log(`  Elapsed: ${(elapsed() / 1000).toFixed(1)}s`);
})().catch((e) => {
  console.error('Recording failed:', e.message);
  process.exit(1);
});

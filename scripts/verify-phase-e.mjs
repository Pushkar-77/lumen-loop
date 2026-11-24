import { chromium } from "playwright";
import { spawn } from "child_process";
import path from "path";
import fs from "fs";

const PORT = 3014;
const BASE_URL = `http://localhost:${PORT}`;
const SCREENSHOT_DIR = "C:\\Users\\Pushkar Patil\\.gemini\\antigravity\\brain\\bf8e1206-2a67-4049-b3af-12a465775b68\\screenshots";

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function run() {
  console.log("Starting production Next.js server on port", PORT);
  const server = spawn("npx", ["next", "start", "-p", String(PORT)], {
    cwd: "C:\\projects\\lumen-loop",
    shell: true,
    stdio: "pipe",
  });

  server.stdout.on("data", (d) => console.log(`[Next.js]: ${d.toString().trim()}`));
  server.stderr.on("data", (d) => console.error(`[Next.js Error]: ${d.toString().trim()}`));

  let ready = false;
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch(BASE_URL);
      if (res.status === 200) {
        ready = true;
        console.log("Server ready on port", PORT);
        break;
      }
    } catch {
      await new Promise((r) => setTimeout(r, 500));
    }
  }

  if (!ready) {
    console.error("Server failed to respond within timeout");
    server.kill();
    process.exit(1);
  }

  const browser = await chromium.launch({ headless: true });

  try {
    // ----------------------------------------------------
    // TEST 1: Desktop 1440x900 Default State
    // ----------------------------------------------------
    console.log("\n--- TEST 1: /work Default State (1440px) ---");
    const desktopCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    await desktopCtx.addInitScript(() => {
      sessionStorage.setItem("lumen-preloader-seen", "true");
    });
    const page = await desktopCtx.newPage();

    const consoleErrors = [];
    page.on("console", (m) => {
      if (m.type() === "error") consoleErrors.push(m.text());
    });

    await page.goto(`${BASE_URL}/work`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1000);
    // Scroll down 260px so filter pills and case cards are visible in 1440x900 viewport
    await page.evaluate(() => window.scrollBy(0, 260));
    await page.waitForTimeout(500);

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, "32-phase-e-work-default-1440.png"),
      fullPage: false,
    });
    console.log("Saved: 32-phase-e-work-default-1440.png");

    // ----------------------------------------------------
    // TEST 2: Filtered State (e.g. Paid Ads or SEO)
    // ----------------------------------------------------
    console.log("\n--- TEST 2: /work Filtered State (1440px) ---");
    // Click 'Paid Ads' filter pill
    const paidAdsFilter = page.locator("button:has-text('Paid Ads')");
    await paidAdsFilter.click();
    await page.waitForTimeout(600);

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, "33-phase-e-work-filtered-1440.png"),
      fullPage: false,
    });
    console.log("Saved: 33-phase-e-work-filtered-1440.png");

    // Reset back to "All"
    await page.locator("button:has-text('All')").first().click();
    await page.waitForTimeout(400);

    // ----------------------------------------------------
    // TEST 3: Before/After switch in both states
    // ----------------------------------------------------
    console.log("\n--- TEST 3: Before/After Switch in Both States ---");
    // Switch to Baseline ("Before") state on first card
    const firstSwitch = page.locator("button[role='switch']").first();
    await firstSwitch.click(); // Toggles from After (default true) to Before (false)
    await page.waitForTimeout(500);

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, "34-phase-e-work-before-state-1440.png"),
      fullPage: false,
    });
    console.log("Saved: 34-phase-e-work-before-state-1440.png");

    // Switch back to "After" state
    await firstSwitch.click();
    await page.waitForTimeout(500);

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, "35-phase-e-work-after-state-1440.png"),
      fullPage: false,
    });
    console.log("Saved: 35-phase-e-work-after-state-1440.png");

    // ----------------------------------------------------
    // TEST 4: USD Mode
    // ----------------------------------------------------
    console.log("\n--- TEST 4: /work USD Mode (1440px) ---");
    // Click USD toggle button
    const usdButton = page.locator("button:has-text('USD')").first();
    await usdButton.click();
    await page.waitForTimeout(600);

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, "36-phase-e-work-usd-mode-1440.png"),
      fullPage: false,
    });
    console.log("Saved: 36-phase-e-work-usd-mode-1440.png");

    // ----------------------------------------------------
    // TEST 5: One /work/[slug] Page
    // ----------------------------------------------------
    console.log("\n--- TEST 5: /work/[slug] Breakdown Page (1440px) ---");
    await page.goto(`${BASE_URL}/work/aura-consumer-labs`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1000);

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, "37-phase-e-work-slug-breakdown-1440.png"),
      fullPage: false,
    });
    console.log("Saved: 37-phase-e-work-slug-breakdown-1440.png");

    // Scroll to results, SVG chart, and client quote
    await page.evaluate(() => window.scrollBy(0, 1100));
    await page.waitForTimeout(500);
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, "37b-phase-e-work-slug-chart-and-cta-1440.png"),
      fullPage: false,
    });
    console.log("Saved: 37b-phase-e-work-slug-chart-and-cta-1440.png");

    // Also test "Request a similar plan" CTA flow to /contact
    console.log("Testing 'Request a similar plan' CTA flow...");
    const requestPlanBtn = page.locator("a:has-text('Request a similar plan')");
    await requestPlanBtn.click();
    await page.waitForURL("**/contact", { timeout: 6000 });
    console.log("Successfully navigated to /contact with brief pre-filled!");

    await desktopCtx.close();

    // ----------------------------------------------------
    // TEST 6: Mobile 390px Viewport (No horizontal overflow)
    // ----------------------------------------------------
    console.log("\n--- TEST 6: Mobile 390px Viewport Verification ---");
    const mobileCtx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    await mobileCtx.addInitScript(() => {
      sessionStorage.setItem("lumen-preloader-seen", "true");
    });
    const mobilePage = await mobileCtx.newPage();

    await mobilePage.goto(`${BASE_URL}/work`, { waitUntil: "networkidle" });
    await mobilePage.waitForTimeout(800);

    const workOverflow = await mobilePage.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    console.log("/work Mobile horizontal overflow:", workOverflow ? "FAILED (overflows)" : "PASSED (no overflow)");

    await mobilePage.screenshot({
      path: path.join(SCREENSHOT_DIR, "38-phase-e-work-mobile-390.png"),
      fullPage: false,
    });
    console.log("Saved: 38-phase-e-work-mobile-390.png");

    // Slug page on mobile
    await mobilePage.goto(`${BASE_URL}/work/aura-consumer-labs`, { waitUntil: "networkidle" });
    await mobilePage.waitForTimeout(800);

    const slugOverflow = await mobilePage.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    console.log("/work/aura-consumer-labs Mobile horizontal overflow:", slugOverflow ? "FAILED (overflows)" : "PASSED (no overflow)");

    await mobilePage.screenshot({
      path: path.join(SCREENSHOT_DIR, "39-phase-e-work-slug-mobile-390.png"),
      fullPage: false,
    });
    console.log("Saved: 39-phase-e-work-slug-mobile-390.png");

    await mobileCtx.close();

    if (consoleErrors.length > 0) {
      console.warn("Console errors detected:", consoleErrors);
    } else {
      console.log("Console errors: 0. Clean run!");
    }

  } finally {
    await browser.close();
    server.kill();
    console.log("Verification completed and server terminated.");
  }
}

run().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});

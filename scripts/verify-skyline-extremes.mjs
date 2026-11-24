import { chromium } from "playwright";
import { spawn } from "child_process";
import path from "path";
import fs from "fs";

const PORT = 3017;
const BASE_URL = `http://localhost:${PORT}`;
const SCREENSHOT_DIR = "C:\\Users\\Pushkar Patil\\.gemini\\antigravity\\brain\\bf8e1206-2a67-4049-b3af-12a465775b68\\screenshots";

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function run() {
  console.log("Starting Next.js production server on port", PORT);
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
    console.error("Server failed to start");
    server.kill();
    process.exit(1);
  }

  const browser = await chromium.launch({ headless: true });
  // Set viewport large enough (1440x950) so the entire simulator card and canvas are fully in view
  const context = await browser.newContext({ viewport: { width: 1440, height: 950 } });
  await context.addInitScript(() => sessionStorage.setItem("lumen-preloader-seen", "true"));
  const page = await context.newPage();

  const channelNames = [
    "Technical SEO & Search",
    "Google High-Intent Search",
    "Meta Paid Social",
    "Lifecycle Email & CRM",
    "Conversion Rate Optimization",
  ];

  async function scrollToSimulator() {
    await page.evaluate(() => {
      const el = document.querySelector(".grid-cols-1.lg\\:grid-cols-12");
      if (el) {
        el.scrollIntoView({ block: "center", behavior: "instant" });
      }
    });
  }

  async function setInputs(budget, aov) {
    const budgetInput = page.locator("input[aria-label='Monthly Growth Spend']");
    await budgetInput.fill(String(budget));
    await budgetInput.dispatchEvent("change");

    if (aov) {
      const aovInput = page.locator("input[aria-label='Average Order Value']");
      await aovInput.fill(String(aov));
      await aovInput.dispatchEvent("change");
    }
    await scrollToSimulator();
  }

  async function setOnlyChannel(targetChannelName) {
    for (const name of channelNames) {
      const btn = page.locator(`button:has-text('${name}')`);
      const isSelected = await btn.evaluate((el) => el.classList.contains("bg-[#162035]"));
      if (name === targetChannelName) {
        if (!isSelected) await btn.click();
      } else {
        if (isSelected) await btn.click();
      }
    }
    await scrollToSimulator();
  }

  async function enableAllChannels() {
    for (const name of channelNames) {
      const btn = page.locator(`button:has-text('${name}')`);
      const isSelected = await btn.evaluate((el) => el.classList.contains("bg-[#162035]"));
      if (!isSelected) await btn.click();
    }
    await scrollToSimulator();
  }

  await page.goto(`${BASE_URL}/roi-lab`, { waitUntil: "networkidle" });
  await page.waitForTimeout(2500); // Allow initial 3D canvas idle load
  await scrollToSimulator();

  // --- TEST 1: Min Spend (₹25,000) ---
  console.log("\n[1] Testing Minimum Spend (₹25,000)...");
  await setInputs(25000, 3500);
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, "50-skyline-min-spend-1440.png") });
  console.log("Saved: 50-skyline-min-spend-1440.png");

  // --- TEST 2: Max Spend (₹10,00,000) ---
  console.log("\n[2] Testing Maximum Spend (₹10,00,000)...");
  await setInputs(1000000, 25000);
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, "51-skyline-max-spend-1440.png") });
  console.log("Saved: 51-skyline-max-spend-1440.png");

  // --- TEST 3: All Five Channels Active ---
  console.log("\n[3] Testing All 5 Channels Active...");
  await enableAllChannels();
  await setInputs(500000, 5000);
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, "52-skyline-all-five-channels-1440.png") });
  console.log("Saved: 52-skyline-all-five-channels-1440.png");

  // --- TEST 4: Single Channel Only (Email only) ---
  console.log("\n[4] Testing Single Channel Only (Email & CRM)...");
  await setOnlyChannel("Lifecycle Email & CRM");
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, "53-skyline-single-channel-email-1440.png") });
  console.log("Saved: 53-skyline-single-channel-email-1440.png");

  // --- TEST 5 to 9: Each channel dominant in turn ---
  console.log("\n[5-9] Testing Each Channel as Dominant...");
  const dominantTests = [
    { name: "Technical SEO & Search", file: "54-skyline-dominant-seo-1440.png" },
    { name: "Google High-Intent Search", file: "55-skyline-dominant-search-1440.png" },
    { name: "Meta Paid Social", file: "56-skyline-dominant-meta-1440.png" },
    { name: "Lifecycle Email & CRM", file: "57-skyline-dominant-email-1440.png" },
    { name: "Conversion Rate Optimization", file: "58-skyline-dominant-cro-1440.png" },
  ];

  for (const item of dominantTests) {
    console.log(`  -> Dominant: ${item.name}`);
    await setOnlyChannel(item.name);
    await setInputs(600000, 8000);
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, item.file) });
    console.log(`  Saved: ${item.file}`);
  }

  // --- TEST 10: 2D Fallback at 390px ---
  console.log("\n[10] Testing 2D Fallback at 390px Mobile Viewport...");
  const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true });
  await mobileContext.addInitScript(() => sessionStorage.setItem("lumen-preloader-seen", "true"));
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto(`${BASE_URL}/roi-lab`, { waitUntil: "networkidle" });
  await mobilePage.waitForTimeout(1000);
  await mobilePage.screenshot({ path: path.join(SCREENSHOT_DIR, "59-skyline-2d-fallback-mobile-390.png") });
  console.log("Saved: 59-skyline-2d-fallback-mobile-390.png");

  await browser.close();
  server.kill();
  console.log("\nAll Skyline extreme scenario tests completed successfully!");
}

run().catch((e) => {
  console.error("Test error:", e);
  process.exit(1);
});

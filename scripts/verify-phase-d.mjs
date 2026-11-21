import { chromium } from "playwright";
import { spawn } from "child_process";
import path from "path";
import fs from "fs";

const PORT = 3012;
const BASE_URL = `http://localhost:${PORT}`;
const SCREENSHOT_DIR = "C:\\Users\\Pushkar Patil\\.gemini\\antigravity\\brain\\bf8e1206-2a67-4049-b3af-12a465775b68\\screenshots";

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function run() {
  console.log("Starting Next.js on port", PORT);
  const server = spawn("npx", ["next", "start", "-p", String(PORT)], {
    cwd: "C:\\projects\\lumen-loop",
    shell: true,
    stdio: "pipe",
  });

  server.stdout.on("data", (d) => console.log(`[Next.js]: ${d.toString().trim()}`));
  server.stderr.on("data", (d) => console.error(`[Next.js Error]: ${d.toString().trim()}`));

  // Wait for server to respond
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
    console.error("Server failed to respond");
    server.kill();
    process.exit(1);
  }

  const browser = await chromium.launch({ headless: true });

  // TEST 1 & 2: Desktop 1440x900
  console.log("\n--- TEST 1: Desktop 1440x900 Default State ---");
  const desktopCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const desktopPage = await desktopCtx.newPage();

  const consoleErrors = [];
  desktopPage.on("console", (m) => {
    if (m.type() === "error") consoleErrors.push(m.text());
  });

  await desktopPage.goto(`${BASE_URL}/roi-lab`, { waitUntil: "networkidle" });
  await desktopPage.waitForTimeout(2000); // Allow idle 3D canvas to render

  await desktopPage.screenshot({
    path: path.join(SCREENSHOT_DIR, "28-phase-d-roi-lab-desktop-default.png"),
  });
  console.log("Saved: 28-phase-d-roi-lab-desktop-default.png");

  console.log("\n--- TEST 2: Desktop 1440x900 Changed Inputs ---");
  // Change budget slider
  const budgetInput = desktopPage.locator("input[aria-label='Monthly Growth Spend']");
  await budgetInput.fill("350000");
  await budgetInput.dispatchEvent("change");

  // Change AOV slider
  const aovInput = desktopPage.locator("input[aria-label='Average Order Value']");
  await aovInput.fill("6500");
  await aovInput.dispatchEvent("change");

  // Toggle CRO channel on
  await desktopPage.click("button:has-text('Conversion Rate Optimization')");
  await desktopPage.waitForTimeout(1000);

  await desktopPage.screenshot({
    path: path.join(SCREENSHOT_DIR, "29-phase-d-roi-lab-desktop-changed-inputs.png"),
  });
  console.log("Saved: 29-phase-d-roi-lab-desktop-changed-inputs.png");

  // Click 'Send this scenario to my brief'
  console.log("Testing transition from ROI lab to /contact...");
  await desktopPage.click("a:has-text('Send this scenario to my brief')");
  await desktopPage.waitForURL("**/contact", { timeout: 6000 });
  await desktopPage.waitForTimeout(1000);

  await desktopPage.screenshot({
    path: path.join(SCREENSHOT_DIR, "30-phase-d-roi-lab-sent-to-contact.png"),
  });
  console.log("Saved: 30-phase-d-roi-lab-sent-to-contact.png");

  await desktopCtx.close();

  // TEST 3: Mobile 390x844 Fallback
  console.log("\n--- TEST 3: Mobile 390x844 Fallback State ---");
  const mobileCtx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
  });
  const mobilePage = await mobileCtx.newPage();

  mobilePage.on("console", (m) => {
    if (m.type() === "error") consoleErrors.push(m.text());
  });

  await mobilePage.goto(`${BASE_URL}/roi-lab`, { waitUntil: "networkidle" });
  await mobilePage.waitForTimeout(1200);

  await mobilePage.screenshot({
    path: path.join(SCREENSHOT_DIR, "31-phase-d-roi-lab-mobile-fallback.png"),
  });
  console.log("Saved: 31-phase-d-roi-lab-mobile-fallback.png");

  await mobileCtx.close();
  await browser.close();
  server.kill();

  console.log("\nAll Phase D verification tests finished!");
  console.log("Total console errors captured:", consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.log("Errors:", consoleErrors);
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});

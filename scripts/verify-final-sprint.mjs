import { chromium } from "playwright";
import { spawn } from "child_process";
import path from "path";
import fs from "fs";

const PORT = 3015;
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

  // 1. Desktop 1440 - ROI Lab with 3D Skyline + HTML legend + KPI strip
  console.log("\n--- TEST 1: ROI Lab Desktop 1440 ---");
  const ctxDesktop = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await ctxDesktop.addInitScript(() => sessionStorage.setItem("lumen-preloader-seen", "true"));
  const pRoiDesktop = await ctxDesktop.newPage();
  await pRoiDesktop.goto(`${BASE_URL}/roi-lab`, { waitUntil: "networkidle" });
  await pRoiDesktop.waitForTimeout(2500); // 3D load
  await pRoiDesktop.screenshot({ path: path.join(SCREENSHOT_DIR, "40-final-roi-lab-desktop-1440.png") });
  console.log("Saved: 40-final-roi-lab-desktop-1440.png");

  // 2. Mobile 390 - ROI Lab 2D Fallback with no preloader
  console.log("\n--- TEST 2: ROI Lab Mobile 390 ---");
  const ctxMobile = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true });
  await ctxMobile.addInitScript(() => sessionStorage.setItem("lumen-preloader-seen", "true"));
  const pRoiMobile = await ctxMobile.newPage();
  await pRoiMobile.goto(`${BASE_URL}/roi-lab`, { waitUntil: "networkidle" });
  await pRoiMobile.waitForTimeout(1000);
  const overflowRoi = await pRoiMobile.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  console.log("ROI Lab Mobile 390 overflow:", overflowRoi);
  await pRoiMobile.screenshot({ path: path.join(SCREENSHOT_DIR, "41-final-roi-lab-mobile-390.png") });
  console.log("Saved: 41-final-roi-lab-mobile-390.png");

  // 3. Desktop 1440 - About Page
  console.log("\n--- TEST 3: About Page Desktop 1440 ---");
  const pAbout = await ctxDesktop.newPage();
  await pAbout.goto(`${BASE_URL}/about`, { waitUntil: "networkidle" });
  await pAbout.waitForTimeout(1000);
  await pAbout.screenshot({ path: path.join(SCREENSHOT_DIR, "42-final-about-desktop-1440.png") });
  console.log("Saved: 42-final-about-desktop-1440.png");

  // 4. Desktop 1440 - Contact Page with new pipeline
  console.log("\n--- TEST 4: Contact Page Desktop 1440 ---");
  const pContact = await ctxDesktop.newPage();
  await pContact.goto(`${BASE_URL}/contact`, { waitUntil: "networkidle" });
  await pContact.waitForTimeout(1000);
  await pContact.screenshot({ path: path.join(SCREENSHOT_DIR, "43-final-contact-desktop-1440.png") });
  console.log("Saved: 43-final-contact-desktop-1440.png");

  // 5. Desktop 1440 - Custom 404 Page
  console.log("\n--- TEST 5: Custom 404 Page Desktop 1440 ---");
  const p404 = await ctxDesktop.newPage();
  await p404.goto(`${BASE_URL}/this-route-does-not-exist`, { waitUntil: "networkidle" });
  await p404.waitForTimeout(1000);
  await p404.screenshot({ path: path.join(SCREENSHOT_DIR, "44-final-404-desktop-1440.png") });
  console.log("Saved: 44-final-404-desktop-1440.png");

  // 6. Test Sitemap & Robots
  console.log("\n--- TEST 6: Sitemap and Robots ---");
  const resSitemap = await fetch(`${BASE_URL}/sitemap.xml`);
  const sitemapText = await resSitemap.text();
  console.log("Sitemap status:", resSitemap.status, "Length:", sitemapText.length, "Has aura-consumer-labs:", sitemapText.includes("aura-consumer-labs"));

  const resRobots = await fetch(`${BASE_URL}/robots.txt`);
  const robotsText = await resRobots.text();
  console.log("Robots status:", resRobots.status, "Content:\n", robotsText.trim());

  await browser.close();
  server.kill();
  console.log("\nVerification finished successfully!");
}

run().catch((e) => {
  console.error("Verification error:", e);
  process.exit(1);
});

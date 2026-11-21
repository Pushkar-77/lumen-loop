import { chromium } from "playwright";
import { spawn } from "child_process";
import path from "path";
import fs from "fs";

const PORT = 3008;
const BASE_URL = `http://localhost:${PORT}`;
const SCREENSHOT_DIR = "C:\\Users\\Pushkar Patil\\.gemini\\antigravity\\brain\\bf8e1206-2a67-4049-b3af-12a465775b68\\screenshots";

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function run() {
  console.log("Starting next start on port", PORT);
  const server = spawn("npx", ["next", "start", "-p", String(PORT)], {
    cwd: "C:\\projects\\lumen-loop",
    shell: true,
    stdio: "pipe",
  });

  server.stdout.on("data", (d) => console.log(`[Next.js]: ${d.toString().trim()}`));
  server.stderr.on("data", (d) => console.error(`[Next.js Error]: ${d.toString().trim()}`));

  // Wait for server to be responsive
  let ready = false;
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch(BASE_URL);
      if (res.status === 200) {
        ready = true;
        console.log("Server is ready!");
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
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  const consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(msg.text());
    }
  });

  console.log("\n--- TEST 1: /services page ---");
  await page.goto(`${BASE_URL}/services`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  // Take screenshot of services top
  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, "19-phase-c-services-hero.png"),
  });
  console.log("Saved: 19-phase-c-services-hero.png");

  // Flip the first card (SEO)
  console.log("Testing 3D flip card...");
  const flipButton = page.locator("#seo button:has-text('Flip for Tech Stack')");
  await flipButton.click();
  await page.waitForTimeout(600);

  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, "20-phase-c-service-card-flipped.png"),
  });
  console.log("Saved: 20-phase-c-service-card-flipped.png");

  // Scroll to Custom Growth Stack Builder
  console.log("Testing Growth Stack Builder...");
  const builder = page.locator("section:has-text('Custom Growth Stack Builder')");
  await builder.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);

  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, "21-phase-c-growth-stack-builder.png"),
  });
  console.log("Saved: 21-phase-c-growth-stack-builder.png");

  // Click 'Attach Stack to Growth Brief'
  console.log("Navigating via TransitionLink to /contact...");
  const attachBtn = page.locator("a:has-text('Attach Stack to Growth Brief')");
  await attachBtn.click();

  // Wait for curtain transition and arrival on /contact
  await page.waitForURL("**/contact", { timeout: 6000 });
  await page.waitForTimeout(1000);

  console.log("\n--- TEST 2: /contact page with pre-filled brief ---");
  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, "22-phase-c-contact-prefilled.png"),
  });
  console.log("Saved: 22-phase-c-contact-prefilled.png");

  // Test form submission
  console.log("Testing form submission...");
  await page.fill('input[placeholder="Aditi Deshmukh"]', "Pushkar Patil");
  await page.fill('input[placeholder="aditi@brand.com"]', "pushkar@lumenloop.com");
  await page.fill('input[placeholder="brand.com"]', "lumenloop.com");
  await page.fill('textarea[placeholder*="current CAC"]', "Scaling paid ads and SEO into unified system.");
  
  await page.click("button[type='submit']");
  await page.waitForTimeout(1800);

  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, "23-phase-c-contact-submitted.png"),
  });
  console.log("Saved: 23-phase-c-contact-submitted.png");

  console.log("\n--- TEST 3: /pricing page ---");
  await page.goto(`${BASE_URL}/pricing`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, "24-phase-c-pricing-monthly.png"),
  });
  console.log("Saved: 24-phase-c-pricing-monthly.png");

  // Toggle Quarterly
  console.log("Toggling quarterly billing...");
  await page.click("button:has-text('Quarterly')");
  await page.waitForTimeout(500);

  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, "25-phase-c-pricing-quarterly.png"),
  });
  console.log("Saved: 25-phase-c-pricing-quarterly.png");

  // Toggle USD Currency
  console.log("Toggling USD currency...");
  await page.click("button[title*='toggle between INR and USD']");
  await page.waitForTimeout(500);

  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, "26-phase-c-pricing-usd.png"),
  });
  console.log("Saved: 26-phase-c-pricing-usd.png");

  // Scroll to Comparison Matrix and FAQ
  const faq = page.locator("h3:has-text('Frequently Answered Questions')");
  await faq.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);

  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, "27-phase-c-pricing-faq.png"),
  });
  console.log("Saved: 27-phase-c-pricing-faq.png");

  await browser.close();
  server.kill();

  console.log("\nAll Phase C tests completed successfully!");
  console.log("Console errors captured:", consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.log("Errors:", consoleErrors);
  }
  process.exit(0);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});

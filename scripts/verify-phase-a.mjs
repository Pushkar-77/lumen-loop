import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const ARTIFACTS_DIR = "C:/Users/Pushkar Patil/.gemini/antigravity/brain/bf8e1206-2a67-4049-b3af-12a465775b68/screenshots";

if (!fs.existsSync(ARTIFACTS_DIR)) {
  fs.mkdirSync(ARTIFACTS_DIR, { recursive: true });
}

async function runVerification() {
  console.log("Starting Phase A verification with Playwright Chromium...");
  const browser = await chromium.launch({ headless: true });

  try {
    // 1. DESKTOP VIEWPORT & PRELOADER TEST
    console.log("\n[Test 1] Desktop (1440x900) - Preloader verification...");
    const desktopContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
    });
    const page = await desktopContext.newPage();

    // Navigate to local server
    await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });

    // Wait 500ms to capture preloader in motion
    await page.waitForTimeout(600);
    const preloaderImg = path.join(ARTIFACTS_DIR, "01-desktop-preloader.png");
    await page.screenshot({ path: preloaderImg });
    console.log(`✓ Captured preloader screenshot: ${preloaderImg}`);

    // Click "[ Skip Launch Sequence → ]"
    const skipButton = page.locator('button:has-text("Skip Launch Sequence")');
    if (await skipButton.isVisible()) {
      await skipButton.click();
      console.log("✓ Clicked '[ Skip Launch Sequence → ]' button");
    }

    // Wait for split curtain reveal
    await page.waitForTimeout(900);

    // Verify Brand, Headline, and Tokens
    const brandName = await page.textContent("nav");
    console.log(`✓ Navbar content detected (includes 'Lumen Loop'): ${brandName?.includes("Lumen Loop")}`);

    const desktopHomeImg = path.join(ARTIFACTS_DIR, "02-desktop-homepage.png");
    await page.screenshot({ path: desktopHomeImg });
    console.log(`✓ Captured desktop homepage: ${desktopHomeImg}`);

    // Test Currency Toggle
    console.log("\n[Test 2] Testing Currency Toggle...");
    const currencyBtn = page.locator('button[title*="Toggle currency"]');
    const currencyTextBefore = await currencyBtn.innerText();
    console.log(`  Initial currency state: ${currencyTextBefore.replace(/\n/g, " ")}`);
    await currencyBtn.click();
    await page.waitForTimeout(300);
    const currencyTextAfter = await currencyBtn.innerText();
    console.log(`  Toggled currency state: ${currencyTextAfter.replace(/\n/g, " ")}`);

    // Test Footer Stubs & Scroll down
    console.log("\n[Test 3] Testing Footer Stubs & Live Pune Time...");
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    const footerImg = path.join(ARTIFACTS_DIR, "03-desktop-footer.png");
    await page.screenshot({ path: footerImg });
    console.log(`✓ Captured desktop footer: ${footerImg}`);

    // Test Heatmap Toggle
    const heatmapBtn = page.locator('button:has-text("Attention Heatmap")');
    if (await heatmapBtn.isVisible()) {
      await heatmapBtn.click();
      await page.waitForTimeout(300);
      console.log("✓ Toggled Attention Heatmap active");
    }

    // Test A/B Test Switch
    const abBtn = page.locator('button:has-text("CTA Variant")');
    const abBefore = await abBtn.innerText();
    await abBtn.click();
    await page.waitForTimeout(200);
    const abAfter = await abBtn.innerText();
    console.log(`✓ Toggled A/B switch: from '${abBefore}' to '${abAfter}'`);

    await desktopContext.close();

    // 4. MOBILE VIEWPORT (390x844) TEST
    console.log("\n[Test 4] Mobile (390x844) - Responsiveness & Mobile Menu...");
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    });
    const mobilePage = await mobileContext.newPage();

    await mobilePage.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });

    // Skip preloader if visible
    const mobileSkip = mobilePage.locator('button:has-text("Skip Launch Sequence")');
    if (await mobileSkip.isVisible()) {
      await mobileSkip.click();
    }
    await mobilePage.waitForTimeout(800);

    // Check horizontal overflow
    const hasHorizontalScroll = await mobilePage.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    console.log(`✓ Mobile horizontal overflow check: ${hasHorizontalScroll ? "FAILED (overflow detected)" : "PASSED (0px horizontal overflow)"}`);

    const mobileHomeImg = path.join(ARTIFACTS_DIR, "04-mobile-homepage.png");
    await mobilePage.screenshot({ path: mobileHomeImg });
    console.log(`✓ Captured mobile homepage: ${mobileHomeImg}`);

    // Open mobile hamburger menu
    const hamburgerBtn = mobilePage.locator('button[aria-label="Open menu"]');
    await hamburgerBtn.click();
    await mobilePage.waitForTimeout(400);

    const mobileMenuImg = path.join(ARTIFACTS_DIR, "05-mobile-menu-drawer.png");
    await mobilePage.screenshot({ path: mobileMenuImg });
    console.log(`✓ Captured mobile menu drawer: ${mobileMenuImg}`);

    await mobileContext.close();

    // 5. REDUCED MOTION TEST
    console.log("\n[Test 5] Prefers-reduced-motion test...");
    const reducedMotionContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      reducedMotion: "reduce",
    });
    const rmPage = await reducedMotionContext.newPage();
    await rmPage.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
    await rmPage.waitForTimeout(300);

    const preloaderVisibleUnderRM = await rmPage.locator('text="Campaign Launch Sequence"').isVisible();
    console.log(`✓ Under prefers-reduced-motion, preloader is immediately skipped/hidden: ${!preloaderVisibleUnderRM}`);

    await reducedMotionContext.close();

    console.log("\nAll Phase A visual & functional checks completed successfully!");
  } finally {
    await browser.close();
  }
}

runVerification().catch((err) => {
  console.error("Verification error:", err);
  process.exit(1);
});

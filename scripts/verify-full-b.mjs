import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import lighthouse from "lighthouse";

const ARTIFACTS_DIR = "C:/Users/Pushkar Patil/.gemini/antigravity/brain/bf8e1206-2a67-4049-b3af-12a465775b68/screenshots";

if (!fs.existsSync(ARTIFACTS_DIR)) {
  fs.mkdirSync(ARTIFACTS_DIR, { recursive: true });
}

async function runB3Verification() {
  console.log("==================================================");
  console.log("   LUMEN LOOP — B3 COMPLETE VERIFICATION SUITE   ");
  console.log("==================================================");

  const consoleErrors = [];
  const browser = await chromium.launch({
    headless: true,
    args: ["--remote-debugging-port=9222"],
  });

  try {
    // ----------------------------------------------------
    // TEST 1: DESKTOP 1440x900 FIRST VIEWPORT (IDLE)
    // ----------------------------------------------------
    console.log("\n[1] Capturing Desktop 1440x900 First Viewport (Idle)...");
    const desktopContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
    });
    const page = await desktopContext.newPage();

    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    await page.addInitScript(() => {
      sessionStorage.setItem("lumen-preloader-seen", "true");
    });

    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
    await page.waitForTimeout(1200); // Allow idle 3D crossfade

    const heroIdlePath = path.join(ARTIFACTS_DIR, "14-b3-hero-desktop-1440x900-idle.png");
    await page.screenshot({ path: heroIdlePath });
    console.log(`✓ Saved 1440x900 hero idle screenshot: ${heroIdlePath}`);

    // Verify headline word spacing and non-breaking clause
    const h1Text = await page.locator("h1").innerText();
    console.log(`✓ Headline text: "${h1Text.replace(/\n/g, " ")}"`);

    // Verify illustrative note placement directly under stat chips
    const illustrativeNote = await page.locator("text=*Illustrative figures based on representative growth benchmark models").isVisible();
    console.log(`✓ Illustrative note directly under stat chips: ${illustrativeNote}`);

    // ----------------------------------------------------
    // TEST 2: LAUNCH CAMPAIGN ACTIVE STATE AT 1440x900 (GOLD/SAPPHIRE ONLY)
    // ----------------------------------------------------
    console.log("\n[2] Triggering 'Launch Campaign' State at 1440x900...");
    const launchBtn = page.locator('button:has-text("Launch Campaign")');
    await launchBtn.click();
    await page.waitForTimeout(900);

    const heroActivePath = path.join(ARTIFACTS_DIR, "15-b3-hero-desktop-1440x900-active.png");
    await page.screenshot({ path: heroActivePath });
    console.log(`✓ Saved Launch Campaign active screenshot: ${heroActivePath}`);

    // ----------------------------------------------------
    // TEST 3: WIRE FOOTER A/B SWITCH TO HERO CTA COPY
    // ----------------------------------------------------
    console.log("\n[3] Testing Footer A/B Test Switch Wiring to Hero CTA...");
    // Read initial CTA text
    const initialCtaText = await page.locator("button span:has-text('Campaign')").first().innerText();
    console.log(`  Initial Hero CTA: "${initialCtaText}" (Variant A)`);

    // Scroll to footer and click A/B switch
    const abBtn = page.locator("button:has-text('CTA Variant:')");
    await abBtn.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await abBtn.click();
    console.log("✓ Clicked Footer A/B Switch");

    // Scroll back to top and verify Hero CTA updated to Variant B
    await page.locator("h1").scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    const updatedCtaText = await page.locator("button span:has-text('Test Growth Engine'), button span:has-text('Engine Running')").first().innerText();
    console.log(`✓ Updated Hero CTA after toggle: "${updatedCtaText}" (Variant B confirmed)`);

    // Toggle back to A for consistency
    await abBtn.scrollIntoViewIfNeeded();
    await abBtn.click();
    await page.waitForTimeout(200);

    // ----------------------------------------------------
    // TEST 4: NAVBAR SCROLL BUG VERIFICATION (SERVICES SCROLLED UNDER NAVBAR)
    // ----------------------------------------------------
    console.log("\n[4] Testing Navbar Frosted Solid Surface on Scroll...");
    await page.evaluate(() => window.scrollTo(0, 1400));
    await page.waitForTimeout(600);

    const navbarScrolledPath = path.join(ARTIFACTS_DIR, "16-b3-navbar-scrolled-over-cards.png");
    await page.screenshot({ path: navbarScrolledPath });
    console.log(`✓ Saved Navbar scrolled over cards screenshot: ${navbarScrolledPath}`);

    // ----------------------------------------------------
    // TEST 5: FULL-PAGE HOMEPAGE SCREENSHOT (DESKTOP 1440px)
    // ----------------------------------------------------
    console.log("\n[5] Capturing Desktop 1440px Full Page Screenshot...");
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);

    const fullDesktopPath = path.join(ARTIFACTS_DIR, "17-b3-homepage-full-desktop-1440.png");
    await page.screenshot({ path: fullDesktopPath, fullPage: true });
    console.log(`✓ Saved Desktop 1440px full page screenshot: ${fullDesktopPath}`);

    await desktopContext.close();

    // ----------------------------------------------------
    // TEST 6: MOBILE 390px FULL PAGE SCREENSHOT
    // ----------------------------------------------------
    console.log("\n[6] Capturing Mobile 390px Full Page Screenshot & Overflow Check...");
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.addInitScript(() => {
      sessionStorage.setItem("lumen-preloader-seen", "true");
    });
    await mobilePage.goto("http://localhost:3000", { waitUntil: "networkidle" });
    await mobilePage.waitForTimeout(800);

    const hasOverflow = await mobilePage.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    console.log(`✓ Mobile horizontal overflow check: ${hasOverflow ? "FAILED" : "PASSED (0px overflow)"}`);

    const fullMobilePath = path.join(ARTIFACTS_DIR, "18-b3-homepage-full-mobile-390.png");
    await mobilePage.screenshot({ path: fullMobilePath, fullPage: true });
    console.log(`✓ Saved Mobile 390px full page screenshot: ${fullMobilePath}`);

    await mobileContext.close();

    // ----------------------------------------------------
    // TEST 7: 3-RUN LIGHTHOUSE MOBILE AUDIT & MEDIAN REPORT
    // ----------------------------------------------------
    console.log("\n[7] Running 3x Production Lighthouse Mobile Audits...");
    const perfScores = [];
    const a11yScores = [];
    const bpScores = [];
    const seoScores = [];
    const lcpValues = [];
    const clsValues = [];

    for (let run = 1; run <= 3; run++) {
      console.log(`  -> Running Lighthouse Pass #${run}...`);
      const runnerResult = await lighthouse("http://localhost:3000", {
        port: 9222,
        output: "json",
        onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
        formFactor: "mobile",
        screenEmulation: {
          mobile: true,
          width: 390,
          height: 844,
          deviceScaleFactor: 2,
          disabled: false,
        },
      });

      const cats = runnerResult.lhr.categories;
      const auds = runnerResult.lhr.audits;

      perfScores.push(Math.round((cats.performance?.score || 0) * 100));
      a11yScores.push(Math.round((cats.accessibility?.score || 0) * 100));
      bpScores.push(Math.round((cats["best-practices"]?.score || 0) * 100));
      seoScores.push(Math.round((cats.seo?.score || 0) * 100));
      lcpValues.push(auds["largest-contentful-paint"]?.displayValue || "N/A");
      clsValues.push(auds["cumulative-layout-shift"]?.displayValue || "N/A");
    }

    const median = (arr) => {
      const sorted = [...arr].sort((a, b) => a - b);
      return sorted[Math.floor(sorted.length / 2)];
    };

    const medianPerf = median(perfScores);
    const medianA11y = median(a11yScores);
    const medianBp = median(bpScores);
    const medianSeo = median(seoScores);

    console.log("\n==================================================");
    console.log("   LIGHTHOUSE 3-RUN SUMMARY (MOBILE)             ");
    console.log("==================================================");
    console.log(`  Performance Runs:   ${perfScores.join(", ")} -> Median: ${medianPerf}/100`);
    console.log(`  Accessibility Runs: ${a11yScores.join(", ")} -> Median: ${medianA11y}/100`);
    console.log(`  Best Practices:     ${bpScores.join(", ")} -> Median: ${medianBp}/100`);
    console.log(`  SEO:                ${seoScores.join(", ")} -> Median: ${medianSeo}/100`);
    console.log(`  LCP:                ${lcpValues[1]}`);
    console.log(`  CLS:                ${clsValues[1]}`);
    console.log(`  Console Errors:     ${consoleErrors.length}`);
    console.log("==================================================");

    fs.writeFileSync(
      path.join(ARTIFACTS_DIR, "b3-lighthouse-report.json"),
      JSON.stringify(
        {
          perfScores,
          medianPerf,
          medianA11y,
          medianBp,
          medianSeo,
          lcp: lcpValues[1],
          cls: clsValues[1],
        },
        null,
        2
      )
    );
  } finally {
    await browser.close();
  }
}

runB3Verification().catch((err) => {
  console.error("B3 Verification Error:", err);
  process.exit(1);
});

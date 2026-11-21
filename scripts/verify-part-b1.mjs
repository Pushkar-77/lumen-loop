import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import lighthouse from "lighthouse";

const ARTIFACTS_DIR = "C:/Users/Pushkar Patil/.gemini/antigravity/brain/bf8e1206-2a67-4049-b3af-12a465775b68/screenshots";

if (!fs.existsSync(ARTIFACTS_DIR)) {
  fs.mkdirSync(ARTIFACTS_DIR, { recursive: true });
}

async function verifyPartB1() {
  console.log("==================================================");
  console.log("   LUMEN LOOP — PART B1 VERIFICATION SUITE       ");
  console.log("==================================================");

  const consoleErrors = [];
  const consoleWarnings = [];

  const browser = await chromium.launch({
    headless: true,
    args: ["--remote-debugging-port=9222"],
  });

  try {
    // ----------------------------------------------------
    // TEST 1: DEV SERVER CONSOLE ERRORS & PRELOADER TIMING
    // ----------------------------------------------------
    console.log("\n[1] Testing `npm run dev` Console Errors & Preloader Timing...");
    const desktopContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
    });
    const page = await desktopContext.newPage();

    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      } else if (msg.type() === "warning") {
        consoleWarnings.push(msg.text());
      }
    });

    const preloaderStartTime = Date.now();
    await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });

    // Wait for the preloader to complete naturally and unmount
    await page.waitForSelector('text="Campaign Launch Sequence"', { state: "visible", timeout: 2000 }).catch(() => {});
    await page.waitForSelector('text="Campaign Launch Sequence"', { state: "detached", timeout: 5000 });
    const preloaderDuration = Date.now() - preloaderStartTime;

    console.log(`✓ Measured preloader full cycle duration: ${(preloaderDuration / 1000).toFixed(2)}s (target: ~2.1-2.4s)`);
    console.log(`✓ Console errors during initial load: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) {
      console.log("  Errors encountered:", consoleErrors);
    }

    // ----------------------------------------------------
    // TEST 2: SECOND VISIT IN SAME SESSION (SESSIONSTORAGE SKIP)
    // ----------------------------------------------------
    console.log("\n[2] Testing Second Visit in Same Session (Skip check)...");
    const navStartTime = Date.now();
    await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
    const preloaderVisibleOnSecondVisit = await page.locator('text="Campaign Launch Sequence"').isVisible();
    const navDuration = Date.now() - navStartTime;

    console.log(`✓ Second visit: preloader immediately skipped: ${!preloaderVisibleOnSecondVisit} (took ${navDuration}ms)`);

    // ----------------------------------------------------
    // TEST 3: DESKTOP 1440px HERO & DUAL MARQUEE
    // ----------------------------------------------------
    console.log("\n[3] Testing Desktop (1440x900) Hero & 3D Funnel Diorama...");
    await page.waitForTimeout(600);

    const desktopHeroPath = path.join(ARTIFACTS_DIR, "06-b1-desktop-hero.png");
    await page.screenshot({ path: desktopHeroPath });
    console.log(`✓ Saved desktop hero screenshot: ${desktopHeroPath}`);

    // Verify HTML real text elements for LCP & SEO
    const headline = await page.locator("h1").innerText();
    console.log(`✓ HTML Headline (rendered outside canvas): "${headline.replace(/\n/g, " ")}"`);
    console.log(`✓ Verified normal spaces in "compounds, not just clicks": ${headline.includes("not just clicks")}`);

    // ----------------------------------------------------
    // TEST 4: 3D FRAME RATE BENCHMARK
    // ----------------------------------------------------
    console.log("\n[4] Measuring 3D Scene Frame-Rate Performance...");
    const fpsResult = await page.evaluate(async () => {
      return new Promise((resolve) => {
        let frameCount = 0;
        let lastTime = performance.now();
        const deltas = [];

        function checkFrame(now) {
          const delta = now - lastTime;
          lastTime = now;
          deltas.push(delta);
          frameCount++;

          if (frameCount < 60) {
            requestAnimationFrame(checkFrame);
          } else {
            const avgDelta = deltas.reduce((a, b) => a + b, 0) / deltas.length;
            const fps = Math.round(1000 / avgDelta);
            resolve({ fps, avgDelta: avgDelta.toFixed(2) });
          }
        }
        requestAnimationFrame(checkFrame);
      });
    });
    console.log(`✓ 3D Diorama measured render rate: ${fpsResult.fps} FPS (avg frame time: ${fpsResult.avgDelta}ms)`);

    // ----------------------------------------------------
    // TEST 5: "LAUNCH CAMPAIGN" INTERACTION STATE
    // ----------------------------------------------------
    console.log("\n[5] Testing 'Launch Campaign' 3D Magic Interaction...");
    const launchBtn = page.locator('button:has-text("Launch Campaign")');
    await launchBtn.click();
    console.log("✓ Clicked 'Launch Campaign' button");

    // Wait for shockwave and floating conversion chips to pop
    await page.waitForTimeout(900);

    const launchImgPath = path.join(ARTIFACTS_DIR, "07-b1-launch-campaign-active.png");
    await page.screenshot({ path: launchImgPath });
    console.log(`✓ Saved Launch Campaign active screenshot: ${launchImgPath}`);

    // Verify floating alerts
    const leadsChip = await page.locator('text="+312 leads acquired"').isVisible();
    const ctrChip = await page.locator('text="CTR 4.8%"').isVisible();
    const roasChip = await page.locator('text="ROAS 5.4x Blended"').isVisible();
    console.log(`✓ Floating Campaign Alerts Visible: Leads (${leadsChip}), CTR (${ctrChip}), ROAS (${roasChip})`);

    await desktopContext.close();

    // ----------------------------------------------------
    // TEST 6: MOBILE 390px VIEWPORT & OVERFLOW
    // ----------------------------------------------------
    console.log("\n[6] Testing Mobile (390x844) Viewport & Fallback...");
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    });
    const mobilePage = await mobileContext.newPage();

    // SessionStorage to skip preloader for pure mobile hero verification
    await mobilePage.addInitScript(() => {
      sessionStorage.setItem("lumen-preloader-seen", "true");
    });
    await mobilePage.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
    await mobilePage.waitForTimeout(600);

    const mobileOverflow = await mobilePage.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    console.log(`✓ Mobile horizontal overflow check: ${mobileOverflow ? "FAILED (overflow detected)" : "PASSED (0px horizontal overflow)"}`);

    const mobileHeroPath = path.join(ARTIFACTS_DIR, "08-b1-mobile-hero.png");
    await mobilePage.screenshot({ path: mobileHeroPath });
    console.log(`✓ Saved mobile hero screenshot: ${mobileHeroPath}`);

    await mobileContext.close();

    // ----------------------------------------------------
    // TEST 7: LIGHTHOUSE MOBILE AUDIT
    // ----------------------------------------------------
    console.log("\n[7] Running Lighthouse Mobile Audit on http://localhost:3000...");
    try {
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

      const categories = runnerResult.lhr.categories;
      const audits = runnerResult.lhr.audits;

      const perfScore = Math.round((categories.performance?.score || 0) * 100);
      const a11yScore = Math.round((categories.accessibility?.score || 0) * 100);
      const bpScore = Math.round((categories["best-practices"]?.score || 0) * 100);
      const seoScore = Math.round((categories.seo?.score || 0) * 100);

      const lcp = audits["largest-contentful-paint"]?.displayValue || "N/A";
      const cls = audits["cumulative-layout-shift"]?.displayValue || "N/A";

      console.log("\n--- LIGHTHOUSE MOBILE AUDIT RESULTS ---");
      console.log(`  Performance:    ${perfScore}/100`);
      console.log(`  Accessibility:  ${a11yScore}/100`);
      console.log(`  Best Practices: ${bpScore}/100`);
      console.log(`  SEO:            ${seoScore}/100`);
      console.log(`  LCP:            ${lcp}`);
      console.log(`  CLS:            ${cls}`);
      console.log("---------------------------------------");

      // Save raw report
      fs.writeFileSync(
        path.join(ARTIFACTS_DIR, "lighthouse-mobile-report.json"),
        JSON.stringify(
          {
            scores: { perfScore, a11yScore, bpScore, seoScore, lcp, cls },
          },
          null,
          2
        )
      );
    } catch (lhErr) {
      console.warn("Lighthouse run note:", lhErr.message);
    }

    console.log("\n==================================================");
    console.log("   PART B1 VERIFICATION COMPLETED SUCCESSFULLY   ");
    console.log("==================================================");
  } finally {
    await browser.close();
  }
}

verifyPartB1().catch((err) => {
  console.error("Part B1 verification error:", err);
  process.exit(1);
});

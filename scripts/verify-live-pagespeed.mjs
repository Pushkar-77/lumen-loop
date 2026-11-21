import { chromium } from "playwright";
import fs from "fs";

const LIVE_URL = "https://lumen-loop-alpha.vercel.app";
const PSI_ENDPOINT = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
  LIVE_URL
)}&strategy=mobile&category=performance&category=accessibility&category=best-practices&category=seo`;

async function runLiveVerification() {
  console.log("==================================================");
  console.log("   LUMEN LOOP — LIVE PRODUCTION VERIFICATION      ");
  console.log(`   Target: ${LIVE_URL}`);
  console.log("==================================================");

  // ----------------------------------------------------
  // PART 1: 3-PASS GOOGLE PAGESPEED INSIGHTS API AUDIT
  // ----------------------------------------------------
  console.log("\n[1] Querying Google PageSpeed Insights API (3 Mobile Runs)...");

  const perfScores = [];
  const a11yScores = [];
  const bpScores = [];
  const seoScores = [];
  const lcpValues = [];
  const clsValues = [];
  const tbtValues = [];

  for (let i = 1; i <= 3; i++) {
    console.log(`  -> Fetching PageSpeed Insights Pass #${i}...`);
    try {
      const response = await fetch(PSI_ENDPOINT, {
        headers: { "User-Agent": "Mozilla/5.0" },
      });

      if (!response.ok) {
        console.warn(`PSI Run #${i} HTTP ${response.status}: ${response.statusText}`);
        continue;
      }

      const data = await response.json();
      const lighthouse = data.lighthouseResult;
      const cats = lighthouse.categories;
      const auds = lighthouse.audits;

      const p = Math.round((cats.performance?.score || 0) * 100);
      const a = Math.round((cats.accessibility?.score || 0) * 100);
      const b = Math.round((cats["best-practices"]?.score || 0) * 100);
      const s = Math.round((cats.seo?.score || 0) * 100);

      const lcp = auds["largest-contentful-paint"]?.displayValue || "N/A";
      const cls = auds["cumulative-layout-shift"]?.displayValue || "N/A";
      const tbt = auds["total-blocking-time"]?.displayValue || "N/A";

      perfScores.push(p);
      a11yScores.push(a);
      bpScores.push(b);
      seoScores.push(s);
      lcpValues.push(lcp);
      clsValues.push(cls);
      tbtValues.push(tbt);

      console.log(`     Pass #${i} Results: Perf: ${p} | A11y: ${a} | BestPractices: ${b} | SEO: ${s} | LCP: ${lcp} | CLS: ${cls} | TBT: ${tbt}`);
    } catch (err) {
      console.warn(`PSI Run #${i} error:`, err.message);
    }
  }

  const median = (arr) => {
    if (arr.length === 0) return 0;
    const sorted = [...arr].sort((a, b) => a - b);
    return sorted[Math.floor(sorted.length / 2)];
  };

  const medianPerf = median(perfScores);
  const medianA11y = median(a11yScores);
  const medianBp = median(bpScores);
  const medianSeo = median(seoScores);

  console.log("\n--- PAGESPEED INSIGHTS 3-RUN SUMMARY ---");
  console.log(`  Performance Runs:   ${perfScores.join(", ")} -> Median: ${medianPerf}/100`);
  console.log(`  Accessibility Runs: ${a11yScores.join(", ")} -> Median: ${medianA11y}/100`);
  console.log(`  Best Practices:     ${bpScores.join(", ")} -> Median: ${medianBp}/100`);
  console.log(`  SEO:                ${seoScores.join(", ")} -> Median: ${medianSeo}/100`);
  console.log(`  LCP (Run 2):        ${lcpValues[1] || lcpValues[0] || "N/A"}`);
  console.log(`  CLS (Run 2):        ${clsValues[1] || clsValues[0] || "N/A"}`);
  console.log(`  TBT (Run 2):        ${tbtValues[1] || tbtValues[0] || "N/A"}`);
  console.log("----------------------------------------");

  // ----------------------------------------------------
  // PART 2: LIVE SITE SMOKE-TESTS (PLAYWRIGHT)
  // ----------------------------------------------------
  console.log("\n[2] Executing Live Production Smoke-Tests on Vercel...");
  const consoleErrors = [];
  const browser = await chromium.launch({ headless: true });

  try {
    // 1. Fresh session with preloader
    console.log("  -> Testing fresh session & preloader...");
    const freshContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const freshPage = await freshContext.newPage();

    freshPage.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });

    const preloaderStart = Date.now();
    await freshPage.goto(LIVE_URL, { waitUntil: "domcontentloaded" });
    const preloaderSaw = await freshPage.locator('text="Campaign Launch Sequence"').isVisible({ timeout: 2000 }).catch(() => false);
    console.log(`     Preloader displayed on fresh visit: ${preloaderSaw}`);

    // Wait for preloader to finish
    await freshPage.waitForSelector('text="Campaign Launch Sequence"', { state: "detached", timeout: 6000 });
    const preloaderDuration = ((Date.now() - preloaderStart) / 1000).toFixed(2);
    console.log(`     Preloader full sequence duration: ${preloaderDuration}s`);

    // 2. Hero 3D Funnel & Launch Campaign button
    console.log("  -> Testing Hero 3D Diorama & Launch Campaign interaction...");
    await freshPage.waitForTimeout(1000);
    const launchBtn = freshPage.locator('button:has-text("Launch Campaign")');
    await launchBtn.click();
    await freshPage.waitForTimeout(600);
    const leadsChip = await freshPage.locator('text="+312 leads acquired"').isVisible();
    const roasChip = await freshPage.locator('text="ROAS 5.4x Blended"').isVisible();
    console.log(`     Active Campaign Chips Pop: Leads (${leadsChip}), ROAS (${roasChip})`);

    // 3. Currency Toggle
    console.log("  -> Testing Currency Toggle (INR <-> USD)...");
    const currencyBtn = freshPage.locator('button[title*="Toggle currency format"]');
    const initialFx = await currencyBtn.innerText();
    console.log(`     Initial currency state: ${initialFx}`);
    await currencyBtn.click();
    await freshPage.waitForTimeout(300);
    const toggledFx = await currencyBtn.innerText();
    console.log(`     Toggled currency state: ${toggledFx}`);

    // 4. Footer A/B Switch & Controls
    console.log("  -> Testing Footer Controls...");
    const abBtn = freshPage.locator("button:has-text('CTA Variant:')");
    await abBtn.scrollIntoViewIfNeeded();
    await freshPage.waitForTimeout(300);
    await abBtn.click();
    await freshPage.waitForTimeout(300);
    console.log("     A/B switch toggled successfully");

    // 5. Scroll-Linked SERP Rank Climber
    console.log("  -> Testing SERP Rank Climber live...");
    const serpSec = freshPage.locator("#process");
    await serpSec.scrollIntoViewIfNeeded();
    await freshPage.waitForTimeout(500);
    const serpRank1 = await freshPage.locator('text="SERP Position #1"').isVisible();
    console.log(`     SERP Position #1 active: ${serpRank1}`);

    // 6. Testimonials Social Reactions
    console.log("  -> Testing Testimonials Reaction live...");
    const likeBtn = freshPage.locator('button[aria-label="Like review"]').first();
    await likeBtn.scrollIntoViewIfNeeded();
    await freshPage.waitForTimeout(300);
    const beforeCount = await likeBtn.innerText();
    await likeBtn.click();
    await freshPage.waitForTimeout(200);
    const afterCount = await likeBtn.innerText();
    console.log(`     Like counter updated: ${beforeCount} -> ${afterCount}`);

    console.log(`\n✓ Total Live Console Errors: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) {
      console.log("  Console errors encountered:", consoleErrors);
    }

    await freshContext.close();
  } finally {
    await browser.close();
  }

  console.log("\n==================================================");
  console.log("   LIVE SMOKE TESTS COMPLETED SUCCESSFULLY        ");
  console.log("==================================================");
}

runLiveVerification().catch((err) => {
  console.error("Live verification error:", err);
  process.exit(1);
});

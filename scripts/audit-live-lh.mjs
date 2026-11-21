import { chromium } from "playwright";
import lighthouse from "lighthouse";

async function auditLive() {
  const browser = await chromium.launch({
    headless: true,
    args: ["--remote-debugging-port=9222"],
  });

  try {
    const scores = [];
    for (let i = 1; i <= 3; i++) {
      console.log(`Lighthouse Live Audit Pass #${i}...`);
      const res = await lighthouse("https://lumen-loop-alpha.vercel.app", {
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

      const c = res.lhr.categories;
      const a = res.lhr.audits;
      scores.push({
        perf: Math.round(c.performance.score * 100),
        a11y: Math.round(c.accessibility.score * 100),
        bp: Math.round(c["best-practices"].score * 100),
        seo: Math.round(c.seo.score * 100),
        lcp: a["largest-contentful-paint"].displayValue,
        cls: a["cumulative-layout-shift"].displayValue,
        tbt: a["total-blocking-time"].displayValue,
      });
    }

    const median = (arr) => [...arr].sort((x, y) => x - y)[Math.floor(arr.length / 2)];
    const medianPerf = median(scores.map((s) => s.perf));
    const medianA11y = median(scores.map((s) => s.a11y));
    const medianBp = median(scores.map((s) => s.bp));
    const medianSeo = median(scores.map((s) => s.seo));

    console.log("\n==================================================");
    console.log("   LIVE VERCEL AUDIT SUMMARY (3 RUNS)            ");
    console.log("==================================================");
    console.log(`  Performance:    ${scores.map((s) => s.perf).join(", ")} -> Median: ${medianPerf}/100`);
    console.log(`  Accessibility:  ${scores.map((s) => s.a11y).join(", ")} -> Median: ${medianA11y}/100`);
    console.log(`  Best Practices: ${scores.map((s) => s.bp).join(", ")} -> Median: ${medianBp}/100`);
    console.log(`  SEO:            ${scores.map((s) => s.seo).join(", ")} -> Median: ${medianSeo}/100`);
    console.log(`  LCP:            ${scores[1].lcp}`);
    console.log(`  CLS:            ${scores[1].cls}`);
    console.log(`  TBT:            ${scores[1].tbt}`);
    console.log("==================================================");
  } finally {
    await browser.close();
  }
}

auditLive().catch(console.error);

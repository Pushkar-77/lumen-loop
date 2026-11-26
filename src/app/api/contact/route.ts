import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { siteConfig } from "@/content/site";

// --- In-memory IP rate limiter (resets on serverless cold start) ---
// NOTE: This resets on every serverless function cold start. For persistent
// rate limiting across serverless instances, use an external store (Redis/Upstash).
const ipHitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5; // max requests per window
const RATE_WINDOW_MS = 60 * 1000; // 1-minute window

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = ipHitMap.get(ip);
  if (!record || now > record.resetAt) {
    ipHitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (record.count >= RATE_LIMIT) return false;
  record.count++;
  return true;
}

// --- Zod schema ---
const contactSchema = z.object({
  name: z.string().min(2, "Full name is required (min 2 chars)").max(100),
  email: z.string().email("Please enter a valid email address"),
  website: z.string().min(2, "Company or website URL is required").max(200),
  budget: z.string().optional().default(""),
  channels: z.array(z.string()).optional().default([]),
  goals: z.string().max(2000).optional().default(""),
  notes: z.string().max(2000).optional().default(""),
  // Brief store chips
  selectedPlan: z.string().optional(),
  selectedServices: z.array(z.string()).optional().default([]),
  growthStack: z
    .object({
      awareness: z.array(z.string()),
      consideration: z.array(z.string()),
      conversion: z.array(z.string()),
    })
    .optional(),
  roiScenario: z
    .object({
      monthlyBudget: z.number(),
      averageOrderValue: z.number(),
      currency: z.enum(["INR", "USD"]),
      totalLeads: z.number(),
      totalCustomers: z.number(),
      totalRevenue: z.number(),
      blendedRoas: z.number(),
      channels: z.array(z.string()),
    })
    .optional(),
  // Honeypot — must be empty
  _hp: z.literal("").optional(),
});

type ContactPayload = z.infer<typeof contactSchema>;

function generateRefId(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `LL-${ts}-${rand}`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function sanitizeHeader(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function formatMoney(amount: number, currency: "INR" | "USD"): string {
  return new Intl.NumberFormat(currency === "INR" ? "en-IN" : "en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

function getGoalsText(payload: ContactPayload): string {
  return (payload.goals || payload.notes || "").trim();
}

function formatRoiSummary(roi: NonNullable<ContactPayload["roiScenario"]>): string {
  return [
    `Budget: ${formatMoney(roi.monthlyBudget, roi.currency)}/mo`,
    `AOV: ${formatMoney(roi.averageOrderValue, roi.currency)}`,
    `Est. Leads: ${roi.totalLeads}`,
    `Est. Customers: ${roi.totalCustomers}`,
    `Est. Revenue: ${formatMoney(roi.totalRevenue, roi.currency)}`,
    `Blended ROAS: ${roi.blendedRoas}x`,
    `Channels: ${roi.channels.join(", ") || "None"}`,
    `(All ROI Lab figures are illustrative estimates)`,
  ].join(" | ");
}

function buildHtmlEmail(payload: ContactPayload, refId: string, timestamp: string): string {
  const goalsText = getGoalsText(payload);
  const channelsList = (payload.channels ?? []).join(", ") || "None specified";
  const servicesList = (payload.selectedServices ?? []).join(", ") || "None";

  const rows: Array<[string, string]> = [
    ["Reference ID", refId],
    ["Timestamp (UTC)", timestamp],
    ["Name", payload.name],
    ["Email", payload.email],
    ["Company / Website", payload.website],
    ["Budget", payload.budget || "Not specified"],
    ["Channels of Interest", channelsList],
    ["Goals & Context", goalsText || "None provided"],
    ["Selected Plan Chip", payload.selectedPlan || "None"],
    ["Brief Service Chips", servicesList],
  ];

  const rowsHtml = rows
    .map(
      ([label, val]) =>
        `<tr>
          <td style="padding:8px 10px;border:1px solid #d1d5db;font-weight:bold;background:#f9fafb;width:190px;vertical-align:top">${escapeHtml(label)}</td>
          <td style="padding:8px 10px;border:1px solid #d1d5db;vertical-align:top;white-space:pre-wrap">${escapeHtml(val)}</td>
        </tr>`
    )
    .join("");

  const stackHtml = payload.growthStack
    ? `<h3 style="color:#8a6b2a;margin-top:20px;margin-bottom:8px;font-family:sans-serif">Growth Stack Chips</h3>
       <p style="margin:4px 0"><strong>Awareness:</strong> ${escapeHtml(payload.growthStack.awareness.join(", ") || "None")}</p>
       <p style="margin:4px 0"><strong>Consideration:</strong> ${escapeHtml(payload.growthStack.consideration.join(", ") || "None")}</p>
       <p style="margin:4px 0"><strong>Conversion:</strong> ${escapeHtml(payload.growthStack.conversion.join(", ") || "None")}</p>`
    : "";

  const roiHtml = payload.roiScenario
    ? `<h3 style="color:#8a6b2a;margin-top:20px;margin-bottom:8px;font-family:sans-serif">ROI Lab Chip (Illustrative)</h3>
       <p style="margin:4px 0">${escapeHtml(formatRoiSummary(payload.roiScenario))}</p>`
    : "";

  return `
    <div style="font-family:ui-sans-serif,system-ui,sans-serif;color:#111827;max-width:680px">
      <h2 style="color:#1d4ed8;margin-bottom:12px">New Growth Plan Request</h2>
      <table style="border-collapse:collapse;width:100%;font-size:14px">
        ${rowsHtml}
      </table>
      ${stackHtml}
      ${roiHtml}
    </div>
  `;
}

function buildTextEmail(payload: ContactPayload, refId: string, timestamp: string): string {
  const goalsText = getGoalsText(payload);
  const lines = [
    `NEW GROWTH PLAN REQUEST`,
    `========================================`,
    `Reference ID     : ${refId}`,
    `Timestamp (UTC)  : ${timestamp}`,
    `Name             : ${payload.name}`,
    `Email            : ${payload.email}`,
    `Company/Website  : ${payload.website}`,
    `Budget           : ${payload.budget || "Not specified"}`,
    `Channels         : ${(payload.channels ?? []).join(", ") || "None specified"}`,
    `Goals & Context  : ${goalsText || "None provided"}`,
    `Selected Plan    : ${payload.selectedPlan || "None"}`,
    `Brief Services   : ${(payload.selectedServices ?? []).join(", ") || "None"}`,
  ];

  if (payload.growthStack) {
    lines.push(
      ``,
      `Growth Stack Chips:`,
      `  Awareness     : ${payload.growthStack.awareness.join(", ") || "None"}`,
      `  Consideration : ${payload.growthStack.consideration.join(", ") || "None"}`,
      `  Conversion    : ${payload.growthStack.conversion.join(", ") || "None"}`
    );
  }

  if (payload.roiScenario) {
    lines.push(
      ``,
      `ROI Lab Chip (Illustrative):`,
      `  ${formatRoiSummary(payload.roiScenario)}`
    );
  }

  return lines.join("\n");
}

function logSubmissionServerSide(
  payload: ContactPayload,
  refId: string,
  timestamp: string,
  mode: "resend" | "demo"
): void {
  const goalsText = getGoalsText(payload);
  console.log(`\n╔════════ LUMEN LOOP GROWTH PLAN REQUEST (${mode.toUpperCase()}) ════════╗`);
  console.log(`  Ref ID    : ${refId}`);
  console.log(`  Timestamp : ${timestamp}`);
  console.log(`  Name      : ${payload.name}`);
  console.log(`  Email     : ${payload.email}`);
  console.log(`  Website   : ${payload.website}`);
  console.log(`  Budget    : ${payload.budget || "Not specified"}`);
  console.log(`  Channels  : ${(payload.channels ?? []).join(", ") || "None"}`);
  console.log(`  Goals     : ${goalsText || "None"}`);
  console.log(`  Plan Chip : ${payload.selectedPlan || "None"}`);
  console.log(`  Services  : ${(payload.selectedServices ?? []).join(", ") || "None"}`);
  if (payload.growthStack) {
    console.log(`  Growth Stack:`);
    console.log(`    Awareness     : ${payload.growthStack.awareness.join(", ") || "None"}`);
    console.log(`    Consideration : ${payload.growthStack.consideration.join(", ") || "None"}`);
    console.log(`    Conversion    : ${payload.growthStack.conversion.join(", ") || "None"}`);
  }
  if (payload.roiScenario) {
    console.log(`  ROI Chip  : ${formatRoiSummary(payload.roiScenario)}`);
  }
  console.log("╚════════════════════════════════════════════════════════════════╝\n");
}

async function sendViaResend(
  apiKey: string,
  payload: ContactPayload,
  refId: string,
  timestamp: string
): Promise<void> {
  const fromEmail = process.env.RESEND_FROM_EMAIL?.trim() || "onboarding@resend.dev";
  const toEmail = process.env.RESEND_TO_EMAIL?.trim() || siteConfig.contact.email;

  const subjectName = sanitizeHeader(payload.name);
  const subjectCompany = sanitizeHeader(payload.website);
  const subject = `New growth plan request: ${subjectName} (${subjectCompany})`;

  const html = buildHtmlEmail(payload, refId, timestamp);
  const text = buildTextEmail(payload, refId, timestamp);

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: payload.email,
      subject,
      html,
      text,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Resend API error: ${res.status} — ${err}`);
  }
}

export async function POST(req: NextRequest) {
  // Rate limit by IP
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a minute before trying again." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  // Honeypot check
  if (body && typeof body === "object" && "_hp" in body && (body as Record<string, unknown>)._hp) {
    // Silently accept (bot trap)
    return NextResponse.json(
      {
        success: true,
        delivered: false,
        mode: "demo",
        refId: generateRefId(),
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed.", fields: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const refId = generateRefId();
  const timestamp = new Date().toISOString();
  const apiKey = process.env.RESEND_API_KEY?.trim();

  // Always log valid lead payload server-side regardless of email configuration
  logSubmissionServerSide(parsed.data, refId, timestamp, apiKey ? "resend" : "demo");

  if (!apiKey) {
    // Demo fallback when RESEND_API_KEY is missing — do NOT report sent to team
    return NextResponse.json(
      { success: true, delivered: false, mode: "demo", refId, timestamp },
      { status: 200 }
    );
  }

  try {
    await sendViaResend(apiKey, parsed.data, refId, timestamp);
  } catch (err) {
    console.error("[contact/route] Resend delivery failed:", err);
    return NextResponse.json(
      {
        error: `We couldn't send your request. Please email ${siteConfig.contact.email} directly.`,
      },
      { status: 502 }
    );
  }

  return NextResponse.json(
    { success: true, delivered: true, mode: "resend", refId, timestamp },
    { status: 200 }
  );
}

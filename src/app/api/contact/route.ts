import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

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
  budget: z.string().optional(),
  channels: z.array(z.string()).optional().default([]),
  notes: z.string().max(2000).optional().default(""),
  // Brief store data
  selectedPlan: z.string().optional(),
  growthStack: z
    .object({
      awareness: z.array(z.string()),
      consideration: z.array(z.string()),
      conversion: z.array(z.string()),
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

async function sendEmail(payload: ContactPayload, refId: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Dev/demo fallback: log cleanly
    console.log("\n╔════════ LUMEN LOOP CONTACT SUBMISSION ════════╗");
    console.log(`  Ref ID  : ${refId}`);
    console.log(`  Name    : ${payload.name}`);
    console.log(`  Email   : ${payload.email}`);
    console.log(`  Website : ${payload.website}`);
    console.log(`  Budget  : ${payload.budget ?? "Not specified"}`);
    console.log(`  Channels: ${(payload.channels ?? []).join(", ") || "None"}`);
    console.log(`  Plan    : ${payload.selectedPlan ?? "None"}`);
    console.log(`  Notes   : ${payload.notes ?? ""}`);
    if (payload.growthStack) {
      console.log(`  Growth Stack:`);
      console.log(`    Awareness     : ${payload.growthStack.awareness.join(", ")}`);
      console.log(`    Consideration : ${payload.growthStack.consideration.join(", ")}`);
      console.log(`    Conversion    : ${payload.growthStack.conversion.join(", ")}`);
    }
    console.log("╚═══════════════════════════════════════════════╝\n");
    return;
  }

  const html = `
    <h2 style="color:#2563EB">New Growth Brief — ${refId}</h2>
    <table style="border-collapse:collapse;width:100%;font-family:monospace;font-size:14px">
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Name</td><td style="padding:8px;border:1px solid #ddd">${payload.name}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd">${payload.email}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Website</td><td style="padding:8px;border:1px solid #ddd">${payload.website}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Budget</td><td style="padding:8px;border:1px solid #ddd">${payload.budget ?? "—"}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Channels</td><td style="padding:8px;border:1px solid #ddd">${(payload.channels ?? []).join(", ") || "—"}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Plan</td><td style="padding:8px;border:1px solid #ddd">${payload.selectedPlan ?? "—"}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Notes</td><td style="padding:8px;border:1px solid #ddd">${payload.notes ?? "—"}</td></tr>
    </table>
    ${payload.growthStack ? `
    <h3 style="color:#C8A25A;margin-top:16px">Growth Stack</h3>
    <p><strong>Awareness:</strong> ${payload.growthStack.awareness.join(", ") || "—"}</p>
    <p><strong>Consideration:</strong> ${payload.growthStack.consideration.join(", ") || "—"}</p>
    <p><strong>Conversion:</strong> ${payload.growthStack.conversion.join(", ") || "—"}</p>
    ` : ""}
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Lumen Loop <hello@lumenloop.in>",
      to: ["hello@lumenloop.in"],
      reply_to: payload.email,
      subject: `Growth Brief ${refId} from ${payload.name}`,
      html,
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
    return NextResponse.json({ success: true, refId: generateRefId() }, { status: 200 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed.", fields: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const refId = generateRefId();

  try {
    await sendEmail(parsed.data, refId);
  } catch (err) {
    console.error("[contact/route] Email send failed:", err);
    return NextResponse.json(
      { error: "Message received but email delivery failed. We will follow up shortly." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, refId }, { status: 200 });
}

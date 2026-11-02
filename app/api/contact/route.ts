import { NextResponse } from "next/server";
import { isLocale } from "@/lib/i18n";
import { normalizePhone, toLeadInput, validateLead } from "@/lib/validation";

export const runtime = "nodejs";

/**
 * Receives consultation requests from the landing page.
 * Validation here is the source of truth; the browser only validates for instant feedback.
 *
 * Delivery: set LEAD_WEBHOOK_URL (CRM, automation tool or email service) — see .env.example.
 * Production note: put rate limiting in front of this endpoint (edge/WAF or a store such as Redis).
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const raw = (body && typeof body === "object" ? body : {}) as Record<string, unknown>;

  // Honeypot: real visitors never fill this hidden field. Pretend success for bots.
  if (typeof raw.website === "string" && raw.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const lead = toLeadInput(raw);
  const errors = validateLead(lead);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const payload = {
    ...lead,
    phone: normalizePhone(lead.phone),
    email: lead.email.toLowerCase(),
    locale: typeof raw.locale === "string" && isLocale(raw.locale) ? raw.locale : "fa",
    source: "landing:secure-branch-connectivity",
    receivedAt: new Date().toISOString(),
  };

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          ...(process.env.LEAD_WEBHOOK_SECRET ? { "x-webhook-secret": process.env.LEAD_WEBHOOK_SECRET } : {}),
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(10_000),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    } catch (err) {
      console.error("[contact] lead delivery failed", err);
      return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
    }
  } else if (process.env.NODE_ENV !== "production") {
    console.info("[contact] LEAD_WEBHOOK_URL not set — lead received (dev only):", payload);
  } else {
    console.error("[contact] LEAD_WEBHOOK_URL is not configured; lead was not delivered.");
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  return NextResponse.json({ ok: true });
}

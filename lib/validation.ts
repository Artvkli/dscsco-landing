/**
 * Lead-form validation shared by the browser (instant feedback) and the API route (source of truth).
 * Returns error *keys*; each locale's dictionary turns them into messages.
 *
 * Only three fields are required (name, company, phone) to keep the first step short.
 * Email, country, number of branches and message are optional details; if given, they are checked.
 */

export const LEAD_FIELDS = ["name", "company", "phone", "email", "country", "branches", "message"] as const;
export type LeadField = (typeof LEAD_FIELDS)[number];
export type LeadInput = Record<LeadField, string>;
export type LeadErrorKey = "req" | "name" | "phone" | "email" | "branches" | "long";
export type LeadErrors = Partial<Record<LeadField, LeadErrorKey>>;

export const REQUIRED_FIELDS: readonly LeadField[] = ["name", "company", "phone"];
export const OPTIONAL_FIELDS: readonly LeadField[] = ["email", "country", "branches", "message"];

export const BRANCH_OPTIONS = ["2-5", "6-10", "11-25", "25+", "unknown"] as const;

export const EMPTY_LEAD: LeadInput = {
  name: "",
  company: "",
  phone: "",
  email: "",
  country: "",
  branches: "",
  message: "",
};

const MAX_LENGTH: Record<LeadField, number> = {
  name: 120,
  company: 160,
  phone: 32,
  email: 254,
  country: 80,
  branches: 16,
  message: 3000,
};

/** Converts Persian (۰-۹) and Arabic-Indic (٠-٩) digits to Latin digits. */
export function toLatinDigits(value: string): string {
  return value
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));
}

export function normalizePhone(value: string): string {
  return toLatinDigits(value).replace(/[\s\-().]/g, "");
}

export function validateLead(v: LeadInput): LeadErrors {
  const e: LeadErrors = {};

  for (const f of LEAD_FIELDS) {
    if ((v[f] || "").length > MAX_LENGTH[f]) e[f] = "long";
  }

  // Required
  const name = v.name.trim();
  if (!name) e.name = "req";
  else if (name.length < 3) e.name ??= "name";

  if (!v.company.trim()) e.company = "req";

  const phone = normalizePhone(v.phone);
  if (!phone) e.phone = "req";
  else if (!/^\+?\d{8,15}$/.test(phone)) e.phone ??= "phone";

  // Optional — validated only when filled in
  const email = v.email.trim();
  if (email && !/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(email)) e.email ??= "email";

  if (v.branches && !(BRANCH_OPTIONS as readonly string[]).includes(v.branches)) e.branches = "branches";

  return e;
}

/** Coerces untrusted JSON into a LeadInput (strings only, trimmed). */
export function toLeadInput(body: unknown): LeadInput {
  const src = (body && typeof body === "object" ? body : {}) as Record<string, unknown>;
  const out = { ...EMPTY_LEAD };
  for (const f of LEAD_FIELDS) {
    const val = src[f];
    out[f] = typeof val === "string" ? val.trim() : "";
  }
  return out;
}

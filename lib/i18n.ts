import fa from "./dictionaries/fa";
import en from "./dictionaries/en";
import ar from "./dictionaries/ar";
import tr from "./dictionaries/tr";
import type { Dictionary } from "./dictionaries/fa";

export type { Dictionary };

export const locales = ["fa", "en", "ar", "tr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fa";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://dscsco.com").replace(/\/$/, "");

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function dirOf(locale: Locale): "rtl" | "ltr" {
  return locale === "en" || locale === "tr" ? "ltr" : "rtl";
}

export const localeMeta: Record<Locale, { short: string; name: string; og: string }> = {
  fa: { short: "FA", name: "فارسی", og: "fa_IR" },
  en: { short: "EN", name: "English", og: "en_US" },
  ar: { short: "AR", name: "العربية", og: "ar_AE" },
  tr: { short: "TR", name: "Türkçe", og: "tr_TR" },
};

const dictionaries: Record<Locale, Dictionary> = { fa, en, ar, tr };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

const DIGITS: Partial<Record<Locale, string>> = { fa: "۰۱۲۳۴۵۶۷۸۹", ar: "٠١٢٣٤٥٦٧٨٩" };

/** Renders Latin digits in the locale's native numerals (Persian / Arabic-Indic). */
export function localizeDigits(value: string | number, locale: Locale): string {
  const set = DIGITS[locale];
  const s = String(value);
  return set ? s.replace(/[0-9]/g, (d) => set.charAt(Number(d))) : s;
}

/** "01", "02"… in the locale's numerals. */
export function stepNumber(n: number, locale: Locale): string {
  return localizeDigits(n < 10 ? `0${n}` : String(n), locale);
}

export function currentYear(locale: Locale): string {
  const now = new Date();
  if (locale === "fa") {
    return new Intl.DateTimeFormat("fa-IR-u-ca-persian", { year: "numeric" }).format(now).replace(/[^۰-۹0-9]/g, "");
  }
  return localizeDigits(now.getFullYear(), locale);
}

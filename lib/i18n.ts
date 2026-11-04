import fa from "./dictionaries/fa";
import en from "./dictionaries/en";
import ar from "./dictionaries/ar";
import tr from "./dictionaries/tr";
import type { Dictionary } from "./dictionaries/fa";

export type { Dictionary };

export const locales = [
  "farsi",
  "english",
  "arabic",
  "turkish",
] as const;

export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "farsi";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://dscsco.com"
).replace(/\/$/, "");

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function dirOf(locale: Locale): "rtl" | "ltr" {
  return locale === "english" || locale === "turkish" ? "ltr" : "rtl";
}

export const localeMeta: Record<
  Locale,
  { short: string; name: string; og: string }
> = {
  farsi: { short: "FA", name: "فارسی", og: "fa_IR" },
  english: { short: "EN", name: "English", og: "en_US" },
  arabic: { short: "AR", name: "العربية", og: "ar_AE" },
  turkish: { short: "TR", name: "Türkçe", og: "tr_TR" },
};

const dictionaries: Record<Locale, Dictionary> = {
  farsi: fa,
  english: en,
  arabic: ar,
  turkish: tr,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

const DIGITS: Partial<Record<Locale, string>> = {
  farsi: "۰۱۲۳۴۵۶۷۸۹",
  arabic: "٠١٢٣٤٥٦٧٨٩",
};

export function localizeDigits(
  value: string | number,
  locale: Locale
): string {
  const set = DIGITS[locale];
  const s = String(value);
  return set ? s.replace(/[0-9]/g, (d) => set.charAt(Number(d))) : s;
}

export function stepNumber(n: number, locale: Locale): string {
  return localizeDigits(n < 10 ? `0${n}` : String(n), locale);
}

export function currentYear(locale: Locale): string {
  const now = new Date();

  if (locale === "farsi") {
    return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
      year: "numeric",
    })
      .format(now)
      .replace(/[^۰-۹0-9]/g, "");
  }

  return localizeDigits(now.getFullYear(), locale);
}
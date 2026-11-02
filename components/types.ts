import type { Dictionary, Locale } from "@/lib/i18n";

export type WithT = { t: Dictionary };
export type WithLocale = WithT & { locale: Locale };

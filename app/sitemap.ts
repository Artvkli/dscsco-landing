import type { MetadataRoute } from "next";
import { SITE_URL, locales } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}`]));
  return locales.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: locale === "fa" ? 1 : 0.9,
    alternates: { languages },
  }));
}

import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import "../globals.css";
import { fontVariables } from "@/lib/fonts";
import { SITE_URL, dirOf, getDictionary, isLocale, localeMeta, locales } from "@/lib/i18n";

type Params = Promise<{ locale: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return {
    metadataBase: new URL(SITE_URL),
    title: t.meta.title,
    description: t.meta.description,
    applicationName: "DSCSCO",
    alternates: {
      canonical: `/${locale}`,
      languages: { fa: "/fa", en: "/en", ar: "/ar", "x-default": "/fa" },
    },
    openGraph: {
      type: "website",
      url: `/${locale}`,
      siteName: "DSCSCO",
      title: t.meta.title,
      description: t.meta.description,
      locale: localeMeta[locale].og,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeMeta[l].og),
    },
    twitter: { card: "summary_large_image", title: t.meta.title, description: t.meta.description },
    robots: { index: true, follow: true },
    formatDetection: { telephone: false, email: false, address: false },
  };
}

export const viewport: Viewport = {
  themeColor: "#061227",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function LocaleLayout({ children, params }: { children: ReactNode; params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale} dir={dirOf(locale)} className={fontVariables}>
      <body className={`lang-${locale}`}>{children}</body>
    </html>
  );
}

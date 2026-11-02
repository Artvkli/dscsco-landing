import { notFound } from "next/navigation";
import { SITE_URL, getDictionary, isLocale } from "@/lib/i18n";
import SiteNav from "@/components/SiteNav";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Benefits from "@/components/Benefits";
import International from "@/components/International";
import Process from "@/components/Process";
import WhyUs from "@/components/WhyUs";
import FinalCta from "@/components/FinalCta";
import Contact from "@/components/Contact";
import SiteFooter from "@/components/SiteFooter";
import RevealObserver from "@/components/RevealObserver";

export default async function LandingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  // Only facts we actually know — no invented contact details, ratings or claims.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DSCSCO",
    alternateName: [getDictionary("fa").brand, getDictionary("en").brand, getDictionary("ar").brand],
    url: SITE_URL,
  };

  return (
    <>
      <a href="#main" className="skip-link">
        {t.skip}
      </a>
      <SiteNav t={t} locale={locale} />
      <main id="main">
        <Hero t={t} />
        <Services t={t} locale={locale} />
        <Benefits t={t} locale={locale} />
        <International t={t} />
        <Process t={t} locale={locale} />
        <WhyUs t={t} />
        <FinalCta t={t} />
        <Contact t={t} locale={locale} />
      </main>
      <SiteFooter t={t} locale={locale} />
      <RevealObserver />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}

import Link from "next/link";
import { IR, GB, SA, TR } from "@rdnr/react-country-flags";
import { localeMeta, locales } from "@/lib/i18n";
import type { WithLocale } from "./types";

/** Language switcher. Each language has its own URL for SEO and shareable links. */
export default function LanguageSwitcher({ t, locale }: WithLocale) {
  const flags = {
    farsi: IR,
    english: GB,
    arabic: SA,
    turkish: TR,
  };

  return (
    <nav className="langsw" aria-label={t.langLabel}>
      {locales.map((l) => {
        const Flag = flags[l];

        return (
          <Link
            key={l}
            href={`/${l}`}
            prefetch={false}
            className="langbtn"
            hrefLang={l}
            lang={l}
            title={localeMeta[l].name}
            aria-label={localeMeta[l].name}
            aria-current={l === locale ? "page" : undefined}
            scroll={false}
          >
            <Flag width={24} />
          </Link>
        );
      })}
    </nav>
  );
}

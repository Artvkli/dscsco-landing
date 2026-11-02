import Link from "next/link";
import { localeMeta, locales } from "@/lib/i18n";
import type { WithLocale } from "./types";

/** FA / EN / AR switcher. Each language is its own URL (/fa, /en, /ar) for SEO and shareable links. */
export default function LanguageSwitcher({ t, locale }: WithLocale) {
  return (
    <nav className="langsw" aria-label={t.langLabel}>
      {locales.map((l) => (
        <Link
          key={l}
          href={`/${l}`}
          className="langbtn"
          hrefLang={l}
          lang={l}
          title={localeMeta[l].name}
          aria-label={localeMeta[l].name}
          aria-current={l === locale ? "page" : undefined}
          scroll={false}
        >
          {localeMeta[l].short}
        </Link>
      ))}
    </nav>
  );
}

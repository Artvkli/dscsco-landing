import LanguageSwitcher from "./LanguageSwitcher";
import MobileMenu from "./MobileMenu";
import { ArrowIcon } from "./icons";
import type { WithLocale } from "./types";

const SECTIONS = [
  "services",
  "benefits",
  "international",
  "process",
  "why",
] as const;

export default function SiteNav({ t, locale }: WithLocale) {
  const label: Record<(typeof SECTIONS)[number], string> = {
    services: t.nav.services,
    benefits: t.nav.benefits,
    international: t.nav.intl,
    process: t.nav.process,
    why: t.nav.why,
  };

  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <div className="brand">
          <LanguageSwitcher t={t} locale={locale} />
        </div>

        {/* Desktop links (>1100px) */}
        <nav className="navlinks" aria-label={t.navLabel}>
          {SECTIONS.map((id) => (
            <a key={id} className="navlink" href={`#${id}`}>
              {label[id]}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <div className="nav-lang"></div>
          <a className="btn btn-primary btn-sm nav-cta" href="#contact">
            <span className="cta-long">{t.cta}</span>
            <span className="cta-short">{t.ctaShort}</span>
          </a>

          {/* Tablet & phone menu (≤1100px) */}
          <MobileMenu openLabel={t.menuOpen} closeLabel={t.menuClose}>
            <nav aria-label={t.navLabel}>
              <ul className="menu-links">
                {SECTIONS.map((id) => (
                  <li key={id}>
                    <a href={`#${id}`}>
                      {label[id]}
                      <ArrowIcon width={18} height={18} />
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#contact">
                    {t.nav.contact}
                    <ArrowIcon width={18} height={18} />
                  </a>
                </li>
              </ul>
            </nav>
            <div className="menu-foot">
              <LanguageSwitcher t={t} locale={locale} />
              <a className="btn btn-primary menu-cta" href="#contact">
                {t.cta}
              </a>
            </div>
          </MobileMenu>
        </div>
      </div>
    </header>
  );
}

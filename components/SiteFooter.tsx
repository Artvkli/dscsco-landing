import { currentYear } from "@/lib/i18n";
import FooterBackdrop from "./FooterBackdrop";
import LanguageSwitcher from "./LanguageSwitcher";
import LogoMark from "./Logo";
import type { WithLocale } from "./types";

export default function SiteFooter({ t, locale }: WithLocale) {
  const ft = t.foot;
  return (
    <footer className="footer">
      <FooterBackdrop />
      <div className="wrap g-foot">
        <div>
          <div className="brand">
            <LogoMark />
            <span className="brand-text">
              <span className="brand-word mono">SANA Company</span>
              <span className="brand-sub">{t.brand}</span>
            </span>
          </div>
          <p className="foot-about">{ft.about}</p>
          <a className="btn btn-primary btn-sm" href="#contact">
            {t.cta}
          </a>
        </div>

        <nav aria-label={ft.navT}>
          <h2 className="foot-h">{ft.navT}</h2>
          <ul className="foot-list">
            <li>
              <a className="flink" href="#services">
                {t.nav.services}
              </a>
            </li>
            <li>
              <a className="flink" href="#benefits">
                {t.nav.benefits}
              </a>
            </li>
            <li>
              <a className="flink" href="#international">
                {t.nav.intl}
              </a>
            </li>
            <li>
              <a className="flink" href="#process">
                {t.nav.process}
              </a>
            </li>
            <li>
              <a className="flink" href="#why">
                {t.nav.why}
              </a>
            </li>
            <li>
              <a className="flink" href="#contact">
                {t.nav.contact}
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="foot-h">{ft.svcT}</h2>
          <ul className="foot-list">
            {ft.svc.map((s) => (
              <li key={s}>
                <a className="flink" href="#services">
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="foot-h">{ft.webT}</h2>
          <a className="flink site mono" href="https://dscsco.com" dir="ltr">
            SANA Company
          </a>
          <p className="foot-web">{ft.webD}</p>
          <LanguageSwitcher t={t} locale={locale} />
        </div>
      </div>

      <div className="wrap">
        <div className="foot-bottom">
          <span>
            © {currentYear(locale)} {ft.rights}
          </span>
          <a className="flink" href="#top">
            {ft.top} ↑
          </a>
        </div>
      </div>
    </footer>
  );
}

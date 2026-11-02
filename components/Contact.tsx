import { localizeDigits } from "@/lib/i18n";
import ContactForm from "./ContactForm";
import { GlobeIcon } from "./icons";
import type { WithLocale } from "./types";

export default function Contact({ t, locale }: WithLocale) {
  const f = t.form;
  return (
    <section id="contact" className="sec sec-white" aria-labelledby="contact-title">
      <div className="wrap g-contact">
        <aside className="aside dark" data-reveal>
          <p className="eyebrow">{f.eyebrow}</p>
          <h2 id="contact-title" className="h2">{f.title}</h2>
          <p className="lead">{f.lead}</p>
          <div className="next">
            <h3>{f.nextT}</h3>
            <ol>
              {f.next.map((step, i) => (
                <li key={step}>
                  <span className="next-n mono" aria-hidden="true">{localizeDigits(i + 1, locale)}</span>
                  <span className="next-t">{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <a className="tlink aside-site" href="https://dscsco.com" dir="ltr">
            <GlobeIcon size={18} />
            <span className="mono">dscsco.com</span>
          </a>
        </aside>

        <div className="form-card" data-reveal>
          <ContactForm f={f} locale={locale} />
        </div>
      </div>
    </section>
  );
}

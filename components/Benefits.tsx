import { stepNumber } from "@/lib/i18n";
import { ArrowIcon } from "./icons";
import type { WithLocale } from "./types";

export default function Benefits({ t, locale }: WithLocale) {
  const b = t.ben;
  return (
    <section id="benefits" className="sec sec-mist" aria-labelledby="benefits-title">
      <div className="wrap g-2">
        <div data-reveal>
          <p className="eyebrow">{b.eyebrow}</p>
          <h2 id="benefits-title" className="h2">{b.title}</h2>
          <p className="lead">{b.lead}</p>

          <figure className="compare" aria-label={b.compareLabel}>
            <div className="compare-side">
              <svg viewBox="0 0 240 160" aria-hidden="true">
                <g stroke="#B8C5CF" strokeWidth="1.2" strokeDasharray="3 4" fill="none">
                  <path d="M40 40 L190 30" /><path d="M40 40 L120 82" /><path d="M190 30 L60 130" />
                  <path d="M120 82 L200 122" /><path d="M60 130 L200 122" /><path d="M40 40 L60 130" />
                  <path d="M190 30 L200 122" />
                </g>
                <g fill="#93A4B3">
                  <circle cx="40" cy="40" r="7" /><circle cx="190" cy="30" r="7" /><circle cx="120" cy="82" r="7" />
                  <circle cx="60" cy="130" r="7" /><circle cx="200" cy="122" r="7" />
                </g>
              </svg>
              <p className="compare-label">{b.before}</p>
            </div>
            <ArrowIcon width={26} height={26} />
            <div className="compare-side">
              <svg viewBox="0 0 240 160" aria-hidden="true">
                <g>
                  {[
                    [40, 40], [200, 40], [40, 122], [200, 122], [120, 18], [120, 145],
                  ].map(([x, y]) => (
                    <path key={`${x}-${y}`} className="link dk" d={`M120 80 L${x} ${y}`} />
                  ))}
                </g>
                <g fill="#0F766E">
                  <circle cx="40" cy="40" r="7" /><circle cx="200" cy="40" r="7" /><circle cx="40" cy="122" r="7" />
                  <circle cx="200" cy="122" r="7" /><circle cx="120" cy="18" r="6" /><circle cx="120" cy="145" r="6" />
                </g>
                <circle className="pring2" cx="120" cy="80" r="16" fill="none" stroke="#10B981" strokeWidth="1.4" />
                <circle cx="120" cy="80" r="16" fill="#10B981" />
                <rect x="114" y="79" width="12" height="9" rx="1.8" fill="none" stroke="#FFFFFF" strokeWidth="1.6" />
                <path d="M116.5 79 v-2.6 a3.5 3.5 0 0 1 7 0 V79" fill="none" stroke="#FFFFFF" strokeWidth="1.6" />
              </svg>
              <p className="compare-label good">{b.after}</p>
            </div>
          </figure>
        </div>

        <ul data-reveal>
          {b.items.map((item, i) => (
            <li key={item.t} className="benitem">
              <span className="bnum mono" aria-hidden="true">{stepNumber(i + 1, locale)}</span>
              <div>
                <h3 className="btitle">{item.t}</h3>
                <p className="btext">{item.d}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

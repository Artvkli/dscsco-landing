import { ArrowIcon } from "./icons";
import type { WithT } from "./types";

export default function FinalCta({ t }: WithT) {
  return (
    <section className="final" aria-labelledby="final-title">
      <svg className="final-art" viewBox="0 0 600 400" aria-hidden="true">
        <g fill="none" stroke="rgba(110,231,183,.22)">
          {[60, 110, 165, 225, 290].map((r) => (
            <circle key={r} cx="300" cy="200" r={r} />
          ))}
        </g>
        <g fill="#6EE7B7">
          <circle cx="300" cy="90" r="4" /><circle cx="135" cy="200" r="4" /><circle cx="417" cy="317" r="4" />
          <circle cx="300" cy="200" r="7" /><circle cx="510" cy="160" r="4" />
        </g>
      </svg>
      <div className="wrap final-inner" data-reveal>
        <div>
          <h2 id="final-title" className="h2">{t.fin.title}</h2>
          <p className="lead">{t.fin.body}</p>
        </div>
        <a className="btn btn-light btn-lg" href="#contact">
          {t.cta}
          <ArrowIcon />
        </a>
      </div>
    </section>
  );
}

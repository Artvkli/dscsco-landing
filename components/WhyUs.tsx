import { ChipIcon, ExpandIcon, HeadsetIcon, ImageIcon, LayersIcon, NodesIcon } from "./icons";
import type { WithT } from "./types";

const ICONS = [LayersIcon, ChipIcon, NodesIcon, HeadsetIcon, ExpandIcon];

export default function WhyUs({ t }: WithT) {
  const w = t.why;
  return (
    <section id="why" className="sec sec-mist" aria-labelledby="why-title">
      <div className="wrap g-2c">
        {/*
          PROMOTIONAL VISUAL PLACEHOLDER (1200×800).
          Replace with real NOC / team photography via next/image, e.g.
          <Image src="/images/noc.jpg" alt="…" fill sizes="(max-width:1024px) 100vw, 50vw" />
        */}
        <figure className="promo" data-reveal>
          <svg viewBox="0 0 400 340" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <g fill="none" stroke="rgba(94,234,212,.12)">
              {[40, 85, 135, 190, 250].map((r) => (
                <circle key={r} cx="300" cy="90" r={r} />
              ))}
            </g>
            <g>
              <path className="link" d="M300 90 L 215 150" />
              <path className="link" d="M300 90 L 120 120" />
              <path className="link" d="M215 150 L 160 240" />
              <path className="link" d="M300 90 L 330 230" />
              <path className="link" d="M120 120 L 60 200" />
            </g>
            <g fill="#5EEAD4">
              <circle cx="215" cy="150" r="4.5" /><circle cx="120" cy="120" r="4.5" /><circle cx="160" cy="240" r="4.5" />
              <circle cx="330" cy="230" r="4.5" /><circle cx="60" cy="200" r="4.5" />
            </g>
            <circle className="pring2" cx="300" cy="90" r="12" fill="none" stroke="#34D399" />
            <circle cx="300" cy="90" r="12" fill="#10B981" />
          </svg>
          <div className="promo-frame" aria-hidden="true" />
          <span className="promo-size mono" aria-hidden="true">1200 × 800</span>
          <figcaption>
            <ImageIcon size={22} />
            <span>
              <span className="promo-t">{w.ph}</span>
              <span className="promo-s">{w.phS}</span>
            </span>
          </figcaption>
        </figure>

        <div data-reveal>
          <p className="eyebrow">{w.eyebrow}</p>
          <h2 id="why-title" className="h2">{w.title}</h2>
          <p className="lead">{w.lead}</p>
          <ul className="whylist">
            {w.points.map((p, i) => {
              const Icon = ICONS[i] ?? LayersIcon;
              return (
                <li key={p.t} className="whyrow">
                  <span className="ico"><Icon size={22} /></span>
                  <div>
                    <h3 className="btitle">{p.t}</h3>
                    <p className="btext">{p.d}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

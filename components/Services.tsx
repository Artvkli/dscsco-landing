import { stepNumber } from "@/lib/i18n";
import { AppsIcon, CheckIcon, ConsoleIcon, LaptopLockIcon, PhoneIcon, ShieldCheckIcon, VpnIcon } from "./icons";
import type { WithLocale } from "./types";

const WAVE = [10, 18, 26, 14, 34, 22, 44, 30, 52, 38, 26, 46, 20, 36, 54, 28, 40, 18, 30, 48, 24, 36, 16, 28, 12, 20, 10];

export default function Services({ t, locale }: WithLocale) {
  const s = t.svc;
  const n = (i: number) => stepNumber(i, locale);

  return (
    <section id="services" className="sec sec-white" aria-labelledby="services-title">
      <div className="wrap">
        <div className="sec-head" data-reveal>
          <div>
            <p className="eyebrow">{s.eyebrow}</p>
            <h2 id="services-title" className="h2">{s.title}</h2>
          </div>
          <p className="lead">{s.lead}</p>
        </div>

        <div className="bento">
          {/* 01 — VPN & SD-WAN (featured) */}
          <article className="card ink s7" data-reveal>
            <span className="cnum mono" aria-hidden="true">{n(1)}</span>
            <div className="ico"><VpnIcon size={26} /></div>
            <h3 className="ctitle">{s.s1.t}</h3>
            <p className="ctext">{s.s1.d}</p>
            <p className="cuse"><span className="cuse-l">{s.useLabel}</span>{s.s1.use}</p>
            <div className="card-fill" dir="ltr">
              <svg viewBox="0 0 520 150" aria-hidden="true">
                <path className="link" d="M108 38 C 150 38 160 68 200 68" />
                <path className="link" d="M108 114 C 150 114 160 84 200 84" />
                <path className="link" d="M320 68 C 360 68 370 38 412 38" />
                <path className="link" d="M320 84 C 360 84 370 114 412 114" />
                <path className="pkt" d="M108 38 C 150 38 160 68 200 68" />
                <path className="pkt" d="M320 84 C 360 84 370 114 412 114" style={{ animationDelay: "-1.4s" }} />
                <path className="pkt" d="M412 38 C 370 38 360 68 320 68" style={{ animationDelay: "-2.4s" }} />
                <path className="pkt" d="M200 84 C 160 84 150 114 108 114" style={{ animationDelay: "-0.8s" }} />
                <g fill="#10294A" stroke="rgba(94,234,212,.38)">
                  <rect x="24" y="22" width="84" height="32" rx="8" />
                  <rect x="24" y="98" width="84" height="32" rx="8" />
                  <rect x="412" y="22" width="84" height="32" rx="8" />
                  <rect x="412" y="98" width="84" height="32" rx="8" />
                </g>
                <g fill="#34D399">
                  <circle cx="40" cy="38" r="4" /><circle cx="40" cy="114" r="4" />
                  <circle cx="428" cy="38" r="4" /><circle cx="428" cy="114" r="4" />
                </g>
                <g fill="rgba(255,255,255,.22)">
                  {[24, 98].flatMap((y) =>
                    [52, 440].flatMap((x) => [
                      <rect key={`${x}-${y}-a`} x={x} y={y + 12} width="42" height="3" rx="1.5" />,
                      <rect key={`${x}-${y}-b`} x={x} y={y + 18} width="26" height="3" rx="1.5" />,
                    ])
                  )}
                </g>
                <rect x="200" y="54" width="120" height="44" rx="12" fill="#0F3B3A" stroke="#10B981" strokeWidth="1.4" />
                <text x="260" y="81" textAnchor="middle" fill="#A7F3D0" fontFamily="IBM Plex Mono, monospace" fontSize="13" fontWeight="600" letterSpacing="1">
                  SD-WAN
                </text>
              </svg>
            </div>
            <div className="tags" dir="ltr">
              <span className="tag mono">Site-to-Site VPN</span>
              <span className="tag mono">Remote Access</span>
              <span className="tag mono">SD-WAN</span>
            </div>
          </article>

          {/* 02 — VoIP */}
          <article className="card s5" data-reveal>
            <span className="cnum mono" aria-hidden="true">{n(2)}</span>
            <div className="ico"><PhoneIcon size={26} /></div>
            <h3 className="ctitle">{s.s2.t}</h3>
            <p className="ctext">{s.s2.d}</p>
            <p className="cuse"><span className="cuse-l">{s.useLabel}</span>{s.s2.use}</p>
            <div className="card-fill wave" style={{ marginTop: 32 }}>
              <svg viewBox="0 0 300 64" aria-hidden="true">
                <g fill="#14B8A6">
                  {WAVE.map((h, i) => {
                    const fade = 0.35 + 0.65 * Math.sin((Math.PI * (i + 0.5)) / WAVE.length);
                    return <rect key={i} x={i * 11} y={32 - h / 2} width="5" height={h} rx="2.5" opacity={fade.toFixed(2)} />;
                  })}
                </g>
              </svg>
            </div>
          </article>

          {/* 03 — Enterprise applications */}
          <article className="card s4" data-reveal>
            <span className="cnum mono" aria-hidden="true">{n(3)}</span>
            <div className="ico"><AppsIcon size={26} /></div>
            <h3 className="ctitle">{s.s3.t}</h3>
            <p className="ctext">{s.s3.d}</p>
            <p className="cuse"><span className="cuse-l">{s.useLabel}</span>{s.s3.use}</p>
            <div className="tags" dir="ltr" style={{ marginTop: 22 }}>
              <span className="tag mono">CRM</span>
              <span className="tag mono">ERP</span>
            </div>
          </article>

          {/* 04 — Workspaces */}
          <article className="card s4" data-reveal>
            <span className="cnum mono" aria-hidden="true">{n(4)}</span>
            <div className="ico"><LaptopLockIcon size={26} /></div>
            <h3 className="ctitle">{s.s4.t}</h3>
            <p className="ctext">{s.s4.d}</p>
            <p className="cuse"><span className="cuse-l">{s.useLabel}</span>{s.s4.use}</p>
          </article>

          {/* 05 — Centralized management */}
          <article className="card s4 s4-md-wide" data-reveal>
            <span className="cnum mono" aria-hidden="true">{n(5)}</span>
            <div className="ico"><ConsoleIcon size={26} /></div>
            <h3 className="ctitle">{s.s5.t}</h3>
            <p className="ctext">{s.s5.d}</p>
            <p className="cuse"><span className="cuse-l">{s.useLabel}</span>{s.s5.use}</p>
          </article>

          {/* 06 — Cybersecurity & support (wide) */}
          <article className="card mist s12" data-reveal>
            <span className="cnum mono" aria-hidden="true">{n(6)}</span>
            <div className="card-main">
              <div className="ico"><ShieldCheckIcon size={26} /></div>
              <h3 className="ctitle">{s.s6.t}</h3>
              <p className="ctext">{s.s6.d}</p>
            <p className="cuse"><span className="cuse-l">{s.useLabel}</span>{s.s6.use}</p>
              <ul className="checks">
                {s.s6.items.map((it) => (
                  <li key={it}>
                    <CheckIcon size={18} />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-art">
              <svg viewBox="0 0 220 160" aria-hidden="true">
                <path d="M110 10 L172 34 V78 C172 114 146 140 110 152 C74 140 48 114 48 78 V34 Z" fill="none" stroke="#14B8A6" strokeOpacity=".25" strokeWidth="1.4" />
                <path className="orb" d="M110 32 L152 48 V78 C152 103 134 121 110 130 C86 121 68 103 68 78 V48 Z" fill="none" stroke="#14B8A6" strokeOpacity=".5" strokeWidth="1.4" strokeDasharray="4 5" />
                <path d="M110 54 L133 63 V79 C133 94 123 104 110 109 C97 104 87 94 87 79 V63 Z" fill="#D1FAE5" stroke="#10B981" strokeWidth="1.6" />
                <path d="M100.5 80.5 l6.5 6.5 l12.5 -13" fill="none" stroke="#047857" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

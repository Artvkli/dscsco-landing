import { localizeDigits } from "@/lib/i18n";
import type { WithLocale } from "./types";

/* Stage motifs — each tile's background tells the story of its step, light → dark as the network goes live. */

/** 01 Assessment — survey dot-grid with highlighted findings and a scanning line. */
function AssessArt() {
  const hits: [number, number][] = [[164, 38], [206, 66], [234, 24], [150, 94]];
  return (
    <svg className="step-art" viewBox="0 0 260 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <pattern id="assess-dots" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="1.3" fill="#8FC7BB" fillOpacity=".55" />
        </pattern>
      </defs>
      <rect width="260" height="120" fill="url(#assess-dots)" />
      <rect className="scan" x="120" y="0" width="140" height="2" fill="#10B981" fillOpacity=".55" />
      {hits.map(([x, y], i) => (
        <g key={i}>
          <circle className="pring" cx={x} cy={y} r="4" fill="none" stroke="#10B981" strokeWidth="1.2" style={{ animationDelay: `${-i * 0.7}s` }} />
          <circle cx={x} cy={y} r="3.2" fill="#0F766E" />
        </g>
      ))}
    </svg>
  );
}

/** 02 Architecture design — blueprint grid with a topology being drawn. */
function DesignArt() {
  const lines: number[] = [];
  for (let i = 0; i <= 260; i += 20) lines.push(i);
  return (
    <svg className="step-art" viewBox="0 0 260 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g stroke="#0F766E" strokeOpacity=".1" strokeWidth="1">
        {lines.map((x) => <line key={`v${x}`} x1={x} y1="0" x2={x} y2="120" />)}
        {[0, 20, 40, 60, 80, 100, 120].map((y) => <line key={`h${y}`} x1="0" y1={y} x2="260" y2={y} />)}
      </g>
      <g stroke="#0F766E" strokeOpacity=".22" strokeWidth="1">
        <line x1="140" y1="0" x2="140" y2="120" />
        <line x1="0" y1="60" x2="260" y2="60" />
      </g>
      <g>
        <path className="link dk" d="M160 30 H 220 V 80" />
        <path className="link dk" d="M160 30 V 90 H 200" />
        <path className="link dk" d="M220 80 H 200 V 90" />
      </g>
      <g fill="#FFFFFF" stroke="#0F766E" strokeWidth="1.5">
        <rect x="150" y="22" width="20" height="16" rx="3" />
        <rect x="210" y="22" width="20" height="16" rx="3" />
        <rect x="190" y="82" width="20" height="16" rx="3" />
      </g>
      <circle cx="220" cy="80" r="4" fill="#10B981" />
    </svg>
  );
}

/** 03 Implementation — circuit traces with packets moving through them. */
function BuildArt() {
  const traces = [
    "M110 20 H 170 L 190 40 H 260",
    "M120 60 H 160 L 180 80 H 230 L 245 95 H 260",
    "M130 104 H 200 L 214 90 H 260",
    "M150 0 V 12 L 160 20",
  ];
  return (
    <svg className="step-art" viewBox="0 0 260 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g fill="none" stroke="rgba(94,234,212,.32)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        {traces.map((d) => <path key={d} d={d} />)}
      </g>
      <path className="pkt" d={traces[0]} />
      <path className="pkt" d={traces[1]} style={{ animationDelay: "-1.6s" }} />
      <path className="pkt" d={traces[2]} style={{ animationDelay: "-2.8s" }} />
      <g fill="#0E3A44" stroke="#5EEAD4" strokeWidth="1.4">
        <circle cx="110" cy="20" r="3.5" /><circle cx="120" cy="60" r="3.5" /><circle cx="130" cy="104" r="3.5" />
      </g>
      <rect x="196" y="48" width="30" height="22" rx="4" fill="#0B2F38" stroke="#34D399" strokeWidth="1.4" />
      <g stroke="#34D399" strokeWidth="1.2"><path d="M203 48 v-5 M211 48 v-5 M219 48 v-5 M203 70 v5 M211 70 v5 M219 70 v5" /></g>
    </svg>
  );
}

/** 04 Continuous management — control-room radar with a rotating sweep. */
function ManageArt() {
  return (
    <svg className="step-art" viewBox="0 0 260 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g fill="none" stroke="rgba(94,234,212,.16)">
        {[18, 38, 58, 80, 104].map((r) => <circle key={r} cx="200" cy="60" r={r} />)}
        <line x1="96" y1="60" x2="260" y2="60" />
        <line x1="200" y1="0" x2="200" y2="120" />
      </g>
      <g className="sweep">
        <path d="M200 60 L 200 -44 A 104 104 0 0 1 273 -14 Z" fill="rgba(52,211,153,.12)" />
        <line x1="200" y1="60" x2="200" y2="-44" stroke="#34D399" strokeOpacity=".7" strokeWidth="1.4" />
      </g>
      {[[226, 30], [168, 84], [238, 92], [150, 40]].map(([x, y], i) => (
        <g key={i}>
          <circle className="pring" cx={x} cy={y} r="3" fill="none" stroke="#34D399" style={{ animationDelay: `${-i * 0.9}s` }} />
          <circle cx={x} cy={y} r="3" fill="#6EE7B7" />
        </g>
      ))}
      <circle cx="200" cy="60" r="4" fill="#10B981" />
    </svg>
  );
}

const ART = [AssessArt, DesignArt, BuildArt, ManageArt];
const TONE = ["tone-1", "tone-2", "tone-3", "tone-4"];

export default function Process({ t, locale }: WithLocale) {
  const p = t.proc;
  return (
    <section id="process" className="sec sec-white" aria-labelledby="process-title">
      <div className="wrap">
        <div className="sec-head" data-reveal>
          <div>
            <p className="eyebrow">{p.eyebrow}</p>
            <h2 id="process-title" className="h2">{p.title}</h2>
          </div>
          <p className="lead">{p.lead}</p>
        </div>
        <ol className="steps" data-reveal>
          {p.steps.map((s, i) => {
            const Art = ART[i] ?? AssessArt;
            return (
              <li key={s.t} className={`step ${TONE[i] ?? "tone-1"}`}>
                <Art />
                <span className="sbadge mono" aria-hidden="true">{localizeDigits(i + 1, locale)}</span>
                <h3 className="step-title">{s.t}</h3>
                <p className="btext">{s.d}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

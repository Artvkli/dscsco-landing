import type { CSSProperties } from "react";

/** Animated global network: offices around the globe linked through a central secure core. Pure SVG + CSS. */
export default function GlobeIllustration({ label }: { label: string }) {
  const d = (delay: string, extra?: CSSProperties): CSSProperties => ({ animationDelay: delay, ...extra });

  return (
    <svg viewBox="0 0 560 520" role="img" aria-label={label}>
      <defs>
        <radialGradient id="globe-sphere" cx="38%" cy="30%" r="78%">
          <stop offset="0" stopColor="#123A5E" />
          <stop offset="1" stopColor="#071A33" />
        </radialGradient>
        <pattern id="globe-dots" width="9" height="9" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.05" fill="#5EEAD4" fillOpacity="0.17" />
        </pattern>
        <clipPath id="globe-clip">
          <circle cx="280" cy="260" r="210" />
        </clipPath>
      </defs>

      {/* Orbit + sphere */}
      <g transform="rotate(-16 280 260)">
        <ellipse className="orb" cx="280" cy="260" rx="266" ry="98" fill="none" stroke="rgba(94,234,212,.24)" strokeDasharray="2 8" />
      </g>
      <circle cx="280" cy="260" r="210" fill="url(#globe-sphere)" stroke="rgba(94,234,212,.3)" />
      <rect x="70" y="50" width="420" height="420" fill="url(#globe-dots)" clipPath="url(#globe-clip)" />
      <g fill="none" stroke="rgba(94,234,212,.13)" strokeWidth="1">
        <ellipse cx="280" cy="260" rx="150" ry="210" />
        <ellipse cx="280" cy="260" rx="78" ry="210" />
        <line x1="280" y1="50" x2="280" y2="470" />
        <ellipse cx="280" cy="260" rx="210" ry="62" />
        <ellipse cx="280" cy="152" rx="179" ry="44" />
        <ellipse cx="280" cy="368" rx="179" ry="44" />
      </g>
      <circle cx="280" cy="262" r="58" fill="rgba(16,185,129,.07)" />

      {/* Links */}
      <g>
        <path className="link" d="M280 262 Q 214 232 196 176" />
        <path className="link" d="M280 262 Q 340 220 372 150" />
        <path className="link" d="M280 262 Q 370 250 430 286" />
        <path className="link" d="M280 262 Q 320 330 338 388" />
        <path className="link" d="M280 262 Q 210 300 168 352" />
        <path className="link" d="M280 262 Q 180 272 110 250" />
        <path className="link faint" d="M196 176 Q 284 96 372 150" />
        <path className="link faint" d="M430 286 Q 412 362 338 388" />
        <path className="link faint" d="M168 352 Q 116 318 110 250" />
      </g>

      {/* Travelling packets */}
      <g>
        <path className="pkt" d="M196 176 Q 214 232 280 262" />
        <path className="pkt" d="M280 262 Q 340 220 372 150" style={d("-1.1s")} />
        <path className="pkt" d="M430 286 Q 370 250 280 262" style={d("-2.3s")} />
        <path className="pkt" d="M280 262 Q 320 330 338 388" style={d("-0.6s", { animationDuration: "4.4s" })} />
        <path className="pkt" d="M168 352 Q 210 300 280 262" style={d("-3s")} />
        <path className="pkt" d="M280 262 Q 180 272 110 250" style={d("-1.8s", { animationDuration: "4.2s" })} />
        <path className="pkt" d="M196 176 Q 284 96 372 150" style={d("-2.6s", { animationDuration: "5s", stroke: "#5EEAD4" })} />
      </g>

      {/* Offices */}
      <g>
        <circle className="pring" cx="196" cy="176" r="8" fill="none" stroke="#34D399" strokeWidth="1.5" />
        <circle cx="196" cy="176" r="8" fill="#10B981" stroke="#071A33" strokeWidth="3" />
        <circle className="pring" cx="372" cy="150" r="6" fill="none" stroke="#5EEAD4" strokeWidth="1.2" style={d("-0.7s")} />
        <circle cx="372" cy="150" r="6" fill="#5EEAD4" stroke="#071A33" strokeWidth="3" />
        <circle className="pring" cx="430" cy="286" r="6" fill="none" stroke="#5EEAD4" strokeWidth="1.2" style={d("-1.4s")} />
        <circle cx="430" cy="286" r="6" fill="#5EEAD4" stroke="#071A33" strokeWidth="3" />
        <circle cx="338" cy="388" r="6" fill="#5EEAD4" stroke="#071A33" strokeWidth="3" />
        <circle className="pring" cx="168" cy="352" r="6" fill="none" stroke="#5EEAD4" strokeWidth="1.2" style={d("-2.1s")} />
        <circle cx="168" cy="352" r="6" fill="#5EEAD4" stroke="#071A33" strokeWidth="3" />
        <circle cx="110" cy="250" r="6" fill="#5EEAD4" stroke="#071A33" strokeWidth="3" />
      </g>

      {/* Secure core */}
      <g>
        <circle className="pring2" cx="280" cy="262" r="31" fill="none" stroke="#34D399" strokeWidth="1.2" />
        <polygon points="280,230 307.7,246 307.7,278 280,294 252.3,278 252.3,246" fill="#0B2A3F" stroke="#10B981" strokeWidth="1.8" />
        <rect x="271" y="261" width="18" height="14" rx="2.5" fill="none" stroke="#6EE7B7" strokeWidth="1.8" />
        <path d="M274.5 261 v-4.2 a5.5 5.5 0 0 1 11 0 V261" fill="none" stroke="#6EE7B7" strokeWidth="1.8" />
        <circle cx="280" cy="267.5" r="1.6" fill="#6EE7B7" />
      </g>
    </svg>
  );
}

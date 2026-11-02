/**
 * Hero backdrop: topographic "signal waves" flowing toward the globe, faint orbit rings and a node constellation.
 * Curved and organic on purpose — no grid or square pattern. Mirrors itself in RTL (see .hero-bg in globals.css).
 */

const WAVES = Array.from({ length: 10 }, (_, k) => ({
  d: `M-20 ${420 + k * 34} C 260 ${360 + k * 30}, 520 ${560 + k * 26}, 820 ${470 + k * 30} S 1240 ${300 + k * 40}, 1460 ${380 + k * 36}`,
  opacity: +(0.15 - k * 0.011).toFixed(3),
}));

// [x, y, radius, opacity] — fixed positions so server and client render identically.
const DOTS: [number, number, number, number][] = [[673, 174, 1.3, 0.24], [1107, 116, 1.2, 0.24], [1049, 239, 0.9, 0.38], [879, 80, 1.6, 0.27], [467, 83, 1.4, 0.37], [462, 67, 1.4, 0.27], [868, 167, 1.4, 0.44], [1157, 205, 1.0, 0.44], [138, 81, 1.5, 0.41], [1098, 457, 1.6, 0.4], [938, 390, 1.2, 0.52], [509, 103, 1.4, 0.42], [713, 479, 1.2, 0.59], [251, 544, 1.3, 0.51], [1378, 99, 1.6, 0.44], [652, 368, 1.5, 0.45], [1197, 487, 1.0, 0.26], [143, 82, 1.6, 0.34], [1193, 476, 1.2, 0.37], [1379, 375, 0.9, 0.4], [1026, 102, 1.0, 0.37], [579, 160, 1.7, 0.33], [860, 387, 1.5, 0.36], [34, 516, 1.1, 0.33], [1258, 346, 1.8, 0.48], [1065, 75, 1.3, 0.55], [1403, 421, 1.3, 0.37], [996, 430, 1.0, 0.25], [706, 73, 1.0, 0.44], [1108, 123, 1.8, 0.45], [314, 278, 1.4, 0.4], [246, 519, 1.3, 0.4], [711, 291, 1.3, 0.48], [1067, 43, 1.1, 0.58], [750, 170, 1.5, 0.57], [1091, 325, 1.8, 0.55], [544, 550, 1.2, 0.28], [466, 219, 1.6, 0.5], [738, 49, 1.8, 0.52], [977, 285, 1.1, 0.45], [715, 477, 1.6, 0.49], [725, 393, 1.0, 0.26], [972, 221, 1.2, 0.4], [1259, 21, 1.3, 0.47], [1327, 106, 1.7, 0.27], [805, 224, 1.3, 0.29]];

export default function HeroBackground() {
  return (
    <svg className="hero-bg" viewBox="0 0 1440 820" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <g fill="none" stroke="rgba(94,234,212,.12)" strokeDasharray="2 10">
        {[330, 430, 540].map((r) => (
          <circle key={r} cx="1060" cy="380" r={r} />
        ))}
      </g>
      <g fill="none" strokeWidth="1.1">
        {WAVES.map((w, i) =>
          i === 3 ? (
            <path key={i} className="wave-hi" d={w.d} stroke="#34D399" />
          ) : (
            <path key={i} d={w.d} stroke={`rgba(94,234,212,${w.opacity})`} />
          )
        )}
      </g>
      <g fill="#99F6E4">
        {DOTS.map(([x, y, r, o], i) => (
          <circle
            key={i}
            className={i % 7 === 0 ? "twinkle" : undefined}
            cx={x}
            cy={y}
            r={r}
            fillOpacity={o}
            style={i % 7 === 0 ? { animationDelay: `-${((i % 5) * 0.9).toFixed(1)}s` } : undefined}
          />
        ))}
      </g>
    </svg>
  );
}

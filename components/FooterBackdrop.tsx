/**
 * Footer background: one low-detail earth hemisphere filling the footer.
 * Flat fill (no gradients), a fine fixed-size dot texture (CSS) and faint latitude/longitude
 * lines (SVG, non-scaling strokes), kept very low-contrast so the footer content stays fully legible.
 *
 * The globe is sized to twice the footer's height and centred on the footer's bottom edge,
 * so exactly its top half fills the footer at every screen size.
 */

const R = 500;
const C = 500;
const LONGITUDES = [15, 30, 45, 60, 75]; // degrees either side of the central meridian
const LATITUDES = [15, 30, 45, 60, 75];

export default function FooterBackdrop() {
  const rad = (d: number) => (d * Math.PI) / 180;
  return (
    <div className="foot-bg" aria-hidden="true">
      <div className="foot-earth">
        <svg viewBox="0 0 1000 1000" focusable="false">
          <g fill="none" stroke="#5EEAD4" strokeOpacity="0.07" strokeWidth="1.2">
            {/* Meridians */}
            <line x1={C} y1={C - R} x2={C} y2={C + R} vectorEffect="non-scaling-stroke" />
            {LONGITUDES.map((lon) => (
              <ellipse key={`m${lon}`} cx={C} cy={C} rx={(R * Math.sin(rad(lon))).toFixed(1)} ry={R} vectorEffect="non-scaling-stroke" />
            ))}
            {/* Parallels (equatorial view → straight chords) */}
            <line x1={C - R} y1={C} x2={C + R} y2={C} vectorEffect="non-scaling-stroke" />
            {LATITUDES.map((lat) => {
              const y = C - R * Math.sin(rad(lat));
              const half = R * Math.cos(rad(lat));
              return <line key={`p${lat}`} x1={(C - half).toFixed(1)} y1={y.toFixed(1)} x2={(C + half).toFixed(1)} y2={y.toFixed(1)} vectorEffect="non-scaling-stroke" />;
            })}
          </g>
        </svg>
      </div>
    </div>
  );
}

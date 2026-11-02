import GlobeIllustration from "./GlobeIllustration";
import HeroBackground from "./HeroBackground";
import { ArrowIcon, CheckIcon, LockIcon } from "./icons";
import type { WithT } from "./types";


export default function Hero({ t }: WithT) {
  const h = t.hero;
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <HeroBackground />
      <div className="glow" aria-hidden="true" />
      <div className="wrap hero-grid">
        <div>
          <p className="pill">
            <span className="live-dot" aria-hidden="true" />
            {h.eyebrow}
          </p>
          <h1 id="hero-title" className="h1">
            {h.t1} <span className="h1-accent">{h.t2}</span>
          </h1>
          <p className="hero-sub">{h.sub}</p>
          <ul className="gets" aria-label={h.pointsLabel}>
            {h.points.map((pt) => (
              <li key={pt}>
                <span className="gets-ico"><CheckIcon size={14} sw={2.8} /></span>
                {pt}
              </li>
            ))}
          </ul>
          <div className="hero-ctas">
            <a className="btn btn-primary" href="#contact">
              {h.cta1}
              <ArrowIcon />
            </a>
            <a className="btn btn-ghost" href="#services">
              {h.cta2}
            </a>
          </div>
        </div>

        <div className="rise d2">
          <div className="globe-wrap">
            <GlobeIllustration label={h.illo} />
            {/* Labels are HTML so they translate and render with the page font. Positions are % of the 560×520 artwork. */}
            <span className="chip" style={{ left: "35%", top: "33.8%" }} aria-hidden="true">{h.hq}</span>
            <span className="chip" style={{ left: "66.4%", top: "28.8%" }} aria-hidden="true">{h.intlBranch}</span>
            <span className="chip below core" style={{ left: "50%", top: "57%" }} aria-hidden="true">{h.core}</span>
            <span className="chip below" style={{ left: "76.8%", top: "55%" }} aria-hidden="true">{h.branch}</span>
            <span className="chip below hide-sm" style={{ left: "30%", top: "67.7%" }} aria-hidden="true">{h.remote}</span>
            <div className="status floaty" aria-hidden="true">
              <span className="status-icon">
                <LockIcon size={18} />
              </span>
              <span className="status-text">
                <span className="status-title">{h.statusT}</span>
                <span className="status-sub">{h.statusS}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

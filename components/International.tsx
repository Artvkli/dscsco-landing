import { ArrowIcon, CheckIcon, GatewayIcon, InfoIcon, LockIcon, ServerIcon, UserIcon, UsersIcon } from "./icons";
import type { WithT } from "./types";

export default function International({ t }: WithT) {
  const s = t.intl;
  return (
    <section id="international" className="sec intl gridbg dark" aria-labelledby="intl-title">
      <div className="glow" aria-hidden="true" />
      <div className="wrap">
        <div className="g-2c" data-reveal>
          <div>
            <p className="eyebrow">{s.eyebrow}</p>
            <h2 id="intl-title" className="h2">{s.title}</h2>
            <p className="lead">{s.body}</p>
          </div>
          <ul className="points">
            {s.points.map((p) => (
              <li key={p}>
                <span className="points-check"><CheckIcon size={16} sw={2.6} /></span>
                <span className="points-text">{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <figure className="arch" data-reveal>
          <figcaption className="arch-cap mono">{s.panel}</figcaption>
          <div className="flow">
            <div className="fnode">
              <div className="fnode-ico"><ServerIcon /></div>
              <p className="fnode-title">{s.hq}</p>
              <p className="fnode-sub">{s.hqS}</p>
            </div>
            <div className="conn">
              <span>{s.tunnel}</span>
              <span className="line" aria-hidden="true" />
              <LockIcon size={16} />
            </div>
            <div className="fnode hi">
              <div className="fnode-ico"><GatewayIcon /></div>
              <p className="fnode-title">{s.gw}</p>
              <p className="fnode-sub">{s.gwS}</p>
            </div>
            <div className="conn">
              <span>{s.access}</span>
              <span className="line" aria-hidden="true" />
              <UserIcon size={16} />
            </div>
            <div className="fnode">
              <div className="fnode-ico"><UsersIcon /></div>
              <p className="fnode-title">{s.emp}</p>
              <p className="fnode-sub">{s.empS}</p>
            </div>
          </div>
        </figure>

        <div className="note" data-reveal>
          <p>
            <InfoIcon size={20} />
            <span>{s.note}</span>
          </p>
          <a className="tlink" href="#contact">
            {s.cta}
            <ArrowIcon width={17} height={17} />
          </a>
        </div>
      </div>
    </section>
  );
}

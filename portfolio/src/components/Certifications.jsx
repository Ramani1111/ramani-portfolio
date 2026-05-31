import { useInView } from '../hooks/useTyped';
import { CERTIFICATIONS } from '../data/data';
import './Certifications.css';

export default function Certifications() {
  const [ref, inView] = useInView();

  return (
    <section id="certifications" className="section certs-bg">
      <div className={`container fade-up ${inView ? 'visible' : ''}`} ref={ref}>

        <div style={{ marginBottom: 52 }}>
          <div className="section-label">Achievements</div>
          <h2 className="section-title">Certifications</h2>
          <p className="section-desc">
            Industry certifications that validate my technical knowledge and commitment to continuous learning.
          </p>
        </div>

        <div className="certs-grid">
          {CERTIFICATIONS.map((c) => (
            <div key={c.issuer} className="glass cert-card">
              <div className="cert-accent" style={{ background: `linear-gradient(90deg, ${c.color}, transparent)` }} />
              <div className="cert-issuer" style={{ color: c.color }}>{c.issuer}</div>
              <ul className="cert-list">
                {c.items.map((item) => (
                  <li key={item} className="cert-item">
                    <span className="cert-bullet" style={{ background: c.color }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

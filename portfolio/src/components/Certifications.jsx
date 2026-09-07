import { useInView } from '../hooks/useTyped';
import { useApiCollection, useApiObject } from '../hooks/useApiData';
import { CERTIFICATIONS } from '../data/data';
import * as Icon from './Icons';
import './Certifications.css';

// Issuer -> brand color used in the icon tile.
const ISSUER_COLORS = {
  Oracle: '#F80000',
  'Infosys Springboard': '#fb923c',
  NPTEL: '#38bdf8',
  Coursera: '#0056d2',
  Udemy: '#a435f0',
  AWS: '#ff9900',
  Google: '#4285F4',
  'SRM IST Vadapalani Campus': '#6d28d9',
};

// Format the cert item so older string-only entries still work
function normalize(item) {
  if (typeof item === 'string') {
    return { title: item, date: '', url: '', skills: [] };
  }
  return { skills: [], url: '', ...item };
}

function CertCard({ cert }) {
  const issuerColor = ISSUER_COLORS[cert.issuer] || cert.color || '#38bdf8';
  const items = (cert.items || []).map(normalize);

  return (
    <div
      className="glass cert-card"
      style={{ '--accent': issuerColor }}
    >
      <div
        className="cert-accent"
        style={{
          background: `linear-gradient(90deg, ${issuerColor}, transparent)`,
        }}
      />
      <div className="cert-card-top">
        {cert.image && (
          <div
            className="cert-image-wrap"
            style={{
              borderColor: `${issuerColor}40`,
              background: `${issuerColor}10`,
            }}
          >
            <img
              src={cert.image}
              alt={`${cert.issuer} logo`}
              className="cert-image"
            />
          </div>
        )}
        <div className="cert-meta">
          <div className="cert-issuer" style={{ color: issuerColor }}>
            {cert.issuer}
          </div>
          <div className="cert-count">
            {items.length}{' '}
            {items.length === 1 ? 'credential' : 'credentials'}
          </div>
        </div>
        <div
          className="cert-verified"
          style={{
            color: issuerColor,
            borderColor: `${issuerColor}40`,
            background: `${issuerColor}10`,
          }}
        >
          <Icon.Star size={12} /> Verified
        </div>
      </div>
      <ul className="cert-list">
        {items.map((it, i) => (
          <li key={i} className="cert-item">
            <span
              className="cert-bullet"
              style={{ background: issuerColor }}
            />
            <div className="cert-item-body">
              <div className="cert-item-title-row">
                <span className="cert-item-title">{it.title}</span>
                {it.date && (
                  <span className="cert-item-date">{it.date}</span>
                )}
              </div>
              {it.skills && it.skills.length > 0 && (
                <div className="cert-item-skills">
                  {it.skills.map((s) => (
                    <span
                      key={s}
                      className="cert-skill-pill"
                      style={{
                        color: issuerColor,
                        borderColor: `${issuerColor}40`,
                        background: `${issuerColor}10`,
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}
              {it.credentialId && (
                <div
                  className="cert-item-id"
                  title="Credential ID"
                >
                  <Icon.Lock size={10} />
                  {it.credentialId.slice(0, 16)}…
                </div>
              )}
              {it.url && (
                <a
                  className="cert-item-link"
                  href={it.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon.ExternalLink size={12} />
                  Show credential
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Certifications() {
  const [ref, inView] = useInView();
  const certifications = useApiCollection('certifications', CERTIFICATIONS);
  const settings = useApiObject('site-settings', {
    certificationsLabel: '05 — Achievements',
    certificationsTitle: 'Licenses & certifications',
    certificationsDesc:
      'Industry-recognised certifications and credentials I have earned — with verification links where available.',
  });

  // Flatten all items to get a total credential count
  const totalCreds = certifications.reduce(
    (sum, c) => sum + (c.items?.length || 0),
    0
  );
  const totalIssuers = certifications.length;

  return (
    <section id="certifications" className="section certs-bg">
      <div className="section-watermark" aria-hidden="true">
        05
      </div>
      <div className={`container fade-up ${inView ? 'visible' : ''}`} ref={ref}>
        <div className="certs-head">
          <div className="section-label">{settings.certificationsLabel}</div>
          <h2 className="section-title">{settings.certificationsTitle}</h2>
          <p className="section-desc">{settings.certificationsDesc}</p>
          <div className="certs-meta">
            <span>
              <strong>{totalCreds}</strong> credentials
            </span>
            <span className="dot">·</span>
            <span>
              <strong>{totalIssuers}</strong> issuers
            </span>
            <span className="dot">·</span>
            <span>
              <strong>2024 – 2025</strong>
            </span>
          </div>
        </div>

        <div className="certs-grid">
          {certifications.map((c) => (
            <CertCard cert={c} key={c.issuer} />
          ))}
        </div>
      </div>
    </section>
  );
}

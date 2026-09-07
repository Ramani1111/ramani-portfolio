import { useState } from 'react';
import { useInView } from '../hooks/useTyped';
import { useApiObject } from '../hooks/useApiData';
import { CONTACT_INFO } from '../data/data';
import * as Icon from './Icons';
import './Contact.css';

export default function Contact() {
  const [ref, inView] = useInView();
  const contactInfo = useApiObject('about', CONTACT_INFO);
  const resume = useApiObject('resume/latest', { url: '/RAMANI_RESUME.pdf' });
  const settings = useApiObject('site-settings', {
    contactLabel: '07 — Get in touch',
    contactTitle: "Let's build something together",
    contactDesc:
      "I'm open to new full-time roles, freelance work, and interesting collaborations. The fastest way to reach me is by email — I usually reply within a day or two.",
    contactFormTitle: 'Send a message',
    contactFormDesc: 'Opens your mail app with the message pre-filled.',
    contactDirectTitle: 'Other channels',
    contactDirectDesc: 'Prefer LinkedIn, GitHub or LeetCode? Connect with me there too.',
    resumeLabel: 'Resume',
    resumeDesc: 'Download a PDF copy of my full resume.',
    availability: 'Open to opportunities',
  });

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  // Build a mailto URL with name/email/message pre-filled
  function buildMailto() {
    const subject = form.name.trim()
      ? `Portfolio Inquiry from ${form.name.trim()}`
      : 'Portfolio Inquiry';
    const body =
      (form.message ? form.message + '\n\n' : '') +
      'Name: ' +
      (form.name || '—') +
      '\n' +
      'Email: ' +
      (form.email || '—');
    return `mailto:${contactInfo.email || ''}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }

  // Send the form — opens the user's default mail app with the message pre-filled
  function handleSubmit(e) {
    e.preventDefault();
    window.location.href = buildMailto();
    setSent(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 5000);
  }

  // One-click "just email me" — no form, opens a friendly blank inquiry
  function quickEmail() {
    const subject = 'Portfolio Inquiry';
    const body =
      "Hi Ramani,\n\nI'd like to talk about a project / opportunity.\n\n";
    window.location.href = `mailto:${contactInfo.email || ''}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }

  // Copy the email address to the clipboard
  async function copyEmail() {
    if (!contactInfo.email) return;
    try {
      await navigator.clipboard.writeText(contactInfo.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (e) {
      // Fallback for older browsers
      const el = document.createElement('textarea');
      el.value = contactInfo.email;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  }

  // Other channels (no email — that has its own banner above)
  const channels = [
    {
      label: 'LinkedIn',
      value: contactInfo.linkedin
        ? contactInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')
        : 'LinkedIn',
      href: contactInfo.linkedin,
      icon: <Icon.LinkedIn />,
      color: '#0a66c2',
    },
    {
      label: 'GitHub',
      value: contactInfo.github
        ? contactInfo.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')
        : 'GitHub',
      href: contactInfo.github,
      icon: <Icon.GitHub />,
      color: '#a78bfa',
    },
    {
      label: 'LeetCode',
      value: contactInfo.leetcode
        ? contactInfo.leetcode.replace(/^https?:\/\/(www\.)?leetcode\.com\/u?\//, '')
        : 'LeetCode',
      href: contactInfo.leetcode,
      icon: <Icon.Code />,
      color: '#fb923c',
    },
  ];

  return (
    <section id="contact" className="section contact-section">
      <div className="section-watermark" aria-hidden="true">
        07
      </div>
      <div className={`container fade-up ${inView ? 'visible' : ''}`} ref={ref}>
        {/* Big hero header */}
        <div className="contact-hero">
          <div className="contact-availability">
            <span className="contact-availability-dot" />
            {settings.availability}
          </div>
          <h2 className="section-title contact-title">
            {settings.contactTitle}
          </h2>
          <p className="section-desc contact-desc">
            {settings.contactDesc}
          </p>
        </div>

        {/* Hero email card — the only place to email me, with copy + mailto */}
        <div className="glass contact-primary-cta">
          <div className="contact-primary-icon">
            <Icon.Mail />
          </div>
          <div className="contact-primary-body">
            <div className="contact-primary-label">Email</div>
            <div className="contact-primary-email">{contactInfo.email}</div>
            <div className="contact-primary-sub">
              Click below to open your mail app with a pre-filled message
            </div>
          </div>
          <div className="contact-primary-actions">
            <button
              type="button"
              onClick={quickEmail}
              className="btn btn-primary"
            >
              <Icon.Mail /> Email me
            </button>
            <button
              type="button"
              onClick={copyEmail}
              className="btn btn-ghost"
              title="Copy email address"
            >
              {copied ? (
                <>
                  <Icon.Star size={14} /> Copied!
                </>
              ) : (
                <>
                  <Icon.ExternalLink size={14} /> Copy
                </>
              )}
            </button>
          </div>
        </div>

        {/* Two-column area: other channels + form */}
        <div className="contact-grid">
          {/* Left — other channels */}
          <div className="contact-channels">
            <div className="contact-channels-head">
              <div className="contact-channels-title">
                {settings.contactDirectTitle}
              </div>
              <div className="contact-channels-sub">
                {settings.contactDirectDesc}
              </div>
            </div>
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className="glass contact-link"
                style={{ '--link-color': c.color }}
              >
                <div
                  className="contact-icon"
                  style={{
                    background: `${c.color}18`,
                    color: c.color,
                    border: `1px solid ${c.color}30`,
                  }}
                >
                  {c.icon}
                </div>
                <div className="contact-link-body">
                  <div className="contact-label">{c.label}</div>
                  <div className="contact-value">{c.value}</div>
                </div>
                <span
                  className="contact-handle"
                  style={{ color: c.color, borderColor: `${c.color}30` }}
                >
                  →
                </span>
              </a>
            ))}

            <div className="glass resume-card">
              <div className="resume-row">
                <div>
                  <div className="resume-label">{settings.resumeLabel}</div>
                  <p className="resume-desc">{settings.resumeDesc}</p>
                </div>
                <a
                  href={resume.url || '/RAMANI_RESUME.pdf'}
                  download
                  className="btn btn-primary"
                  style={{ textDecoration: 'none' }}
                >
                  <Icon.Download /> Download
                </a>
              </div>
            </div>
          </div>

          {/* Right — form that opens the mail app */}
          <div className="contact-form-col">
            <div className="glass contact-form-card">
              <div className="form-header">
                <div>
                  <h3 className="form-heading">{settings.contactFormTitle}</h3>
                  <p className="form-sub">{settings.contactFormDesc}</p>
                </div>
                <span className="form-meta">via email</span>
              </div>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Name</label>
                    <input
                      className="form-input"
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                      className="form-input"
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea
                    className="form-input"
                    rows={5}
                    placeholder="What would you like to build?"
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-actions">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ justifyContent: 'center' }}
                  >
                    <Icon.Send /> Send to my inbox
                  </button>
                  {sent && (
                    <span className="form-success">
                      <Icon.Star size={14} /> Your mail app should have opened
                      — thank you!
                    </span>
                  )}
                </div>
              </form>
            </div>

            <div className="glass contact-photo-card">
              <img
                src={contactInfo.photo || '/profile.jpg'}
                alt="Ramani S"
                className="contact-photo"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/profile.jpg';
                }}
              />
              <div className="contact-photo-meta">
                <div className="contact-photo-name">Ramani S</div>
                <div className="contact-photo-role">
                  Full Stack Developer · {contactInfo.location}
                </div>
                <div className="contact-photo-tags">
                  <span>Java</span>
                  <span>React</span>
                  <span>Node</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

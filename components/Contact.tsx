"use client";

import { useState } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <div className="contact-inner">
          <div className="contact-copy" data-reveal>
            <span className="t-label" style={{ color: "var(--accent-authority-muted)" }}>
              Contact
            </span>
            <h2 className="t-display-md" style={{ marginTop: "var(--space-md)", color: "var(--text-primary)" }}>
              Not everyone gets in.
              <br />
              <span className="gradient-text">Start a conversation.</span>
            </h2>
            <p className="t-body" style={{ marginTop: "var(--space-md)" }}>
              We evaluate fit before we engage. Tell us what you&apos;re building
              and what problem you&apos;re trying to solve — we&apos;ll tell you directly
              if there&apos;s a match.
            </p>
            <div className="contact-tags">
              {["Venues & Institutions", "Artists & Musicians", "Brands & Orgs", "Partnerships"].map((tag) => (
                <span key={tag} className="contact-tag">{tag}</span>
              ))}
            </div>
          </div>

          <div className="contact-form-wrap card" data-reveal data-reveal-delay="120">
            {submitted ? (
              <div className="form-success">
                <div className="success-icon">✓</div>
                <h3 className="t-heading">Message received.</h3>
                <p className="t-body">
                  We read every submission. If there&apos;s a fit, you&apos;ll hear from
                  us within 48 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="name">Name</label>
                    <input className="form-input" type="text" id="name" name="name" placeholder="Your name" autoComplete="name" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input className="form-input" type="email" id="email" name="email" placeholder="your@email.com" autoComplete="email" required />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="who">I am a</label>
                  <select className="form-select" id="who" name="who" required defaultValue="">
                    <option value="" disabled>Select who you are</option>
                    <option value="venue">Venue / Institution</option>
                    <option value="artist">Artist / Musician</option>
                    <option value="brand">Brand / Organisation</option>
                    <option value="partner">Potential Partner</option>
                    <option value="other">Something else</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="interest">I&apos;m interested in</label>
                  <select className="form-select" id="interest" name="interest" required defaultValue="">
                    <option value="" disabled>Select what you&apos;re looking for</option>
                    <optgroup label="For Venues & Institutions">
                      <option value="optimisation">Revenue optimisation services</option>
                      <option value="intelligence">Behavioral intelligence reports</option>
                    </optgroup>
                    <optgroup label="For Artists & Professionals">
                      <option value="acquisition">Audience growth and acquisition support</option>
                      <option value="distribution">Distribution and publishing guidance</option>
                      <option value="development">Artist development</option>
                    </optgroup>
                    <optgroup label="General">
                      <option value="partnership">Partnership or collaboration</option>
                      <option value="learn">Learning more about the ecosystem</option>
                      <option value="other">Something else</option>
                    </optgroup>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="message">Tell us more</label>
                  <textarea className="form-textarea" id="message" name="message" placeholder="What are you working on? What problem are you trying to solve?" required rows={4} />
                </div>

                <button type="submit" className="btn btn-primary submit-btn" disabled={loading}>
                  {loading ? "Sending..." : "Contact Us →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .contact-section { background: var(--bg-primary); }
        .contact-inner {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: var(--space-3xl);
          align-items: start;
        }
        .contact-tags {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-sm);
          margin-top: var(--space-xl);
        }
        .contact-tag {
          font-size: 12px;
          font-weight: 500;
          color: var(--text-secondary);
          padding: 5px 12px;
          border: 1px solid var(--border-muted);
          border-radius: var(--radius-pill);
        }
        .contact-form-wrap { padding: var(--space-xl); }
        .contact-form { display: flex; flex-direction: column; gap: var(--space-lg); }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-md); }
        .form-group { display: flex; flex-direction: column; gap: var(--space-xs); }
        .form-label {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-disabled);
        }
        .form-input, .form-select, .form-textarea {
          background: var(--bg-primary);
          border: 1px solid var(--border-muted);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          font-family: var(--font-body);
          font-size: 14px;
          padding: 11px 14px;
          transition: border-color var(--duration-fast) ease;
          outline: none;
          width: 100%;
        }
        .form-input:focus, .form-select:focus, .form-textarea:focus {
          border-color: var(--border-active);
        }
        .form-input::placeholder, .form-textarea::placeholder { color: var(--text-disabled); }
        .form-select option { background: var(--bg-card); color: var(--text-primary); }
        .form-textarea { resize: vertical; min-height: 100px; }
        .submit-btn { width: 100%; justify-content: center; padding: 14px; font-size: 15px; }
        .form-success {
          text-align: center;
          padding: var(--space-2xl) var(--space-xl);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-md);
        }
        .success-icon {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: rgba(124,58,237,0.15);
          border: 1px solid var(--border-active);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          color: var(--accent-intelligence);
        }
        @media (max-width: 900px) { .contact-inner { grid-template-columns: 1fr; } }
        @media (max-width: 600px) { .form-row { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}

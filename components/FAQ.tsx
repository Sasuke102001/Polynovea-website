"use client";

import { useRef, useState } from "react";

const faqs = [
  {
    q: "What exactly is a behavioral intelligence operation?",
    a: "A closed-loop system that observes how humans make decisions, extracts the underlying patterns, and converts them into repeatable frameworks — then deploys those frameworks as products, optimisations, or client engagements. The goal is to reduce blind decision-making inside systems that should be measurable.",
  },
  {
    q: "How does Polynovea Records connect to the intelligence system?",
    a: "Records is the IP and cultural layer of the ecosystem — the artist-facing, music-facing execution surface. The intelligence infrastructure sits underneath it and powers everything: artist selection, performance optimisation, audience understanding. The ecosystem is larger than the label. Records is one deployment surface, not the parent.",
  },
  {
    q: "Are you available for external projects or clients?",
    a: "Selectively. We engage with venues, institutions, and organisations where the work generates intelligence that compounds our system. We do not take on engagements that don't fit that model. Use the contact form to start a conversation — we'll tell you directly whether there's a match.",
  },
  {
    q: "What happens after I reach out?",
    a: "We read every submission. We evaluate fit based on what you're building, what problem you're trying to solve, and whether the engagement compounds the system for both sides. If there's a match, you'll hear from us within 48 hours. No pitch decks, no discovery theatre — just a direct answer.",
  },
  {
    q: "How do I know if Polynovea is relevant to what I'm building?",
    a: "If you're operating in live entertainment, artist development, venue management, or audience behaviour — and decisions are being made on intuition rather than structured intelligence — we're likely relevant. The ecosystem exists precisely to address that gap. Send us a message and we'll tell you directly.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const answerRef = useRef<HTMLDivElement>(null);

  return (
    <div className={`faq-item${open ? " open" : ""}`}>
      <button className="faq-question" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span>{q}</span>
        <span className="faq-icon">{open ? "−" : "+"}</span>
      </button>
      <div
        className="faq-answer-wrap"
        ref={answerRef}
        style={{ maxHeight: open ? (answerRef.current?.scrollHeight ?? 400) + "px" : "0px" }}
      >
        <div className="faq-answer">{a}</div>
      </div>

      <style jsx>{`
        .faq-item {
          background: var(--bg-card);
          border: 1px solid var(--border-muted);
          border-radius: var(--radius-md);
          overflow: hidden;
          transition: border-color var(--duration-default) ease;
        }
        .faq-item.open { border-color: var(--border-active); }
        .faq-question {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--space-md);
          padding: var(--space-md) var(--space-lg);
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          font-size: 15px;
          font-weight: 500;
          color: var(--text-primary);
          font-family: var(--font-body);
          line-height: 1.4;
        }
        .faq-icon {
          color: var(--accent-authority);
          font-size: 20px;
          font-weight: 700;
          flex-shrink: 0;
          line-height: 1;
        }
        .faq-answer-wrap {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.35s ease;
        }
        .faq-answer {
          margin: 0 var(--space-lg) var(--space-md);
          padding-top: var(--space-md);
          border-top: 1px solid var(--border-muted);
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.65;
        }
      `}</style>
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="section faq-section">
      <div className="container">
        <div className="faq-header" data-reveal>
          <span className="t-label" style={{ color: "var(--accent-authority-muted)" }}>
            FAQ
          </span>
          <h2 className="t-display-md" style={{ marginTop: "var(--space-md)", color: "var(--text-primary)" }}>
            Common questions,{" "}
            <span className="gradient-text-gold">direct answers.</span>
          </h2>
        </div>

        <div className="faq-list" data-reveal data-reveal-delay="100">
          {faqs.map((item) => (
            <FAQItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .faq-section { background: var(--bg-secondary); }
        .faq-header { text-align: center; margin-bottom: var(--space-2xl); }
        .faq-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
          max-width: 840px;
          margin-inline: auto;
        }
      `}</style>
    </section>
  );
}

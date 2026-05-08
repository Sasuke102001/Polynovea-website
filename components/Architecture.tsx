"use client";

import dynamic from "next/dynamic";

const ArchitectureVisualization = dynamic(
  () => import("@/components/ArchitectureVisualization"),
  { ssr: false }
);

const flowSteps = [
  "Raw Behaviour Input",
  "Pattern Recognition Layer",
  "Intelligence Framework",
  "Decision Engine",
  "Scalable Output",
];

const milestones = [
  {
    num: "01",
    title: "Behavioral Intelligence Framework",
    status: "In Progress",
    statusType: "progress",
    desc: "The foundation. An AI and data-driven system built to read, map, and model human behaviour — designed to power every milestone that follows.",
  },
  {
    num: "02",
    title: "Original Music & IP",
    status: "Active",
    statusType: "active",
    desc: "Creating original music and building our own intellectual property — establishing Polynovea as an independent creative operation with real cultural output.",
  },
  {
    num: "03",
    title: "Artist Automation Tools",
    status: "Planned",
    statusType: "planned",
    desc: "AI-powered tools that handle the tedious parts of music publishing — giving independent artists a fairer, simpler path without the exploitation.",
  },
  {
    num: "04",
    title: "Distribution Infrastructure",
    status: "Long-term",
    statusType: "longterm",
    desc: "Building a full distribution framework — acquiring the licenses and infrastructure to make music release sustainable and accessible for artists across India.",
  },
];

export default function Architecture() {
  return (
    <section id="architecture" className="section arch-section">
      <div className="container">
        {/* The System */}
        <div className="arch-grid">
          <div className="arch-text" data-reveal data-reveal-delay="0">
            <span className="t-label" style={{ color: "var(--accent-authority-muted)" }}>
              The Architecture
            </span>
            <h2 className="t-display-md" style={{ marginTop: "var(--space-md)", color: "var(--text-primary)" }}>
              The System
            </h2>
            <p className="t-body-lg" style={{ marginTop: "var(--space-md)" }}>
              Polynovea is not a creative agency or a tech startup. It is a
              behavioral intelligence operation — a closed loop that observes
              human decision-making, extracts patterns, and converts them into
              repeatable frameworks, products, and automated systems.
            </p>
            <p className="t-body-sm" style={{ marginTop: "var(--space-md)", color: "var(--text-disabled)" }}>
              Every output feeds the next input. Nothing is wasted.
            </p>
          </div>

          {/* Flow diagram */}
          <div className="flow-diagram-wrap" data-reveal data-reveal-delay="100">
            <ArchitectureVisualization />
            <div className="flow-diagram">
              {flowSteps.map((step, i) => (
                <div key={step}>
                  <div className="flow-box">
                    <span className="flow-dot" />
                    <span className="flow-label">{step}</span>
                  </div>
                  {i < flowSteps.length - 1 && (
                    <div className="flow-connector">
                      <div className="flow-line" />
                      <span className="flow-arrow">↓</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Milestones */}
        <div className="milestones-header" data-reveal>
          <h2 className="t-display-md" style={{ color: "var(--text-primary)" }}>
            Four Milestones. One Direction.
          </h2>
          <p className="t-body" style={{ marginTop: "var(--space-sm)" }}>
            Each milestone compounds the last. The architecture builds itself.
          </p>
        </div>

        <div className="milestones-grid">
          {milestones.map((m, i) => (
            <div
              key={m.num}
              className="milestone-card card"
              data-reveal
              data-reveal-delay={String(i * 80)}
            >
              <div className="milestone-header">
                <div>
                  <div className="milestone-title">{m.title}</div>
                  <span className={`badge badge-${m.statusType}`}>
                    <span className="badge-dot" />
                    {m.status}
                  </span>
                </div>
                <div className="milestone-num">{m.num}</div>
              </div>
              <p className="t-body-sm">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .arch-section {
          background: var(--bg-secondary);
        }

        .arch-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-3xl);
          align-items: start;
          margin-bottom: var(--space-5xl);
        }

        .arch-text {
          padding-top: var(--space-md);
        }

        .flow-diagram-wrap {
          position: relative;
          min-height: 450px;
        }

        .flow-diagram {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
        }

        .flow-box {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          padding: var(--space-md) var(--space-lg);
          background: var(--bg-card);
          border: 1px solid var(--border-muted);
          border-radius: var(--radius-md);
          transition: border-color var(--duration-default) ease;
        }

        .flow-box:hover {
          border-color: var(--border-active);
        }

        .flow-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--accent-intelligence);
          flex-shrink: 0;
          box-shadow: 0 0 8px var(--accent-intelligence-glow);
        }

        .flow-label {
          font-size: 14px;
          font-weight: 500;
          color: var(--text-primary);
        }

        .flow-connector {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2px 0;
          margin-left: 28px;
        }

        .flow-line {
          width: 1px;
          height: 16px;
          background: var(--border-muted);
        }

        .flow-arrow {
          color: var(--accent-authority-muted);
          font-size: 14px;
          line-height: 1;
        }

        .milestones-header {
          text-align: center;
          margin-bottom: var(--space-2xl);
        }

        .milestones-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-lg);
        }

        .milestone-card {
          padding: var(--space-xl);
        }

        .milestone-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: var(--space-md);
          margin-bottom: var(--space-md);
        }

        .milestone-title {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 600;
          color: var(--text-primary);
          line-height: 1.3;
          margin-bottom: var(--space-sm);
        }

        .milestone-num {
          font-family: var(--font-display);
          font-size: 52px;
          font-weight: 700;
          line-height: 1;
          color: var(--accent-authority);
          opacity: 0.3;
          letter-spacing: -2px;
          flex-shrink: 0;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.06em;
          padding: 3px 10px;
          border-radius: var(--radius-pill);
        }

        .badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .badge-active { background: rgba(34,197,94,0.12); color: #4ade80; }
        .badge-active .badge-dot { background: #4ade80; }
        .badge-progress { background: rgba(124,58,237,0.15); color: #a78bfa; }
        .badge-progress .badge-dot { background: #a78bfa; }
        .badge-planned { background: rgba(230,211,163,0.1); color: var(--accent-authority); }
        .badge-planned .badge-dot { background: var(--accent-authority); }
        .badge-longterm { background: rgba(113,113,122,0.15); color: var(--text-disabled); }
        .badge-longterm .badge-dot { background: var(--text-disabled); }

        @media (max-width: 900px) {
          .arch-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 640px) {
          .milestones-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}

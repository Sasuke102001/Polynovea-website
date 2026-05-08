"use client";

const rows = [
  {
    left: "Reacts to briefs and client requests",
    right: "Operates from a pre-built intelligence framework",
  },
  {
    left: "Delivers outputs and invoices",
    right: "Converts every engagement into system data",
  },
  {
    left: "Makes decisions on intuition and trend",
    right: "Runs measurement-first decision systems",
  },
  {
    left: "Grows by getting more clients",
    right: "Grows by compounding its own intelligence",
  },
  {
    left: "Replaces itself with the next trend",
    right: "Builds systems that become more valuable over time",
  },
];

export default function WhyDifferent() {
  return (
    <section className="section why-section">
      <div className="container">
        <div className="why-heading" data-reveal>
          <span className="t-label" style={{ color: "var(--accent-authority-muted)" }}>
            The Difference
          </span>
          <h2 className="t-display-md" style={{ marginTop: "var(--space-md)", color: "var(--text-primary)" }}>
            Not Creative. Not Consulting.
            <br />
            <span className="gradient-text-gold">Something Else.</span>
          </h2>
        </div>

        <div className="contrast-table" data-reveal data-reveal-delay="100">
          <div className="contrast-header-row">
            <div className="col-label col-label-left">Everyone Else</div>
            <div className="col-divider-head" />
            <div className="col-label col-label-right">Polynovea</div>
          </div>

          {rows.map((row, i) => (
            <div key={i} className="contrast-row">
              <div className="contrast-cell left-cell">{row.left}</div>
              <div className="contrast-divider">
                <div className="divider-line" />
                <div className="vs-dot" />
                <div className="divider-line" />
              </div>
              <div className="contrast-cell right-cell">{row.right}</div>
            </div>
          ))}
        </div>

        <div className="why-cta" data-reveal data-reveal-delay="200">
          <a href="#architecture" className="btn btn-secondary">
            Explore the Architecture
          </a>
        </div>
      </div>

      <style jsx>{`
        .why-section {
          background: var(--bg-primary);
        }

        .why-heading {
          text-align: center;
          margin-bottom: var(--space-3xl);
        }

        .contrast-table {
          max-width: 900px;
          margin-inline: auto;
        }

        .contrast-header-row {
          display: grid;
          grid-template-columns: 1fr 40px 1fr;
          margin-bottom: var(--space-md);
          padding-bottom: var(--space-md);
          border-bottom: 1px solid var(--border-muted);
        }

        .col-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .col-label-left {
          color: var(--text-disabled);
        }

        .col-label-right {
          color: var(--accent-authority);
          text-align: right;
        }

        .contrast-row {
          display: grid;
          grid-template-columns: 1fr 40px 1fr;
          align-items: center;
          padding: var(--space-md) 0;
          border-bottom: 1px solid var(--border-muted);
          transition: background var(--duration-fast) ease;
        }

        .contrast-row:hover {
          background: rgba(255, 255, 255, 0.02);
          border-radius: var(--radius-sm);
        }

        .contrast-cell {
          font-size: 15px;
          line-height: 1.5;
          padding: 0 var(--space-md);
        }

        .left-cell {
          color: var(--text-disabled);
          text-decoration: line-through;
          text-decoration-color: rgba(113, 113, 122, 0.4);
        }

        .right-cell {
          color: var(--text-primary);
          font-weight: 500;
          text-align: right;
        }

        .contrast-divider {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .divider-line {
          width: 1px;
          height: 10px;
          background: var(--border-muted);
        }

        .vs-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--border-active);
          box-shadow: 0 0 6px var(--accent-intelligence-glow);
        }

        .why-cta {
          text-align: center;
          margin-top: var(--space-2xl);
        }

        @media (max-width: 640px) {
          .contrast-row,
          .contrast-header-row {
            grid-template-columns: 1fr;
            gap: var(--space-sm);
          }
          .contrast-divider { display: none; }
          .left-cell, .right-cell { text-align: left; padding: 0; }
          .col-label-right { text-align: left; }
          .col-divider-head { display: none; }
        }
      `}</style>
    </section>
  );
}

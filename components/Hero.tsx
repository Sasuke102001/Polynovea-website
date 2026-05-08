"use client";

import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

export default function Hero() {
  return (
    <section id="home" className="hero">
      {/* Gradient orbs */}
      <div
        className="orb orb-violet"
        style={{ width: 700, height: 700, top: "-20%", left: "30%", opacity: 0.5 }}
      />
      <div
        className="orb orb-gold"
        style={{ width: 500, height: 500, top: "40%", right: "-10%", opacity: 0.3 }}
      />

      {/* Three.js particle network */}
      <HeroScene />

      <div className="hero-content">
        {/* Data chain — animate-1 */}
        <div className="hero-chain hero-animate-1">
          {["Behaviour Observed", "Pattern Extracted", "Decision Modelled", "System Updated"].map(
            (node, i, arr) => (
              <span key={node} className="hero-chain-node-wrap">
                <span className="hero-chain-node">{node}</span>
                {i < arr.length - 1 && (
                  <span className="hero-chain-arrow">→</span>
                )}
              </span>
            )
          )}
        </div>

        {/* Headline — animate-2 */}
        <h1 className="hero-headline hero-animate-2">
          We are building the system that{" "}
          <span className="gradient-text">reads, maps, and acts on</span>{" "}
          human behaviour.
        </h1>

        {/* Subline — animate-3 */}
        <p className="hero-sub hero-animate-3">
          Four milestones. One ecosystem. Records, intelligence infrastructure,
          AI agency, and data products — all in motion.
        </p>

        {/* CTAs — animate-4 */}
        <div className="hero-ctas hero-animate-4">
          <a href="#architecture" className="btn btn-primary">
            Explore the Architecture
          </a>
          <a href="#projects" className="btn btn-secondary">
            View Progress
          </a>
        </div>
      </div>

      <style jsx>{`
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding-top: var(--nav-height);
        }

        .hero-content {
          position: relative;
          z-index: 1;
          text-align: center;
          padding: var(--space-4xl) var(--space-xl);
          max-width: 900px;
          margin-inline: auto;
        }

        .hero-chain {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-sm);
          flex-wrap: wrap;
          margin-bottom: var(--space-2xl);
        }

        .hero-chain-node-wrap {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
        }

        .hero-chain-node {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-disabled);
          padding: 5px 12px;
          border: 1px solid var(--border-muted);
          border-radius: var(--radius-pill);
          background: rgba(18, 18, 18, 0.8);
          backdrop-filter: blur(8px);
        }

        .hero-chain-arrow {
          color: var(--text-disabled);
          font-size: 12px;
        }

        .hero-headline {
          font-family: var(--font-display);
          font-size: clamp(40px, 6vw, 80px);
          font-weight: 600;
          line-height: 1.08;
          letter-spacing: -0.03em;
          color: var(--text-primary);
          margin-bottom: var(--space-xl);
        }

        .hero-sub {
          font-size: clamp(16px, 1.5vw, 19px);
          line-height: 1.7;
          color: var(--text-secondary);
          max-width: 680px;
          margin-inline: auto;
          margin-bottom: var(--space-2xl);
        }

        .hero-ctas {
          display: flex;
          gap: var(--space-md);
          justify-content: center;
          flex-wrap: wrap;
        }

        @media (max-width: 768px) {
          .hero-chain {
            gap: var(--space-xs);
          }
          .hero-chain-arrow {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}

"use client";

import { useState } from "react";

const musicProjects = [
  {
    id: "I8ZQCN9EslU",
    title: "Lately",
    desc: "Our debut release. The first piece of original IP from Polynovea.",
    cta: "Watch on YouTube",
    href: "https://youtu.be/I8ZQCN9EslU",
  },
  {
    id: "VqiJCgQTJ0g",
    title: "Lately — Remake",
    desc: "A reimagined version. Same foundation, different resolution.",
    cta: "Watch on YouTube",
    href: "https://youtu.be/VqiJCgQTJ0g",
  },
  {
    id: "IIvCau8-tBw",
    title: "Sangharsh",
    desc: "Our upcoming album. A body of work in active production — releasing progressively.",
    cta: "Watch Teaser",
    href: "https://youtu.be/IIvCau8-tBw",
  },
];

const systemModules = [
  {
    tag: "Module 01",
    title: "Decision Framework",
    status: "Active",
    statusType: "active",
    desc: "Determines whether an opportunity is viable. Evaluates engagement fit, pricing logic, and expected outcomes before any resource is committed.",
  },
  {
    tag: "Module 02",
    title: "Acquisition System",
    status: "In Progress",
    statusType: "progress",
    desc: "Two-part system. Part 1 structures raw behavioural data into operational intelligence. Part 2 deploys the acquisition engine to identify and grow the right audience with precision.",
  },
  {
    tag: "Module 03",
    title: "Optimisation System",
    status: "Planned",
    statusType: "planned",
    desc: "Two-part system. Part 1 instruments the live environment — POS, venue data, audience behaviour. Part 2 converts that intelligence into measurable revenue optimisation for venues.",
  },
];

function VideoCard({
  id, title, desc, cta, href, delay,
}: {
  id: string; title: string; desc: string; cta: string; href: string; delay: number;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="project-card card" data-reveal data-reveal-delay={String(delay)}>
      <div className="video-embed">
        {!loaded && (
          <button className="video-thumb" onClick={() => setLoaded(true)} aria-label={`Play ${title}`}>
            <img
              src={`https://img.youtube.com/vi/${id}/mqdefault.jpg`}
              alt={title}
              loading="lazy"
            />
            <div className="play-btn">▶</div>
          </button>
        )}
        {loaded && (
          <iframe
            src={`https://www.youtube.com/embed/${id}?autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
      <div className="project-card-body">
        <div className="project-card-title">{title}</div>
        <p className="t-body-sm">{desc}</p>
        <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
          {cta} →
        </a>
      </div>

      <style jsx>{`
        .project-card {
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .video-embed {
          position: relative;
          padding-top: 56.25%;
          overflow: hidden;
          border-bottom: 1px solid var(--border-muted);
          background: var(--bg-card);
        }
        .video-embed iframe,
        .video-thumb {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: none;
        }
        .video-thumb {
          cursor: pointer;
          background: none;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .video-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .play-btn {
          position: absolute;
          width: 52px;
          height: 52px;
          background: rgba(124, 58, 237, 0.9);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          color: white;
          box-shadow: 0 0 24px var(--accent-intelligence-glow);
          transition: transform 0.2s ease, background 0.2s ease;
        }
        .video-thumb:hover .play-btn {
          transform: scale(1.1);
          background: var(--accent-intelligence);
        }
        .project-card-body {
          padding: var(--space-lg);
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
          flex: 1;
        }
        .project-card-title {
          font-family: var(--font-display);
          font-size: 17px;
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: -0.01em;
        }
      `}</style>
    </div>
  );
}

function ModuleCard({
  tag, title, status, statusType, desc, delay,
}: {
  tag: string; title: string; status: string; statusType: string; desc: string; delay: number;
}) {
  return (
    <div className="module-card card" data-reveal data-reveal-delay={String(delay)}>
      <div className="module-top">
        <span className="t-label">{tag}</span>
        <span className={`badge badge-${statusType}`}>
          <span className="badge-dot" />
          {status}
        </span>
      </div>
      <div className="module-title">{title}</div>
      <p className="t-body-sm">{desc}</p>

      <style jsx>{`
        .module-card {
          padding: var(--space-xl);
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
        }
        .module-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .module-title {
          font-family: var(--font-display);
          font-size: 20px;
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: -0.015em;
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
      `}</style>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <div className="projects-header" data-reveal>
          <span className="t-label" style={{ color: "var(--accent-authority-muted)" }}>
            Projects
          </span>
          <h2 className="t-display-md" style={{ marginTop: "var(--space-md)", color: "var(--text-primary)" }}>
            Original music and the intelligence{" "}
            <span className="gradient-text">infrastructure</span> behind it.
          </h2>
          <p className="t-body" style={{ marginTop: "var(--space-md)" }}>
            Both in motion.
          </p>
        </div>

        <div className="block-header" data-reveal data-reveal-delay="50">
          <span className="block-label">Original Music</span>
        </div>
        <div className="projects-grid">
          {musicProjects.map((p, i) => (
            <VideoCard key={p.id} {...p} delay={i * 80} />
          ))}
        </div>

        <div className="block-header" data-reveal data-reveal-delay="50">
          <span className="block-label">The Intelligence System</span>
        </div>
        <div className="modules-grid">
          {systemModules.map((m, i) => (
            <ModuleCard key={m.tag} {...m} delay={i * 80} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .projects-section {
          background: var(--bg-secondary);
        }
        .projects-header {
          margin-bottom: var(--space-3xl);
        }
        .block-header {
          margin-bottom: var(--space-xl);
          padding-bottom: var(--space-md);
          border-bottom: 1px solid var(--border-muted);
        }
        .block-label {
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-secondary);
        }
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-lg);
          margin-bottom: var(--space-3xl);
        }
        .modules-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-lg);
        }
        @media (max-width: 900px) {
          .projects-grid, .modules-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .projects-grid, .modules-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}

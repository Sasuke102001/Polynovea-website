"use client";

import { useState } from "react";
import Link from "next/link";

interface MusicProject {
  id: string;
  title: string;
  desc: string;
  type: string;
  cta: string;
  href: string;
}

interface SystemModule {
  tag: string;
  title: string;
  status: string;
  statusType: "active" | "progress" | "planned";
  desc: string;
}

interface VideoCardProps {
  project: MusicProject;
  delay: number;
}

interface ModuleCardProps {
  module: SystemModule;
  delay: number;
}

const musicProjects: MusicProject[] = [
  {
    id: "I8ZQCN9EslU",
    title: "Lately",
    desc: "Our debut release. The first piece of original IP from Polynovea.",
    type: "Release",
    cta: "Watch on YouTube",
    href: "https://youtu.be/I8ZQCN9EslU",
  },
  {
    id: "VqiJCgQTJ0g",
    title: "Lately - Remake",
    desc: "A reimagined version. Same foundation, different resolution.",
    type: "Remake",
    cta: "Watch on YouTube",
    href: "https://youtu.be/VqiJCgQTJ0g",
  },
  {
    id: "IIvCau8-tBw",
    title: "Sangharsh",
    desc: "Our upcoming album. A body of work in active production - releasing progressively.",
    type: "Album (Upcoming)",
    cta: "Watch Teaser",
    href: "https://youtu.be/IIvCau8-tBw",
  },
];

const systemModules: SystemModule[] = [
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
    desc: "Two-part system. Part 1 instruments the live environment - POS, venue data, audience behaviour. Part 2 converts that intelligence into measurable revenue optimisation for venues.",
  },
];

function VideoCard({ project, delay }: VideoCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <article className="video-card card" data-reveal="true" data-reveal-delay={String(delay)}>
      <div className="video-shell">
        {!isLoaded ? (
          <button
            type="button"
            className="video-thumb"
            onClick={() => setIsLoaded(true)}
            aria-label={`Play ${project.title}`}
          >
            <img
              src={`https://img.youtube.com/vi/${project.id}/hqdefault.jpg`}
              alt={project.title}
              loading="lazy"
            />
            <span className="play-button" aria-hidden="true">
              <span className="play-triangle" />
            </span>
          </button>
        ) : (
          <iframe
            src={`https://www.youtube.com/embed/${project.id}?autoplay=1`}
            title={project.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>

      <div className="video-body">
        <span className="type-badge">{project.type}</span>
        <h3>{project.title}</h3>
        <p>{project.desc}</p>
        <a href={project.href} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
          {project.cta}
        </a>
      </div>
    </article>
  );
}

function ModuleCard({ module, delay }: ModuleCardProps) {
  return (
    <article className="module-card card" data-reveal="true" data-reveal-delay={String(delay)}>
      <div className="module-top">
        <span className="module-tag">{module.tag}</span>
        <span className={`status-badge badge-${module.statusType}`}>
          <span className="status-dot" aria-hidden="true" />
          {module.status}
        </span>
      </div>
      <h3>{module.title}</h3>
      <p>{module.desc}</p>

      <style jsx>{`
        .module-card {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
          padding: var(--space-xl);
        }

        .module-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--space-md);
        }

        .module-tag {
          color: var(--accent-authority-muted);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          flex-shrink: 0;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: var(--space-xs);
          padding: var(--space-xs) var(--space-sm);
          border-radius: var(--radius-pill);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          flex-shrink: 0;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 999px;
          flex-shrink: 0;
        }

        .badge-active {
          background: rgba(34, 197, 94, 0.12);
          color: #4ade80;
        }

        .badge-active .status-dot {
          background: #4ade80;
        }

        .badge-progress {
          background: rgba(124, 58, 237, 0.15);
          color: #a78bfa;
        }

        .badge-progress .status-dot {
          background: #a78bfa;
        }

        .badge-planned {
          background: rgba(230, 211, 163, 0.1);
          color: var(--accent-authority);
        }

        .badge-planned .status-dot {
          background: var(--accent-authority);
        }

        h3 {
          margin: 0;
          color: var(--text-primary);
          font-family: var(--font-display);
          font-size: 22px;
          line-height: 1.15;
        }

        p {
          margin: 0;
          color: var(--text-secondary);
          font-size: 14px;
          line-height: 1.65;
        }
      `}</style>
    </article>
  );
}

export default function ProjectsExpanded() {
  return (
    <section className="section projects-expanded">
      <div className="container">
        <div className="hero-section" data-reveal="true">
          <div className="hero-copy">
            <span className="hero-label">Projects</span>
            <h1>
              Original music and the intelligence <span className="gradient-text">infrastructure</span> behind it.
            </h1>
            <p>Both in motion. Everything you see is live data feeding back into the system.</p>
          </div>
          <div className="hero-actions">
            <Link href="/" className="btn btn-secondary">
              Back to Home
            </Link>
          </div>
        </div>

        <div className="content-section">
          <div className="block-header" data-reveal="true" data-reveal-delay="40">
            <span className="block-label">Original Music</span>
          </div>

          <div className="cards-grid video-grid">
            {musicProjects.map((project, index) => (
              <VideoCard key={project.id} project={project} delay={index * 80} />
            ))}
          </div>
        </div>

        <div className="content-section">
          <div className="block-header" data-reveal="true" data-reveal-delay="40">
            <span className="block-label">The Intelligence System</span>
          </div>

          <div className="cards-grid module-grid">
            {systemModules.map((module, index) => (
              <ModuleCard key={module.tag} module={module} delay={index * 80} />
            ))}
          </div>
        </div>

        <div className="content-section">
          <div className="block-header" data-reveal="true" data-reveal-delay="40">
            <span className="block-label">Sangharsh Album</span>
          </div>

          <div className="placeholder-copy" data-reveal="true" data-reveal-delay="80">
            Coming soon. Full tracklist and release details will be published here.
          </div>
        </div>
      </div>

      <style jsx>{`
        .projects-expanded {
          --status-active-bg: rgba(34, 197, 94, 0.12);
          --status-active-color: #4ade80;
          --status-progress-bg: rgba(124, 58, 237, 0.15);
          --status-progress-color: #a78bfa;
          --status-planned-bg: rgba(230, 211, 163, 0.1);
        }

        .hero-section {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: var(--space-2xl);
          align-items: end;
          margin-bottom: var(--space-4xl);
        }

        .hero-label {
          display: inline-block;
          color: var(--accent-authority-muted);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .hero-copy h1 {
          margin: var(--space-md) 0 0;
          color: var(--text-primary);
          font-family: var(--font-display);
          font-size: clamp(34px, 5vw, 64px);
          line-height: 1.04;
        }

        .hero-copy p {
          margin: var(--space-md) 0 0;
          color: var(--text-secondary);
          font-size: 16px;
          line-height: 1.6;
          max-width: 44rem;
        }

        .hero-actions {
          display: flex;
          justify-content: flex-end;
          align-items: flex-start;
        }

        .content-section {
          margin-top: var(--space-4xl);
        }

        .block-header {
          margin-bottom: var(--space-xl);
          padding-bottom: var(--space-md);
          border-bottom: 1px solid var(--border-muted);
        }

        .block-label {
          color: var(--text-secondary);
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .cards-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: var(--space-lg);
        }

        .video-card,
        .module-card {
          overflow: hidden;
        }

        .video-shell {
          position: relative;
          aspect-ratio: 16 / 9;
          border-bottom: 1px solid var(--border-muted);
          background: var(--bg-card);
        }

        .video-shell iframe,
        .video-thumb {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: 0;
        }

        .video-thumb {
          padding: 0;
          cursor: pointer;
          background: var(--bg-card);
        }

        .video-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .play-button {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 64px;
          height: 64px;
          margin-left: -32px;
          margin-top: -32px;
          border-radius: 999px;
          background: var(--accent-intelligence);
          box-shadow: 0 0 24px var(--accent-intelligence-glow);
          transition: transform var(--duration-default) ease;
        }

        .play-triangle {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          margin-left: -5px;
          margin-top: -8px;
          border-top: 8px solid transparent;
          border-bottom: 8px solid transparent;
          border-left: 14px solid var(--text-primary);
        }

        .video-thumb:hover .play-button {
          transform: scale(1.08);
        }

        .video-body {
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
          padding: var(--space-lg);
        }

        .type-badge {
          display: inline-flex;
          width: fit-content;
          padding: var(--space-xs) var(--space-sm);
          border: 1px solid var(--border-muted);
          border-radius: var(--radius-pill);
          color: var(--accent-authority);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .video-body h3,
        .module-card h3 {
          margin: 0;
          color: var(--text-primary);
          font-family: var(--font-display);
          font-size: 22px;
          line-height: 1.15;
        }

        .video-body p,
        .module-card p,
        .placeholder-copy {
          margin: 0;
          color: var(--text-secondary);
          font-size: 14px;
          line-height: 1.65;
        }

        .module-card {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
          padding: var(--space-xl);
        }

        .module-card .module-top {
          display: flex !important;
          align-items: center;
          justify-content: space-between;
          gap: var(--space-md);
        }

        .module-tag {
          color: var(--accent-authority-muted);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: var(--space-xs);
          padding: var(--space-xs) var(--space-sm);
          border-radius: var(--radius-pill);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 999px;
          flex-shrink: 0;
        }

        .badge-active {
          background: var(--status-active-bg);
          color: var(--status-active-color);
        }

        .badge-active .status-dot {
          background: var(--status-active-color);
        }

        .badge-progress {
          background: var(--status-progress-bg);
          color: var(--status-progress-color);
        }

        .badge-progress .status-dot {
          background: var(--status-progress-color);
        }

        .badge-planned {
          background: var(--status-planned-bg);
          color: var(--accent-authority);
        }

        .badge-planned .status-dot {
          background: var(--accent-authority);
        }

        .placeholder-copy {
          max-width: 42rem;
        }

        @media (max-width: 900px) {
          .hero-section {
            grid-template-columns: 1fr;
            align-items: start;
          }

          .hero-actions {
            justify-content: flex-start;
          }

          .cards-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 600px) {
          .hero-section {
            gap: var(--space-lg);
            margin-bottom: var(--space-3xl);
          }

          .content-section {
            margin-top: var(--space-3xl);
          }

          .cards-grid {
            grid-template-columns: 1fr;
          }

          .video-body,
          .module-card {
            padding: var(--space-md);
          }

          .video-body h3,
          .module-card h3 {
            font-size: 20px;
          }

          .module-top {
            align-items: flex-start;
            flex-direction: column;
          }
        }
      `}</style>
    </section>
  );
}

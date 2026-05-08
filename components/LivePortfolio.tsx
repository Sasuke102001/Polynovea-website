"use client";

import { useState } from "react";

const shows = [
  { id: "0JWm9PPioak", title: "Private Event", venue: "Karjat", date: "2024" },
  { id: "dONI7XKqcVc", title: "Live at Spice9", venue: "Navi Mumbai", date: "2024" },
  { id: "TNQYpcjI-rw", title: "Live at Four Points", venue: "Navi Mumbai", date: "2024" },
  { id: "eie7IysJzzA", title: "Live at Dorangos Cafe", venue: "Mumbai", date: "2024" },
];

function ShowCard({ id, title, venue, date, delay }: {
  id: string; title: string; venue: string; date: string; delay: number;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="show-card card" data-reveal data-reveal-delay={String(delay)}>
      <div className="show-video">
        {!loaded ? (
          <button className="video-thumb" onClick={() => setLoaded(true)} aria-label={`Play ${title}`}>
            <img src={`https://img.youtube.com/vi/${id}/mqdefault.jpg`} alt={title} loading="lazy" />
            <div className="play-btn">▶</div>
          </button>
        ) : (
          <iframe
            src={`https://www.youtube.com/embed/${id}?autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
      <div className="show-info">
        <div className="show-title">{title}</div>
        <div className="show-meta">
          <span>{venue}</span>
          <span className="dot">·</span>
          <span>{date}</span>
        </div>
      </div>

      <style jsx>{`
        .show-card { overflow: hidden; }
        .show-video {
          position: relative;
          padding-top: 56.25%;
          overflow: hidden;
          border-bottom: 1px solid var(--border-muted);
          background: var(--bg-card);
        }
        .show-video iframe,
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
        .video-thumb img { width: 100%; height: 100%; object-fit: cover; }
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
          transition: transform 0.2s ease;
        }
        .video-thumb:hover .play-btn { transform: scale(1.1); }
        .show-info { padding: var(--space-md) var(--space-lg); }
        .show-title {
          font-family: var(--font-display);
          font-size: 16px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: var(--space-xs);
        }
        .show-meta {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          font-size: 13px;
          color: var(--text-disabled);
        }
        .dot { opacity: 0.5; }
      `}</style>
    </div>
  );
}

export default function LivePortfolio() {
  return (
    <section id="live-portfolio" className="section live-section">
      <div className="container">
        <div className="live-header" data-reveal>
          <div>
            <span className="t-label" style={{ color: "var(--accent-authority-muted)" }}>
              Live Portfolio
            </span>
            <h2 className="t-display-md" style={{ marginTop: "var(--space-md)", color: "var(--text-primary)" }}>
              Every show is a{" "}
              <span className="gradient-text">data point.</span>
            </h2>
            <p className="t-body" style={{ marginTop: "var(--space-md)" }}>
              Live performances captured and measured — each one feeding the
              intelligence system that makes the next one sharper.
            </p>
          </div>
          <a
            href="https://www.youtube.com/@PolynoveaRecords"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary live-cta"
          >
            Watch All Shows
          </a>
        </div>

        <div className="shows-grid">
          {shows.map((show, i) => (
            <ShowCard key={show.id} {...show} delay={i * 80} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .live-section { background: var(--bg-primary); }
        .live-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: var(--space-xl);
          margin-bottom: var(--space-3xl);
        }
        .live-cta { flex-shrink: 0; }
        .shows-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-lg);
        }
        @media (max-width: 768px) {
          .live-header { flex-direction: column; align-items: flex-start; }
          .shows-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}

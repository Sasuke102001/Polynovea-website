"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">Polynovea</div>
            <p className="footer-tagline">
              Behavioral intelligence infrastructure
              <br />
              for the music industry.
            </p>
          </div>

          <div className="footer-links">
            <div className="footer-col">
              <div className="footer-col-label">Navigate</div>
              <ul>
                {[
                  ["#home", "Home"],
                  ["#architecture", "The Architecture"],
                  ["#projects", "Projects"],
                  ["#live-portfolio", "Live Portfolio"],
                  ["#contact", "Contact"],
                ].map(([href, label]) => (
                  <li key={href}>
                    <a href={href}>{label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-col">
              <div className="footer-col-label">Connect</div>
              <ul>
                {[
                  ["https://www.youtube.com/@PolynoveaRecords", "YouTube"],
                  ["https://www.instagram.com/polynovearecords/", "Instagram — Records"],
                  ["https://www.instagram.com/polynovea.in/", "Instagram — Business"],
                  ["https://x.com/PolynoveaRec", "X (Twitter)"],
                  ["#contact", "Contact Us"],
                ].map(([href, label]) => (
                  <li key={label}>
                    <a
                      href={href}
                      {...(href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-copy">
            © {year} Polynovea. All rights reserved.
          </span>
          <span className="footer-note">
            Not Creative. Not Consulting. Something Else.
          </span>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: var(--bg-secondary);
          border-top: 1px solid var(--border-muted);
          padding-block: var(--space-3xl) var(--space-xl);
        }

        .footer-top {
          display: flex;
          justify-content: space-between;
          gap: var(--space-3xl);
          margin-bottom: var(--space-3xl);
          padding-bottom: var(--space-3xl);
          border-bottom: 1px solid var(--border-muted);
        }

        .footer-logo {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: -0.02em;
          margin-bottom: var(--space-md);
        }

        .footer-tagline {
          font-size: 14px;
          line-height: 1.6;
          color: var(--text-disabled);
        }

        .footer-links {
          display: flex;
          gap: var(--space-3xl);
        }

        .footer-col {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
        }

        .footer-col-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-disabled);
          margin-bottom: var(--space-xs);
        }

        .footer-col ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
        }

        .footer-col a {
          font-size: 14px;
          color: var(--text-secondary);
          transition: color var(--duration-fast) ease;
        }

        .footer-col a:hover {
          color: var(--text-primary);
        }

        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--space-md);
          flex-wrap: wrap;
        }

        .footer-copy {
          font-size: 13px;
          color: var(--text-disabled);
        }

        .footer-note {
          font-size: 13px;
          color: var(--text-disabled);
          font-style: italic;
        }

        @media (max-width: 768px) {
          .footer-top {
            flex-direction: column;
            gap: var(--space-2xl);
          }

          .footer-bottom {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--space-sm);
          }
        }
      `}</style>
    </footer>
  );
}

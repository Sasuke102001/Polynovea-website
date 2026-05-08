"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const homeLinks = [
  { href: "/", label: "Home" },
  { href: "/architecture", label: "The Architecture" },
  { href: "/projects", label: "Projects" },
  { href: "/live-portfolio", label: "Live Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    setMenuOpen(false);
    if (href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav ref={navRef} className={`navbar${scrolled ? " scrolled" : ""}`}>
        <div className="nav-inner">
          <Link href="/" className="nav-logo">
            Polynovea
          </Link>

          <ul className="nav-links">
            {homeLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="nav-link"
                  onClick={(e) => handleAnchorClick(e, l.href)}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/#contact"
            className="btn btn-primary nav-cta"
            onClick={(e) => handleAnchorClick(e, "/#contact")}
          >
            Contact Us
          </Link>

          <button
            className={`hamburger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        <ul>
          {homeLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={(e) => handleAnchorClick(e, l.href)}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/#contact"
              className="btn btn-primary"
              onClick={(e) => handleAnchorClick(e, "/#contact")}
            >
              Contact Us
            </Link>
          </li>
        </ul>
      </div>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          height: var(--nav-height);
          transition: background var(--duration-default) var(--ease-state),
            border-color var(--duration-default) var(--ease-state);
          border-bottom: 1px solid transparent;
        }

        .navbar.scrolled {
          background: rgba(10, 10, 10, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom-color: var(--border-muted);
        }

        .nav-inner {
          max-width: var(--max-width);
          margin-inline: auto;
          padding-inline: var(--space-xl);
          height: 100%;
          display: flex;
          align-items: center;
          gap: var(--space-xl);
        }

        .nav-logo {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: -0.02em;
          margin-right: auto;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: var(--space-lg);
          list-style: none;
        }

        .nav-link {
          font-size: 14px;
          color: var(--text-secondary);
          transition: color var(--duration-fast) var(--ease-state);
        }

        .nav-link:hover {
          color: var(--text-primary);
        }

        .nav-cta {
          font-size: 13px;
          padding: 9px 20px;
        }

        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
        }

        .hamburger span {
          display: block;
          width: 22px;
          height: 2px;
          background: var(--text-primary);
          border-radius: 2px;
          transition: all var(--duration-default) var(--ease-state);
        }

        .hamburger.open span:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }

        .hamburger.open span:nth-child(2) {
          opacity: 0;
        }

        .hamburger.open span:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }

        .mobile-menu {
          display: none;
          position: fixed;
          inset: 0;
          z-index: 99;
          background: var(--bg-primary);
          padding: calc(var(--nav-height) + var(--space-xl)) var(--space-xl)
            var(--space-xl);
          flex-direction: column;
        }

        .mobile-menu.open {
          display: flex;
        }

        .mobile-menu ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: var(--space-lg);
        }

        .mobile-menu a {
          font-family: var(--font-display);
          font-size: 28px;
          font-weight: 500;
          color: var(--text-primary);
          letter-spacing: -0.02em;
        }

        @media (max-width: 768px) {
          .nav-links,
          .nav-cta {
            display: none;
          }

          .hamburger {
            display: flex;
          }
        }
      `}</style>
    </>
  );
}

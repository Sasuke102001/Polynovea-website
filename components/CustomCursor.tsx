"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Only on non-touch devices
    if (window.matchMedia("(hover: none)").matches) return;

    document.body.style.cursor = "none";

    const onMove = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
    };

    const animate = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    const onEnterLink = () => {
      dotRef.current?.classList.add("expanded");
      ringRef.current?.classList.add("expanded");
    };

    const onLeaveLink = () => {
      dotRef.current?.classList.remove("expanded");
      ringRef.current?.classList.remove("expanded");
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    document.querySelectorAll("a, button, [role='button']").forEach((el) => {
      el.addEventListener("mouseenter", onEnterLink);
      el.addEventListener("mouseleave", onLeaveLink);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
      document.body.style.cursor = "";
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />

      <style jsx global>{`
        .cursor-dot {
          position: fixed;
          top: 0;
          left: 0;
          width: 8px;
          height: 8px;
          background: var(--accent-intelligence);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          box-shadow: 0 0 10px var(--accent-intelligence-glow),
                      0 0 20px var(--accent-intelligence-glow);
          will-change: transform;
          transition: width 0.2s ease, height 0.2s ease, background 0.2s ease;
        }

        .cursor-dot.expanded {
          width: 12px;
          height: 12px;
          background: var(--accent-authority);
          box-shadow: 0 0 14px rgba(230, 211, 163, 0.5);
        }

        .cursor-ring {
          position: fixed;
          top: 0;
          left: 0;
          width: 40px;
          height: 40px;
          border: 1px solid rgba(124, 58, 237, 0.5);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9998;
          will-change: transform;
          transition: width 0.2s ease, height 0.2s ease, border-color 0.2s ease,
                      opacity 0.2s ease;
        }

        .cursor-ring.expanded {
          width: 56px;
          height: 56px;
          border-color: rgba(230, 211, 163, 0.4);
        }

        @media (hover: none) {
          .cursor-dot,
          .cursor-ring {
            display: none;
          }
        }
      `}</style>
    </>
  );
}

"use client";

import { useEffect } from "react";

export default function TiltEffect() {
  useEffect(() => {
    const cards = Array.from(document.querySelectorAll(".card")) as HTMLElement[];
    const cleanups: (() => void)[] = [];

    cards.forEach((el) => {
      el.style.willChange = "transform";

      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.style.transition = "transform 0.1s ease-out";
        el.style.transform = `perspective(1000px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) translateZ(6px)`;
      };

      const onLeave = () => {
        el.style.transition = "transform 0.5s cubic-bezier(0.16,1,0.3,1)";
        el.style.transform = "";
      };

      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}

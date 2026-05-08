"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      // Batch fade-up reveals
      ScrollTrigger.batch("[data-reveal]", {
        onEnter: (els) => {
          els.forEach((el) => {
            const delay = Number((el as HTMLElement).dataset.revealDelay ?? 0) / 1000;
            gsap.to(el, { opacity: 1, y: 0, duration: 0.7, delay, ease: "power2.out", overwrite: true });
          });
        },
        start: "top 88%",
        once: true,
      });

      // Clip-path wipe for all display headings inside sections
      document.querySelectorAll(".section .t-display-md, .section .t-display-lg, .section .t-display-xl").forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(0 102% 0 0)", opacity: 1 },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 1.0,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }
        );
      });
    };

    init();
    return () => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) =>
        ScrollTrigger.getAll().forEach((t) => t.kill())
      );
    };
  }, [pathname]);

  return null;
}

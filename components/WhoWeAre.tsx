"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function WhoWeAre() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.who-heading').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 85%' } });
      });

      gsap.utils.toArray<HTMLElement>('.who-card').forEach((el, i) => {
        gsap.fromTo(el, { opacity: 0, x: i % 2 === 0 ? -30 : 30 }, { opacity: 1, x: 0, duration: 0.8, delay: i * 0.1, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 85%' } });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="who-we-are-section">
      <div className="container">
        <div className="section-header">
          <h2 className="who-heading">Who We Are</h2>
          <p className="who-subtitle">Our founding thesis on behavioral intelligence and measurable systems</p>
        </div>

        <div className="who-grid">
          <div className="who-card">
            <div className="card-label">01</div>
            <h3>The Real Problem</h3>
            <p>Important decisions across industries are made blindly inside systems that should be measurable. Weak measurement creates weak decisions, wasted resources, and repeated mistakes.</p>
          </div>

          <div className="who-card">
            <div className="card-label">02</div>
            <h3>The Insight</h3>
            <p>Behavior is not random. Human systems contain patterns, incentives, triggers, and repeatable structures. Most organizations never build infrastructure to capture and optimize them.</p>
          </div>

          <div className="who-card">
            <div className="card-label">03</div>
            <h3>Our Approach</h3>
            <p>Observe → Measure → Identify Patterns → Design Intervention → Execute → Measure Again → Scale. Skip one step and you return to guessing.</p>
          </div>

          <div className="who-card">
            <div className="card-label">04</div>
            <h3>The Goal</h3>
            <p>Build behavioral intelligence infrastructure capable of improving execution quality, pattern recognition, and decision-making across layered ecosystems.</p>
          </div>
        </div>

        <div className="who-cta">
          <a href="/about" className="btn btn-secondary">
            Learn More About Us
          </a>
        </div>
      </div>

      <style jsx>{`
        .who-we-are-section {
          background: var(--bg-primary);
          padding: 120px 0;
          border-bottom: 1px solid var(--border-muted);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 40px;
        }

        .section-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .who-heading {
          font-size: 48px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 15px;
        }

        .who-subtitle {
          font-size: 18px;
          color: var(--text-secondary);
          font-weight: 300;
        }

        .who-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 30px;
          margin-bottom: 60px;
        }

        .who-card {
          background: var(--bg-card);
          border: 1px solid var(--border-muted);
          border-radius: 12px;
          padding: 40px;
          backdrop-filter: blur(20px);
          transition: all 0.3s ease;
        }

        .who-card:hover {
          border-color: var(--accent-intelligence);
          box-shadow: 0 8px 32px rgba(124, 58, 237, 0.1);
        }

        .card-label {
          font-size: 48px;
          font-weight: 700;
          color: var(--accent-authority);
          opacity: 0.3;
          margin-bottom: 20px;
        }

        .who-card h3 {
          font-size: 24px;
          color: var(--text-primary);
          margin-bottom: 15px;
        }

        .who-card p {
          color: var(--text-secondary);
          line-height: 1.6;
          font-size: 15px;
        }

        .who-cta {
          display: flex;
          justify-content: center;
        }

        @media (max-width: 768px) {
          .who-heading {
            font-size: 36px;
          }

          .who-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}

"use client";

import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const AboutScene = dynamic(() => import('@/components/AboutScene'), { ssr: false });

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.hero-heading').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 85%' } });
      });

      gsap.utils.toArray<HTMLElement>('.thesis-card').forEach((el, i) => {
        gsap.fromTo(el, { opacity: 0, x: i % 2 === 0 ? -30 : 30 }, { opacity: 1, x: 0, duration: 0.8, delay: i * 0.1, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 85%' } });
      });

      gsap.utils.toArray<HTMLElement>('.milestone').forEach((el, i) => {
        gsap.fromTo(el, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.6, delay: i * 0.15, ease: 'back.out', scrollTrigger: { trigger: el, start: 'top 80%' } });
      });

      gsap.utils.toArray<HTMLElement>('.phil-item').forEach((el, i) => {
        gsap.fromTo(el, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, delay: i * 0.08, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 85%' } });
      });

      gsap.utils.toArray<HTMLElement>('.why-block').forEach((el, i) => {
        gsap.fromTo(el, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.7, delay: i * 0.12, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 85%' } });
      });

      gsap.utils.toArray<HTMLElement>('.records-item').forEach((el, i) => {
        gsap.fromTo(el, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, delay: i * 0.1, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 85%' } });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="about-section">
      {/* HERO WITH 3D BACKGROUND */}
      <div className="hero-container">
        <AboutScene />
        <div className="hero-content">
          <h1 className="hero-heading">Measurement Changes Everything</h1>
          <p className="hero-subheading">Most systems operate blind. We built the intelligence layer.</p>
        </div>
      </div>

      {/* FOUNDER THESIS */}
      <div className="container">
        <div className="thesis-section">
          <div className="thesis-card">
            <div className="card-number">01</div>
            <h3>The Real Problem</h3>
            <p>Important decisions across industries are made blindly inside systems that should be measurable. Weak measurement creates weak decisions, wasted resources, and repeated mistakes.</p>
          </div>

          <div className="thesis-card">
            <div className="card-number">02</div>
            <h3>The Insight</h3>
            <p>Behavior is not random. Human systems contain patterns, incentives, triggers, and repeatable structures. Most organizations never build infrastructure to capture and optimize them.</p>
          </div>

          <div className="thesis-card">
            <div className="card-number">03</div>
            <h3>The Approach</h3>
            <p>Observe → Measure → Identify Patterns → Design Intervention → Execute → Measure Again → Scale. Skip one step and you return to guessing.</p>
          </div>

          <div className="thesis-card">
            <div className="card-number">04</div>
            <h3>The Goal</h3>
            <p>Build behavioral intelligence infrastructure capable of improving execution quality, pattern recognition, and decision-making across layered ecosystems.</p>
          </div>
        </div>

        {/* THE ECOSYSTEM */}
        <div className="ecosystem-section">
          <h2 className="section-title">The Ecosystem Architecture</h2>
          <p className="section-subtitle">Four compounding milestones building toward full-stack control</p>

          <div className="milestones-grid">
            <div className="milestone">
              <div className="milestone-header">
                <span className="milestone-number">1</span>
                <h3>Intelligence Infrastructure</h3>
              </div>
              <p>Behavioral intelligence layer. Data infrastructure. Operational systems. Decision frameworks. This is the foundation.</p>
              <ul>
                <li>Module 1: Decision Framework</li>
                <li>Module 2: Acquisition System</li>
                <li>Module 3: Optimization System</li>
              </ul>
            </div>

            <div className="milestone">
              <div className="milestone-header">
                <span className="milestone-number">2</span>
                <h3>IP & Records Layer</h3>
              </div>
              <p>Cultural execution surface. Artist development. Owned IP creation. Music-facing identity. The public expression of intelligence.</p>
              <ul>
                <li>Artist discovery</li>
                <li>IP creation</li>
                <li>Audience ownership</li>
              </ul>
            </div>

            <div className="milestone">
              <div className="milestone-header">
                <span className="milestone-number">3</span>
                <h3>External Services</h3>
              </div>
              <p>Commercialize infrastructure externally. Artist services. Optimization systems. Production support. Behavioral frameworks.</p>
              <ul>
                <li>Artist infrastructure</li>
                <li>Service monetization</li>
                <li>External leverage</li>
              </ul>
            </div>

            <div className="milestone">
              <div className="milestone-header">
                <span className="milestone-number">4</span>
                <h3>Distribution & Ownership</h3>
              </div>
              <p>Complete the stack. Distribution control. Rights management. Broadcasting leverage. Long-term ecosystem sovereignty.</p>
              <ul>
                <li>Distribution infrastructure</li>
                <li>Rights control</li>
                <li>Monetization sovereignty</li>
              </ul>
            </div>
          </div>
        </div>

        {/* WHY WE EXIST */}
        <div className="why-exists-section">
          <h2 className="section-title">Why We Exist</h2>
          <div className="why-exists-content">
            <div className="why-block">
              <h3>The Pattern We Noticed</h3>
              <p>Important decisions across industries are made blindly inside systems that should be measurable. The problem isn't weak activity — it's weak measurement. Weak measurement creates weak decisions, wasted resources, and repeated mistakes.</p>
            </div>
            <div className="why-block">
              <h3>The Core Insight</h3>
              <p>Behavior is not random. Human systems contain patterns, incentives, triggers, environmental responses, and repeatable structures. Most organizations never build the infrastructure required to capture, structure, interpret, and operationalize those patterns. This exposes blindness where clarity should exist.</p>
            </div>
            <div className="why-block">
              <h3>Why Music & Live Environments</h3>
              <p>Live environments became our proving ground because behavioral response becomes visible quickly, emotional shifts become observable, environmental changes create measurable effects, and feedback loops happen in real time. This allows us to observe, test, measure, compare, iterate, and identify repeatable patterns faster than in most traditional industries.</p>
            </div>
            <div className="why-block">
              <h3>The Long-Term Purpose</h3>
              <p>The ecosystem exists to build behavioral intelligence and operational decision systems capable of improving execution quality, pattern recognition, and strategic decision-making across layered ecosystems. The music layer matters. The IP layer matters. But underneath all of them is the same foundational pursuit: understanding behavior well enough to build systems that become more intelligent over time.</p>
            </div>
          </div>
        </div>

        {/* CORE PHILOSOPHY */}
        <div className="philosophy-section">
          <h2 className="section-title">Core Philosophy</h2>
          <div className="philosophy-grid">
            <div className="phil-item">
              <h4>Measurement First</h4>
              <p>If behavior cannot be measured, it cannot be reliably optimized. This applies to everything from audience response to venue behavior to retention and engagement.</p>
            </div>
            <div className="phil-item">
              <h4>Systems Over Intuition</h4>
              <p>Creativity becomes more powerful when patterns are visible, feedback loops are active, variables are isolated, and outcomes are measurable. We don't reject creativity — we reject unmeasured execution.</p>
            </div>
            <div className="phil-item">
              <h4>Baseline Before Intervention</h4>
              <p>No optimization occurs before observing reality. Understanding the current state is the prerequisite for any meaningful change. Intervention without baseline is guessing.</p>
            </div>
            <div className="phil-item">
              <h4>Pattern Before Scaling</h4>
              <p>One good result is not a pattern. Repeatable data precedes growth. We scale what works repeatedly, not what works once.</p>
            </div>
            <div className="phil-item">
              <h4>Responsible Intelligence</h4>
              <p>Understand behavior responsibly. Reduce friction intelligently. Improve experiences intentionally. Create alignment between audience, artist, and business. The goal is better systems and clearer decisions, not exploitation.</p>
            </div>
            <div className="phil-item">
              <h4>Infrastructure Over Personality</h4>
              <p>Build systems that scale without founder dependency. Operational intelligence should be repeatable, documented, and transferable. Long-term value comes from infrastructure, not individual intuition.</p>
            </div>
          </div>
        </div>

        {/* WHAT POLYNOVEA RECORDS IS */}
        <div className="records-section">
          <h2 className="section-title">What Polynovea Records Is</h2>
          <div className="records-grid">
            <div className="records-item">
              <h3>The IP & Cultural Layer</h3>
              <p>Polynovea Records is the cultural and IP expression layer of the ecosystem. It converts live discovery, audience intelligence, and behavioral understanding into artist development, owned IP, and audience assets.</p>
            </div>
            <div className="records-item">
              <h3>Not the Parent Ecosystem</h3>
              <p>The parent ecosystem is the behavioral intelligence infrastructure itself — AI, data, decision systems, and operational optimization. Records is one major commercial expression of that infrastructure.</p>
            </div>
            <div className="records-item">
              <h3>The Music-Facing Identity</h3>
              <p>Records embodies the artist development layer, the audience ownership strategy, and the long-term cultural asset approach. It's where intelligence becomes music.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="about-cta">
          <a href="/architecture" className="btn btn-primary">
            Explore Architecture
          </a>
        </div>
      </div>

      <style jsx>{`
        .about-section {
          background: var(--bg-primary);
          min-height: 100vh;
        }

        .hero-container {
          position: relative;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border-bottom: 1px solid var(--border-muted);
        }

        .hero-content {
          position: relative;
          z-index: 10;
          text-align: center;
          max-width: 900px;
          padding: 0 40px;
        }

        .hero-heading {
          font-size: 64px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 20px;
          line-height: 1.1;
        }

        .hero-subheading {
          font-size: 20px;
          color: var(--text-secondary);
          font-weight: 300;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 40px;
        }

        /* THESIS */
        .thesis-section {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 30px;
          margin: 120px 0;
        }

        .thesis-card {
          background: var(--bg-card);
          border: 1px solid var(--border-muted);
          border-radius: 12px;
          padding: 40px;
          backdrop-filter: blur(20px);
          transition: all 0.3s ease;
        }

        .thesis-card:hover {
          border-color: var(--accent-intelligence);
          box-shadow: 0 8px 32px rgba(124, 58, 237, 0.1);
        }

        .card-number {
          font-size: 48px;
          font-weight: 700;
          color: var(--accent-authority);
          opacity: 0.3;
          margin-bottom: 20px;
        }

        .thesis-card h3 {
          font-size: 24px;
          color: var(--text-primary);
          margin-bottom: 15px;
        }

        .thesis-card p {
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* ECOSYSTEM */
        .ecosystem-section {
          margin: 140px 0;
        }

        .section-title {
          font-size: 48px;
          font-weight: 700;
          color: var(--text-primary);
          text-align: center;
          margin-bottom: 15px;
        }

        .section-subtitle {
          text-align: center;
          color: var(--text-secondary);
          font-size: 18px;
          margin-bottom: 60px;
        }

        .milestones-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 30px;
          margin-bottom: 60px;
        }

        .milestone {
          background: linear-gradient(135deg, rgba(10,10,10,0.8), rgba(124,58,237,0.05));
          border: 1px solid var(--border-muted);
          border-radius: 12px;
          padding: 40px;
          backdrop-filter: blur(20px);
        }

        .milestone-number {
          font-size: 56px;
          font-weight: 700;
          color: var(--accent-authority);
          opacity: 0.4;
          display: block;
          line-height: 1;
        }

        .milestone-header {
          margin-bottom: 25px;
        }

        .milestone-header h3 {
          font-size: 24px;
          color: var(--text-primary);
          margin-top: 10px;
        }

        .milestone p {
          color: var(--text-secondary);
          font-size: 15px;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .milestone ul {
          list-style: none;
          padding: 0;
        }

        .milestone li {
          color: var(--text-secondary);
          font-size: 14px;
          padding: 8px 0;
          padding-left: 20px;
          position: relative;
        }

        .milestone li:before {
          content: '→';
          position: absolute;
          left: 0;
          color: var(--accent-intelligence);
        }

        /* WHY WE EXIST */
        .why-exists-section {
          margin: 140px 0;
        }

        .why-exists-content {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 40px;
          margin-top: 60px;
        }

        .why-block {
          padding: 30px;
          border-left: 3px solid var(--accent-intelligence);
        }

        .why-block h3 {
          font-size: 20px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 15px;
        }

        .why-block p {
          color: var(--text-secondary);
          line-height: 1.7;
          font-size: 15px;
        }

        /* PHILOSOPHY */
        .philosophy-section {
          margin: 140px 0;
        }

        .philosophy-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-top: 50px;
        }

        .phil-item {
          background: var(--bg-card);
          border: 1px solid var(--border-muted);
          border-radius: 8px;
          padding: 32px 24px;
          text-align: center;
        }

        .phil-item h4 {
          font-size: 16px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 12px;
        }

        .phil-item p {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        /* POLYNOVEA RECORDS */
        .records-section {
          margin: 140px 0;
        }

        .records-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          margin-top: 60px;
        }

        .records-item {
          background: linear-gradient(135deg, rgba(230,211,163,0.05), rgba(124,58,237,0.05));
          border: 1px solid var(--border-muted);
          border-radius: 12px;
          padding: 40px;
          backdrop-filter: blur(20px);
        }

        .records-item h3 {
          font-size: 20px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 15px;
        }

        .records-item p {
          color: var(--text-secondary);
          line-height: 1.6;
          font-size: 15px;
        }

        .about-cta {
          display: flex;
          justify-content: center;
          margin: 100px 0 80px;
        }

        @media (max-width: 768px) {
          .hero-heading {
            font-size: 40px;
          }

          .thesis-section,
          .milestones-grid {
            grid-template-columns: 1fr;
          }

          .philosophy-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .why-exists-content {
            grid-template-columns: 1fr;
          }

          .records-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}

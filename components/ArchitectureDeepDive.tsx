"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import Link from "next/link";
import * as THREE from "three";

type MilestoneKey = "m1" | "m2" | "m3" | "m4";
type SurfaceKey = "venues" | "music";

const milestoneColors: Record<MilestoneKey, string> = {
  m1: "#7C3AED",
  m2: "#FBBF24",
  m3: "#06B6D4",
  m4: "#EC4899",
};

const milestoneVisuals: Record<MilestoneKey, { primary: string; secondary: string; line: string }> = {
  m1: { primary: "#7C3AED", secondary: "#A78BFA", line: "#8B5CF6" },
  m2: { primary: "#FBBF24", secondary: "#F59E0B", line: "#FACC15" },
  m3: { primary: "#06B6D4", secondary: "#14B8A6", line: "#22D3EE" },
  m4: { primary: "#EC4899", secondary: "#D946EF", line: "#F472B6" },
};

const milestones = [
  {
    key: "m1" as const,
    number: "01",
    stage: "Data In",
    title: "Intelligence Infrastructure",
    summary:
      "Raw behavior becomes measurable insight through decision frameworks, acquisition systems, and optimization loops.",
    flow: "Behavior patterns + raw signals -> intelligence insights",
    items: [
      {
        title: "Module 1: Decision Framework",
        what: "Define what you are measuring and why.",
        how: ["Identify behavioral triggers", "Define success metrics", "Set baseline measurements"],
        output: "KPIs, decision criteria, measurement baseline",
      },
      {
        title: "Module 2: Acquisition System",
        what: "Capture behavioral data at scale.",
        how: ["Deploy trackers", "Aggregate multi-source data", "Clean and normalize signals"],
        output: "Clean datasets, signal library, data quality scores",
      },
      {
        title: "Module 3: Optimization System",
        what: "Identify patterns and recommend improvements.",
        how: ["Run pattern recognition", "Calculate correlations", "Generate recommendations"],
        output: "Actionable insights, interventions, impact predictions",
      },
    ],
  },
  {
    key: "m2" as const,
    number: "02",
    stage: "Execution",
    title: "IP & Records Layer",
    summary:
      "The cultural execution surface where intelligence informs creator development, owned IP, and audience relationships.",
    flow: "Intelligence insights -> records execution",
    items: [
      {
        title: "Artist Discovery & Development",
        what: "Match creators to opportunities and track development.",
        how: ["Use intelligence from M1", "Compare creator fit", "Measure growth signals"],
        output: "Developed talent, success benchmarks",
      },
      {
        title: "IP Creation & Ownership",
        what: "Turn behavioral patterns and creative assets into owned content.",
        how: ["Create original assets", "Manage rights", "Build catalog value"],
        output: "Owned catalog, licensing options, revenue streams",
      },
      {
        title: "Audience Ownership",
        what: "Build direct relationships with audiences.",
        how: ["Capture engagement patterns", "Develop communities", "Strengthen retention"],
        output: "First-party audience data, loyalty, repeatable demand",
      },
    ],
  },
  {
    key: "m3" as const,
    number: "03",
    stage: "Monetization",
    title: "External Services",
    summary:
      "The infrastructure becomes commercially useful through creator services, licensing, and implementation work.",
    flow: "IP + audience data -> external services leverage",
    items: [
      {
        title: "Creator / Artist Services",
        what: "Offer production, distribution, and growth support.",
        how: ["Apply behavioral insights", "Optimize release paths", "Track conversion"],
        output: "SaaS fees, revenue share, retainers",
      },
      {
        title: "Infrastructure Licensing",
        what: "License intelligence systems to partners.",
        how: ["Expose platform access", "Package decision frameworks", "Support integrations"],
        output: "API licensing, enterprise tiers",
      },
      {
        title: "Consulting & Implementation",
        what: "Deploy custom behavioral strategy for complex ecosystems.",
        how: ["Map the system", "Instrument feedback loops", "Train operating teams"],
        output: "Project fees, implementation services",
      },
    ],
  },
  {
    key: "m4" as const,
    number: "04",
    stage: "Revenue",
    title: "Distribution & Ownership",
    summary:
      "The final layer: distribution control, rights leverage, and long-term ecosystem sovereignty.",
    flow: "Service revenue + margin -> distribution control",
    items: [
      {
        title: "Distribution Infrastructure",
        what: "Reduce dependency on third-party channels.",
        how: ["Build direct channels", "Expand platform presence", "Control delivery"],
        output: "Lower dependency, stronger margins",
      },
      {
        title: "Rights & Catalog Management",
        what: "Control ownership and licensing decisions.",
        how: ["Own IP", "Structure licenses", "Track rights value"],
        output: "Perpetual revenue, licensing leverage",
      },
      {
        title: "Monetization Sovereignty",
        what: "Capture more value from the ecosystem.",
        how: ["Control pricing", "Shape partner agreements", "Protect margins"],
        output: "Sustainable long-term value",
      },
    ],
  },
];

const appliedSurfaces: Record<SurfaceKey, {
  label: string;
  eyebrow: string;
  color: string;
  examples: string[];
}> = {
  venues: {
    label: "Venue Revenue Optimisation",
    eyebrow: "Live environments",
    color: "#7C3AED",
    examples: [
      "Measure baseline venue behavior before changing the experience.",
      "Track sales timing, dwell time, audience retention, and response quality.",
      "Use live entertainment as an operational variable, not a decorative add-on.",
      "Turn repeatable patterns into show formats and venue playbooks.",
    ],
  },
  music: {
    label: "Music Creation & Production",
    eyebrow: "Cultural output",
    color: "#FBBF24",
    examples: [
      "Study how structure, lyric, emotion, and production choices shape listener response.",
      "Use audience and context signals to guide creative decisions without flattening taste.",
      "Develop music that is creatively strong and behaviorally aware.",
      "Convert learning from releases back into artist development and owned IP strategy.",
    ],
  },
};

function GradientOrb({
  milestone,
  active,
  hovered,
  position,
  onHover,
}: {
  milestone: (typeof milestones)[number];
  active: boolean;
  hovered: boolean;
  position: [number, number, number];
  onHover: (key: MilestoneKey | null) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const shellRef = useRef<THREE.Mesh>(null);
  const visual = milestoneVisuals[milestone.key];

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const pulse = 1 + Math.sin(time * 1.7 + Number(milestone.number) * 0.35) * (active || hovered ? 0.085 : 0.035);
    groupRef.current?.scale.setScalar(active ? pulse * 1.16 : hovered ? pulse * 1.08 : pulse);
    if (shellRef.current?.material instanceof THREE.MeshBasicMaterial) {
      shellRef.current.material.opacity = active ? 0.22 : hovered ? 0.18 : 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh
        onPointerOver={() => onHover(milestone.key)}
        onPointerOut={() => onHover(null)}
      >
        <sphereGeometry args={[0.42, 48, 48]} />
        <meshPhysicalMaterial
          color={visual.primary}
          emissive={visual.secondary}
          emissiveIntensity={active || hovered ? 1.05 : 0.62}
          roughness={0.28}
          metalness={0.18}
          clearcoat={0.72}
          transparent
          opacity={active || hovered ? 1 : 0.86}
        />
      </mesh>
      <mesh position={[-0.12, 0.16, 0.28]}>
        <sphereGeometry args={[0.26, 32, 32]} />
        <meshBasicMaterial color={visual.secondary} transparent opacity={active || hovered ? 0.34 : 0.2} />
      </mesh>
      <mesh position={[0.12, -0.12, 0.3]}>
        <sphereGeometry args={[0.18, 32, 32]} />
        <meshBasicMaterial color="#FFFFFF" transparent opacity={active || hovered ? 0.22 : 0.12} />
      </mesh>
      <mesh ref={shellRef}>
        <sphereGeometry args={[0.72, 48, 48]} />
        <meshBasicMaterial color={visual.secondary} transparent opacity={0.12} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

function FlowConnection({
  from,
  to,
  color,
  active,
}: {
  from: [number, number, number];
  to: [number, number, number];
  color: string;
  active: boolean;
}) {
  const coreRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const curve = useMemo(() => new THREE.LineCurve3(new THREE.Vector3(...from), new THREE.Vector3(...to)), [from, to]);

  useFrame(({ clock }) => {
    const pulse = 0.6 + Math.sin(clock.getElapsedTime() * 1.8) * 0.18;
    if (coreRef.current?.material instanceof THREE.MeshBasicMaterial) {
      coreRef.current.material.opacity = active ? 0.9 : 0.44;
    }
    if (glowRef.current?.material instanceof THREE.MeshBasicMaterial) {
      glowRef.current.material.opacity = active ? 0.34 + pulse * 0.12 : 0.16;
    }
  });

  return (
    <>
      <mesh ref={glowRef}>
        <tubeGeometry args={[curve, 32, 0.045, 10, false]} />
        <meshBasicMaterial color={color} transparent opacity={0.16} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh ref={coreRef}>
        <tubeGeometry args={[curve, 32, 0.012, 8, false]} />
        <meshBasicMaterial color={color} transparent opacity={0.44} />
      </mesh>
    </>
  );
}

function FlowObjects({
  selected,
  hovered,
  onHover,
}: {
  selected: MilestoneKey;
  hovered: MilestoneKey | null;
  onHover: (key: MilestoneKey | null) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const positions = useMemo<[number, number, number][]>(
    () => [
      [-2.7, 0, 0],
      [-0.9, 0, 0],
      [0.9, 0, 0],
      [2.7, 0, 0],
    ],
    []
  );

  useFrame(({ clock, mouse }) => {
    const time = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = mouse.x * 0.08;
      groupRef.current.rotation.x = -mouse.y * 0.04;
      groupRef.current.position.y = Math.sin(time * 0.45) * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      {positions.slice(0, -1).map((position, index) => {
        const from = milestones[index];
        const to = milestones[index + 1];
        const active = selected === from.key || selected === to.key || hovered === from.key || hovered === to.key;
        return (
          <FlowConnection
            key={`${from.key}-${to.key}`}
            from={position}
            to={positions[index + 1]}
            color={milestoneVisuals[to.key].line}
            active={active}
          />
        );
      })}

      {positions.map((position, index) => {
        const milestone = milestones[index];
        return (
          <GradientOrb
            key={milestone.key}
            milestone={milestone}
            active={milestone.key === selected}
            hovered={milestone.key === hovered}
            position={position}
            onHover={onHover}
          />
        );
      })}
    </group>
  );
}

function FlowScene({
  selected,
  hovered,
  onHover,
}: {
  selected: MilestoneKey;
  hovered: MilestoneKey | null;
  onHover: (key: MilestoneKey | null) => void;
}) {
  return (
    <Canvas camera={{ position: [0, 0, 7.5], fov: 46 }} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={0.62} />
      <pointLight position={[-4, 3, 5]} intensity={16} color="#FFFFFF" />
      <pointLight position={[4, -2, 4]} intensity={10} color="#7C3AED" />
      <FlowObjects selected={selected} hovered={hovered} onHover={onHover} />
    </Canvas>
  );
}

function MiniMilestoneObjects({
  color,
  activeModule,
}: {
  color: string;
  activeModule: number | null;
}) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame(({ clock, mouse }) => {
    const time = clock.getElapsedTime();
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(time * 0.4) * 0.25 + mouse.x * 0.08;
    groupRef.current.children.forEach((child, index) => {
      if (child instanceof THREE.Mesh) {
        const active = activeModule === index;
        child.scale.setScalar((active ? 1.24 : 1) + Math.sin(time * 2 + index) * (active ? 0.16 : 0.12));
        if (child.material instanceof THREE.MeshBasicMaterial) {
          child.material.opacity = active ? 1 : 0.78;
        }
      }
    });
  });

  return (
    <group ref={groupRef}>
      {[
        [-0.9, 0.55, 0],
        [0.9, 0.55, 0],
        [0, -0.75, 0],
      ].map((position, index) => (
        <mesh key={index} position={position as [number, number, number]}>
          <sphereGeometry args={[0.22, 24, 24]} />
          <meshBasicMaterial color={color} transparent opacity={0.88} />
        </mesh>
      ))}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array([
              -0.9, 0.55, 0, 0.9, 0.55, 0,
              0.9, 0.55, 0, 0, -0.75, 0,
              0, -0.75, 0, -0.9, 0.55, 0,
            ]), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color={color} transparent opacity={0.45} />
      </lineSegments>
    </group>
  );
}

function StaticFlowDiagram({ selected }: { selected: MilestoneKey }) {
  return (
    <div className="static-flow-diagram" aria-hidden="true">
      <div className="static-flow-line" />
      {milestones.map((milestone) => (
        <div
          key={milestone.key}
          className={`static-node ${milestone.key === selected ? "active" : ""}`}
          style={
            {
              "--node-color": milestoneVisuals[milestone.key].primary,
              "--node-glow": milestoneVisuals[milestone.key].secondary,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

function MiniMilestoneScene({
  color,
  activeModule,
}: {
  color: string;
  activeModule: number | null;
}) {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 50 }} gl={{ alpha: true, antialias: true }}>
      <MiniMilestoneObjects color={color} activeModule={activeModule} />
    </Canvas>
  );
}

export default function ArchitectureDeepDive() {
  const [visibleMilestone, setVisibleMilestone] = useState<MilestoneKey>("m1");
  const [manualSelectedMilestone, setManualSelectedMilestone] = useState<MilestoneKey | null>(null);
  const [hoveredModule, setHoveredModule] = useState<{ milestone: MilestoneKey; index: number } | null>(null);
  const [hoveredMilestoneNode, setHoveredMilestoneNode] = useState<MilestoneKey | null>(null);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(() => new Set());
  const [selectedSurface, setSelectedSurface] = useState<SurfaceKey>("venues");
  const [useCompactHero, setUseCompactHero] = useState(false);
  const selectedMilestone = manualSelectedMilestone ?? visibleMilestone;
  const activeMilestone = milestones.find((m) => m.key === selectedMilestone) ?? milestones[0];
  const surface = appliedSurfaces[selectedSurface];
  const hoveredMilestone = hoveredModule?.milestone ?? hoveredMilestoneNode;

  useEffect(() => {
    const rows = Array.from(document.querySelectorAll<HTMLElement>("[data-milestone-key]"));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const key = visible?.target.getAttribute("data-milestone-key") as MilestoneKey | null;
        if (key) setVisibleMilestone(key);
      },
      { rootMargin: "-30% 0px -45% 0px", threshold: [0.2, 0.45, 0.7] }
    );

    rows.forEach((row) => observer.observe(row));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const syncHeroMode = () => {
      setUseCompactHero(window.innerWidth < 1280);
    };

    syncHeroMode();
    window.addEventListener("resize", syncHeroMode);
    return () => window.removeEventListener("resize", syncHeroMode);
  }, []);

  useEffect(() => {
    const releaseManualSelection = () => {
      setManualSelectedMilestone(null);
    };

    window.addEventListener("scroll", releaseManualSelection, { passive: true });
    return () => window.removeEventListener("scroll", releaseManualSelection);
  }, []);

  const selectMilestone = (key: MilestoneKey) => setManualSelectedMilestone(key);

  const toggleModule = (moduleKey: string) => {
    setExpandedModules((current) => {
      const next = new Set(current);
      if (next.has(moduleKey)) {
        next.delete(moduleKey);
      } else {
        next.add(moduleKey);
      }
      return next;
    });
  };

  return (
    <main className="architecture-page">
      <section className="architecture-hero">
        <div className="hero-bg" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="t-label" style={{ color: "var(--accent-authority)" }}>
              The Behavioral Intelligence Stack
            </span>
            <h1 className="hero-title">The ecosystem flow from behavior to ownership.</h1>
            <p className="t-body-lg">
              Polynovea turns fragmented human behavior into intelligence, uses that intelligence to create IP,
              commercializes the infrastructure, and compounds toward distribution control.
            </p>
          </div>
          <div className={`hero-visual card${useCompactHero ? " compact" : ""}`}>
            {useCompactHero ? (
              <StaticFlowDiagram selected={selectedMilestone} />
            ) : (
              <div className="flow-canvas">
                <FlowScene
                  selected={selectedMilestone}
                  hovered={hoveredMilestone}
                  onHover={setHoveredMilestoneNode}
                />
              </div>
            )}
            <div className="flow-labels">
              {milestones.map((m) => (
                <button
                  key={m.key}
                  className={`flow-label ${m.key === selectedMilestone ? "active" : ""}`}
                  style={{ "--node-color": milestoneColors[m.key] } as CSSProperties}
                  onClick={() => selectMilestone(m.key)}
                  type="button"
                >
                  <span>{m.number}</span>
                  {m.title}
                </button>
              ))}
            </div>
            <div className="hero-selected-panel">
              <span>{activeMilestone.stage}</span>
              <strong>{activeMilestone.title}</strong>
              <p>{activeMilestone.flow}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section breakdown-section">
        <div className="container">
          <div className="section-heading" data-reveal>
            <span className="t-label" style={{ color: "var(--accent-authority)" }}>
              Milestone Breakdown
            </span>
            <h2 className="t-display-md">Four compounding layers.</h2>
          </div>

          <div className="milestone-stack">
            {milestones.map((milestone) => (
              <article
                key={milestone.key}
                id={`milestone-${milestone.key}`}
                className="milestone-row"
                data-milestone-key={milestone.key}
                data-reveal
              >
                <div className="sticky-visual card">
                  <MiniMilestoneScene
                    color={milestoneColors[milestone.key]}
                    activeModule={hoveredModule?.milestone === milestone.key ? hoveredModule.index : null}
                  />
                  <div className="sticky-caption">
                    <span>{milestone.number}</span>
                    <strong>{milestone.title}</strong>
                  </div>
                </div>
                <div className="milestone-content">
                  <span className="t-label" style={{ color: milestoneColors[milestone.key] }}>
                    {milestone.stage}
                  </span>
                  <h3>{milestone.title}</h3>
                  <p className="t-body">{milestone.summary}</p>
                  <div className="module-grid">
                    {milestone.items.map((item, index) => {
                      const moduleKey = `${milestone.key}-${index}`;
                      const expanded = expandedModules.has(moduleKey);
                      const hovered =
                        hoveredModule?.milestone === milestone.key && hoveredModule.index === index;

                      return (
                        <div
                          key={item.title}
                          className={`module-card card${expanded || hovered ? " expanded" : ""}`}
                          style={{ "--milestone-color": milestoneColors[milestone.key] } as CSSProperties}
                          onMouseEnter={() => setHoveredModule({ milestone: milestone.key, index })}
                          onMouseLeave={() => setHoveredModule(null)}
                          onFocus={() => setHoveredModule({ milestone: milestone.key, index })}
                          onBlur={() => setHoveredModule(null)}
                        >
                          <button
                            type="button"
                            aria-expanded={expanded}
                            onClick={() => toggleModule(moduleKey)}
                          >
                            <span>{item.title}</span>
                          </button>
                          <div className="module-body">
                            <div className="module-body-inner">
                              <p>{item.what}</p>
                              <ul>
                                {item.how.map((line) => (
                                  <li key={line}>{line}</li>
                                ))}
                              </ul>
                              <div className="output">Output: {item.output}</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="next-flow">{milestone.flow}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section surface-section">
        <div className="container">
          <div className="section-heading" data-reveal>
            <span className="t-label" style={{ color: "var(--accent-authority)" }}>
              Applied Surfaces
            </span>
            <h2 className="t-display-md">Where the framework is being tested first.</h2>
            <p className="t-body-lg">
              The system is strongest when it stays close to measurable reality. For now, the clearest
              surfaces are live venues and music creation.
            </p>
          </div>

          <div className="surface-tabs" data-reveal>
            {(Object.keys(appliedSurfaces) as SurfaceKey[]).map((key) => (
              <button
                key={key}
                className={key === selectedSurface ? "active" : ""}
                style={{ "--surface-color": appliedSurfaces[key].color } as CSSProperties}
                onClick={() => setSelectedSurface(key)}
              >
                {appliedSurfaces[key].label}
                <span>{appliedSurfaces[key].eyebrow}</span>
              </button>
            ))}
          </div>

          <div className="surface-card card" style={{ "--surface-color": surface.color } as CSSProperties} data-reveal>
            <div>
              <span className="t-label" style={{ color: surface.color }}>
                {surface.eyebrow}
              </span>
              <h3>{surface.label}</h3>
            </div>
            <div className="surface-flow">
              {surface.examples.map((example, index) => (
                <div key={example} className="surface-step">
                  <span>M{index + 1}</span>
                  <p>{example}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section data-section">
        <div className="container">
          <div className="section-heading" data-reveal>
            <span className="t-label" style={{ color: "var(--accent-authority)" }}>
              Intelligence Flow
            </span>
            <h2 className="t-display-md">How signal becomes leverage.</h2>
          </div>
          <div className="sankey-card card" data-reveal>
            {[
              "Raw behavior input",
              "Decision framework",
              "Acquisition system",
              "Optimization system",
              "Execution layer",
              "Monetization",
              "Sovereignty",
              "Sustainable value",
            ].map((step, index) => (
              <div key={step} className="sankey-step">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{step}</strong>
                {index < 7 && <i />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section architecture-cta">
        <div className="container cta-card card">
          <span className="t-label" style={{ color: "var(--accent-authority)" }}>
            Build The System
          </span>
          <h2>Bring behavioral intelligence into your ecosystem.</h2>
          <p>
            Partner with Polynovea to define the signals, build the measurement layer, and turn behavior into a
            compounding operating advantage.
          </p>
          <div className="cta-actions">
            <Link href="/#contact" className="btn btn-primary">Partner with us</Link>
            <a href="#milestone-m1" className="btn btn-secondary">Review the stack</a>
          </div>
        </div>
      </section>

      <style jsx>{`
        .architecture-page {
          background: var(--bg-primary);
          color: var(--text-primary);
        }

        .architecture-hero {
          position: relative;
          min-height: 100vh;
          padding-top: var(--nav-height);
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, rgba(10,10,10,0.45), var(--bg-primary)),
            radial-gradient(circle at 20% 30%, rgba(124,58,237,0.16), transparent 32%),
            radial-gradient(circle at 76% 42%, rgba(251,191,36,0.09), transparent 28%);
        }

        .hero-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          gap: var(--space-3xl);
          align-items: center;
        }

        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(46px, 6vw, 84px);
          font-weight: 700;
          line-height: 1.02;
          letter-spacing: -0.02em;
          margin: var(--space-md) 0 var(--space-lg);
        }

        .hero-visual {
          height: 560px;
          padding: var(--space-md);
          background: rgba(10,10,10,0.72);
          overflow: hidden;
          display: grid;
          grid-template-rows: minmax(260px, 1fr) auto auto;
          gap: var(--space-md);
        }

        .flow-canvas {
          width: 100%;
          height: 100%;
          min-height: 260px;
          aspect-ratio: 16 / 9;
          pointer-events: none;
          display: none;
        }

        @media (min-width: 1025px) {
          .flow-canvas {
            display: block;
          }
        }

        .static-flow-diagram {
          position: relative;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          align-items: center;
          min-height: 140px;
          padding-inline: var(--space-sm);
        }

        .static-flow-line {
          position: absolute;
          left: calc(var(--space-sm) + 28px);
          right: calc(var(--space-sm) + 28px);
          top: 50%;
          height: 2px;
          background: linear-gradient(90deg, #7C3AED, #FBBF24, #06B6D4, #EC4899);
          opacity: 0.72;
        }

        .static-node {
          position: relative;
          z-index: 1;
          justify-self: center;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background:
            radial-gradient(circle at 35% 35%, rgba(255,255,255,0.8), transparent 40%),
            radial-gradient(circle at 50% 50%, var(--node-color), var(--node-color));
          box-shadow:
            0 0 32px color-mix(in srgb, var(--node-color) 48%, transparent),
            0 0 64px color-mix(in srgb, var(--node-color) 18%, transparent);
          opacity: 0.68;
          transform: scale(0.92);
          transition:
            transform var(--duration-default) ease,
            opacity var(--duration-default) ease,
            box-shadow var(--duration-default) ease;
        }

        .static-node.active {
          opacity: 1;
          transform: scale(1.08);
          box-shadow:
            0 0 48px color-mix(in srgb, var(--node-color) 72%, transparent),
            0 0 96px color-mix(in srgb, var(--node-color) 28%, transparent),
            inset 0 0 20px rgba(255,255,255,0.24);
        }

        .flow-labels {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-sm);
          margin-top: var(--space-md);
          min-width: 0;
          position: relative;
          z-index: 2;
        }

        .hero-selected-panel {
          border: 1px solid var(--border-muted);
          border-radius: var(--radius-md);
          background: rgba(255,255,255,0.035);
          padding: var(--space-md);
          min-height: 116px;
        }

        .hero-selected-panel span {
          display: block;
          color: var(--accent-authority);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 4px;
        }

        .hero-selected-panel strong {
          display: block;
          color: var(--text-primary);
          font-size: 16px;
          line-height: 1.25;
        }

        .hero-selected-panel p {
          color: var(--text-secondary);
          font-size: 13px;
          margin-top: 6px;
        }

        .hero-selected-panel button {
          margin-top: var(--space-md);
          border: 1px solid var(--border-muted);
          border-radius: var(--radius-pill);
          background: rgba(255,255,255,0.04);
          color: var(--text-primary);
          cursor: pointer;
          font: inherit;
          font-size: 13px;
          font-weight: 600;
          padding: 8px 14px;
          transition: all var(--duration-default) ease;
        }

        .hero-selected-panel button:hover {
          border-color: var(--accent-authority);
          color: var(--accent-authority);
          transform: translateY(-1px);
        }

        .flow-label,
        .surface-tabs button {
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--border-muted);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all var(--duration-default) ease;
        }

        .flow-label:hover,
        .surface-tabs button:hover {
          color: var(--text-primary);
          transform: translateY(-1px);
        }

        .flow-label {
          border-radius: var(--radius-md);
          min-width: 0;
          min-height: 66px;
          padding: var(--space-sm);
          font-size: 12px;
          line-height: 1.3;
          overflow-wrap: anywhere;
        }

        @media (max-width: 768px) {
          .flow-label {
            min-height: 56px;
            padding: var(--space-xs) var(--space-sm);
            font-size: 11px;
          }
        }

        .flow-label span {
          display: block;
          color: var(--node-color);
          font-weight: 700;
          margin-bottom: 4px;
        }

        .flow-label.active {
          color: var(--text-primary);
          border-color: var(--node-color);
          box-shadow: 0 0 24px color-mix(in srgb, var(--node-color) 28%, transparent);
        }

        .hero-visual.compact {
          height: auto;
          min-height: 320px;
          grid-template-rows: 140px auto auto;
        }

        .hero-visual.compact .flow-labels {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .cta-card {
          padding: var(--space-xl);
        }

        .cta-card h2 {
          font-family: var(--font-display);
          font-size: clamp(28px, 4vw, 48px);
          line-height: 1.1;
          margin: var(--space-sm) 0 var(--space-md);
        }

        @media (max-width: 768px) {
          .cta-card {
            padding: var(--space-lg);
          }

          .cta-card h2 {
            font-size: clamp(24px, 5vw, 36px);
          }

          .cta-card p {
            font-size: 14px;
          }

          .cta-actions {
            flex-direction: column;
            gap: var(--space-sm);
          }

          .cta-actions a,
          .cta-actions button {
            width: 100%;
          }
        }

        .cta-card p {
          color: var(--text-secondary);
        }

        .section-heading {
          max-width: 820px;
          margin-bottom: var(--space-3xl);
        }

        .section-heading h2 {
          color: var(--text-primary);
          margin-top: var(--space-md);
        }

        .section-heading p {
          margin-top: var(--space-md);
        }

        .milestone-stack {
          display: flex;
          flex-direction: column;
          gap: var(--space-5xl);
        }

        .milestone-row {
          display: grid;
          grid-template-columns: 360px 1fr;
          gap: var(--space-3xl);
          align-items: start;
          scroll-margin-top: calc(var(--nav-height) + var(--space-xl));
        }

        @media (max-width: 1024px) {
          .milestone-row {
            gap: var(--space-2xl);
          }
        }

        @media (max-width: 768px) {
          .milestone-row {
            gap: var(--space-lg);
          }
        }

        .sticky-visual {
          position: sticky;
          top: calc(var(--nav-height) + var(--space-xl));
          height: 340px;
          overflow: hidden;
        }

        @media (max-width: 1024px) {
          .sticky-visual {
            height: 300px;
          }
        }

        @media (max-width: 768px) {
          .sticky-visual {
            height: 260px;
            position: relative;
            top: 0;
          }
        }

        .sticky-caption {
          position: absolute;
          left: var(--space-lg);
          right: var(--space-lg);
          bottom: var(--space-lg);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--space-md);
        }

        .sticky-caption span,
        .milestone-content h3 {
          font-family: var(--font-display);
        }

        .sticky-caption span {
          font-size: 44px;
          color: var(--accent-authority);
          opacity: 0.5;
          line-height: 1;
        }

        .milestone-content h3 {
          font-size: clamp(28px, 4vw, 48px);
          line-height: 1.1;
          margin: var(--space-md) 0;
        }

        .module-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-md);
          margin-top: var(--space-xl);
        }

        @media (max-width: 1024px) {
          .module-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .module-card {
          position: relative;
          padding: 0;
          overflow: hidden;
          transform-origin: center;
          transition:
            border-color var(--duration-default) ease,
            box-shadow var(--duration-default) ease,
            transform var(--duration-default) ease,
            background var(--duration-default) ease;
        }

        .module-card::before {
          content: "";
          position: absolute;
          inset: 0 auto 0 0;
          width: 3px;
          background: var(--milestone-color);
          opacity: 0.85;
        }

        .module-card:hover,
        .module-card.expanded {
          background: color-mix(in srgb, var(--milestone-color) 8%, rgba(24,24,27,0.65));
          border-color: color-mix(in srgb, var(--milestone-color) 54%, var(--border-muted));
          box-shadow: 0 0 28px color-mix(in srgb, var(--milestone-color) 18%, transparent);
          transform: scale(1.02);
        }

        .module-card button {
          width: 100%;
          min-height: 72px;
          padding: var(--space-lg);
          padding-left: calc(var(--space-lg) + 3px);
          background: transparent;
          border: 0;
          cursor: pointer;
          color: var(--text-primary);
          font: inherit;
          font-weight: 700;
          line-height: 1.35;
          text-align: left;
        }

        @media (max-width: 768px) {
          .module-card button {
            min-height: 64px;
            padding: var(--space-md);
            padding-left: calc(var(--space-md) + 3px);
            font-size: 14px;
          }
        }

        .module-card button span {
          display: block;
        }

        .module-card p,
        .module-card li,
        .output {
          color: var(--text-secondary);
          font-size: 14px;
          line-height: 1.55;
        }

        .module-body {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows var(--duration-default) ease;
        }

        .module-card.expanded .module-body,
        .module-card:hover .module-body,
        .module-card:focus-within .module-body {
          grid-template-rows: 1fr;
        }

        .module-body-inner {
          min-height: 0;
          overflow: hidden;
          padding-inline: var(--space-lg);
          padding-left: calc(var(--space-lg) + 3px);
        }

        .module-card.expanded .module-body-inner,
        .module-card:hover .module-body-inner,
        .module-card:focus-within .module-body-inner {
          padding-bottom: var(--space-lg);
        }

        .module-card p {
          margin-top: 0;
        }

        .module-card ul {
          margin: var(--space-md) 0;
          padding-left: 0;
          list-style: none;
        }

        .module-card li {
          position: relative;
          padding-left: 18px;
          margin-top: 8px;
        }

        .module-card li::before {
          content: "->";
          position: absolute;
          left: 0;
          color: var(--accent-intelligence);
        }

        .output,
        .next-flow {
          border-top: 1px solid var(--border-muted);
          padding-top: var(--space-md);
        }

        .next-flow {
          margin-top: var(--space-xl);
          color: var(--accent-authority);
          font-weight: 600;
        }

        .surface-tabs {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-sm);
          margin-bottom: var(--space-lg);
        }

        .surface-tabs button {
          border-radius: var(--radius-md);
          padding: var(--space-md);
          text-align: left;
          color: var(--text-primary);
          font-weight: 700;
        }

        .surface-tabs button span {
          display: block;
          margin-top: 4px;
          color: var(--text-disabled);
          font-size: 12px;
          font-weight: 500;
        }

        .surface-tabs button.active {
          border-color: var(--surface-color);
          box-shadow: 0 0 24px color-mix(in srgb, var(--surface-color) 24%, transparent);
        }

        .surface-card {
          padding: var(--space-xl);
          border-color: color-mix(in srgb, var(--surface-color) 36%, var(--border-muted));
        }

        .surface-card h3 {
          font-family: var(--font-display);
          font-size: 36px;
          margin-top: var(--space-sm);
        }

        .surface-flow {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-md);
          margin-top: var(--space-xl);
        }

        @media (max-width: 1024px) {
          .surface-flow {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .surface-flow {
            grid-template-columns: 1fr;
          }
        }

        .surface-step {
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--border-muted);
          border-radius: var(--radius-md);
          padding: var(--space-md);
        }

        .surface-step span {
          color: var(--surface-color);
          font-weight: 800;
        }

        .surface-step p {
          color: var(--text-secondary);
          margin-top: var(--space-sm);
          font-size: 14px;
        }

        .sankey-card {
          padding: var(--space-xl);
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          gap: var(--space-sm);
        }

        @media (max-width: 1024px) {
          .sankey-card {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        @media (max-width: 768px) {
          .sankey-card {
            grid-template-columns: repeat(2, 1fr);
            gap: var(--space-xs);
            padding: var(--space-lg);
          }
        }

        .sankey-step {
          position: relative;
          min-height: 150px;
          border: 1.5px solid color-mix(in srgb, var(--node-color) 34%, var(--border-muted));
          border-radius: var(--radius-md);
          padding: var(--space-md);
          background:
            linear-gradient(135deg,
              color-mix(in srgb, var(--node-color) 8%, rgba(24,24,27,0.4)),
              color-mix(in srgb, var(--node-color) 4%, rgba(24,24,27,0.6))),
            rgba(255,255,255,0.015);
          box-shadow:
            0 0 1px color-mix(in srgb, var(--node-color) 16%, transparent),
            inset 0 1px 2px color-mix(in srgb, var(--node-color) 12%, rgba(255,255,255,0.1));
          transition: all var(--duration-default) ease;
        }

        .sankey-step:hover {
          border-color: color-mix(in srgb, var(--node-color) 56%, var(--border-muted));
          box-shadow:
            0 0 12px color-mix(in srgb, var(--node-color) 24%, transparent),
            inset 0 1px 2px color-mix(in srgb, var(--node-color) 12%, rgba(255,255,255,0.1));
          transform: translateY(-2px);
        }

        .sankey-step span {
          color: var(--node-color);
          font-weight: 800;
          font-size: 20px;
          text-shadow: 0 0 8px color-mix(in srgb, var(--node-color) 28%, transparent);
        }

        .sankey-step strong {
          display: block;
          margin-top: var(--space-md);
          font-size: 14px;
          line-height: 1.4;
        }

        @media (max-width: 1024px) {
          .sankey-step {
            min-height: 120px;
            padding: var(--space-md);
          }

          .sankey-step span {
            font-size: 18px;
          }

          .sankey-step strong {
            font-size: 13px;
          }
        }

        @media (max-width: 768px) {
          .sankey-step {
            min-height: 100px;
            padding: var(--space-sm);
          }

          .sankey-step span {
            font-size: 16px;
          }

          .sankey-step strong {
            font-size: 12px;
            margin-top: 4px;
          }
        }

        .sankey-step i {
          position: absolute;
          top: 50%;
          right: -14px;
          width: 18px;
          height: 1px;
          background: var(--accent-intelligence);
          z-index: 2;
        }

        .architecture-cta {
          padding-top: 0;
        }

        .cta-card {
          text-align: center;
          max-width: 900px;
          margin-inline: auto;
        }

        .cta-actions {
          display: flex;
          justify-content: center;
          gap: var(--space-md);
          flex-wrap: wrap;
          margin-top: var(--space-xl);
        }

        @media (max-width: 1024px) {
          .hero-grid,
          .milestone-row {
            grid-template-columns: 1fr;
          }

          .architecture-hero {
            min-height: auto;
            padding-block: calc(var(--nav-height) + var(--space-3xl)) var(--space-4xl);
          }

          .hero-visual {
            height: auto;
            min-height: 280px;
            grid-template-rows: 120px auto auto;
          }

          .sticky-visual {
            position: relative;
            top: 0;
          }

          .module-grid,
          .surface-flow {
            grid-template-columns: 1fr;
          }

          .surface-tabs,
          .sankey-card {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .hero-visual {
            width: 100%;
            grid-template-rows: 110px auto auto;
            padding: var(--space-sm);
            gap: var(--space-sm);
          }

          .hero-visual.compact {
            min-height: 260px;
            grid-template-rows: 110px auto auto;
          }

          .static-flow-diagram {
            min-height: 110px;
          }

          .hero-selected-panel {
            padding: var(--space-sm);
            min-height: 100px;
          }

          .hero-selected-panel button {
            padding: 6px 12px;
            font-size: 12px;
          }

          .hero-visual.compact .flow-labels,
          .surface-tabs,
          .sankey-card {
            grid-template-columns: 1fr;
          }

          .flow-label {
            min-height: 48px;
            padding: var(--space-md);
            text-align: left;
          }

          .sankey-step {
            min-height: auto;
          }

          .sankey-step i {
            display: none;
          }
        }
      `}</style>
    </main>
  );
}

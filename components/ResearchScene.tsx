"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function WaveRings({ pulseRef }: { pulseRef: React.MutableRefObject<number> }) {
  const ringsRef = useRef<(THREE.Mesh | null)[]>([]);
  const t = useRef(0);
  const lastPulse = useRef(0);
  const pulse = useRef(0);

  const rings = useMemo(() =>
    Array.from({ length: 5 }, (_, i) => ({
      radius: 1.2 + i * 1.0,
      phase: (i / 5) * Math.PI * 2,
      opacity: 0.14 - i * 0.02,
      color: new THREE.Color().lerpColors(new THREE.Color("#E6D3A3"), new THREE.Color("#7C3AED"), i / 4),
      speed: 0.1 + i * 0.02,
    })), []);

  useFrame((_, dt) => {
    t.current += dt;
    if (pulseRef.current !== lastPulse.current) { lastPulse.current = pulseRef.current; pulse.current = 1; }
    pulse.current *= 0.88;
    rings.forEach((r, i) => {
      const m = ringsRef.current[i];
      if (!m) return;
      const w = Math.sin(t.current * r.speed + r.phase);
      const s = 1 + w * 0.03 + pulse.current * Math.max(0, 0.1 - i * 0.018);
      m.scale.set(s, s, 1);
      (m.material as THREE.MeshBasicMaterial).opacity = Math.max(0, r.opacity + w * 0.025 + pulse.current * 0.04);
    });
  });

  return (
    <group rotation={[0.06, 0, 0]}>
      {rings.map((r, i) => (
        <mesh key={i} ref={(el) => { ringsRef.current[i] = el; }} position={[0, 0, -i * 0.1]}>
          <torusGeometry args={[r.radius, 0.006, 6, 80]} />
          <meshBasicMaterial color={r.color} transparent opacity={r.opacity} />
        </mesh>
      ))}
    </group>
  );
}

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(80 * 3);
    for (let i = 0; i < 80; i++) {
      const a = Math.random() * Math.PI * 2, r = 2 + Math.random() * 5;
      arr[i*3] = Math.cos(a)*r; arr[i*3+1] = (Math.random()-0.5)*5; arr[i*3+2] = Math.sin(a)*r*0.15-0.5;
    }
    return arr;
  }, []);

  useFrame((_, dt) => {
    if (!ref.current) return;
    const p = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    const a = p.array as Float32Array;
    for (let i = 0; i < 80; i++) { a[i*3+1] += 0.008*dt; if (a[i*3+1] > 3) a[i*3+1] = -3; }
    p.needsUpdate = true;
    ref.current.rotation.z += dt * 0.008;
  });

  return (
    <points ref={ref}>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
      <pointsMaterial color="#E6D3A3" size={0.02} transparent opacity={0.35} sizeAttenuation />
    </points>
  );
}

function Scene({ pulseRef }: { pulseRef: React.MutableRefObject<number> }) {
  const g = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const fn = (e: MouseEvent) => { target.current.x = (e.clientX/innerWidth-0.5)*0.2; target.current.y = -(e.clientY/innerHeight-0.5)*0.1; };
    window.addEventListener("mousemove", fn, { passive: true });
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  useFrame((_, dt) => {
    if (!g.current) return;
    mouse.current.x += (target.current.x - mouse.current.x) * 0.05;
    mouse.current.y += (target.current.y - mouse.current.y) * 0.05;
    g.current.rotation.y = mouse.current.x;
    g.current.rotation.x = mouse.current.y;
  });

  return <group ref={g}><WaveRings pulseRef={pulseRef} /><Particles /></group>;
}

export default function ResearchScene({ pulseRef }: { pulseRef: React.MutableRefObject<number> }) {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 52 }} gl={{ antialias: false, alpha: true }} style={{ position: "absolute", inset: 0, pointerEvents: "none" }} dpr={1}>
      <Scene pulseRef={pulseRef} />
    </Canvas>
  );
}

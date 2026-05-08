"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const NODE_COUNT = 120;
const CONNECTION_DISTANCE = 1.8;

function Nodes({ scrollY }: { scrollY: React.MutableRefObject<number> }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const positions = useMemo(() => {
    const arr = new Float32Array(NODE_COUNT * 3);
    for (let i = 0; i < NODE_COUNT; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 10;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 6;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return arr;
  }, []);

  const velocities = useMemo(() => {
    const arr = new Float32Array(NODE_COUNT * 3);
    for (let i = 0; i < NODE_COUNT * 3; i++) arr[i] = (Math.random() - 0.5) * 0.002;
    return arr;
  }, []);

  const current = useMemo(() => new Float32Array(positions), [positions]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    timeRef.current += delta;
    // Gold tint increases with scroll
    const scrollProgress = Math.min(scrollY.current / (window.innerHeight * 0.8), 1);

    for (let i = 0; i < NODE_COUNT; i++) {
      current[i * 3]     += velocities[i * 3];
      current[i * 3 + 1] += velocities[i * 3 + 1];
      current[i * 3 + 2] += velocities[i * 3 + 2];
      if (Math.abs(current[i * 3])     > 5.5) velocities[i * 3]     *= -1;
      if (Math.abs(current[i * 3 + 1]) > 3.5) velocities[i * 3 + 1] *= -1;
      if (Math.abs(current[i * 3 + 2]) > 2.5) velocities[i * 3 + 2] *= -1;

      const pulse = 0.04 + Math.sin(timeRef.current * 1.5 + i * 0.3) * 0.015;
      dummy.position.set(
        current[i * 3]     + mouseRef.current.x * 0.08,
        current[i * 3 + 1] + mouseRef.current.y * 0.08,
        current[i * 3 + 2]
      );
      dummy.scale.setScalar(pulse);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      // Blend violet → gold as user scrolls
      const violet = new THREE.Color("#7C3AED");
      const gold   = new THREE.Color("#E6D3A3");
      const c = violet.clone().lerp(gold, scrollProgress * 0.8);
      c.multiplyScalar(0.8 + Math.sin(timeRef.current + i) * 0.2);
      meshRef.current.setColorAt(i, c);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, NODE_COUNT]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#A78BFA" transparent opacity={1} vertexColors />
    </instancedMesh>
  );
}

function Connections() {
  const linesRef = useRef<THREE.LineSegments>(null);
  const timeRef  = useRef(0);

  const linePositions = useMemo(() => {
    const nodes: number[][] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push([(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 6, (Math.random() - 0.5) * 4]);
    }
    const lines: number[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const dx = nodes[i][0] - nodes[j][0];
        const dy = nodes[i][1] - nodes[j][1];
        const dz = nodes[i][2] - nodes[j][2];
        if (Math.sqrt(dx*dx + dy*dy + dz*dz) < CONNECTION_DISTANCE) {
          lines.push(...nodes[i], ...nodes[j]);
        }
      }
    }
    return new Float32Array(lines);
  }, []);

  useFrame((_, delta) => {
    timeRef.current += delta;
    if (linesRef.current) linesRef.current.rotation.y = Math.sin(timeRef.current * 0.05) * 0.03;
  });

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color="#7C3AED" transparent opacity={0.35} />
    </lineSegments>
  );
}

function CameraRig({ scrollY }: { scrollY: React.MutableRefObject<number> }) {
  const { camera } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 0.4;
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 0.2;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(() => {
    // Mouse parallax
    camera.position.x += (mouseRef.current.x - camera.position.x) * 0.03;
    camera.position.y += (mouseRef.current.y - camera.position.y) * 0.03;
    // Scroll-linked pullback: z goes from 7 → 10 over one viewport height
    const scrollProgress = Math.min(scrollY.current / window.innerHeight, 1);
    const targetZ = 7 + scrollProgress * 3;
    camera.position.z += (targetZ - camera.position.z) * 0.05;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function HeroScene() {
  const scrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => { scrollY.current = window.scrollY; };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="hero-canvas">
      <Canvas camera={{ position: [0, 0, 7], fov: 55 }} gl={{ antialias: true, alpha: true }} style={{ background: "transparent" }}>
        <CameraRig scrollY={scrollY} />
        <Nodes scrollY={scrollY} />
        <Connections />
      </Canvas>
      <style jsx>{`
        .hero-canvas {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}

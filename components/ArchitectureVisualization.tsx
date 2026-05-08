"use client";

import { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function FlowNodes() {
  const groupRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const timeRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const basePositions = useMemo(
    () => [
      new THREE.Vector3(-2.5, 0, 0),
      new THREE.Vector3(-0.8, 0, 0),
      new THREE.Vector3(0.8, 0, 0),
      new THREE.Vector3(2.5, 0, 0),
    ],
    []
  );

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    timeRef.current += delta;

    groupRef.current.children.forEach((child, i) => {
      if (!(child instanceof THREE.Mesh)) return;

      const base = basePositions[i];
      const cursor = new THREE.Vector3(mouseRef.current.x * 3, mouseRef.current.y * 2, 0);
      const distance = base.distanceTo(cursor);
      const driftStrength = distance < 3 ? (3 - distance) * 0.01 : 0;
      const target = base.clone().lerp(cursor, driftStrength);
      child.position.lerp(target, 0.08);

      const pulse = 1 + Math.sin(timeRef.current * 2 + i * 0.5) * 0.2;
      child.scale.setScalar(pulse);

      if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshBasicMaterial) {
        const hue = (timeRef.current * 0.2 + i * 0.1) % 1;
        const color = new THREE.Color();
        color.setHSL(hue, 0.7, 0.6);
        child.material.color = color;
        child.material.opacity = 0.8 + Math.sin(timeRef.current * 2 + i * 0.5) * 0.2;
      } 
    });

    if (linesRef.current) {
      linesRef.current.rotation.y = Math.sin(timeRef.current * 0.05) * 0.03;
    }
  });

  const positions = basePositions.map((position) => position.toArray() as [number, number, number]);

  return (
    <group ref={groupRef}>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.22, 24, 24]} />
          <meshBasicMaterial color="#7C3AED" transparent opacity={0.85} />
        </mesh>
      ))}

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array([
              -2.5, 0, 0, -0.8, 0, 0,
              -2.5, 0, 0, 0.8, 0, 0,
              -2.5, 0, 0, 2.5, 0, 0,
              -0.8, 0, 0, 0.8, 0, 0,
              -0.8, 0, 0, 2.5, 0, 0,
              0.8, 0, 0, 2.5, 0, 0,
            ]), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#7C3AED" transparent opacity={0.35} />
      </lineSegments>
    </group>
  );
}

function CameraRig() {
  const { camera } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 0.3;
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 0.15;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(() => {
    camera.position.x += (mouseRef.current.x - camera.position.x) * 0.05;
    camera.position.y += (mouseRef.current.y - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function ArchitectureVisualization() {
  return (
    <div className="arch-canvas">
      <Canvas camera={{ position: [0, 0, 3.5], fov: 55 }} gl={{ antialias: true, alpha: true }} style={{ background: "transparent" }}>
        <CameraRig />
        <FlowNodes />
      </Canvas>
      <style jsx>{`
        .arch-canvas {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}

"use client";

import React, { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { usePerformance } from "@/context/PerformanceContext";

interface HeroObjectProps {
  distortion?: number;
}

export function HeroObject({ distortion = 1.0 }: HeroObjectProps) {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const ring4Ref = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  const { quality, particlesCount } = usePerformance();
  const { viewport, pointer } = useThree();
  const isMobile = viewport.width < 5.8;

  // Background Ambient Stardust Particles
  const { particlePositions, particleColors } = useMemo(() => {
    const count = isMobile ? Math.floor(particlesCount * 0.45) : particlesCount;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const cyan = new THREE.Color("#00F0FF");
    const purple = new THREE.Color("#A855F7");

    for (let i = 0; i < count; i++) {
      const radius = 2.0 + Math.random() * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3 + 0] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const mixed = Math.random() > 0.5 ? cyan : purple;
      colors[i * 3 + 0] = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;
    }

    return { particlePositions: positions, particleColors: colors };
  }, [particlesCount, isMobile]);

  // Desktop right-side framing offset: X ≈ 1.7 to 1.9, Mobile: X = 0
  const targetX = isMobile ? 0 : Math.min(Math.max(viewport.width * 0.22, 1.45), 1.9);
  const targetY = isMobile ? -0.1 : 0;
  const baseScale = isMobile ? 1.3 : 1.85;

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Mouse parallax tracking on group
    if (groupRef.current) {
      const targetRotX = pointer.y * 0.15;
      const targetRotY = pointer.x * 0.2;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotX,
        0.05
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotY,
        0.05
      );
    }

    // Outer Primary Ring (Cyan)
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.25 * distortion;
      ring1Ref.current.rotation.x = Math.sin(t * 0.4) * 0.35;
    }

    // Middle Gyroscopic Ring (Purple)
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y += delta * 0.3 * distortion;
      ring2Ref.current.rotation.z = Math.cos(t * 0.35) * 0.45;
    }

    // Inner Core Ring (Cyan Neon)
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x += delta * 0.35 * distortion;
      ring3Ref.current.rotation.y = Math.sin(t * 0.5) * 0.5;
    }

    // Equator Ring (Subtle Starlight White)
    if (ring4Ref.current) {
      ring4Ref.current.rotation.z -= delta * 0.18 * distortion;
    }

    // Ambient Stardust Particles
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.05;
      particlesRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <group ref={groupRef} position={[targetX, targetY, 0]}>
      {/* 1. Outer Primary Quantum Ring (Cyan Neon) */}
      <mesh ref={ring1Ref} scale={baseScale * 1.55} rotation={[Math.PI / 3.2, 0, 0]}>
        <torusGeometry args={[1.0, 0.007, 12, isMobile ? 36 : 64]} />
        <meshBasicMaterial
          color="#00F0FF"
          transparent
          opacity={isMobile ? 0.35 : 0.55}
        />
      </mesh>

      {/* 2. Middle Gyroscopic Orbit Ring (Purple / Magenta) */}
      <mesh ref={ring2Ref} scale={baseScale * 1.3} rotation={[0, Math.PI / 2.8, Math.PI / 4]}>
        <torusGeometry args={[1.0, 0.006, 12, isMobile ? 36 : 64]} />
        <meshBasicMaterial
          color="#A855F7"
          transparent
          opacity={isMobile ? 0.3 : 0.45}
        />
      </mesh>

      {/* 3. Inner Core Halo Ring (Cyan) */}
      <mesh ref={ring3Ref} scale={baseScale * 1.05} rotation={[Math.PI / 2.2, Math.PI / 6, 0]}>
        <torusGeometry args={[1.0, 0.006, 12, isMobile ? 32 : 56]} />
        <meshBasicMaterial
          color="#38BDF8"
          transparent
          opacity={isMobile ? 0.25 : 0.4}
        />
      </mesh>

      {/* 4. Fine Equator Orbit Line (White Starlight) */}
      <mesh ref={ring4Ref} scale={baseScale * 1.75} rotation={[Math.PI / 6, Math.PI / 3, 0]}>
        <torusGeometry args={[1.0, 0.004, 8, isMobile ? 32 : 56]} />
        <meshBasicMaterial
          color="#FFFFFF"
          transparent
          opacity={isMobile ? 0.15 : 0.25}
        />
      </mesh>

      {/* 5. Ambient Stardust Particle Galaxy */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[particleColors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={isMobile ? 0.02 : 0.026}
          vertexColors={true}
          transparent={true}
          opacity={0.55}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

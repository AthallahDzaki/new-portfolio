"use client";

import React, { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { heroVertexShader, heroFragmentShader } from "../shaders/noiseShader";

interface HeroObjectProps {
  distortion?: number;
}

export function HeroObject({ distortion = 1.0 }: HeroObjectProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  const { viewport, pointer } = useThree();
  const isMobile = viewport.width < 5;

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDistortion: { value: distortion },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uColorA: { value: new THREE.Color("#050508") },
      uColorB: { value: new THREE.Color("#12121e") },
      uAccentColor: { value: new THREE.Color("#00F0FF") },
    }),
    [distortion]
  );

  // Background Ambient Dust Particles
  const { particlePositions, particleColors } = useMemo(() => {
    const count = isMobile ? 300 : 700;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const cyan = new THREE.Color("#00F0FF");
    const purple = new THREE.Color("#7928CA");

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
  }, [isMobile]);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = t;
      materialRef.current.uniforms.uDistortion.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uDistortion.value,
        distortion,
        0.05
      );
    }

    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.15;
      meshRef.current.rotation.y += delta * 0.22;

      // Subtle mouse tracking
      const targetRotX = pointer.y * 0.3;
      const targetRotY = pointer.x * 0.3;
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        meshRef.current.rotation.x + targetRotX * 0.05,
        0.05
      );
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        meshRef.current.rotation.y + targetRotY * 0.05,
        0.05
      );
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.3;
      ring1Ref.current.rotation.x = Math.sin(t * 0.4) * 0.5;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.y += delta * 0.35;
      ring2Ref.current.rotation.z = Math.cos(t * 0.4) * 0.5;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.08;
      particlesRef.current.rotation.x += delta * 0.04;
    }
  });

  const scale = isMobile ? 1.35 : 1.85;
  const segments = isMobile ? 48 : 96;

  return (
    <group position={[0, 0, 0]}>
      {/* Signature Organic Deforming Sphere */}
      <mesh ref={meshRef} scale={scale}>
        <sphereGeometry args={[1, segments, segments]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={heroVertexShader}
          fragmentShader={heroFragmentShader}
          uniforms={uniforms}
          transparent={true}
          wireframe={false}
        />
      </mesh>

      {/* Orbiting Quantum Neon Rings */}
      <mesh ref={ring1Ref} scale={scale * 1.4} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.0, 0.008, 16, 80]} />
        <meshBasicMaterial color="#00F0FF" transparent opacity={0.35} />
      </mesh>

      <mesh ref={ring2Ref} scale={scale * 1.6} rotation={[0, Math.PI / 3, 0]}>
        <torusGeometry args={[1.0, 0.006, 16, 80]} />
        <meshBasicMaterial color="#7928CA" transparent opacity={0.25} />
      </mesh>

      {/* Ambient Particle Galaxy */}
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
          size={isMobile ? 0.025 : 0.032}
          vertexColors={true}
          transparent={true}
          opacity={0.65}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

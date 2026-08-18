"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { heroVertexShader, heroFragmentShader } from "../shaders/noiseShader";

export type GeometryType = "sphere" | "torus" | "icosahedron" | "cylinder";

interface PlaygroundSceneProps {
  distortion: number;
  speed: number;
  wireframe: boolean;
  colorTheme: string;
  geometryType: GeometryType;
  particlesCount: number;
}

export function PlaygroundScene({
  distortion,
  speed,
  wireframe,
  colorTheme,
  geometryType,
  particlesCount,
}: PlaygroundSceneProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);

  // Shader Uniforms
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDistortion: { value: distortion },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uColorA: { value: new THREE.Color("#050508") },
      uColorB: { value: new THREE.Color("#161622") },
      uAccentColor: { value: new THREE.Color(colorTheme) },
    }),
    [distortion, colorTheme]
  );

  // Particles Cloud Geometry
  const { particlePositions, particleColors } = useMemo(() => {
    const count = particlesCount;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const baseColor = new THREE.Color(colorTheme);

    for (let i = 0; i < count; i++) {
      const radius = 2.4 + Math.random() * 2.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3 + 0] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      colors[i * 3 + 0] = baseColor.r * (0.5 + Math.random() * 0.5);
      colors[i * 3 + 1] = baseColor.g * (0.5 + Math.random() * 0.5);
      colors[i * 3 + 2] = baseColor.b * (0.5 + Math.random() * 0.5);
    }

    return { particlePositions: positions, particleColors: colors };
  }, [particlesCount, colorTheme]);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime() * speed;

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = t;
      materialRef.current.uniforms.uDistortion.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uDistortion.value,
        distortion,
        0.1
      );
      materialRef.current.uniforms.uAccentColor.value.lerp(
        new THREE.Color(colorTheme),
        0.1
      );
    }

    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.3 * speed;
      meshRef.current.rotation.y += delta * 0.45 * speed;
    }

    if (ringRef1.current) {
      ringRef1.current.rotation.z += delta * 0.4 * speed;
      ringRef1.current.rotation.x = Math.sin(t * 0.5) * 0.4;
    }

    if (ringRef2.current) {
      ringRef2.current.rotation.y += delta * 0.5 * speed;
      ringRef2.current.rotation.z = Math.cos(t * 0.5) * 0.4;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.15 * speed;
      particlesRef.current.rotation.x += delta * 0.08 * speed;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Central Interactive Morphing Mesh */}
      <mesh ref={meshRef} scale={1.6}>
        {geometryType === "sphere" && (
          <sphereGeometry args={[1, 96, 96]} />
        )}
        {geometryType === "torus" && (
          <torusKnotGeometry args={[0.7, 0.28, 160, 32, 2, 3]} />
        )}
        {geometryType === "icosahedron" && (
          <icosahedronGeometry args={[1.1, 4]} />
        )}
        {geometryType === "cylinder" && (
          <cylinderGeometry args={[0.8, 0.8, 1.6, 64, 64]} />
        )}

        <shaderMaterial
          ref={materialRef}
          vertexShader={heroVertexShader}
          fragmentShader={heroFragmentShader}
          uniforms={uniforms}
          transparent={true}
          wireframe={wireframe}
        />
      </mesh>

      {/* Orbiting Quantum Rings */}
      <mesh ref={ringRef1} scale={2.4}>
        <torusGeometry args={[1.0, 0.015, 16, 100]} />
        <meshBasicMaterial
          color={colorTheme}
          transparent
          opacity={0.4}
          wireframe={wireframe}
        />
      </mesh>

      <mesh ref={ringRef2} scale={2.8} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.0, 0.012, 16, 100]} />
        <meshBasicMaterial
          color={colorTheme}
          transparent
          opacity={0.25}
          wireframe={wireframe}
        />
      </mesh>

      {/* Galaxy Particle Cloud */}
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
          size={0.035}
          vertexColors={true}
          transparent={true}
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

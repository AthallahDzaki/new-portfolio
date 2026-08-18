"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  playgroundVertexShader,
  playgroundFragmentShader,
} from "../shaders/playgroundShaders";
import { usePerformance } from "@/context/PerformanceContext";

export type GeometryType = "torus" | "icosahedron" | "sphere" | "vortex" | "saturn";
export type ShaderVisualMode = "holographic" | "normals" | "cyber" | "chrome";

interface PlaygroundSceneProps {
  distortion: number;
  speed: number;
  wireframe: boolean;
  colorTheme: string;
  geometryType: GeometryType;
  shaderMode: ShaderVisualMode;
  particlesCount: number;
  pulseActive: boolean;
  explodeAmount: number;
}

export function PlaygroundScene({
  distortion,
  speed,
  wireframe,
  colorTheme,
  geometryType,
  shaderMode,
  particlesCount,
  pulseActive,
  explodeAmount,
}: PlaygroundSceneProps) {
  const { segments, quality } = usePerformance();
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const innerCoreRef = useRef<THREE.Mesh>(null);

  const shaderModeIndex = useMemo(() => {
    switch (shaderMode) {
      case "holographic":
        return 0;
      case "normals":
        return 1;
      case "cyber":
        return 2;
      case "chrome":
        return 3;
      default:
        return 0;
    }
  }, [shaderMode]);

  // Secondary complementary color based on theme
  const secondaryColor = useMemo(() => {
    const c = new THREE.Color(colorTheme);
    const hsl = { h: 0, s: 0, l: 0 };
    c.getHSL(hsl);
    return new THREE.Color().setHSL((hsl.h + 0.5) % 1.0, 0.9, 0.6);
  }, [colorTheme]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDistortion: { value: distortion },
      uSpeed: { value: speed },
      uPulse: { value: pulseActive ? 1.0 : 0.0 },
      uExplode: { value: explodeAmount },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uAccentColor: { value: new THREE.Color(colorTheme) },
      uSecondaryColor: { value: secondaryColor },
      uShaderMode: { value: shaderModeIndex },
      uWireframeGlow: { value: wireframe ? 1.0 : 0.0 },
    }),
    [distortion, speed, pulseActive, explodeAmount, colorTheme, secondaryColor, shaderModeIndex, wireframe]
  );

  // Particles Cloud
  const { particlePositions, particleColors } = useMemo(() => {
    const count = particlesCount;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const baseColor = new THREE.Color(colorTheme);

    for (let i = 0; i < count; i++) {
      const radius = 2.0 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3 + 0] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      colors[i * 3 + 0] = baseColor.r * (0.6 + Math.random() * 0.4);
      colors[i * 3 + 1] = baseColor.g * (0.6 + Math.random() * 0.4);
      colors[i * 3 + 2] = baseColor.b * (0.6 + Math.random() * 0.4);
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
        0.15
      );
      materialRef.current.uniforms.uExplode.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uExplode.value,
        explodeAmount,
        0.15
      );
      materialRef.current.uniforms.uPulse.value = pulseActive ? 1.0 : 0.0;
      materialRef.current.uniforms.uShaderMode.value = shaderModeIndex;
      materialRef.current.uniforms.uAccentColor.value.lerp(
        new THREE.Color(colorTheme),
        0.1
      );
      materialRef.current.uniforms.uSecondaryColor.value.lerp(
        secondaryColor,
        0.1
      );
    }

    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.35 * speed;
      meshRef.current.rotation.y += delta * 0.5 * speed;
    }

    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.x -= delta * 0.4 * speed;
      innerCoreRef.current.rotation.z += delta * 0.3 * speed;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.5 * speed;
      ring1Ref.current.rotation.x = Math.sin(t * 0.6) * 0.4;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.y += delta * 0.6 * speed;
      ring2Ref.current.rotation.z = Math.cos(t * 0.6) * 0.4;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.2 * speed;
      particlesRef.current.rotation.x += delta * 0.1 * speed;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Central Interactive 3D Mesh */}
      <mesh ref={meshRef} scale={1.55}>
        {geometryType === "torus" && (
          <torusKnotGeometry
            args={[
              0.75,
              0.26,
              quality === "eco" ? 96 : 160,
              quality === "eco" ? 20 : 36,
              2,
              3,
            ]}
          />
        )}
        {geometryType === "icosahedron" && (
          <icosahedronGeometry args={[1.15, quality === "eco" ? 2 : 4]} />
        )}
        {geometryType === "sphere" && (
          <sphereGeometry args={[1.05, segments, segments]} />
        )}
        {geometryType === "vortex" && (
          <torusGeometry
            args={[0.95, 0.35, quality === "eco" ? 24 : 48, quality === "eco" ? 48 : 96]}
          />
        )}
        {geometryType === "saturn" && (
          <sphereGeometry args={[0.85, segments, segments]} />
        )}

        <shaderMaterial
          ref={materialRef}
          vertexShader={playgroundVertexShader}
          fragmentShader={playgroundFragmentShader}
          uniforms={uniforms}
          transparent={true}
          wireframe={wireframe}
        />
      </mesh>

      {/* Saturn Orbital Ring Disk (Special geometry) */}
      {geometryType === "saturn" && (
        <mesh rotation={[Math.PI / 2.5, 0, 0]} scale={1.6}>
          <ringGeometry args={[1.2, 1.8, 48]} />
          <meshStandardMaterial
            color={colorTheme}
            emissive={colorTheme}
            emissiveIntensity={0.8}
            side={THREE.DoubleSide}
            transparent
            opacity={0.7}
            wireframe={wireframe}
          />
        </mesh>
      )}

      {/* Glowing Inner Energy Core (for Icosahedron and Torus) */}
      {(geometryType === "icosahedron" || geometryType === "torus") && (
        <mesh ref={innerCoreRef} scale={0.6}>
          <octahedronGeometry args={[0.8, 0]} />
          <meshBasicMaterial
            color={colorTheme}
            wireframe={true}
            transparent
            opacity={0.8}
          />
        </mesh>
      )}

      {/* Orbiting Quantum Neon Halo Rings */}
      <mesh ref={ring1Ref} scale={2.35}>
        <torusGeometry args={[1.0, 0.015, 12, 48]} />
        <meshBasicMaterial
          color={colorTheme}
          transparent
          opacity={0.5}
        />
      </mesh>

      <mesh ref={ring2Ref} scale={2.7} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.0, 0.012, 12, 48]} />
        <meshBasicMaterial
          color={secondaryColor}
          transparent
          opacity={0.35}
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
          size={0.038}
          vertexColors={true}
          transparent={true}
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

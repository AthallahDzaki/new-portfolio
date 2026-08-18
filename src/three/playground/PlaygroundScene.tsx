"use client";

import React, { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
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
  const { quality } = usePerformance();
  const { viewport } = useThree();
  const isMobile = viewport.width < 5.8 || quality === "eco";

  const meshRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const saturnDiskRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Store original geometry vertex positions for real-time deformation
  const originalPositions = useRef<Float32Array | null>(null);

  // Create lightweight adaptive base geometry based on geometryType & mobile mode
  const baseGeometry = useMemo(() => {
    let geom: THREE.BufferGeometry;
    if (geometryType === "torus") {
      geom = new THREE.TorusKnotGeometry(
        0.85,
        0.28,
        isMobile ? 64 : 112,
        isMobile ? 18 : 30,
        2,
        3
      );
    } else if (geometryType === "icosahedron") {
      geom = new THREE.IcosahedronGeometry(1.25, isMobile ? 0 : 1);
    } else if (geometryType === "sphere") {
      geom = new THREE.SphereGeometry(1.15, isMobile ? 28 : 44, isMobile ? 28 : 44);
    } else if (geometryType === "vortex") {
      geom = new THREE.TorusGeometry(1.05, 0.38, isMobile ? 20 : 30, isMobile ? 36 : 56);
    } else {
      // saturn
      geom = new THREE.SphereGeometry(0.9, isMobile ? 24 : 36, isMobile ? 24 : 36);
    }

    // Save copy of pristine vertex positions
    const pos = geom.attributes.position.array;
    originalPositions.current = new Float32Array(pos);
    return geom;
  }, [geometryType, isMobile]);

  // Secondary complementary color
  const secondaryColor = useMemo(() => {
    const c = new THREE.Color(colorTheme);
    const hsl = { h: 0, s: 0, l: 0 };
    c.getHSL(hsl);
    return new THREE.Color().setHSL((hsl.h + 0.5) % 1.0, 0.9, 0.6);
  }, [colorTheme]);

  // Galaxy Particle Cloud (Optimized for Mobile)
  const { particlePositions, particleColors } = useMemo(() => {
    const count = isMobile ? Math.min(particlesCount, 120) : particlesCount;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const baseColor = new THREE.Color(colorTheme);

    for (let i = 0; i < count; i++) {
      const radius = 2.0 + Math.random() * 2.6;
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
  }, [particlesCount, colorTheme, isMobile]);

  // Real-time Vertex Noise Deformation, Pulse & Dispersal Loop
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime() * speed;

    // Animate mesh rotation
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.35 * speed;
      meshRef.current.rotation.y += delta * 0.5 * speed;

      // Real-time procedural vertex distortion on active geometry
      const isDeforming = distortion > 0.05 || pulseActive || explodeAmount > 0.01;
      const geom = meshRef.current.geometry;

      if (geom && originalPositions.current && isDeforming) {
        const posAttr = geom.attributes.position;
        const count = posAttr.count;
        const orig = originalPositions.current;

        for (let i = 0; i < count; i++) {
          const ox = orig[i * 3 + 0];
          const oy = orig[i * 3 + 1];
          const oz = orig[i * 3 + 2];

          const len = Math.sqrt(ox * ox + oy * oy + oz * oz) || 1;
          const nx = ox / len;
          const ny = oy / len;
          const nz = oz / len;

          // Multi-frequency wave noise
          const wave =
            Math.sin(ox * 3.0 + t * 2.2) *
            Math.cos(oy * 3.0 + t * 1.8) *
            Math.sin(oz * 3.0 + t * 2.0);

          // Pulse heartbeat
          const pulse = pulseActive ? Math.sin(t * 4.5) * 0.12 : 0.0;

          // Total normal displacement
          const disp = wave * distortion * 0.3 + pulse + explodeAmount * 0.75;

          posAttr.setXYZ(i, ox + nx * disp, oy + ny * disp, oz + nz * disp);
        }
        posAttr.needsUpdate = true;
        geom.computeVertexNormals();
      }
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.5 * speed;
      ring1Ref.current.rotation.x = Math.sin(t * 0.6) * 0.4;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.y += delta * 0.6 * speed;
      ring2Ref.current.rotation.z = Math.cos(t * 0.6) * 0.4;
    }

    if (saturnDiskRef.current) {
      saturnDiskRef.current.rotation.z += delta * 0.4 * speed;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.2 * speed;
      particlesRef.current.rotation.x += delta * 0.1 * speed;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Main 3D Shape with Selected Shader Material */}
      <mesh ref={meshRef} geometry={baseGeometry} scale={1.4}>
        {/* Mode 0: HOLOGRAPHIC IRIDESCENT GLASS */}
        {shaderMode === "holographic" && (
          <meshPhysicalMaterial
            color={colorTheme}
            emissive={colorTheme}
            emissiveIntensity={0.5}
            roughness={0.15}
            metalness={0.1}
            transmission={0.45}
            ior={1.6}
            iridescence={1.0}
            iridescenceIOR={1.4}
            clearcoat={1.0}
            clearcoatRoughness={0.1}
            wireframe={wireframe}
            transparent={true}
            opacity={0.92}
          />
        )}

        {/* Mode 1: RGB CYBER NORMALS */}
        {shaderMode === "normals" && (
          <meshNormalMaterial wireframe={wireframe} />
        )}

        {/* Mode 2: CYBER MATRIX SCANLINE */}
        {shaderMode === "cyber" && (
          <meshStandardMaterial
            color="#05050a"
            emissive={colorTheme}
            emissiveIntensity={1.8}
            roughness={0.3}
            metalness={0.7}
            wireframe={wireframe}
          />
        )}

        {/* Mode 3: METALLIC LIQUID CHROME */}
        {shaderMode === "chrome" && (
          <meshStandardMaterial
            color={colorTheme}
            emissive={colorTheme}
            emissiveIntensity={0.35}
            roughness={0.05}
            metalness={0.95}
            wireframe={wireframe}
          />
        )}
      </mesh>

      {/* 2. Saturn Planetary Ring Disk */}
      {geometryType === "saturn" && (
        <mesh
          ref={saturnDiskRef}
          rotation={[Math.PI / 2.6, 0, 0]}
          scale={1.65}
        >
          <ringGeometry args={[1.15, 1.85, isMobile ? 32 : 48]} />
          <meshStandardMaterial
            color={colorTheme}
            emissive={colorTheme}
            emissiveIntensity={0.7}
            side={THREE.DoubleSide}
            transparent
            opacity={0.8}
            wireframe={wireframe}
          />
        </mesh>
      )}

      {/* 3. Orbiting Quantum Halo Rings */}
      <mesh ref={ring1Ref} scale={2.4}>
        <torusGeometry args={[1.0, 0.015, 8, isMobile ? 32 : 48]} />
        <meshBasicMaterial
          color={colorTheme}
          transparent
          opacity={0.45}
        />
      </mesh>

      <mesh ref={ring2Ref} scale={2.75} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.0, 0.012, 8, isMobile ? 32 : 48]} />
        <meshBasicMaterial
          color={secondaryColor}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* 4. Galaxy Dust Particle System */}
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
          size={isMobile ? 0.032 : 0.038}
          vertexColors={true}
          transparent={true}
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

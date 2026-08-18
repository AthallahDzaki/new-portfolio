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
  const { viewport, pointer } = useThree();

  const isMobile = viewport.width < 5;

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDistortion: { value: distortion },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uColorA: { value: new THREE.Color("#050505") },
      uColorB: { value: new THREE.Color("#16161a") },
      uAccentColor: { value: new THREE.Color("#00F0FF") },
    }),
    [distortion]
  );

  useFrame((state, delta) => {
    if (!meshRef.current || !materialRef.current) return;

    // Time uniform increment
    materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    materialRef.current.uniforms.uDistortion.value = THREE.MathUtils.lerp(
      materialRef.current.uniforms.uDistortion.value,
      distortion,
      0.05
    );

    // Subtle pointer interaction
    const targetRotX = pointer.y * 0.4;
    const targetRotY = pointer.x * 0.4;

    meshRef.current.rotation.x += delta * 0.15;
    meshRef.current.rotation.y += delta * 0.2;

    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      meshRef.current.rotation.x + targetRotX * 0.1,
      0.05
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      meshRef.current.rotation.y + targetRotY * 0.1,
      0.05
    );
  });

  // Responsive scale and position
  const scale = isMobile ? 1.4 : 1.9;
  const segments = isMobile ? 48 : 96;

  return (
    <group position={[0, 0, 0]}>
      {/* Signature Organic Sphere */}
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

      {/* Orbiting Subtle Glow Ring */}
      <mesh rotation={[Math.PI / 3, 0, 0]} scale={scale * 1.35}>
        <ringGeometry args={[0.98, 1.0, 64]} />
        <meshBasicMaterial
          color="#00F0FF"
          transparent={true}
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

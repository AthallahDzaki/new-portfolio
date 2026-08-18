"use client";

import React, { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { Skill } from "@/types";

interface SkillNodeProps {
  skill: Skill;
  isSelected: boolean;
  isCategoryHighlighted: boolean;
  onSelect: (skill: Skill) => void;
}

export function SkillNode({
  skill,
  isSelected,
  isCategoryHighlighted,
  onSelect,
}: SkillNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const initialPos = skill.position || [0, 0, 0];
  const { viewport } = useThree();
  const isMobile = viewport.width < 5.8;

  const isMainHub =
    skill.id === "threejs" ||
    skill.id === "react" ||
    skill.id === "nextjs" ||
    skill.id === "gsap" ||
    skill.id === "nodejs" ||
    skill.id === "git";

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Very subtle floating motion (0.015 amplitude)
    const t = state.clock.getElapsedTime();
    const offset = skill.name.length * 0.3;
    meshRef.current.position.y =
      initialPos[1] + Math.sin(t * 1.2 + offset) * 0.015;

    // Rotation
    meshRef.current.rotation.x += delta * 0.2;
    meshRef.current.rotation.y += delta * 0.25;

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.35;
    }

    // Scale lerp
    const baseScale = isMainHub ? (isMobile ? 0.85 : 0.95) : (isMobile ? 0.65 : 0.72);
    const targetScale = isSelected
      ? baseScale * 1.35
      : hovered
      ? baseScale * 1.2
      : baseScale;

    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.15
    );
  });

  const active = isSelected || hovered || isCategoryHighlighted;

  // Short clean names on mobile so tags NEVER collide
  const displayName = isMobile
    ? skill.id === "gsap"
      ? "GSAP"
      : skill.id === "glsl"
      ? "GLSL"
      : skill.id === "r3f"
      ? "R3F"
      : skill.id === "typescript"
      ? "TS"
      : skill.id === "tailwind"
      ? "TAILWIND"
      : skill.id === "postgresql"
      ? "POSTGRES"
      : skill.id === "git"
      ? "GIT"
      : skill.id === "figma"
      ? "FIGMA"
      : skill.id === "threejs"
      ? "THREE.JS"
      : skill.name
    : skill.name;

  // Clean label offsets ensuring zero overlaps
  const labelOffset: [number, number, number] =
    skill.id === "threejs" || skill.id === "postgresql" || skill.id === "figma" || skill.id === "r3f" || skill.id === "glsl"
      ? [0, isMobile ? 0.22 : 0.25, 0]
      : skill.id === "tailwind"
      ? [0.12, isMobile ? -0.2 : -0.24, 0]
      : [0, isMobile ? -0.2 : -0.24, 0];

  return (
    <group position={[initialPos[0], initialPos[1], initialPos[2]]}>
      {/* 3D Interactive Node Mesh */}
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(skill);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
      >
        <octahedronGeometry args={[isMainHub ? 0.2 : 0.14, 0]} />
        <meshStandardMaterial
          color={isSelected ? "#00F0FF" : hovered ? "#55f7ff" : isMainHub ? "#00F0FF" : "#ffffff"}
          emissive={active ? "#00F0FF" : "#1a1a24"}
          emissiveIntensity={isSelected ? 2.2 : hovered ? 1.4 : isCategoryHighlighted ? 0.9 : 0.25}
          roughness={0.2}
          metalness={0.8}
          wireframe={!isSelected && !hovered}
        />
      </mesh>

      {/* Orbiting Halo Ring for Main Hubs */}
      {isMainHub && (
        <mesh ref={ringRef} rotation={[Math.PI / 4, 0, 0]}>
          <ringGeometry args={[0.26, 0.29, 32]} />
          <meshBasicMaterial
            color="#00F0FF"
            transparent
            opacity={isSelected ? 0.8 : hovered ? 0.5 : 0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Clean Compact HUD Tag */}
      <Html
        position={labelOffset}
        center
        distanceFactor={isMobile ? 9.5 : 7.5}
        zIndexRange={[10, 0]}
        style={{ pointerEvents: "none" }}
      >
        <div
          className={`font-mono font-bold tracking-wider uppercase whitespace-nowrap transition-all duration-200 select-none ${
            isMobile
              ? "text-[8px] px-1.5 py-0.5"
              : isMainHub
              ? "text-[10px] px-2 py-0.5"
              : "text-[8.5px] px-2 py-0.5"
          } ${
            isSelected
              ? "bg-[#00F0FF] text-black shadow-[0_0_15px_#00F0FF] scale-110"
              : hovered
              ? "bg-white/20 text-[#00F0FF] border border-[#00F0FF] backdrop-blur-md"
              : isCategoryHighlighted
              ? "bg-black/85 text-white border border-[#00F0FF]/60 shadow-[0_0_8px_rgba(0,240,255,0.15)]"
              : "bg-black/75 text-white/50 border border-white/10"
          }`}
        >
          {displayName}
        </div>
      </Html>
    </group>
  );
}

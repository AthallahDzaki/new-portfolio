"use client";

import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
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

  const isMainHub =
    skill.id === "threejs" ||
    skill.id === "react" ||
    skill.id === "nextjs" ||
    skill.id === "gsap" ||
    skill.id === "nodejs" ||
    skill.id === "git";

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Gentle floating motion
    const t = state.clock.getElapsedTime();
    const offset = skill.name.length * 0.4;
    meshRef.current.position.y =
      initialPos[1] + Math.sin(t * 1.8 + offset) * 0.06;

    // Rotation
    meshRef.current.rotation.x += delta * 0.25;
    meshRef.current.rotation.y += delta * 0.35;

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.5;
    }

    // Scale animation lerp
    const baseScale = isMainHub ? 1.15 : 0.85;
    const targetScale = isSelected
      ? baseScale * 1.45
      : hovered
      ? baseScale * 1.3
      : baseScale;

    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.15
    );
  });

  const active = isSelected || hovered || isCategoryHighlighted;

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
        <octahedronGeometry args={[isMainHub ? 0.32 : 0.22, 0]} />
        <meshStandardMaterial
          color={isSelected ? "#00F0FF" : hovered ? "#55f7ff" : isMainHub ? "#00F0FF" : "#ffffff"}
          emissive={active ? "#00F0FF" : "#1a1a24"}
          emissiveIntensity={isSelected ? 2.0 : hovered ? 1.2 : isCategoryHighlighted ? 0.8 : 0.2}
          roughness={0.2}
          metalness={0.8}
          wireframe={!isSelected && !hovered}
        />
      </mesh>

      {/* Orbiting Halo Ring for Main Hubs */}
      {isMainHub && (
        <mesh ref={ringRef} rotation={[Math.PI / 4, 0, 0]}>
          <ringGeometry args={[0.42, 0.46, 32]} />
          <meshBasicMaterial
            color="#00F0FF"
            transparent
            opacity={isSelected ? 0.8 : hovered ? 0.5 : 0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Clean HUD Label */}
      <Html
        position={[0, isMainHub ? -0.55 : -0.42, 0]}
        center
        distanceFactor={9}
        zIndexRange={[100, 0]}
        style={{ pointerEvents: "none" }}
      >
        <div
          className={`font-mono font-bold tracking-widest uppercase px-2 py-0.5 whitespace-nowrap transition-all duration-200 select-none ${
            isMainHub ? "text-[11px]" : "text-[9px]"
          } ${
            isSelected
              ? "bg-[#00F0FF] text-black shadow-[0_0_15px_#00F0FF] scale-110"
              : hovered
              ? "bg-white/20 text-[#00F0FF] border border-[#00F0FF] backdrop-blur-md"
              : isCategoryHighlighted
              ? "bg-white/10 text-white border border-[#00F0FF]/50"
              : "bg-black/60 text-white/60 border border-white/10"
          }`}
        >
          {skill.name}
        </div>
      </Html>
    </group>
  );
}

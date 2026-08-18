"use client";

import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { Skill } from "@/types";

interface SkillNodeProps {
  skill: Skill;
  isSelected: boolean;
  onSelect: (skill: Skill) => void;
}

export function SkillNode({ skill, isSelected, onSelect }: SkillNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const initialPos = skill.position || [0, 0, 0];

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Gentle floating motion
    const t = state.clock.getElapsedTime();
    const offset = skill.name.length * 0.5;
    meshRef.current.position.y = initialPos[1] + Math.sin(t * 1.5 + offset) * 0.08;

    // Slow rotation
    meshRef.current.rotation.x += delta * 0.3;
    meshRef.current.rotation.y += delta * 0.4;

    // Scale animation lerp
    const targetScale = isSelected ? 1.4 : hovered ? 1.25 : 1.0;
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.15
    );
  });

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
        <icosahedronGeometry args={[0.3, 1]} />
        <meshStandardMaterial
          color={isSelected ? "#00F0FF" : hovered ? "#55f7ff" : "#1a1a24"}
          emissive={isSelected ? "#00F0FF" : hovered ? "#00F0FF" : "#111116"}
          emissiveIntensity={isSelected ? 1.5 : hovered ? 0.8 : 0.2}
          roughness={0.2}
          metalness={0.8}
          wireframe={!isSelected && !hovered}
        />
      </mesh>

      {/* HTML 3D Floating Tag */}
      <Html
        position={[0, -0.45, 0]}
        center
        distanceFactor={8}
        zIndexRange={[100, 0]}
        style={{ pointerEvents: "none" }}
      >
        <div
          className={`font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2 py-0.5 border whitespace-nowrap transition-all duration-200 select-none ${
            isSelected
              ? "bg-[#00F0FF] text-black border-[#00F0FF] shadow-[0_0_12px_#00F0FF]"
              : hovered
              ? "bg-white/20 text-white border-[#00F0FF]"
              : "bg-[#050505]/80 text-white/70 border-white/10"
          }`}
        >
          {skill.name}
        </div>
      </Html>
    </group>
  );
}

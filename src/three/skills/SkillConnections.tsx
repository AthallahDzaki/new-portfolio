"use client";

import React, { useMemo } from "react";
import * as THREE from "three";
import { Skill } from "@/types";

interface SkillConnectionsProps {
  skills: Skill[];
  selectedSkill: Skill | null;
}

export function SkillConnections({ skills, selectedSkill }: SkillConnectionsProps) {
  const { primaryGeometry, secondaryGeometry } = useMemo(() => {
    const primaryPoints: number[] = [];
    const secondaryPoints: number[] = [];

    const getPos = (id: string): [number, number, number] | null => {
      const s = skills.find((item) => item.id === id);
      return s?.position ? s.position : null;
    };

    // 1. Primary Diamond Topology:
    // Left-to-Center: [Node.js] -> [React]
    // Top Arm Left: [React] -> [R3F] -> [Three.js]
    // Top Arm Right: [Three.js] -> [GLSL] -> [Next.js]
    // Bottom Arm Left: [React] -> [GSAP]
    // Bottom Arm Right: [GSAP] -> [Tailwind] -> [Next.js]
    // Center-to-Right: [Next.js] -> [Git]
    const primaryEdges = [
      ["nodejs", "react"],       // E - A
      ["react", "r3f"],
      ["r3f", "threejs"],        // A - Top
      ["threejs", "glsl"],
      ["glsl", "nextjs"],        // Top - B
      ["react", "gsap"],         // A - Bottom
      ["gsap", "tailwind"],
      ["tailwind", "nextjs"],    // Bottom - B
      ["nextjs", "git"],         // B - D
    ];

    primaryEdges.forEach(([srcId, tgtId]) => {
      const p1 = getPos(srcId);
      const p2 = getPos(tgtId);
      if (p1 && p2) {
        primaryPoints.push(...p1, ...p2);
      }
    });

    // 2. Secondary Vertical Satellite Drops
    const secondaryEdges = [
      ["nodejs", "postgresql"],
      ["react", "typescript"],
      ["git", "figma"],
    ];

    secondaryEdges.forEach(([srcId, tgtId]) => {
      const p1 = getPos(srcId);
      const p2 = getPos(tgtId);
      if (p1 && p2) {
        secondaryPoints.push(...p1, ...p2);
      }
    });

    const primGeo = new THREE.BufferGeometry();
    primGeo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(primaryPoints, 3)
    );

    const secGeo = new THREE.BufferGeometry();
    secGeo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(secondaryPoints, 3)
    );

    return { primaryGeometry: primGeo, secondaryGeometry: secGeo };
  }, [skills]);

  return (
    <group>
      {/* Primary Diamond Constellation Lines */}
      <lineSegments geometry={primaryGeometry}>
        <lineBasicMaterial
          color="#00F0FF"
          transparent={true}
          opacity={selectedSkill ? 0.75 : 0.55}
          linewidth={2}
        />
      </lineSegments>

      {/* Secondary Sub-Node Drops */}
      <lineSegments geometry={secondaryGeometry}>
        <lineBasicMaterial
          color="#00F0FF"
          transparent={true}
          opacity={selectedSkill ? 0.45 : 0.3}
          linewidth={1}
        />
      </lineSegments>
    </group>
  );
}

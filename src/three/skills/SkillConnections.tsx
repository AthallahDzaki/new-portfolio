"use client";

import React, { useMemo } from "react";
import * as THREE from "three";
import { Skill } from "@/types";

interface SkillConnectionsProps {
  skills: Skill[];
  selectedSkill: Skill | null;
}

export function SkillConnections({ skills, selectedSkill }: SkillConnectionsProps) {
  // Primary diamond connections and satellite lines
  const { primaryGeometry, secondaryGeometry } = useMemo(() => {
    const primaryPoints: number[] = [];
    const secondaryPoints: number[] = [];

    const getPos = (id: string): [number, number, number] | null => {
      const s = skills.find((item) => item.id === id);
      return s?.position ? s.position : null;
    };

    // 1. Primary Diamond Topology: (E - A - Top - B - D) & (A - Bottom - B)
    const primaryEdges = [
      ["nodejs", "react"],      // E - A
      ["react", "threejs"],     // A - Top
      ["react", "gsap"],        // A - Bottom
      ["nextjs", "threejs"],    // B - Top
      ["nextjs", "gsap"],       // B - Bottom
      ["nextjs", "git"],        // B - D
    ];

    primaryEdges.forEach(([srcId, tgtId]) => {
      const p1 = getPos(srcId);
      const p2 = getPos(tgtId);
      if (p1 && p2) {
        primaryPoints.push(...p1, ...p2);
      }
    });

    // 2. Secondary Satellite Connections
    const secondaryEdges = [
      ["nodejs", "postgresql"],
      ["react", "typescript"],
      ["threejs", "r3f"],
      ["threejs", "glsl"],
      ["gsap", "tailwind"],
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
          opacity={selectedSkill ? 0.6 : 0.45}
          linewidth={2}
        />
      </lineSegments>

      {/* Secondary Sub-Node Lines */}
      <lineSegments geometry={secondaryGeometry}>
        <lineBasicMaterial
          color="#00F0FF"
          transparent={true}
          opacity={selectedSkill ? 0.35 : 0.2}
          linewidth={1}
        />
      </lineSegments>
    </group>
  );
}

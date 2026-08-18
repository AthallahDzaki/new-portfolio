"use client";

import React, { useMemo } from "react";
import * as THREE from "three";
import { Skill } from "@/types";

interface SkillConnectionsProps {
  skills: Skill[];
  selectedSkill: Skill | null;
}

export function SkillConnections({ skills, selectedSkill }: SkillConnectionsProps) {
  const lineSegments = useMemo(() => {
    const points: number[] = [];

    // Connect skills that are related
    skills.forEach((skill) => {
      const skillPos = skill.position;
      if (!skillPos) return;
      const related = skill.relatedSkills || [];

      related.forEach((relName) => {
        const target = skills.find(
          (s) => s.name.toLowerCase() === relName.toLowerCase()
        );
        if (target && target.position) {
          const targetPos = target.position;
          points.push(
            skillPos[0],
            skillPos[1],
            skillPos[2],
            targetPos[0],
            targetPos[1],
            targetPos[2]
          );
        }
      });
    });

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(points, 3)
    );
    return geometry;
  }, [skills]);

  return (
    <lineSegments geometry={lineSegments}>
      <lineBasicMaterial
        color="#00F0FF"
        transparent={true}
        opacity={selectedSkill ? 0.4 : 0.15}
        linewidth={1}
      />
    </lineSegments>
  );
}

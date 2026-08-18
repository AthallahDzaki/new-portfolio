"use client";

import React, { useRef } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Skill, SkillCategory } from "@/types";
import { SkillNode } from "./SkillNode";
import { SkillConnections } from "./SkillConnections";

interface SkillsSceneProps {
  skills: Skill[];
  selectedSkill: Skill | null;
  selectedCategory?: SkillCategory | "all";
  onSelectSkill: (skill: Skill) => void;
}

export function SkillsScene({
  skills,
  selectedSkill,
  selectedCategory = "all",
  onSelectSkill,
}: SkillsSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  // Responsive scale: ensures all 11 nodes from leftmost (-1.8) to rightmost (+1.8) fit with clear margins on mobile
  const responsiveScale =
    viewport.width < 4.2
      ? 0.5
      : viewport.width < 5.0
      ? 0.58
      : viewport.width < 6.0
      ? 0.68
      : 1.0;

  return (
    <group
      ref={groupRef}
      position={[0, 0, 0]}
      scale={[responsiveScale, responsiveScale, responsiveScale]}
    >
      <SkillConnections skills={skills} selectedSkill={selectedSkill} />
      {skills.map((skill) => {
        const isCat =
          selectedCategory === "all" || skill.category === selectedCategory;
        return (
          <SkillNode
            key={skill.id}
            skill={skill}
            isSelected={selectedSkill?.id === skill.id}
            isCategoryHighlighted={isCat}
            onSelect={onSelectSkill}
          />
        );
      })}
    </group>
  );
}

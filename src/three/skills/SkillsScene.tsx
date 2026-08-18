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

  // Responsive scale: on narrow mobile screens (viewport.width < 5.8), scale proportionally
  // so the entire diamond width & height fits with generous margins on any smartphone!
  const responsiveScale =
    viewport.width < 4.2
      ? 0.72
      : viewport.width < 5.8
      ? 0.82
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

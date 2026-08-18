"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
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

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    // Gentle hovering rotation
    groupRef.current.rotation.y += delta * 0.05;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
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

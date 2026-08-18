"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Skill } from "@/types";
import { SkillNode } from "./SkillNode";
import { SkillConnections } from "./SkillConnections";

interface SkillsSceneProps {
  skills: Skill[];
  selectedSkill: Skill | null;
  onSelectSkill: (skill: Skill) => void;
}

export function SkillsScene({
  skills,
  selectedSkill,
  onSelectSkill,
}: SkillsSceneProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    // Slow overall rotation for organic constellation feel
    groupRef.current.rotation.y += delta * 0.04;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <SkillConnections skills={skills} selectedSkill={selectedSkill} />
      {skills.map((skill) => (
        <SkillNode
          key={skill.id}
          skill={skill}
          isSelected={selectedSkill?.id === skill.id}
          onSelect={onSelectSkill}
        />
      ))}
    </group>
  );
}

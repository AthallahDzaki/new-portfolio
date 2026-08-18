"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface CameraRigProps {
  scrollProgress?: number;
}

export function CameraRig({ scrollProgress = 0 }: CameraRigProps) {
  const { camera, pointer } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 0, 6));
  const isTouch = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    isTouch.current = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  }, []);

  useFrame((_, delta) => {
    if (prefersReducedMotion) {
      camera.position.lerp(targetPos.current, 0.05);
      camera.lookAt(0, 0, 0);
      return;
    }

    // Parallax from pointer (desktop only, subtle)
    const parallaxX = isTouch.current ? 0 : pointer.x * 0.35;
    const parallaxY = isTouch.current ? 0 : pointer.y * 0.25;

    // Camera base distance according to viewport aspect ratio
    const aspect = window.innerWidth / Math.max(window.innerHeight, 1);
    const zDist = aspect < 1 ? 7.5 : 5.5;

    targetPos.current.set(
      parallaxX,
      parallaxY - scrollProgress * 1.5,
      zDist
    );

    camera.position.lerp(targetPos.current, Math.min(delta * 4, 0.1));
    camera.lookAt(0, -scrollProgress * 1.0, 0);
  });

  return null;
}

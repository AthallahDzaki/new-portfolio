"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const isTouchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;

    setIsTouch(isTouchDevice);
    if (isTouchDevice || prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.getAttribute("role") === "button"
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [prefersReducedMotion]);

  if (isTouch || prefersReducedMotion) {
    return null;
  }

  // Outer ring radius = 16px (32px width), Dot radius = 3px (6px width)
  const RING_SIZE = 32;
  const DOT_SIZE = 6;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {/* Outer Ring - Exactly centered on pointer */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-[#00F0FF]/60 pointer-events-none z-50"
        style={{
          width: RING_SIZE,
          height: RING_SIZE,
        }}
        animate={{
          x: position.x - RING_SIZE / 2,
          y: position.y - RING_SIZE / 2,
          scale: isHovered ? 1.5 : 1.0,
          borderColor: isHovered ? "#00F0FF" : "rgba(0, 240, 255, 0.45)",
          backgroundColor: isHovered ? "rgba(0, 240, 255, 0.15)" : "transparent",
        }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 300,
          mass: 0.1,
        }}
      />

      {/* Center Dot - Exactly centered in the outer ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full bg-[#00F0FF] pointer-events-none z-50 shadow-[0_0_8px_#00F0FF]"
        style={{
          width: DOT_SIZE,
          height: DOT_SIZE,
        }}
        animate={{
          x: position.x - DOT_SIZE / 2,
          y: position.y - DOT_SIZE / 2,
        }}
        transition={{
          type: "spring",
          damping: 40,
          stiffness: 800,
        }}
      />
    </div>
  );
}

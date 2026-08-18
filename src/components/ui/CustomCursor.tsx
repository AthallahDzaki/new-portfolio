"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.tagName === "INPUT" ||
          target.closest("button") ||
          target.closest("a") ||
          target.getAttribute("role") === "button" ||
          target.classList.contains("cursor-pointer") ||
          target.classList.contains("cursor-grab"))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleTouchStart = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("touchstart", handleTouchStart);
    };
  }, [isVisible, prefersReducedMotion]);

  if (prefersReducedMotion || !isVisible) {
    return null;
  }

  // Outer ring radius = 16px (32px width), Dot radius = 3px (6px width)
  const RING_SIZE = 34;
  const DOT_SIZE = 6;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none"
      aria-hidden="true"
    >
      <AnimatePresence>
        {isVisible && (
          <>
            {/* Outer Interactive Glowing Ring - Smooth Spring Follow */}
            <motion.div
              className="fixed top-0 left-0 rounded-full border border-[#00F0FF]/70 pointer-events-none z-[9999]"
              style={{
                width: RING_SIZE,
                height: RING_SIZE,
              }}
              animate={{
                x: position.x - RING_SIZE / 2,
                y: position.y - RING_SIZE / 2,
                scale: isHovered ? 1.6 : 1.0,
                borderColor: isHovered ? "#00F0FF" : "rgba(0, 240, 255, 0.6)",
                backgroundColor: isHovered
                  ? "rgba(0, 240, 255, 0.18)"
                  : "rgba(0, 240, 255, 0.03)",
                boxShadow: isHovered
                  ? "0 0 20px rgba(0, 240, 255, 0.4)"
                  : "0 0 8px rgba(0, 240, 255, 0.15)",
              }}
              transition={{
                type: "spring",
                damping: 24,
                stiffness: 320,
                mass: 0.1,
              }}
            />

            {/* Precision Laser Center Dot */}
            <motion.div
              className="fixed top-0 left-0 rounded-full bg-[#00F0FF] pointer-events-none z-[9999] shadow-[0_0_10px_#00F0FF]"
              style={{
                width: DOT_SIZE,
                height: DOT_SIZE,
              }}
              animate={{
                x: position.x - DOT_SIZE / 2,
                y: position.y - DOT_SIZE / 2,
                scale: isHovered ? 1.3 : 1.0,
              }}
              transition={{
                type: "spring",
                damping: 45,
                stiffness: 900,
              }}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type QualityLevel = "eco" | "balanced" | "ultra";

interface PerformanceContextType {
  quality: QualityLevel;
  setQuality: (level: QualityLevel) => void;
  dpr: number;
  segments: number;
  particlesCount: number;
  enableShaders: boolean;
}

const PerformanceContext = createContext<PerformanceContextType>({
  quality: "eco",
  setQuality: () => {},
  dpr: 1,
  segments: 32,
  particlesCount: 150,
  enableShaders: true,
});

export function PerformanceProvider({ children }: { children: React.ReactNode }) {
  // Default to 'eco' for instant lightweight, buttery-smooth 60fps performance
  const [quality, setQualityState] = useState<QualityLevel>("eco");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("portfolio_graphics_quality") as QualityLevel;
      if (saved && (saved === "eco" || saved === "balanced" || saved === "ultra")) {
        setQualityState(saved);
      }
    } catch {
      // Fallback to eco
    }
  }, []);

  const setQuality = (level: QualityLevel) => {
    setQualityState(level);
    try {
      localStorage.setItem("portfolio_graphics_quality", level);
    } catch {
      // Ignore
    }
  };

  const dpr = quality === "eco" ? 1.0 : quality === "balanced" ? 1.25 : 1.5;
  const segments = quality === "eco" ? 32 : quality === "balanced" ? 64 : 96;
  const particlesCount = quality === "eco" ? 100 : quality === "balanced" ? 300 : 600;
  const enableShaders = true;

  return (
    <PerformanceContext.Provider
      value={{
        quality,
        setQuality,
        dpr,
        segments,
        particlesCount,
        enableShaders,
      }}
    >
      {children}
    </PerformanceContext.Provider>
  );
}

export function usePerformance() {
  return useContext(PerformanceContext);
}

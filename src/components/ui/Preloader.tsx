"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@react-three/drei";

interface PreloaderProps {
  onComplete?: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const { progress, active } = useProgress();
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Smooth progress interpolation
    const timer = setInterval(() => {
      setDisplayProgress((prev) => {
        const target = active ? Math.max(prev, Math.round(progress)) : 100;
        const next = prev + Math.ceil((target - prev) * 0.2);
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsFinished(true);
            onComplete?.();
          }, 400);
          return 100;
        }
        return next;
      });
    }, 30);

    return () => clearInterval(timer);
  }, [progress, active, onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-white p-6 select-none"
          role="progressbar"
          aria-valuenow={displayProgress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Loading Experience"
        >
          <div className="w-full max-w-md flex flex-col items-center text-center">
            {/* Monogram / Header */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-mono text-xs text-[#00F0FF] uppercase tracking-[0.3em] mb-3"
            >
              INITIALIZING EXPERIENCE
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-8"
            >
              ATHALLAH DZAKI
              <span className="block text-white/50 text-lg sm:text-xl font-medium tracking-normal mt-1">
                ANGGORO SEPUTRO
              </span>
            </motion.h1>

            {/* Progress Bar */}
            <div className="w-full h-[3px] bg-white/10 overflow-hidden relative mb-4">
              <motion.div
                className="h-full bg-[#00F0FF] shadow-[0_0_12px_#00F0FF]"
                style={{ width: `${displayProgress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>

            {/* Progress Percentage & Status */}
            <div className="w-full flex justify-between items-center font-mono text-xs text-white/50">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-ping inline-block" />
                LOADING ASSETS
              </span>
              <span className="text-white font-semibold">{displayProgress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

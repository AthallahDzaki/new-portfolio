"use client";

import { useEffect, useRef } from "react";

export function useScrollProgress() {
  const progressRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        progressRef.current = Math.min(Math.max(window.scrollY / totalScroll, 0), 1);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progressRef;
}

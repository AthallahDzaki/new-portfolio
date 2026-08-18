"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUp, Heart } from "lucide-react";
import { socials } from "@/data/socials";

export function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setTime(new Intl.DateTimeFormat("en-US", options).format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full bg-[#050505] border-t border-white/10 px-4 sm:px-8 md:px-12 py-16 text-white select-none z-10">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Top Footer Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pb-12 border-b border-white/10">
          <div>
            <div className="font-mono text-xs text-[#00F0FF] uppercase tracking-[0.25em] mb-2">
              {"// ATHALLAH DZAKI"}
            </div>
            <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
              ATHALLAH DZAKI <br />
              <span className="text-white/40">ANGGORO SEPUTRO</span>
            </h3>
            <p className="text-sm text-white/60 font-light mt-2">
              Creative Developer & WebGL Frontend Engineer
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Live Clock */}
            <div className="p-3 bg-white/5 border border-white/10 font-mono text-xs">
              <div className="text-white/40 uppercase text-[10px]">
                JAKARTA, ID / GMT+7
              </div>
              <div className="text-[#00F0FF] font-semibold text-sm mt-0.5">
                {time || "13:30:00"}
              </div>
            </div>

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 p-3 bg-white/5 hover:bg-[#00F0FF] hover:text-black border border-white/10 text-white font-mono text-xs uppercase tracking-wider transition-colors min-h-[44px]"
              aria-label="Scroll back to top of page"
            >
              <span>TOP</span>
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-white/40">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
            <span>WEBGL / ACTIVE</span>
            <span className="mx-2">•</span>
            <span>NEXT.JS & THREE.JS</span>
          </div>

          <div>
            © 2026 Athallah Dzaki Anggoro Seputro. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

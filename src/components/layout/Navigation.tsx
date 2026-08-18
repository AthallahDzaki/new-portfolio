"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { socials } from "@/data/socials";
import { QualitySettingsSwitcher } from "@/components/ui/QualitySettingsSwitcher";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Playground", href: "#playground" },
  { label: "Contact", href: "#contact" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 40);

      // If at the very top of the page (Hero / Top), default to "about"
      if (scrollY < 250) {
        setActiveSection("about");
        return;
      }

      // Detect active section using getBoundingClientRect for absolute viewport accuracy
      const sections = NAV_LINKS.map((link) => link.href.substring(1));
      const viewportCenter = window.innerHeight * 0.45;
      let currentSection = "";

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= viewportCenter && rect.bottom > viewportCenter) {
            currentSection = sectionId;
            break;
          }
        }
      }

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    // Run once on mount to establish active section
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  // Handle Escape key to close menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-4 sm:px-8 py-4 safe-top",
          scrolled
            ? "bg-[#050505]/80 backdrop-blur-md border-b border-white/10"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo / Monogram */}
          <Link
            href="/"
            className="font-mono text-sm tracking-widest font-bold uppercase text-white hover:text-[#00F0FF] transition-colors flex items-center gap-2"
          >
            <span className="w-2 h-2 bg-[#00F0FF] rounded-full inline-block" />
            ATHALLAH.
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={cn(
                    "font-mono text-xs uppercase tracking-widest transition-all relative py-1 focus:outline-none focus-visible:text-[#00F0FF]",
                    isActive
                      ? "text-[#00F0FF] font-semibold"
                      : "text-white/70 hover:text-white"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-px bg-[#00F0FF]"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop CTA / Availability & Quality Switcher */}
          <div className="hidden lg:flex items-center gap-3">
            <QualitySettingsSwitcher />
            <div className="flex items-center gap-2 font-mono text-[11px] text-white/60 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              AVAILABLE FOR WORK
            </div>
            <button
              onClick={() => handleNavClick("#contact")}
              className="font-mono text-xs uppercase tracking-wider bg-white text-black px-4 py-2 hover:bg-[#00F0FF] transition-colors"
            >
              LET&apos;S TALK
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex lg:hidden items-center gap-2">
            <QualitySettingsSwitcher />
            {/* Mobile Menu Toggle Button (Min 44x44px touch area) */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden flex items-center justify-center w-11 h-11 text-white border border-white/15 bg-white/5 active:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]"
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-30 bg-[#050505] flex flex-col justify-between p-6 pt-24 pb-8 md:hidden safe-top safe-bottom overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
          >
            <div className="flex flex-col gap-6 my-auto">
              <span className="font-mono text-xs text-[#00F0FF] uppercase tracking-[0.3em]">
                {"// NAVIGATION"}
              </span>
              <nav className="flex flex-col gap-4">
                {NAV_LINKS.map((link, idx) => (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.06 }}
                    onClick={() => handleNavClick(link.href)}
                    className="text-left text-3xl font-bold tracking-tight text-white hover:text-[#00F0FF] active:text-[#00F0FF] transition-colors py-2 border-b border-white/10 flex items-center justify-between"
                  >
                    <span>{link.label}</span>
                    <span className="font-mono text-xs text-white/40 font-normal">
                      0{idx + 1}
                    </span>
                  </motion.button>
                ))}
              </nav>
            </div>

            {/* Mobile Footer Links */}
            <div className="pt-6 border-t border-white/10">
              <div className="font-mono text-[11px] text-white/50 mb-3 tracking-widest uppercase">
                Connect
              </div>
              <div className="flex flex-wrap gap-4">
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-white/80 hover:text-[#00F0FF] flex items-center gap-1 min-h-[44px] min-w-[44px]"
                  >
                    {s.name} <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

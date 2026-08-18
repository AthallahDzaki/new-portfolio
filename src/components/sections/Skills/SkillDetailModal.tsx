"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, ArrowRight } from "lucide-react";
import { Skill } from "@/types";
import { skills } from "@/data/skills";

interface SkillDetailModalProps {
  skill: Skill | null;
  onClose: () => void;
  onSelectSkill: (skill: Skill) => void;
}

export function SkillDetailModal({
  skill,
  onClose,
  onSelectSkill,
}: SkillDetailModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (skill) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      // Focus close button on open
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [skill, onClose]);

  if (!skill) return null;

  // Find related skill objects from data
  const relatedSkillObjects = (skill.relatedSkills || [])
    .map((name) =>
      skills.find(
        (s) =>
          s.name.toLowerCase() === name.toLowerCase() ||
          s.id.toLowerCase() === name.toLowerCase()
      )
    )
    .filter(Boolean) as Skill[];

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="skill-modal-title"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Container: Bottom sheet on mobile, Centered dialog on desktop */}
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.96 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full sm:max-w-xl max-h-[85dvh] bg-[#0c0c0e] border-t sm:border border-white/15 rounded-t-2xl sm:rounded-none shadow-2xl flex flex-col z-10 overflow-hidden safe-bottom"
        >
          {/* Mobile swipe indicator */}
          <div className="sm:hidden w-12 h-1 bg-white/20 rounded-full mx-auto mt-3 mb-1" />

          {/* Modal Header */}
          <div className="p-6 pb-4 border-b border-white/10 flex items-start justify-between">
            <div>
              <div className="font-mono text-xs text-[#00F0FF] uppercase tracking-[0.25em] mb-1">
                // {skill.category}
              </div>
              <h3
                id="skill-modal-title"
                className="text-2xl sm:text-3xl font-bold tracking-tight text-white uppercase"
              >
                {skill.name}
              </h3>
            </div>

            {/* Close Button (Min 44x44px touch target) */}
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="flex items-center justify-center w-11 h-11 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]"
              aria-label="Close skill details"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body - Scrollable content */}
          <div className="p-6 overflow-y-auto space-y-6 text-white/80 font-light text-sm leading-relaxed">
            {/* Short Description */}
            <p className="text-base text-white/90 font-normal">
              {skill.shortDescription}
            </p>

            {/* Detailed Explanation */}
            <div>
              <div className="font-mono text-xs uppercase tracking-wider text-white/50 mb-2">
                OVERVIEW
              </div>
              <p className="text-white/70">{skill.description}</p>
            </div>

            {/* Use Cases / What I use it for */}
            {skill.useCases && skill.useCases.length > 0 && (
              <div>
                <div className="font-mono text-xs uppercase tracking-wider text-[#00F0FF] mb-3">
                  WHAT I USE IT FOR
                </div>
                <ul className="space-y-2.5">
                  {skill.useCases.map((useCase, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#00F0FF] shrink-0 mt-0.5" />
                      <span className="text-white/80">{useCase}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Related Technologies - Clickable switches to related skill */}
            {skill.relatedSkills && skill.relatedSkills.length > 0 && (
              <div className="pt-4 border-t border-white/10">
                <div className="font-mono text-xs uppercase tracking-wider text-white/50 mb-3">
                  RELATED TECHNOLOGIES
                </div>
                <div className="flex flex-wrap gap-2">
                  {skill.relatedSkills.map((relName) => {
                    const found = relatedSkillObjects.find(
                      (s) => s.name.toLowerCase() === relName.toLowerCase()
                    );
                    return (
                      <button
                        key={relName}
                        onClick={() => {
                          if (found) onSelectSkill(found);
                        }}
                        className={`font-mono text-xs px-3 py-2 border transition-all flex items-center gap-1.5 min-h-[40px] ${
                          found
                            ? "border-white/15 bg-white/5 text-white hover:border-[#00F0FF] hover:text-[#00F0FF] cursor-pointer"
                            : "border-white/10 text-white/40 cursor-default"
                        }`}
                      >
                        <span>{relName}</span>
                        {found && <ArrowRight className="w-3 h-3" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

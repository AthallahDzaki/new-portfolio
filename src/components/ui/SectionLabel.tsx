import React from "react";
import { cn } from "@/lib/utils";

interface SectionLabelProps {
  number: string;
  label: string;
  className?: string;
}

export function SectionLabel({ number, label, className }: SectionLabelProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-[#00F0FF] mb-4 md:mb-6 select-none",
        className
      )}
    >
      <span className="opacity-70">{number}</span>
      <span className="w-6 h-px bg-[#00F0FF]/40 inline-block" />
      <span className="font-semibold text-white/90">{label}</span>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { socials } from "@/data/socials";
import { Mail, Check, Copy, ArrowUpRight, Send } from "lucide-react";

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const email = "athallahdzaki@example.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      className="relative w-full min-h-screen py-24 px-4 sm:px-8 md:px-12 flex flex-col justify-center max-w-7xl mx-auto z-10"
    >
      <SectionLabel number="07" label="GET IN TOUCH" />

      {/* Main Callout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-4">
        <div className="lg:col-span-8 flex flex-col gap-6">
          <h2 className="text-section-title text-white leading-tight">
            Have an idea? <br />
            <span className="text-[#00F0FF]">Let&apos;s build</span> something great.
          </h2>

          <p className="text-lg sm:text-xl text-white/70 font-light max-w-2xl leading-relaxed">
            I am currently open for select creative development projects, WebGL interactive experiences, and frontend engineering collaborations.
          </p>

          {/* Email Copy Box */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-4 bg-white/[0.03] border border-white/15 max-w-xl">
            <div className="flex items-center gap-3 flex-1 text-white font-mono text-sm sm:text-base">
              <Mail className="w-5 h-5 text-[#00F0FF]" />
              <span className="truncate">{email}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyEmail}
                className="flex-1 sm:flex-none px-4 py-2.5 font-mono text-xs uppercase bg-white/5 hover:bg-white/10 text-white border border-white/10 flex items-center justify-center gap-2 min-h-[44px] transition-colors"
                aria-label="Copy email address"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>COPY</span>
                  </>
                )}
              </button>

              <Button
                variant="primary"
                size="sm"
                href={`mailto:${email}`}
                external
                className="flex-1 sm:flex-none"
              >
                <Send className="w-3.5 h-3.5" />
                <span>WRITE</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Social Links Cards */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          <div className="font-mono text-xs text-white/40 uppercase tracking-widest mb-2">
            DIRECT CHANNELS
          </div>
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-white/[0.02] hover:bg-white/[0.06] border border-white/10 hover:border-[#00F0FF]/50 transition-all flex items-center justify-between group min-h-[56px]"
            >
              <div>
                <span className="font-bold text-white text-base group-hover:text-[#00F0FF] transition-colors">
                  {s.name}
                </span>
                <span className="block font-mono text-[11px] text-white/40">
                  {s.label}
                </span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-[#00F0FF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

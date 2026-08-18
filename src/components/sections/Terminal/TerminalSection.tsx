"use client";

import React, { useState, useRef, useEffect } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Terminal as TerminalIcon, CornerDownLeft } from "lucide-react";
import { skills } from "@/data/skills";
import { projects } from "@/data/projects";

interface CommandLog {
  id: string;
  command: string;
  output: React.ReactNode;
}

export function TerminalSection() {
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState<CommandLog[]>([
    {
      id: "init",
      command: "welcome",
      output: (
        <div className="text-white/70 space-y-1">
          <p className="text-[#00F0FF]">
            ATHALLAH_OS [Version 2.6.0] — Interactive Developer Terminal
          </p>
          <p>Type <span className="text-white font-mono font-semibold">help</span> to view available system commands.</p>
        </div>
      ),
    },
  ]);

  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [logs]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    let output: React.ReactNode = null;

    switch (cmd) {
      case "help":
        output = (
          <div className="space-y-1 text-white/80">
            <p className="text-[#00F0FF] mb-1">AVAILABLE COMMANDS:</p>
            <p><span className="text-white font-semibold">whoami</span> — Display bio and technical identity</p>
            <p><span className="text-white font-semibold">skills</span> — List primary technical competencies</p>
            <p><span className="text-white font-semibold">projects</span> — Display selected production case studies</p>
            <p><span className="text-white font-semibold">contact</span> — Show direct contact links</p>
            <p><span className="text-white font-semibold">clear</span> — Clear the terminal history</p>
          </div>
        );
        break;

      case "whoami":
        output = (
          <div className="space-y-1 text-white/80">
            <p className="text-white font-semibold">Athallah Dzaki Anggoro Seputro</p>
            <p className="text-white/60">Creative Developer & Frontend WebGL Engineer</p>
            <p className="text-white/60">Based in Jakarta, Indonesia · Specializing in Three.js, Next.js, and GLSL.</p>
          </div>
        );
        break;

      case "skills":
        output = (
          <div className="space-y-1 text-white/80">
            <p className="text-[#00F0FF]">TECHNICAL COMPETENCIES:</p>
            <div className="flex flex-wrap gap-2 pt-1">
              {skills.map((s) => (
                <span key={s.id} className="px-2 py-0.5 bg-white/10 text-white font-mono text-xs">
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        );
        break;

      case "projects":
        output = (
          <div className="space-y-1.5 text-white/80">
            <p className="text-[#00F0FF]">SELECTED CASE STUDIES:</p>
            {projects.map((p, i) => (
              <div key={p.id} className="text-xs">
                <span className="text-white font-bold">[{i + 1}] {p.title}</span> ({p.year}) — {p.technologies.join(", ")}
              </div>
            ))}
          </div>
        );
        break;

      case "contact":
        output = (
          <div className="space-y-1 text-white/80">
            <p className="text-[#00F0FF]">LET&apos;S CONNECT:</p>
            <p>GitHub: github.com/AthallahDzaki</p>
            <p>LinkedIn: linkedin.com/in/athallah-dzaki</p>
            <p>Email: athallahdzaki@example.com</p>
          </div>
        );
        break;

      case "clear":
        setLogs([]);
        setInput("");
        return;

      default:
        output = (
          <p className="text-red-400">
            Command not recognized: &quot;{cmd}&quot;. Type <span className="text-white underline">help</span> for a list of commands.
          </p>
        );
        break;
    }

    setLogs((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        command: input,
        output,
      },
    ]);
    setInput("");
  };

  return (
    <section
      id="terminal"
      className="relative w-full py-24 px-4 sm:px-8 md:px-12 flex flex-col justify-center max-w-7xl mx-auto z-10"
    >
      <SectionLabel number="06" label="INTERACTIVE CLI" />

      {/* Terminal Window Box */}
      <div className="w-full bg-[#08080a] border border-white/15 shadow-2xl overflow-hidden font-mono text-xs sm:text-sm">
        {/* Terminal Title Bar */}
        <div className="bg-[#121216] px-4 py-3 border-b border-white/10 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <div className="text-white/50 text-xs flex items-center gap-1.5">
            <TerminalIcon className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span>athallah_os@portfolio:~</span>
          </div>
          <div className="text-[11px] text-white/30 hidden sm:block">BASH</div>
        </div>

        {/* Terminal Output Log Area */}
        <div
          ref={outputRef}
          className="p-4 sm:p-6 max-h-80 overflow-y-auto space-y-4 text-white/80"
        >
          {logs.map((log) => (
            <div key={log.id} className="space-y-1.5">
              <div className="flex items-center gap-2 text-white/60">
                <span className="text-[#00F0FF] font-bold">&gt;</span>
                <span className="text-white">{log.command}</span>
              </div>
              <div className="pl-4">{log.output}</div>
            </div>
          ))}
        </div>

        {/* Terminal Input Form */}
        <form
          onSubmit={handleCommand}
          className="p-4 bg-black/40 border-t border-white/10 flex items-center gap-2"
        >
          <span className="text-[#00F0FF] font-bold">&gt;</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a command (try 'help', 'skills', 'projects')..."
            className="flex-1 bg-transparent text-white placeholder-white/30 focus:outline-none font-mono text-xs sm:text-sm min-h-[44px]"
            aria-label="Terminal command input"
          />
          <button
            type="submit"
            className="p-2.5 text-white/50 hover:text-[#00F0FF] bg-white/5 hover:bg-white/10 border border-white/10 min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
            aria-label="Execute command"
          >
            <CornerDownLeft className="w-4 h-4" />
          </button>
        </form>
      </div>
    </section>
  );
}

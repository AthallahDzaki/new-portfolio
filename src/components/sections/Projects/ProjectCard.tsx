"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github, Globe, Sparkles } from "lucide-react";
import { Project } from "@/types";
import { formatNumber } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (isTouch || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    setMousePos({ x, y });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform:
          !isTouch && isHovered
            ? `perspective(1000px) rotateX(${mousePos.y}deg) rotateY(${mousePos.x}deg) translateY(-4px)`
            : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)",
        transition: isHovered
          ? "transform 0.1s ease-out, border-color 0.3s ease"
          : "transform 0.5s ease-out, border-color 0.3s ease",
      }}
      className="group relative flex flex-col justify-between p-6 sm:p-8 bg-[#09090c] border border-white/10 hover:border-[#00F0FF]/60 hover:shadow-[0_0_30px_rgba(0,240,255,0.15)] transition-all duration-300 overflow-hidden"
      aria-labelledby={`project-title-${project.id}`}
    >
      {/* Holographic sweep light sheen */}
      <div className="absolute -inset-full bg-gradient-to-r from-transparent via-[#00F0FF]/5 to-transparent -rotate-45 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000 pointer-events-none" />

      {/* Top Meta Bar */}
      <div className="flex items-center justify-between font-mono text-xs text-white/50 mb-6 border-b border-white/10 pb-4">
        <span className="text-[#00F0FF] font-semibold flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5" />
          CASE STUDY // {formatNumber(index + 1)}
        </span>
        <span className="bg-white/5 px-2.5 py-0.5 border border-white/10 text-white/70">
          {project.year}
        </span>
      </div>

      {/* Project Image Banner with subtle zoom */}
      <div className="relative w-full aspect-[16/9] mb-6 overflow-hidden bg-white/5 border border-white/10">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090c] via-transparent to-transparent opacity-70" />
      </div>

      {/* Project Info */}
      <div className="flex flex-col gap-3">
        <div className="font-mono text-[11px] uppercase tracking-wider text-[#00F0FF]/80">
          {project.role}
        </div>
        <h3
          id={`project-title-${project.id}`}
          className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-[#00F0FF] transition-colors"
        >
          <Link href={`/work/${project.slug}`} className="focus:outline-none focus-visible:underline">
            {project.title}
          </Link>
        </h3>
        <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Technologies Pills */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="font-mono text-[10px] uppercase px-2.5 py-1 bg-white/5 border border-white/10 text-white/80 group-hover:border-white/20 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Card Actions */}
      <div className="flex items-center justify-between gap-4 mt-8 pt-4 border-t border-white/10">
        <Link
          href={`/work/${project.slug}`}
          className="font-mono text-xs uppercase tracking-wider text-white hover:text-[#00F0FF] flex items-center gap-1.5 min-h-[44px] min-w-[44px]"
        >
          <span>Explore Case Study</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-[#00F0FF]" />
        </Link>

        <div className="flex items-center gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center text-white/70 hover:text-white bg-white/5 hover:bg-white/15 border border-white/10 transition-colors"
              aria-label={`View GitHub repository for ${project.title}`}
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center text-white/70 hover:text-[#00F0FF] bg-white/5 hover:bg-[#00F0FF]/15 border border-white/10 transition-colors"
              aria-label={`Visit live website for ${project.title}`}
            >
              <Globe className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

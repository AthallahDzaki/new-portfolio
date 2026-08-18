"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github, Globe } from "lucide-react";
import { Project } from "@/types";
import { formatNumber } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <article
      className="group relative flex flex-col justify-between p-6 sm:p-8 bg-[#0a0a0c] border border-white/10 hover:border-[#00F0FF]/50 transition-all duration-300"
      aria-labelledby={`project-title-${project.id}`}
    >
      {/* Top Meta Bar */}
      <div className="flex items-center justify-between font-mono text-xs text-white/50 mb-6 border-b border-white/10 pb-4">
        <span className="text-[#00F0FF] font-semibold">
          PROJECT // {formatNumber(index + 1)}
        </span>
        <span>{project.year}</span>
      </div>

      {/* Project Image Banner */}
      <div className="relative w-full aspect-[16/9] mb-6 overflow-hidden bg-white/5 border border-white/5">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent opacity-60" />
      </div>

      {/* Project Info */}
      <div className="flex flex-col gap-3">
        <div className="font-mono text-[11px] uppercase tracking-wider text-white/50">
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
              className="font-mono text-[10px] uppercase px-2.5 py-1 bg-white/5 border border-white/10 text-white/80"
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
          <span>Case Study</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>

        <div className="flex items-center gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
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
              className="w-10 h-10 flex items-center justify-center text-white/70 hover:text-[#00F0FF] bg-white/5 hover:bg-[#00F0FF]/10 border border-white/10 transition-colors"
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

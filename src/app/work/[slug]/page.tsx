import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { projects } from "@/data/projects";
import { ArrowLeft, ArrowRight, Github, Globe, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found — Athallah Dzaki",
    };
  }

  const projectUrl = `https://athallahdzaki.my.id/work/${project.slug}`;

  return {
    title: `${project.title} — Case Study by Athallah Dzaki`,
    description: project.description,
    alternates: {
      canonical: projectUrl,
    },
    openGraph: {
      title: `${project.title} — Case Study by Athallah Dzaki`,
      description: project.description,
      url: projectUrl,
      type: "article",
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Case Study by Athallah Dzaki`,
      description: project.description,
      images: [project.image],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const projectIndex = projects.findIndex((p) => p.slug === slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project = projects[projectIndex];
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const prevProject =
    projects[(projectIndex - 1 + projects.length) % projects.length];

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    headline: project.subtitle || project.title,
    description: project.description,
    url: `https://athallahdzaki.my.id/work/${project.slug}`,
    image: project.image,
    applicationCategory: "WebApplication",
    operatingSystem: "Web Browser",
    datePublished: `${project.year}-01-01`,
    author: {
      "@type": "Person",
      name: "Athallah Dzaki Anggoro Seputro",
      url: "https://athallahdzaki.my.id",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#00F0FF]/30 safe-top safe-bottom">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      {/* Top Sticky Header */}
      <header className="sticky top-0 z-40 bg-[#050505]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/#work"
            className="font-mono text-xs uppercase tracking-widest text-white/70 hover:text-[#00F0FF] flex items-center gap-2 transition-colors min-h-[44px] min-w-[44px]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Selected Work</span>
          </Link>
          <div className="font-mono text-xs text-white/40 hidden sm:block">
            {project.year} / {project.role}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-12 md:py-20 flex flex-col gap-12">
        {/* Project Header */}
        <div>
          <div className="font-mono text-xs text-[#00F0FF] uppercase tracking-[0.25em] mb-3">
            {"// CASE STUDY"}
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight uppercase text-white mb-4">
            {project.title}
          </h1>
          {project.subtitle && (
            <p className="text-lg sm:text-xl text-white/60 font-light max-w-3xl">
              {project.subtitle}
            </p>
          )}
        </div>

        {/* Hero Image */}
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-white/5 border border-white/10 overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover"
          />
        </div>

        {/* Project Meta Details Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-6 bg-white/[0.02] border border-white/10 font-mono text-xs">
          <div>
            <div className="text-white/40 uppercase mb-1">YEAR</div>
            <div className="text-white font-medium">{project.year}</div>
          </div>
          <div>
            <div className="text-white/40 uppercase mb-1">ROLE</div>
            <div className="text-white font-medium">{project.role}</div>
          </div>
          <div>
            <div className="text-white/40 uppercase mb-1">CORE TECH</div>
            <div className="text-[#00F0FF] font-medium">
              {project.technologies.slice(0, 2).join(", ")}
            </div>
          </div>
          <div>
            <div className="text-white/40 uppercase mb-1">STATUS</div>
            <div className="text-emerald-400 font-medium">Production Ready</div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-wrap gap-4">
          {project.liveUrl && (
            <Button
              variant="primary"
              size="md"
              href={project.liveUrl}
              external
            >
              <Globe className="w-4 h-4" />
              <span>Launch Live Project</span>
            </Button>
          )}
          {project.slug === "sa-chaos-platform" && (
            <div className="flex flex-wrap gap-2 w-full pt-2">
              <a
                href="https://sa-chaos.id/classic-edition"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 font-mono text-xs uppercase bg-white/5 hover:bg-[#00F0FF] hover:text-black border border-white/15 transition-all"
              >
                🎮 Classic Edition →
              </a>
              <a
                href="https://sa-chaos.id/definitive-edition"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 font-mono text-xs uppercase bg-white/5 hover:bg-[#00F0FF] hover:text-black border border-white/15 transition-all"
              >
                ⚡ Definitive Edition →
              </a>
              <a
                href="https://sa-chaos.id/chaos-find-the-route"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 font-mono text-xs uppercase bg-white/5 hover:bg-[#00F0FF] hover:text-black border border-white/15 transition-all"
              >
                🏔️ Find The Route →
              </a>
            </div>
          )}
          {project.githubUrl && (
            <Button
              variant="outline"
              size="md"
              href={project.githubUrl}
              external
            >
              <Github className="w-4 h-4" />
              <span>Inspect GitHub Profile</span>
            </Button>
          )}
        </div>

        {/* Content Section: Overview */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8 border-t border-white/10">
          <div className="md:col-span-4 font-mono text-xs uppercase tracking-widest text-[#00F0FF]">
            {"01 // OVERVIEW & PURPOSE"}
          </div>
          <div className="md:col-span-8 space-y-5 text-white/80 font-light text-base sm:text-lg leading-relaxed">
            {(project.fullDescription || project.description)
              .split("\n\n")
              .map((block, idx) => {
                if (block.startsWith("•") || block.startsWith("-")) {
                  const parts = block.replace(/^[•-]\s*/, "").split(":");
                  return (
                    <div
                      key={idx}
                      className="p-4 bg-white/[0.03] border border-white/10 border-l-2 border-l-[#00F0FF] rounded-none my-2"
                    >
                      {parts.length > 1 ? (
                        <p className="text-sm sm:text-base">
                          <strong className="text-[#00F0FF] font-semibold">
                            {parts[0]}:
                          </strong>{" "}
                          <span className="text-white/80">{parts.slice(1).join(":")}</span>
                        </p>
                      ) : (
                        <p className="text-sm sm:text-base text-white/80">{block}</p>
                      )}
                    </div>
                  );
                }
                return (
                  <p key={idx} className="text-base sm:text-lg text-white/85 leading-relaxed">
                    {block}
                  </p>
                );
              })}
          </div>
        </section>

        {/* Content Section: Tech Stack */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8 border-t border-white/10">
          <div className="md:col-span-4 font-mono text-xs uppercase tracking-widest text-[#00F0FF]">
            {"02 // TECHNOLOGY STACK"}
          </div>
          <div className="md:col-span-8 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="font-mono text-xs uppercase px-4 py-2 bg-white/5 border border-white/15 text-white"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Content Section: Challenges & Solutions */}
        {project.challenges && project.challenges.length > 0 && (
          <section className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8 border-t border-white/10">
            <div className="md:col-span-4 font-mono text-xs uppercase tracking-widest text-[#00F0FF]">
              {"03 // TECHNICAL CHALLENGES"}
            </div>
            <div className="md:col-span-8 space-y-4">
              <ul className="space-y-3">
                {project.challenges.map((challenge, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-white/70 text-sm sm:text-base font-light"
                  >
                    <span className="font-mono text-xs text-[#00F0FF] mt-1 shrink-0">
                      [0{i + 1}]
                    </span>
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Content Section: Key Outcomes */}
        {project.outcomes && project.outcomes.length > 0 && (
          <section className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8 border-t border-white/10">
            <div className="md:col-span-4 font-mono text-xs uppercase tracking-widest text-[#00F0FF]">
              {"04 // IMPACT & RESULTS"}
            </div>
            <div className="md:col-span-8 space-y-3">
              {project.outcomes.map((outcome, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 text-white/90 text-sm sm:text-base font-light"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{outcome}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Next / Previous Project Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-12 border-t border-white/10 mt-8">
          <Link
            href={`/work/${prevProject.slug}`}
            className="p-6 bg-white/[0.02] border border-white/10 hover:border-white/30 transition-all flex flex-col justify-between group min-h-[110px]"
          >
            <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest flex items-center gap-1 mb-2">
              <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
              PREVIOUS PROJECT
            </span>
            <span className="font-bold text-white group-hover:text-[#00F0FF] transition-colors text-lg">
              {prevProject.title}
            </span>
          </Link>

          <Link
            href={`/work/${nextProject.slug}`}
            className="p-6 bg-white/[0.02] border border-white/10 hover:border-white/30 transition-all flex flex-col justify-between group min-h-[110px] text-right"
          >
            <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest flex items-center justify-end gap-1 mb-2">
              NEXT PROJECT
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </span>
            <span className="font-bold text-white group-hover:text-[#00F0FF] transition-colors text-lg">
              {nextProject.title}
            </span>
          </Link>
        </div>
      </main>
    </div>
  );
}

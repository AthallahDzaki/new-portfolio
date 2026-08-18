export type SkillCategory = "frontend" | "creative" | "backend" | "tools";

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  shortDescription: string;
  description: string;
  experience?: string;
  useCases?: string[];
  relatedSkills?: string[];
  icon?: string;
  position?: [number, number, number];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  fullDescription?: string;
  year: number;
  role: string;
  technologies: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  color?: string;
  challenges?: string[];
  solutions?: string[];
  outcomes?: string[];
}

export interface ExperienceItem {
  id: string;
  year: string;
  period?: string;
  role: string;
  company: string;
  location?: string;
  description: string;
  technologies?: string[];
  achievements?: string[];
}

export interface SocialLink {
  name: string;
  url: string;
  label: string;
  icon?: string;
}

export interface PerformanceMode {
  dpr: [number, number];
  particleCount: number;
  shaderComplexity: "low" | "medium" | "high";
  enablePostprocessing: boolean;
  enableDistortion: boolean;
}

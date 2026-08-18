import { Skill } from "@/types";

/**
 * Pixel-perfect Proportioned Diamond Constellation Topology:
 *
 *                     [Three.js (Top: Y +0.75)]
 *                       /                \
 *                   [R3F]                [GLSL]
 *                    /                      \
 * [Node.js (E)] -- [React (A)]     [Next.js (B)] -- [Git (D)]
 *    |                 |                      |          |
 * [Postgres]      [TypeScript]           [Tailwind]   [Figma]
 *                      \                      /
 *                       \                    /
 *                         [GSAP (Bottom: Y -0.75)]
 */
export const skills: Skill[] = [
  // 1. TOP HUB (*) — 3D Creative Core
  {
    id: "threejs",
    name: "Three.js",
    category: "creative",
    shortDescription: "JavaScript 3D library for creating interactive WebGL experiences.",
    description:
      "Three.js enables building interactive 3D environments, visual effects, procedural geometries, animations, and immersive graphics directly inside modern web browsers.",
    experience: "3+ years",
    useCases: [
      "Interactive 3D websites & portfolios",
      "Interactive product visualizers",
      "Procedural animations and particles",
      "Custom shaders & material effects",
      "Creative coding experiments",
    ],
    relatedSkills: ["React Three Fiber", "GLSL & Shaders", "React"],
    position: [0, 0.78, 0],
  },
  {
    id: "r3f",
    name: "React Three Fiber",
    category: "creative",
    shortDescription: "Declarative React renderer for Three.js with robust component ecosystem.",
    description:
      "R3F connects Three.js to the React component lifecycle, enabling clean state-driven 3D scenes, reusable shaders, and seamless hybrid 2D/3D interfaces.",
    experience: "2+ years",
    useCases: [
      "Declarative scene graphs in Next.js",
      "Drei controls and helpers integration",
      "State-synchronized 3D UI components",
      "Performance-optimized render loops",
    ],
    relatedSkills: ["Three.js", "React"],
    position: [-0.48, 0.39, 0],
  },
  {
    id: "glsl",
    name: "GLSL & Shaders",
    category: "creative",
    shortDescription: "OpenGL Shading Language for high-performance GPU visual effects.",
    description:
      "Crafting custom vertex and fragment shaders, procedural noise generation, displacement maps, Fresnel glow, and post-processing filters.",
    experience: "2+ years",
    useCases: [
      "Vertex distortion and fluid waveforms",
      "Simplex & Perlin noise landscapes",
      "Holographic & chromatic aberration materials",
      "Real-time reactive GPU visual effects",
    ],
    relatedSkills: ["Three.js", "Next.js"],
    position: [0.48, 0.39, 0],
  },

  // 2. CENTER-LEFT HUB (A) — Frontend Core
  {
    id: "react",
    name: "React",
    category: "frontend",
    shortDescription: "Core JavaScript library for building component-driven modern user interfaces.",
    description:
      "Specialized in modern React architectures, concurrent rendering, custom hooks, memoization, and responsive component design.",
    experience: "4+ years",
    useCases: [
      "Dynamic interactive single page applications",
      "Complex state management and custom hooks",
      "Modular design system architectures",
      "Performance tuning and re-render elimination",
    ],
    relatedSkills: ["Three.js", "Node.js", "GSAP & ScrollTrigger", "TypeScript"],
    position: [-1.0, 0, 0],
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "frontend",
    shortDescription: "Statically typed superset of JavaScript for scalable software development.",
    description:
      "Writing strictly typed React components, Three.js objects, custom hooks, data models, and eliminating runtime bugs with comprehensive type safety.",
    experience: "3+ years",
    useCases: [
      "Strict type systems for robust architectures",
      "Generics and discriminated union types",
      "Complex 3D math & vector typing",
      "Zero-overhead maintainable codebases",
    ],
    relatedSkills: ["React", "Next.js"],
    position: [-1.0, -0.48, 0],
  },

  // 3. CENTER-RIGHT HUB (B) — Fullstack Architecture
  {
    id: "nextjs",
    name: "Next.js",
    category: "frontend",
    shortDescription: "Full-stack React framework for high performance web applications.",
    description:
      "Utilizing Next.js App Router, Server Components, dynamic routing, metadata API, SEO optimization, and edge deployment.",
    experience: "3+ years",
    useCases: [
      "Server-side rendered & static modern websites",
      "Optimized asset and font delivery",
      "SEO-first content architecture",
      "API endpoints and edge serverless routes",
    ],
    relatedSkills: ["Three.js", "GSAP & ScrollTrigger", "Git & GitHub"],
    position: [1.0, 0, 0],
  },

  // 4. BOTTOM HUB (C) — Motion & Systems
  {
    id: "gsap",
    name: "GSAP & ScrollTrigger",
    category: "creative",
    shortDescription: "Industry standard animation platform for cinematic web interactions.",
    description:
      "Crafting timeline orchestrations, scrubbed scroll triggers, smooth camera choreography, and micro-interactions.",
    experience: "3+ years",
    useCases: [
      "Scroll-driven Three.js camera animations",
      "Typography clip-path reveals",
      "SVG morphing and sequenced timelines",
      "Smooth kinetic interface transitions",
    ],
    relatedSkills: ["React", "Next.js", "Tailwind CSS"],
    position: [0, -0.78, 0],
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "frontend",
    shortDescription: "Utility-first CSS framework for rapid mobile-first UI engineering.",
    description:
      "Architecting responsive layouts, dark-mode design systems, fluid typography with clamp, and mobile safe-area adaptations.",
    experience: "4+ years",
    useCases: [
      "Mobile-first responsive design tokens",
      "Fluid clamp typography & spacing",
      "Glassmorphism & futuristic dark themes",
      "Zero-runtime optimized CSS payloads",
    ],
    relatedSkills: ["GSAP & ScrollTrigger", "Next.js"],
    position: [0.48, -0.39, 0],
  },

  // 5. FAR-LEFT HUB (E) — Backend & Database
  {
    id: "nodejs",
    name: "Node.js",
    category: "backend",
    shortDescription: "Server-side JavaScript runtime for backend services and APIs.",
    description:
      "Building RESTful APIs, serverless functions, authentication, database integrations, and high-concurrency microservices.",
    experience: "3+ years",
    useCases: [
      "Serverless endpoints and backend logic",
      "Third-party API and database integrations",
      "Authentication and security middleware",
    ],
    relatedSkills: ["React", "PostgreSQL"],
    position: [-2.35, 0, 0],
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "backend",
    shortDescription: "Advanced open-source relational database system.",
    description:
      "Designing relational database schemas, complex SQL queries, migrations, indexes, and transactional integrity.",
    experience: "2+ years",
    useCases: [
      "Structured application data storage",
      "Relational models and ACID transactions",
      "Performance query optimization",
    ],
    relatedSkills: ["Node.js"],
    position: [-2.35, 0.48, 0],
  },

  // 6. FAR-RIGHT HUB (D) — Tools & Design
  {
    id: "git",
    name: "Git & GitHub",
    category: "tools",
    shortDescription: "Version control and collaborative software development workflows.",
    description:
      "Managing multi-branch git workflows, semantic commits, automated CI/CD pipelines, and open source collaboration.",
    experience: "4+ years",
    useCases: [
      "Atomic branch & release management",
      "CI/CD workflows and automated builds",
      "Team code reviews and PR management",
    ],
    relatedSkills: ["Next.js", "Figma & UI/UX"],
    position: [2.35, 0, 0],
  },
  {
    id: "figma",
    name: "Figma & UI/UX",
    category: "tools",
    shortDescription: "Design tool for wireframing, prototyping, and design systems.",
    description:
      "Translating wireframes and futuristic UI designs into pixel-perfect, accessible, and responsive code.",
    experience: "3+ years",
    useCases: [
      "User journey mapping & wireframing",
      "Interactive prototyping & design tokens",
      "Mobile-first interface specifications",
    ],
    relatedSkills: ["Git & GitHub"],
    position: [2.35, 0.48, 0],
  },
];

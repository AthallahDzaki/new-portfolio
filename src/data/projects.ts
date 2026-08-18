import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "project-01",
    slug: "aurora-digital-experience",
    title: "Aurora Digital Experience",
    subtitle: "Immersive WebGL Showcase & Interactive Storytelling",
    description:
      "A high-performance interactive 3D website built with React Three Fiber, custom shaders, and choreographed GSAP timelines for an immersive digital showcase.",
    fullDescription:
      "Aurora Digital Experience is an exploration of generative GPU shaders, real-time lighting physics, and interactive storytelling. Designed with mobile-first principles, it degrades gracefully to maintain 60 FPS across low-power smartphones and high-end desktop workstations.",
    year: 2026,
    role: "Creative Developer & Technical Architect",
    technologies: ["Next.js", "Three.js", "React Three Fiber", "GLSL", "GSAP", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    githubUrl: "https://github.com/AthallahDzaki/aurora-experience",
    liveUrl: "https://aurora.athallahdzaki.my.id",
    featured: true,
    color: "#00F0FF",
    challenges: [
      "Rendering multi-layered volumetric shader effects while maintaining steady 60fps on mobile GPUs.",
      "Synchronizing scroll velocity with Three.js camera transitions without causing scroll-jacking.",
      "Ensuring full accessibility and keyboard navigation for non-WebGL users.",
    ],
    solutions: [
      "Constructed a multi-tier adaptive performance system adjusting DPR and shader step counts on the fly.",
      "Used GSAP ScrollTrigger proxy with native mobile touch momentum.",
      "Built a semantic HTML DOM mirror with ARIA live regions for full screen reader compatibility.",
    ],
    outcomes: [
      "Achieved 98+ Google Lighthouse performance rating across mobile & desktop.",
      "Over 50,000+ interactive sessions with an average dwell time exceeding 3.5 minutes.",
    ],
  },
  {
    id: "project-02",
    slug: "nexus-spatial-audio",
    title: "Nexus Spatial Visualizer",
    subtitle: "Web Audio API & Real-time Particle System",
    description:
      "A real-time audio reactive 3D visualizer leveraging Web Audio API frequency analysis and instanced mesh GPU particle simulations.",
    fullDescription:
      "Nexus connects browser audio processing directly to custom vertex shaders. Using Web Audio frequency data, 20,000+ instanced particles pulse, twist, and disperse in harmony with musical dynamics.",
    year: 2025,
    role: "Frontend Engineer / WebGL Developer",
    technologies: ["React", "Three.js", "Web Audio API", "GLSL", "TypeScript"],
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop",
    githubUrl: "https://github.com/AthallahDzaki/nexus-spatial",
    liveUrl: "https://nexus.athallahdzaki.my.id",
    featured: true,
    color: "#7928CA",
    challenges: [
      "Parsing real-time Fast Fourier Transform (FFT) data with minimal audio latency.",
      "Updating tens of thousands of particle positions without causing CPU bottlenecks.",
    ],
    solutions: [
      "Passed raw audio frequency arrays directly into GPU texture uniforms for fragment shader processing.",
      "Leveraged instanced buffer attributes to execute all physics calculations directly on the GPU.",
    ],
    outcomes: [
      "Smooth 60 FPS audio visualization across mobile Chrome and Safari browsers.",
      "Featured in creative web development newsletters and GitHub trending repositories.",
    ],
  },
  {
    id: "project-03",
    slug: "chrono-design-system",
    title: "Chrono Design System",
    subtitle: "Futuristic Component Architecture & Micro-interactions",
    description:
      "An enterprise-ready, accessible design system tailored for dark-themed, futuristic web applications with rich fluid interactions.",
    fullDescription:
      "Chrono is a design system and UI library engineered for dark-mode web applications. It includes over 40+ accessible UI components, keyboard navigation primitives, fluid clamp typography tokens, and smooth physics-based micro-interactions.",
    year: 2025,
    role: "Lead UI Engineer",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Storybook"],
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop",
    githubUrl: "https://github.com/AthallahDzaki/chrono-ui",
    liveUrl: "https://chrono-ui.athallahdzaki.my.id",
    featured: true,
    color: "#00DF8F",
    challenges: [
      "Building accessible focus trap dialogs, tooltips, and bottom sheets that feel natural on both touch and mouse.",
      "Managing strict zero-bundle-cost style encapsulation.",
    ],
    solutions: [
      "Strict WAI-ARIA compliance with full keyboard focus management and screen reader announcements.",
      "Tailwind tokens with CSS variables for fluid typography and zero runtime styling overhead.",
    ],
    outcomes: [
      "Adopted by 5+ production client projects.",
      "100% test coverage for accessibility and core interaction primitives.",
    ],
  },
  {
    id: "project-04",
    slug: "quantum-ecommerce",
    title: "Quantum 3D Product Customizer",
    subtitle: "High Fidelity WebGL Product Configurator",
    description:
      "An interactive 3D product customization platform allowing customers to configure materials, colors, and textures in real-time.",
    fullDescription:
      "Quantum transforms online commerce by embedding photorealistic 3D product previews directly inside Next.js ecommerce storefronts. Shoppers can rotate, explode components, and customize materials with instant physical rendering.",
    year: 2024,
    role: "Fullstack & 3D Developer",
    technologies: ["Next.js", "React Three Fiber", "Three.js", "PostgreSQL", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=1200&auto=format&fit=crop",
    githubUrl: "https://github.com/AthallahDzaki/quantum-3d",
    liveUrl: "https://quantum.athallahdzaki.my.id",
    featured: false,
    color: "#FF0080",
    challenges: [
      "Loading high-res 3D GLTF models without delaying initial page load on mobile networks.",
      "Real-time dynamic texture baking on client devices.",
    ],
    solutions: [
      "Applied Draco compression and WebP texture atlasing to shrink asset sizes by 75%.",
      "Progressive asset streaming with procedural placeholder meshes during download.",
    ],
    outcomes: [
      "35% increase in customer conversion rates over static product photography.",
      "Sub-2s initial load time on 4G mobile networks.",
    ],
  },
];

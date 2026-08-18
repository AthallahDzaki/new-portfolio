import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "project-01",
    slug: "sa-chaos-platform",
    title: "SA-Chaos.id — GTA San Andreas TikTok Interactive Mod Platform",
    subtitle: "Real-time Game Streamer Platform & Multi-Edition Chaos Ecosystem",
    description:
      "A comprehensive interactive GTA San Andreas mod platform for TikTok streamers featuring 400+ real-time chaos effects, viewer voting, and spin wheel.",
    fullDescription:
      "SA-Chaos.id is an interactive gaming platform for GTA San Andreas that seamlessly bridges TikTok Live viewer interactions (gifts, chat voting, spin wheels) directly into the running game memory in real time. The platform encompasses three specialized editions engineered for distinct architectural goals:\n\n• Classic Edition: Designed for pure nostalgia and ultra-lightweight execution. Runs smoothly even on low-end PCs via custom ASI & CLEO script memory injection, featuring 400+ built-in chaos triggers.\n\n• Definitive Edition: Next-Gen visual experience built for GTA SA Definitive Edition (Unreal Engine), featuring realistic lighting shaders, high-resolution textures, and modern particle systems.\n\n• Chaos Find The Route: Competitive streamer challenge mode featuring 7 extreme procedural route maps across Mount Chiliad with custom directional chaos hazards.",
    year: 2025,
    role: "Founder & Lead Fullstack Developer",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "WebSockets",
      "TikTok Live API",
      "CLEO / ASI Scripting",
      "Framer Motion",
    ],
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop",
    githubUrl: "https://github.com/AthallahDzaki",
    liveUrl: "https://sa-chaos.id",
    featured: true,
    color: "#00F0FF",
    challenges: [
      "Connecting high-frequency TikTok Live gift events with GTA SA memory address injectors with zero game crashes.",
      "Optimizing WebSocket broadcast pipelines to achieve sub-100ms trigger latency between viewer actions and in-game chaos effects.",
      "Maintaining three distinct execution pipelines across RenderWare engine (Classic), Unreal Engine (Definitive), and custom challenge maps.",
    ],
    solutions: [
      "Engineered an event queue middleware with atomic memory table synchronization to eliminate race conditions.",
      "Developed a modular ASI/CLEO script communication bridge with safe memory buffers.",
      "Built a Next.js streamer dashboard for real-time chaos monitoring, gift configuration, and automated cheat blacklisting.",
    ],
    outcomes: [
      "Adopted by dozens of active gaming streamers on TikTok Indonesia, reaching hundreds of thousands of live viewers.",
      "Achieved 99.8% uptime stability with zero memory leaks during marathon 8+ hour live streaming sessions.",
    ],
  },
  {
    id: "project-02",
    slug: "threejs-mmd-loader",
    title: "ThreeJS MMD Animation Studio",
    subtitle: "Interactive 3D Motion, Physics Bones & Audio Sync Player",
    description:
      "An interactive 3D WebGL application for loading MMD (MikuMikuDance) characters with physics bones, inverse kinematics, and audio synchronization.",
    fullDescription:
      "Athallah - ThreeJS - MMDLoader is an interactive 3D web application utilizing WebGL and the Three.js MMDLoader API. Users can select iconic 3D models (CJ from GTA SA, Hatsune Miku, Gumi, or upload their own custom PMX/PMD models), trigger choreographic VMD dance animations with dynamic camera choreography, simulate real-time hair/cloth physics, and synchronize Web Audio playback.",
    year: 2025,
    role: "Creative 3D / WebGL Developer",
    technologies: [
      "Three.js",
      "WebGL",
      "MMDLoader",
      "MMDAnimationHelper",
      "Web Audio API",
      "JavaScript",
      "CSS3",
    ],
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1200&auto=format&fit=crop",
    githubUrl: "https://github.com/AthallahDzaki",
    liveUrl: "https://mmd-loader-three-js.vercel.app",
    featured: true,
    color: "#FF007A",
    challenges: [
      "Streaming large binary PMX/PMD character meshes and complex VMD skeletal motion files with low browser memory overhead.",
      "Computing real-time Inverse Kinematics (IK) and CCDIK solver iterations while maintaining a steady 60 FPS.",
    ],
    solutions: [
      "Optimized Three.js MMDAnimationHelper with asynchronous asset staging and buffer pooling.",
      "Engineered client-side file uploaders allowing users to load local MMD models and audio tracks directly without server payload costs.",
    ],
    outcomes: [
      "Silky smooth 60 FPS animation playback across modern desktop and mobile browsers.",
      "Seamless support for multiple character presets and user-provided motion files.",
    ],
  },
  {
    id: "project-03",
    slug: "artha-bonsai",
    title: "Artha Bonsai — Premium Botanical Platform",
    subtitle: "Showcase & E-Commerce Web Platform for Bonsai Masters",
    description:
      "Official website and botanical e-commerce platform for master bonsai collections, cultivation tools, and care accessories ('Bring Your Joi').",
    fullDescription:
      "A fullstack web development internship project for Artha Bonsai. Engineered an elegant, responsive digital platform showcasing master bonsai specimens, an e-commerce catalog of cultivation tools and specialized accessories, and a botanical consultation request system for bonsai enthusiasts.",
    year: 2025,
    role: "Fullstack Web Developer Intern",
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "PHP",
      "MySQL",
      "Vite",
      "Responsive UI",
    ],
    image: "https://images.unsplash.com/photo-1512428813834-c702c7702b78?q=80&w=1200&auto=format&fit=crop",
    githubUrl: "https://github.com/AthallahDzaki",
    liveUrl: "https://arthabonsai.com",
    featured: true,
    color: "#10B981",
    challenges: [
      "Displaying high-resolution photographic galleries of intricate bonsai branches without sacrificing mobile page speed.",
      "Crafting an aesthetic minimal UI that embodies the serene, natural discipline of master bonsai art.",
    ],
    solutions: [
      "Implemented progressive WebP image streaming and adaptive responsive image sources.",
      "Designed a clean modern color palette (Lime & Deep Obsidian) paired with fluid micro-interactions.",
    ],
    outcomes: [
      "Successfully launched to production at the official domain arthabonsai.com with high performance scores.",
      "Significantly elevated user engagement and streamlined product catalog exploration for collectors.",
    ],
  },
  {
    id: "project-04",
    slug: "sidigi-solutions",
    title: "SIDIGI.asia Digital Ecosystem",
    subtitle: "Enterprise Web Systems, High-Performance Client Applications & Server Management",
    description:
      "Architecting fullstack web applications, database architectures, server deployments, and interactive digital solutions for enterprise clients at SIDIGI.asia.",
    fullDescription:
      "As a Fullstack Web Developer at SIDIGI.asia (Malang, Indonesia), I engineer scalable web applications, content management systems, analytics dashboards, server environments, and RESTful API integrations built with Next.js, React, PHP, and MySQL.",
    year: 2025,
    role: "Fullstack Web Developer",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "PHP",
      "MySQL",
      "Tailwind CSS",
      "Server Management",
      "RESTful APIs",
    ],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    githubUrl: "https://github.com/AthallahDzaki",
    liveUrl: "https://sidigi.asia",
    featured: false,
    color: "#F59E0B",
    challenges: [
      "Maintaining unified design systems and modular architectures across diverse enterprise client projects.",
      "Optimizing database queries and Core Web Vitals on data-dense web dashboards.",
    ],
    solutions: [
      "Engineered reusable TypeScript and Tailwind component systems paired with structured database schemas.",
      "Deployed Server Side Rendering (SSR) and optimized MySQL query caching for instantaneous load times.",
    ],
    outcomes: [
      "Delivered robust, scalable web applications across the SIDIGI.asia client ecosystem.",
      "Improved average page render speeds by 35% with rock-solid server availability.",
    ],
  },
];

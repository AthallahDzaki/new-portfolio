import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "project-01",
    slug: "sa-chaos-platform",
    title: "SA-Chaos.id — GTA SA TikTok Interactive Mod",
    subtitle: "Real-time Game Streamer Platform & Multi-Edition Chaos Ecosystem",
    description:
      "Platform mod interaktif GTA San Andreas terlengkap untuk streamer TikTok dengan 400+ efek chaos real-time, voting viewer, dan spin wheel.",
    fullDescription:
      "SA-Chaos.id adalah ekosistem mod interaktif revolusioner untuk GTA San Andreas yang menghubungkan gift dan interaksi penonton TikTok Live secara langsung ke dalam game secara real-time. Platform ini mencakup 3 edisi dengan tujuan arsitektur yang berbeda:\n\n1. **Classic Edition** (https://sa-chaos.id/classic-edition): Didesain untuk nostalgia maksimal dengan performa teringan yang lancar dimainkan di PC kentang/low-end sekalipun melalui integrasi ASI Script CLEO dan 400+ efek chaos bawaan.\n2. **Definitive Edition** (https://sa-chaos.id/definitive-edition): Pengalaman Next-Gen visual modern berbasis Unreal Engine dengan grafis pencahayaan realistis, tekstur beresolusi tinggi, dan shader partikel kontemporer.\n3. **Chaos Find The Route** (https://sa-chaos.id/chaos-find-the-route): Mode event kompetitif khusus streamer dengan 7 rute random ekstrem di Mount Chiliad dan efek chaos kustom terarah.",
    year: 2025,
    role: "Creator & Lead Fullstack Engineer",
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
      "Menghubungkan event gift TikTok Live berkecepatan tinggi dengan memory address injector game GTA SA tanpa crash.",
      "Mengoptimalkan latency socket agar efek chaos aktif seketika (<100ms) saat penonton mengirim gift/voting.",
      "Menyediakan 3 pipeline berbeda untuk GTA SA Classic (RenderWare engine), Definitive Edition (Unreal Engine), dan Custom Route map.",
    ],
    solutions: [
      "Membangun WebSocket middleware berkinerja tinggi dengan antrian event (event queue) terisolasi.",
      "Mengembangkan modular CLEO/ASI script interface untuk sinkronisasi chaos memory table secara atomic.",
      "Membuat dashboard streamer web berbasis Next.js untuk monitoring efek aktif, blacklist cheat, dan konfigurasi gift.",
    ],
    outcomes: [
      "Digunakan oleh puluhan streamer gaming TikTok aktif di Indonesia dengan ratusan ribu total penonton live.",
      "Tingkat stabilitas 99.8% tanpa memory leak selama sesi streaming maraton 8+ jam non-stop.",
    ],
  },
  {
    id: "project-02",
    slug: "threejs-mmd-loader",
    title: "ThreeJS MMD Animation Studio",
    subtitle: "Interactive 3D Motion, Physics Bones & Audio Sync Player",
    description:
      "Aplikasi interaktif 3D WebGL untuk memuat karakter MMD (CJ GTA, Hatsune Miku, Gumi) dengan simulasi physics bones, inverse kinematics, dan sinkronisasi audio.",
    fullDescription:
      "Athallah - ThreeJS - MMDLoader adalah aplikasi web 3D interaktif yang memanfaatkan WebGL dan Three.js MMDLoader API. Pengguna dapat memilih berbagai karakter 3D (CJ GTA SA, Hatsune Miku, Gumi, atau mengunggah model kustom PMX/PMD), memicu tarian koreografi VMD dengan animasi kamera dinamis, simulasi fisika rambut & pakaian, serta sinkronisasi audio real-time.",
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
      "Memuat file PMX/PMD biner berukuran besar dan file VMD animasi gerak kompleks di browser secara cepat.",
      "Menangani kalkulasi Inverse Kinematics (IK) dan CCDIK solver agar gerakan sendi karakter tetap stabil di 60 FPS.",
    ],
    solutions: [
      "Mengoptimalkan Three.js MMDAnimationHelper dengan asynchronous asset loading dan buffer pooling.",
      "Menyediakan file uploader client-side sehingga pengguna dapat memutar file MMD dan audio milik mereka sendiri secara lokal tanpa beban server.",
    ],
    outcomes: [
      "Performa animasi 60 FPS mulus di desktop dan mobile browser.",
      "Mendukung berbagai preset model legendaris (CJ GTA SA, Hatsune Miku) dan file gerak VMD fleksibel.",
    ],
  },
  {
    id: "project-03",
    slug: "artha-bonsai",
    title: "Artha Bonsai — Premium Botanical Platform",
    subtitle: "Showcase & E-Commerce Web Platform for Bonsai Masters",
    description:
      "Website resmi dan platform botanical e-commerce untuk koleksi bonsai premium, tools, dan aksesoris perawatan ('Bring Your Joi').",
    fullDescription:
      "Proyek magang (internship) di Artha Bonsai di mana saya merancang dan mengembangkan antarmuka website modern responsif untuk memamerkan koleksi pohon bonsai langka berkualitas tinggi, katalog perlengkapan perawatan (tools & accessories), serta sistem konsultasi perawatan botanical untuk komunitas pecinta bonsai.",
    year: 2024,
    role: "Frontend Developer Intern",
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Responsive UI",
      "Vite",
      "Framer Motion",
    ],
    image: "https://images.unsplash.com/photo-1512428813834-c702c7702b78?q=80&w=1200&auto=format&fit=crop",
    githubUrl: "https://github.com/AthallahDzaki",
    liveUrl: "https://arthabonsai.com",
    featured: true,
    color: "#10B981",
    challenges: [
      "Menampilkan foto-foto detail resolusi tinggi dari setiap lekukan pohon bonsai tanpa memperlambat loading website di smartphone.",
      "Membangun navigasi visual yang elegan mencerminkan estetika ketenangan seni bonsai alami.",
    ],
    solutions: [
      "Menerapkan progressive image loading dengan format modern WebP dan responsive image srcset.",
      "Merancang palet warna minimalis modern (Lime / Deep Botanical Dark) dengan transisi mikro interaktif yang halus.",
    ],
    outcomes: [
      "Berhasil di-deploy ke production di domain resmi arthabonsai.com dengan rating performa optimal.",
      "Meningkatkan engagement pengunjung dan kemudahan navigasi katalog produk bagi pelanggan.",
    ],
  },
  {
    id: "project-04",
    slug: "sidigi-solutions",
    title: "SIDIGI.asia Digital Ecosystem",
    subtitle: "Modern Web Solutions & High-Performance Client Applications",
    description:
      "Pengembangan solusi web modern, antarmuka interaktif berkinerja tinggi, dan platform digital untuk klien enterprise dan UMKM di SIDIGI.asia.",
    fullDescription:
      "Sebagai Frontend Developer di SIDIGI.asia (Malang, Indonesia), saya bertanggung jawab dalam merancang dan mengembangkan berbagai aplikasi web modern, sistem manajemen konten, dashboard analitik, dan integrasi API yang cepat, aman, dan responsif.",
    year: 2025,
    role: "Frontend Web Developer",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "RESTful APIs",
      "State Management",
    ],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    githubUrl: "https://github.com/AthallahDzaki",
    liveUrl: "https://sidigi.asia",
    featured: false,
    color: "#F59E0B",
    challenges: [
      "Memastikan konsistensi sistem desain di berbagai proyek klien berskala enterprise.",
      "Mengoptimalkan performa Core Web Vitals pada aplikasi web dengan data dinamis yang padat.",
    ],
    solutions: [
      "Membangun modular reusable component library dengan TypeScript dan Tailwind CSS.",
      "Menerapkan strategi Server Side Rendering (SSR) dan Server Components untuk kecepatan load instan.",
    ],
    outcomes: [
      "Menghasilkan aplikasi web yang stabil dan terukur untuk ekosistem digital klien SIDIGI.asia.",
      "Peningkatan kecepatan render halaman rata-rata 35% lebih efisien.",
    ],
  },
];

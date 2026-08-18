import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ReactPatch } from "@/components/providers/ReactPatch";
import { PerformanceProvider } from "@/context/PerformanceContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://athallahdzaki.my.id";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Athallah Dzaki Anggoro Seputro — Creative Fullstack Developer & WebGL Engineer",
    template: "%s | Athallah Dzaki",
  },
  description:
    "Official portfolio of Athallah Dzaki Anggoro Seputro. Fullstack Web Developer at SIDIGI.asia, Founder of SA-Chaos.id, and Computer Science undergraduate at ITN Malang. Specializing in Three.js, WebGL shaders, Next.js, React, PHP, and high-performance web systems.",
  keywords: [
    "Athallah Dzaki",
    "Athallah Dzaki Anggoro Seputro",
    "Athallah Dzaki Portfolio",
    "Athallah Dzaki Malang",
    "Athallah Dzaki ITN Malang",
    "Athallah Dzaki SIDIGI.asia",
    "Creative Developer Indonesia",
    "Creative Fullstack Developer",
    "WebGL Engineer",
    "Three.js Developer",
    "SA-Chaos.id GTA San Andreas",
    "sa-chaos",
    "Artha Bonsai Developer",
    "ThreeJS MMDLoader",
    "Next.js 15 Portfolio",
    "React Three Fiber",
    "GLSL Shaders",
    "Fullstack Developer Malang",
    "PHP MySQL Developer",
  ],
  authors: [{ name: "Athallah Dzaki Anggoro Seputro", url: siteUrl }],
  creator: "Athallah Dzaki Anggoro Seputro",
  publisher: "Athallah Dzaki",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Athallah Dzaki Anggoro Seputro — Creative Fullstack Developer & WebGL Engineer",
    description:
      "Interactive 3D Portfolio of Athallah Dzaki Anggoro Seputro. Fullstack Web Developer at SIDIGI.asia, Founder of SA-Chaos.id, and CS student at ITN Malang.",
    siteName: "Athallah Dzaki Portfolio",
    images: [
      {
        url: `${siteUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Athallah Dzaki Anggoro Seputro — Creative Fullstack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Athallah Dzaki Anggoro Seputro — Creative Fullstack Developer & WebGL Engineer",
    description:
      "Interactive 3D Portfolio of Athallah Dzaki Anggoro Seputro. Fullstack Web Developer at SIDIGI.asia, Founder of SA-Chaos.id, and CS student at ITN Malang.",
    creator: "@athallah_dzaki",
    images: [`${siteUrl}/opengraph-image`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon",
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Rich Google Schema.org JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: "Athallah Dzaki Anggoro Seputro",
        alternateName: ["Athallah Dzaki", "Athallah Dzaki A. S."],
        jobTitle: "Fullstack Web Developer & Creative WebGL Engineer",
        description:
          "Fullstack Web Developer at SIDIGI.asia, Founder & Lead Developer of SA-Chaos.id, and Computer Science undergraduate at ITN Malang.",
        url: siteUrl,
        image: `${siteUrl}/opengraph-image`,
        sameAs: [
          "https://github.com/AthallahDzaki",
          "https://www.linkedin.com/in/athallah-dzaki/",
          "https://www.instagram.com/athallah_dzaki",
          "https://www.tiktok.com/@athallah.dzaki",
          "https://sa-chaos.id",
          "https://arthabonsai.com",
          "https://mmd-loader-three-js.vercel.app",
        ],
        worksFor: {
          "@type": "Organization",
          name: "SIDIGI.asia",
          url: "https://sidigi.asia",
        },
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "Institut Teknologi Nasional Malang (ITN Malang)",
          url: "https://itn.ac.id",
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Malang",
          addressRegion: "East Java",
          addressCountry: "ID",
        },
        knowsAbout: [
          "Fullstack Web Development",
          "Next.js",
          "React",
          "Three.js",
          "WebGL",
          "GLSL Shaders",
          "PHP",
          "MySQL",
          "Linux Server Management",
          "TypeScript",
          "Tailwind CSS",
          "CLEO / ASI Scripting",
          "Real-time WebSockets",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Athallah Dzaki — Creative Fullstack Developer & WebGL Engineer",
        description:
          "Interactive 3D Portfolio showcasing creative coding, WebGL shaders, fullstack web architectures, and production case studies.",
        publisher: {
          "@id": `${siteUrl}/#person`,
        },
        inLanguage: "en-US",
      },
    ],
  };

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#050505] text-white selection:bg-[#00F0FF]/30 selection:text-white relative min-h-screen overflow-x-hidden`}
      >
        <ReactPatch>
          <PerformanceProvider>{children}</PerformanceProvider>
        </ReactPatch>
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://athallahdzaki.my.id"),
  title: "Athallah Dzaki Anggoro Seputro — Creative Developer",
  description:
    "Portfolio of Athallah Dzaki Anggoro Seputro, a creative developer building modern, interactive and immersive web experiences.",
  keywords: [
    "Athallah Dzaki",
    "Athallah Dzaki Anggoro Seputro",
    "Creative Developer",
    "Frontend Developer",
    "Three.js",
    "WebGL",
    "React",
    "Next.js",
    "Interactive Portfolio",
  ],
  authors: [{ name: "Athallah Dzaki Anggoro Seputro" }],
  creator: "Athallah Dzaki Anggoro Seputro",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://athallahdzaki.my.id",
    title: "Athallah Dzaki Anggoro Seputro — Creative Developer",
    description:
      "Interactive 3D Portfolio showcasing creative web development, Three.js, WebGL and high performance digital experiences.",
    siteName: "Athallah Dzaki Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Athallah Dzaki Anggoro Seputro — Creative Developer",
    description:
      "Interactive 3D Portfolio showcasing creative web development, Three.js, WebGL and high performance digital experiences.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon",
  },
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
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#050505] text-white selection:bg-[#00F0FF]/30 selection:text-white relative min-h-screen overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}

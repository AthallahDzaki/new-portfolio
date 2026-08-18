import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/three/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#050505",
          surface: "#0a0a0a",
          elevated: "#121212",
          card: "rgba(18, 18, 18, 0.7)",
        },
        foreground: {
          DEFAULT: "#ffffff",
          secondary: "#ededed",
          muted: "#999999",
          dark: "#666666",
        },
        accent: {
          DEFAULT: "#00F0FF",
          glow: "rgba(0, 240, 255, 0.25)",
          hover: "#33f3ff",
          dim: "#009bb3",
        },
        border: {
          DEFAULT: "rgba(255, 255, 255, 0.12)",
          subtle: "rgba(255, 255, 255, 0.06)",
          active: "rgba(0, 240, 255, 0.4)",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      screens: {
        xs: "375px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
};
export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          DEFAULT: "#2a7a7a",
          dark: "#1e6b6b",
          deep: "#1a5e5e",
          light: "#5fb3b3",
          soft: "#a8d5d5",
          pale: "#cce8e8",
          mist: "#e8f4f4",
        },
        coral: "#e8845c",
        amber: "#f5a623",
        primary: "#1a1a2e",
        secondary: "#6b7280",
      },
      boxShadow: {
        card: "0 4px 24px rgba(42, 122, 122, 0.08)",
        "card-hover": "0 8px 40px rgba(42, 122, 122, 0.14)",
        "card-lg": "0 12px 48px rgba(42, 122, 122, 0.12)",
        glow: "0 0 40px rgba(95, 179, 179, 0.2)",
        "glow-sm": "0 0 20px rgba(95, 179, 179, 0.12)",
        "btn": "0 4px 14px rgba(42, 122, 122, 0.25)",
        "btn-hover": "0 6px 20px rgba(30, 107, 107, 0.35)",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.5s ease-out",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(95, 179, 179, 0.1)" },
          "50%": { boxShadow: "0 0 40px rgba(95, 179, 179, 0.25)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

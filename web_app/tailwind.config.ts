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
        navy: {
          DEFAULT: "#060B26",
          card: "#1A1F37",
          light: "#1E2545",
        },
        "neon-blue": "#0075FF",
        cyan: "#4FD1C5",
        "success-green": "#01B574",
        muted: "#A0AEC0",
      },
      backdropBlur: {
        xs: "2px",
        "2xl": "40px",
      },
      boxShadow: {
        glow: "0 0 40px rgba(0, 117, 255, 0.15)",
        "glow-sm": "0 0 20px rgba(0, 117, 255, 0.1)",
        "glow-cyan": "0 0 30px rgba(79, 209, 197, 0.15)",
        "glow-green": "0 0 20px rgba(1, 181, 116, 0.15)",
        glass: "0 8px 32px rgba(0, 117, 255, 0.08)",
      },
      borderColor: {
        "glass": "rgba(255, 255, 255, 0.1)",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.5s ease-out",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0, 117, 255, 0.1)" },
          "50%": { boxShadow: "0 0 40px rgba(0, 117, 255, 0.25)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

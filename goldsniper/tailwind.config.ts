import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        syne: ["Syne", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        gold: { DEFAULT: "#f59e0b", dark: "#d97706", light: "#fbbf24" },
        bg: { DEFAULT: "#05070f", card: "#0e1017" },
      },
      animation: {
        ticker: "ticker 30s linear infinite",
        float: "float 4s ease-in-out infinite",
        pulse2: "pulse2 2s infinite",
        shimmer: "shimmer 3s linear infinite",
      },
      keyframes: {
        ticker: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
        pulse2: { "0%,100%": { boxShadow: "0 0 0 0 rgba(34,197,94,0.4)" }, "50%": { boxShadow: "0 0 0 8px rgba(34,197,94,0)" } },
        shimmer: { "0%": { backgroundPosition: "-200% center" }, "100%": { backgroundPosition: "200% center" } },
      },
    },
  },
  plugins: [],
} satisfies Config;

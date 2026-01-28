import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{mdx,md}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "var(--accent)",
        ink: "var(--ink)",
        paper: "var(--paper)",
        graphite: "var(--graphite)",
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "Liberation Mono", "Courier New", "monospace"],
        body: ["var(--font-body)", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
      boxShadow: {
        pencil: "0 2px 0 rgba(0,0,0,0.25)",
      },
      keyframes: {
        "grain-shift": {
          "0%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(-10%, 10%)" },
          "100%": { transform: "translate(0, 0)" },
        },
        "float-in": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "jitter": {
          "0%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(0.5px, -0.5px)" },
          "100%": { transform: "translate(0, 0)" },
        },
        "wink": {
          "0%": { transform: "scaleY(1)" },
          "50%": { transform: "scaleY(0.2)" },
          "100%": { transform: "scaleY(1)" },
        },
      },
      animation: {
        "grain": "grain-shift 8s steps(2, end) infinite",
        "float-in": "float-in 0.6s ease-out both",
        "jitter": "jitter 2.5s ease-in-out infinite",
        "wink": "wink 0.3s ease-in-out",
      },
    },
  },
  plugins: [],
};

export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        terminal: {
          bg:      "#0d1117",
          surface: "#161b22",
          border:  "#30363d",
          green:   "#00ff41",
          green2:  "#39d353",
          green3:  "#4ade80",
          muted:   "#7ee787",
          dim:     "#3fb950",
          comment: "#8b949e",
          white:   "#e6edf3",
          yellow:  "#e3b341",
          red:     "#f85149",
          blue:    "#58a6ff",
        },
      },
      fontFamily: {
        mono: ["var(--font-jetbrains)", "JetBrains Mono", "Fira Code", "Cascadia Code", "monospace"],
      },
      animation: {
        blink:   "blink 1s step-end infinite",
        scanline:"scanline 8s linear infinite",
        flicker: "flicker 0.15s infinite",
        fadeUp:  "fadeUp 0.5s ease forwards",
        typeIn:  "typeIn 0.05s steps(1) forwards",
      },
      keyframes: {
        blink:   { "0%,100%": { opacity: "1" }, "50%": { opacity: "0" } },
        scanline:{ "0%": { transform: "translateY(-100%)" }, "100%": { transform: "translateY(100vh)" } },
        flicker: { "0%,100%": { opacity: "1" }, "50%": { opacity: "0.97" } },
        fadeUp:  { from: { opacity: "0", transform: "translateY(16px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        typeIn:  { from: { opacity: "0" }, to: { opacity: "1" } },
      },
    },
  },
  plugins: [],
};
export default config;

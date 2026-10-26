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
        farm: {
          50: "#f2f8f4",
          100: "#e1f0e6",
          200: "#c3e1ce",
          300: "#97cbab",
          400: "#65af82",
          500: "#419361",
          600: "#2f764c",
          700: "#275e3e",
          800: "#204a32",
          900: "#1a3d29",
          950: "#0c2015",
        },
        harvest: {
          50: "#fdf8ee",
          100: "#faefd4",
          200: "#f4dea7",
          300: "#ecc671",
          400: "#e4aa42",
          500: "#dc9124",
          600: "#bf701b",
          700: "#975019",
          800: "#7b3f1a",
          900: "#663519",
          950: "#3a1b0b",
        },
        earth: {
          50: "#fbf9f6",
          100: "#f5f0e9",
          200: "#e8dcce",
          300: "#dac3ad",
          400: "#c7a589",
          500: "#b58a69",
          600: "#a37453",
          700: "#865c42",
          800: "#6e4b37",
          900: "#5a3e2f",
          950: "#302018",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-up": "slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-slow": "bounce 3s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;


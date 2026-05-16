/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bluebird: {
          50: "#eff8ff",
          100: "#daedff",
          200: "#bee0ff",
          300: "#91ceff",
          400: "#5db1ff",
          500: "#388eff",
          600: "#216bf5",
          700: "#1a55e1",
          800: "#1c46b6",
          900: "#1d3f8f",
          950: "#162857",
        },
        ink: {
          50: "#f6f7f9",
          100: "#ebedf2",
          200: "#d3d8e2",
          300: "#adb6c8",
          400: "#808ca8",
          500: "#606e8d",
          600: "#4c5874",
          700: "#3e475e",
          800: "#363c4f",
          900: "#0e1220",
          950: "#070914",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "blink": "blink 1s steps(1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        blink: {
          "0%, 50%": { opacity: "1" },
          "51%, 100%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

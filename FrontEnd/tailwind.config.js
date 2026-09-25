/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      // Palette issue du logo : fond bleu nuit, dégradé cyan → bleu
      colors: {
        brand: {
          50: "#ecfaff",
          100: "#d3f3fc",
          200: "#aee8f8",
          300: "#86dcf2",
          400: "#63cdea",
          500: "#52b4e0",
          600: "#4499d4",
          700: "#3a80c4",
          800: "#2f65a0",
          900: "#264f7d",
          950: "#17314f",
        },
        night: {
          600: "#1f3d61",
          700: "#173152",
          800: "#122843",
          900: "#0e1f35",
          950: "#0a1627",
        },
        ink: {
          DEFAULT: "#e8f2fc",
          soft: "#b1c4d9",
          muted: "#7890ab",
        },
        line: "rgba(140, 190, 235, 0.13)",
        surface: "#0c1a2d",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["'Space Grotesk'", "Inter", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },
      boxShadow: {
        card: "0 1px 0 rgba(255, 255, 255, 0.04) inset, 0 12px 32px -16px rgba(0, 0, 0, 0.6)",
        lift: "0 1px 0 rgba(255, 255, 255, 0.06) inset, 0 24px 48px -16px rgba(82, 180, 224, 0.35)",
        glow: "0 0 0 1px rgba(99, 205, 234, 0.35), 0 8px 30px -6px rgba(99, 205, 234, 0.45)",
      },
      backgroundImage: {
        grid: "linear-gradient(to right, rgba(140,190,235,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(140,190,235,0.07) 1px, transparent 1px)",
        logo: "linear-gradient(135deg, #63cdea 0%, #4fa9dc 50%, #3a80c4 100%)",
      },
    },
  },
  plugins: [],
}

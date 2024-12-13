/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class", "class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      }
    },
    colors: {
      neutral: {
        50: "var(--neutral-50)",
        100: "var(--neutral-100)",
        200: "var(--neutral-200)",
        300: "var(--neutral-300)",
        400: "var(--neutral-400)",
        500: "var(--neutral-500)",
        600: "var(--neutral-600)",
        700: "var(--neutral-700)",
        800: "var(--neutral-800)",
        900: "var(--neutral-900)",
        950: "var(--neutral-950)"
      },
      amaranth: {
        50: "var(--amaranth-50)",
        100: "var(--amaranth-100)",
        200: "var(--amaranth-200)",
        300: "var(--amaranth-300)",
        400: "var(--amaranth-400)",
        500: "var(--amaranth-500)",
        600: "var(--amaranth-600)",
        700: "var(--amaranth-700)",
        800: "var(--amaranth-800)",
        900: "var(--amaranth-900)",
        950: "var(--amaranth-950)",
        contrast: "var(--amaranth-contrast)"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};

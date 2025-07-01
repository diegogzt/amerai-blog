/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      colors: {
        // Mantener compatibilidad con las variables CSS existentes
        "astro-gray": {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
        // Colores personalizados similares a KOOPLA
        brand: {
          green: "#7dd55c",
          "green-light": "#9fe683",
          "green-dark": "#5cb03c",
          gray: "#333333",
          "gray-light": "#555555",
        },
      },
      fontFamily: {
        atkinson: ["Atkinson Hyperlegible", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

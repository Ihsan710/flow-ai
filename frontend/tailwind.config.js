/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
        space: ['Inter', 'sans-serif'], // Simplified to Inter for premium SaaS look
      },
      colors: {
        bg: "#000000",
        surface: "#0a0a0a",
        card: "rgba(255,255,255,0.03)",
        border: "rgba(255,255,255,0.08)",
        accent: "#00f5ff",
      }
    },
  },
  plugins: [],
}

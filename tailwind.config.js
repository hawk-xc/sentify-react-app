import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Sesuaikan dengan struktur proyek Anda
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["SF Pro", "sans-serif"],
        figtree: ['Figtree', 'Noto Sans', 'sans-serif'],
      },
      animation: {
        loading: "loading 1.5s ease-in-out infinite",
      },
      keyframes: {
        loading: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    theme: ["light", "dark", "cupcake", "synthwave"],
  },
};

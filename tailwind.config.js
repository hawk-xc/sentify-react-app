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
    },
  },
  plugins: [daisyui],
  daisyui: {
    theme: ["light", "dark", "cupcake", "synthwave"],
  },
};

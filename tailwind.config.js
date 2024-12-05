/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Sesuaikan dengan struktur proyek Anda
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    theme: ["light", "dark", "cupcake", "synthwave"],
  },
};

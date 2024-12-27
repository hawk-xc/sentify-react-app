import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["SF Pro", "sans-serif"],
        figtree: ['Figtree', 'Noto Sans', 'sans-serif'],
      },
      animation: {
        loading: "loading 1.5s ease-in-out infinite",
        gradient: "gradient 3s infinite linear",
      },
      keyframes: {
        loading: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        gradient: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    theme: ["light", "dark", "cupcake", "synthwave"],
  },
};

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  themes: [
    {
      mytheme: {
        "primary": "#1A73E7",
        "secondary": "#C5E0CF",
        "accent": "#D5E7CB",
        "neutral": "#D5E7CB",
        "base-100": "#ffffff",
      },
    },
    "dark",
    "cupcake",
  ],
  plugins: [require("daisyui")],
}


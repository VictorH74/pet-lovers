/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      "righteous": ["Righteous", "cursive"],
      "noto-sans": ["Noto Sans", "sans-serif"],
      "work-sans": ["Work Sans", "sans-serif"]
    }
  },
  plugins: [],
}

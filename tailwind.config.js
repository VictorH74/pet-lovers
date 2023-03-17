/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "custom-emerald": "#00C898",
        "custom-blue": "#368FC1"
      }
    },
    fontFamily: {
      "righteous": ["Righteous", "cursive"],
      "noto-sans": ["Noto Sans", "sans-serif"],
      "work-sans": ["Work Sans", "sans-serif"]
    }
  },
  plugins: [],
}

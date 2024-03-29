/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "custom-emerald": "#00C898",
        "custom-blue": "#368FC1",
        "custom-gray": "#5E5E5E",
        "custom-red": "#e93838",
      }
    },
    fontFamily: {
      "righteous": ["Righteous", "cursive"],
      "noto-sans": ["Noto Sans", "sans-serif"],
      "work-sans": ["Work Sans", "sans-serif"]
    }
  },
  plugins: [
    require('@tailwindcss/container-queries'),
  ],
}

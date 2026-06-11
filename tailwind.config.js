/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cobalt: "#4C00FF",
        inkwell: "#130032",
        mist: "#CBC2FF",
        "cobalt-hover": "#3A00CC",
        "ds-gray": "#F5F5F5",
        "ds-border": "#E0E0E0",
      },
      fontFamily: {
        sans: ['"DS Indigo"', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,ftl}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui')
  ],
}


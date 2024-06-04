/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./node_modules/preline/preline.js",
    "./src/**/*.{js,jsx,ts,tsx,ftl}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar'),
    require('preline/plugin')
  ],
}


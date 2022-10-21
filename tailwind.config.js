/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        manrope: ['Manrope', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};

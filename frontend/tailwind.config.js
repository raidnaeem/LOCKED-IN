/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      gray: '#EDF2F7',
      slate: colors.slate,
      blue: '#667EEA',
      white: '#FFFFFF',
      red: colors.red,
    },
    extend: {},
  },
  plugins: [],
}


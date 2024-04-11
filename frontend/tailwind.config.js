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
      beige: '#F4D79E',
      brown: '#855A07',
      black: '#000000',
      orange: colors.orange,
      amber: colors.amber,
      zinc: colors.zinc,
      pink: colors.pink,
    },
    extend: {},
  },
  plugins: [],
}


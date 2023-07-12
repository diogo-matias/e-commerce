/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

const {BREAKPOINTS} = require('./src/constants/breakpoints/index')

const {
  sm: SM,
  md: MD,
  lg: LG,
  xl: XL,
  xl2: XL2
} = BREAKPOINTS

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    colors: {
      ...colors,
      primary: '#fe1',
    },
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
    screens: {
      'sm': SM,
      'md': MD,
      'lg': LG,
      'xl': XL,
      '2xl': XL2
    },
  },
  plugins: [],
}


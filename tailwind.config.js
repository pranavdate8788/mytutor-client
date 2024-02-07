/** @type {import('tailwindcss').Config} */
module.exports = {
  variants: {
    extend: {
      display: ["group-hover"],
    },
  },
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    screens: {
      'xs': { 'max': '720px' },
      'sm': { 'max': '720px' },
      'md': { 'max': '720px' },
    },
    colors: {
      'color-1': '#FEE4CB',
      'color-2': '#1a0970',//black
      'color-3': '#EAF0FF',
      'color-4': '#1a0970',//orange
      'color-5': '#F2F2F2',
      'color-6': '#2a2929',
      'color-7': '#c0eef4',//
      'color-8': '#808080',//red
      'color-9': '#4F39BE',
      'color-10': '#05FF00',
      'color-11': '#1a1a2e',
      'color-12': '#f187fb',
      'color-13': '#ff0000',//red
      'color-14': '#1a0970',//primary
      'color-15': '#C0A9FF',
      'color-16': '#030114',
      'color-17': '#0000ff',
      'white': '#FFFFFF',
      'black': '#1a0970',
      'grey': '#1a0970'
    },
    fontFamily: {
      'font-logo': ['Lemon', 'cursive'],
      'font-primary': ['Quicksand', 'sans-serif'],
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}

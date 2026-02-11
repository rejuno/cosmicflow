/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#332062',
        secondary: '#F4F4F4',
        dark: '#C6D5F2',
        light: '#A8DCEC',
      }
    },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        sora: ['Cormorant', 'sans-serif'],
      }
  },
  plugins: [],
}
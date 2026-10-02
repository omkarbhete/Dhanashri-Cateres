/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#f8f5ef',
        burgundy: '#702d38',
        gold: '#b59053',
      },
    },
  },
  plugins: [],
}

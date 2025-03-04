/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'casino-gold': '#D4AF37',
        'casino-red': '#C41E3A',
        'casino-green': '#0B5D1E',
        'felt-green': '#0B5D1E',
        'casino-black': '#1E1E1E',
        'casino-purple': '#4B0082',
        'casino-blue': '#0F4C81',
      },
      backgroundImage: {
        'casino-pattern': "url('/src/assets/casino-pattern.png')",
        'card-back': "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
      },
      boxShadow: {
        'neon': '0 0 5px theme(colors.casino-gold), 0 0 10px theme(colors.casino-gold)',
        'neon-red': '0 0 5px theme(colors.casino-red), 0 0 10px theme(colors.casino-red)',
        'neon-green': '0 0 5px theme(colors.casino-green), 0 0 10px theme(colors.casino-green)',
        'neon-blue': '0 0 5px theme(colors.casino-blue), 0 0 10px theme(colors.casino-blue)',
        'neon-purple': '0 0 5px theme(colors.casino-purple), 0 0 10px theme(colors.casino-purple)',
      },
      fontFamily: {
        'casino': ['Playfair Display', 'serif'],
        'display': ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
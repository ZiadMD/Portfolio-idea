/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cinzel Decorative"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
        runic: ['"MedievalSharp"', 'cursive'],
      },
      colors: {
        arcane: {
          dark: '#0a0a0c',
          void: '#000000',
          stone: '#1a1a24',
          gold: '#d4af37',
          glow: '#00f0ff',
          purple: '#4a0e4e'
        }
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}

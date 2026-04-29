/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neura: {
          50: '#f9f6f3',
          100: '#f0e8e0',
          200: '#e8dcc8',
          300: '#d9c4a8',
          400: '#c9a880',
          500: '#a0826d',
          600: '#8B6F47',
          700: '#6B5344',
          800: '#5a4636',
          900: '#3e2f23',
        },
        warm: {
          50: '#fefaf6',
          100: '#f5f1ed',
          200: '#ebe4db',
          300: '#d9cec1',
          400: '#c9b8ab',
        },
        soft: {
          blue: '#f0e8e0',
          purple: '#f0e8e0',
          pink: '#f0e8e0',
        },
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
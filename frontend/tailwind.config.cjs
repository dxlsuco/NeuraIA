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
          50: '#F8FAFF',
          100: '#EEF2FF',
          200: '#DBEAFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#172554',
        },
        violet: {
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
        },
        teal: {
          50: '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6',
          600: '#0D9488',
          700: '#0F766E',
          800: '#115E59',
          900: '#134E4A',
        },
        sage: {
          50: '#F3FAF6',
          100: '#E3F3EA',
          200: '#C8E7D5',
          300: '#9DD2B7',
          400: '#6BAE8B',
          500: '#4D936F',
          600: '#377657',
          700: '#2C5F48',
          800: '#254D3C',
          900: '#203F32',
        },
        soft: {
          blue: '#EEF2FF',
          purple: '#F5F3FF',
          teal: '#F0FDFA',
          pink: '#FDF2F8',
        },
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        neura: '0 4px 20px rgba(37,99,235,0.06)',
        'neura-premium': '0 25px 60px -10px rgba(79,124,247,0.2)',
        'neura-sidebar': '4px 0 20px rgba(37,99,235,0.04)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}

/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
      },
      fontSize: {
        'text-light': ['16px', '1.5'],
        'text-normal': ['18px', '1.5'],
        bold: ['22px', '1.5'],
        title: ['32px', '1.25'],
        'shop-title': ['64px', '1.25'],
      },
      fontWeight: {
        normal: 400,
        bold: 700,
      },
    },
  },
  plugins: [require('daisyui')],
}

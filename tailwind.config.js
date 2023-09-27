/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bgDark: '#141D2F',
        bgLight: '#F6F8FF',
        darkCard: '#1E2A47',
        lightCard: '#F6F8FF',
        primaryColor: '##0079FF',
        moonlight: '#697C9A',
        lightText: '#4B6A9B',
        darkText: '#2B3442',
        redText: 'F74646',
      },
    },
  },
  plugins: [],
};

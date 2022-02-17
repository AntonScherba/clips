module.exports = {
  content: ['./src/**/*.{html,js}'],
  safelist: ['bg-blue-400', 'bg-green-400', 'bg-red-400'],
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      backgroundColor: ['disabled'],
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
};

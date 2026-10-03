export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'] },
      colors: {
        brand: { DEFAULT: '#0F5C4A', dark: '#0A4033', light: '#E6F1ED' },
        saffron: '#F5A623',
        sale: '#D6342C',
        paper: '#FAFAF7',
        ink: '#1B1F1D',
      },
    },
  },
  plugins: [],
}

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'primaryColor': '#17a2b8',
        'darkColor': '#343a40',
        'lightColor': '#f4f4f4',
        'dangerColor': '#dc3545',
        'successColor': '#28a745'
      }
    }
  },
  variants: {
    extend: {},
  },

  plugins: [],
}

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      boxShadow: {
        'custom-shadow': 'rgb(38, 57, 77) 0px 20px 30px -10px',
        // right: '8px 0 15px -3px rgba(0, 0, 0, 0.1), 4px 0 6px -2px rgba(0, 0, 0, 0.05)',

      },
      colors: {
        'custom-bgc': '#05222e',
        'custom-tc': '#ffffff',
        'custom-scroll': "#222222",
        'custom-tabledark': '#083344',
        'custom-tablelight': '#E0E0E0',
        'filter-bg': '#323546'
      },
      screens: {
        'xs': '374px',
        'xm': '424px',

      }
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.scrollbar-hide': {
          'scrollbar-width': 'none', /* Firefox */
          '-ms-overflow-style': 'none', /* Internet Explorer 10+ */
        },
        '.scrollbar-hide::-webkit-scrollbar': {
          display: 'none', /* Safari and Chrome */
        },
      }
      addUtilities(newUtilities)
    }
  ],
  corePlugins: {
    position: true,
  },
  variants: {
    fill: ['hover', 'active'],
    extend: {
      backgroundColor: ['dark'], // This enables the 'dark:' variant for background color
      textColor: ['dark'], // This enables the 'dark:' variant for text color
      backgroundColor: ['active'],
      boxShadow: ['responsive'],

    },
  },

}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/pages/**/*.{js,jsx}', './src/components/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontSize: {
        '2xs': '.625rem',
      },
      colors: {
        transparent: 'transparent',
        white: '#ffffff',
        black: '#000000',
        gray: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#EEEEEE',
          300: '#E0E0E0',
          400: '#BDBDBD',
          500: '#9E9E9E',
          600: '#757575',
          700: '#616161',
          800: '#353535',
          900: '#212121',
        },
        green: '#D2D78A',
        deepGreen: '#71955E',
        yellow: '#FFD796',
        deepYellow: '#ED993E',
        red: '#FFB1A0',
        deepRed: '#E56F5E',
        brown: '#E9D5C2',
        deepBrown: '#9D8D86',
        blue: '#E1E6FF',
        deepBlue: '#8D8BA7',
      },
    },
  },
  plugins: [],
};

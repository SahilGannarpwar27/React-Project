/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-green': 'rgb(60 202 98);',
      },
      button : {
        'eye-button': 'absolute top-4 right-3 text-gray-500 hover:text-gray-700',
      }
    },
  },
  plugins: [],
}


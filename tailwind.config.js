/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      scale: {
        '-1': '-1'
      }
    }
  },
  plugins: [],
}


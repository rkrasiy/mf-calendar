/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
     borderWidth: {
      DEFAULT: '1px',
      '1': '1px'
    }
  },
  plugins: [],
}
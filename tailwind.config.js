/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#121212',
          lighter: '#1e1e1e',
          darker: '#0a0a0a'
        },
        primary: {
          DEFAULT: '#4f46e5',
          light: '#6366f1',
          dark: '#3c35b5'  // Added primary-dark color
        },
        secondary: {
          DEFAULT: '#f43f5e',
          dark: '#e11d48'  // Added secondary-dark color
        }
      }
    },
  },
  plugins: [],
}
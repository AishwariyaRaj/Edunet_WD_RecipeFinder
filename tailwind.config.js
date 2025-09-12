/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF5A1F', // Orange accent color
          dark: '#E04E1A',
          light: '#FF7E4A',
        },
        secondary: {
          DEFAULT: '#FF3B30', // Red accent color
          dark: '#E02D24',
          light: '#FF6259',
        },
        dark: {
          DEFAULT: '#1A1A1A', // Dark background
          lighter: '#2A2A2A',
          darker: '#121212',
        },
        light: {
          DEFAULT: '#F8F8F8',
          darker: '#E0E0E0',
        }
      },
    },
  },
  plugins: [],
}
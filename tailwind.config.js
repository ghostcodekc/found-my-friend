/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'], // Clean, mobile-standard font
      },
      colors: {
        primary: '#3b82f6', // Material Blue
        secondary: '#10b981', // Material Green (for safety/call)
        surface: '#ffffff',
        background: '#f3f4f6',
        grad1: '#F0E491',
        grad2: '#BBC863',
        grad3: '#658C58',
        grad4: '#31694E'
      }
    },
  },
  plugins: [],
}
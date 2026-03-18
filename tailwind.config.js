/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: '#0d4a41', // Darker Teal exactly matching the logo
          lightTeal: '#1c6d61',
          yellow: '#f4a31a', // The vibrant mustard/yellow
          lightYellow: '#f9bb4b',
          green: '#8ec436', // The lime green from the button
          offwhite: '#F8F9F9',
          dark: '#1C2928'
        }
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        script: ['Caveat', 'cursive'],
        display: ['Playfair Display', 'serif']
      },
      boxShadow: {
        'card': '0 10px 30px -5px rgba(0, 0, 0, 0.08)',
        'float': '0 20px 40px -10px rgba(0, 0, 0, 0.12)',
        'glow': '0 0 20px rgba(142, 196, 54, 0.5)'
      }
    },
  },
  plugins: [],
}

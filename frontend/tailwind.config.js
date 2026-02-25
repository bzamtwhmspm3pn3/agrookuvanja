cat > tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'verde-alface': '#1A4D2E',
        'verde-pimenta': '#82B74D',
        'verde-claro': '#E8F0E8',
      }
    },
  },
  plugins: [],
}
EOF
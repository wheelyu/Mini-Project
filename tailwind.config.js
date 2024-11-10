// tailwind.config.js
module.exports = {
  darkMode: 'class', // Aktifkan dark mode menggunakan class
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/preline/dist/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('preline/plugin'),
  ],
};

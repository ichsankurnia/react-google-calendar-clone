module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      gridTemplateColumns: {
        "1/5": "1fr 5fr"
      },
      zIndex: {
        full: 9999,
      }
    },
  },
  plugins: [],
}

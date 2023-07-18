const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customBlack: "#0F1108",
        customDarkBlue: "#2A628F",
        customLightBlue: "#00F6ED",
        customWhite: "#CAD8DE",
        customBrown: "#645853",
      },
      fontFamily: {
        lumonosimo: ["Lumanosimo", "cursive"],
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};

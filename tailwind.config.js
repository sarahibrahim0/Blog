/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      "sm": "320px",
      /* For mobiles: */
      /* your CSS here */
      "md": "481px",
      // => @media (min-width: 640px) { ... }
      "lg": "769px",
      // => @media (min-width: 1024px) { ... }

      "xl": "1025px",
      // => @media (min-width: 1280px) { ... }
      "2xl": "1201px",
    },
    extend: {
      spacing: {
        "87%": "87%",
      },
      colors: {
        "faint-gray": "#5b6b80",
        "blue-black": "#313D5D",
        "very-blue" :"#4776E6",
      },
      backgroundImage: {
        'custom-color': "linear-gradient(#313D5D, #313D5D)",
      },
      gridTemplateColumns: {
        // Simple 16 column grid
        '13': 'repeat(13, minmax(0, 1fr))',
      }
    },

    darkMode: "class",
    plugins: [require("tw-elements/dist/plugin.cjs")],
  },
};

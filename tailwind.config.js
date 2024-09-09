/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  safelist: [
    "from-rainy-gradStart",
    "to-rainy-gradEnd",
    "from-sunny-gradStart",
    "to-sunny-gradEnd",
    "bg-sunny-nav",
    "from-cloudy-gradStart",
    "to-cloudy-gradEnd",
    "bg-cloudy-nav",
    "bg-rainy-nav",
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ["Comfortaa"],
      },

      colors: {
        sunny: {
          gradStart: "#f0dc7e",
          gradEnd: "#ffbe94",
          nav: "#f7e4c5",
        },
        cloudy: {
          gradStart: "#6EFAE4",
          gradEnd: "#73EFED",
          nav: "#c1f2ef",
        },
        rainy: {
          gradStart: "#59E3FE",
          gradEnd: "#5bcbfb",
          nav: "#c7eff9",
        },
        textDark: "#302E62",
        textLight: "#E3E7ED",
        textNeutral: "#788699",
      },
    },
  },
  plugins: [],
};

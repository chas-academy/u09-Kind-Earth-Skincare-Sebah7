/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        primaryText: "#F7F3F3",
        formPrimaryText: "#062A0A",
        formSecondaryText: "#440245",
        formColor: "#b8cdad",
        spruce: "#055E2F",
      },

      fontFamily: {
        sans: ["Dancing Script", "cursive", "Helvetica", "Arial", "sans-serif"],
      },
      fontSize: {
        inherit: "inherit",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};

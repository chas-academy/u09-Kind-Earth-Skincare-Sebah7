/** @type {import('tailwindcss').Config} */

import { px, transform, color } from 'framer-motion';

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        primaryText: "#472304",
        formPrimaryText: "#062A0A",
        formSecondaryText: "#440245",
        clayAsh: "#b8cdad",
        summerGreen: "#52675E",
        // spruce: "#055E2F",
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

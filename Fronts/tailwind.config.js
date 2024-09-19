/** @type {import('tailwindcss').Config} */

export default {
  content: [
       "./index.html", 
       "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
black: "#000",
gray: "rgba(30, 30, 30, 0.72)"
},

fontFamily: {
sans: ["Dancing Script", "cursive", "Helvetica", "Arial", "sans-serif"],
},
fontSize: {
inherit: "inherit"
},
 },
},
corePlugins: {
preflight: false
},
  plugins: [],
}



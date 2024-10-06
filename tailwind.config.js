/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    backgroundColor:{
      card:"#0e1a2b",
      input:"#182c47",
      button:'#5692e8'
    },
    colors:{
      text:"#c1d1e8"
    },
    fontFamily: {
      montserrat:["Montserrat", "sans-serif"],
      mulish:["Mulish", "sans-serif"]
    }
  },
  plugins: [],
}
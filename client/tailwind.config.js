/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
       colors : {
        "primary" : "#ffbf00",
        "primary-light" : "#ffc292",
        "secondary" : "#00b050",
        "secondary-lite" : "#0b1a78"
       }
    },
  },
  plugins: [],
}


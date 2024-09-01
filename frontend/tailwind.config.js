/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors:{
        'second-color' : "#AACC00" ,
        'third-color' : "#092856" ,
      },
      fontSize: {
        'h1': '100px',
        'h2': '50px',
        'h3': '30px',
        'h4': '24px',
        'h5': '20px',
        'h6': '16px',
      },
    },
  },
  plugins: [],
}


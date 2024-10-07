/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors:{
        'first-color' : '#00000',
        'second-color' : "#AACC00" ,
        'third-color' : "#092856" ,
      },
      boxShadow: {
        'custom': 'rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px',
      },
    },
  },
  plugins: [],
}


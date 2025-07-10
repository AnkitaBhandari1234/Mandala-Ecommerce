export default  {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
       fontFamily: {
    playfair: ['"Playfair Display"', 'serif'],
    poppins: ['Poppins'],
    inter:['Inter', 'sans-serif'],
  
  },
  animation: {
        spinSlow: 'spin 30s linear infinite', // Adjust speed here
      },
    },
  },
  plugins: [],
}


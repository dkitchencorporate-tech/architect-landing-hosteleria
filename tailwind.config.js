/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: { 
    extend: { 
      colors: { 
        background: "#FDFCF8", // Premium warm alabaster white
        foreground: "#0A0A0A", // Deep obsidian luxury black
        brand: "#FF4500", // Vibrant high-converting Orange-Red
        brandHover: "#CC3700",
        trust: "#10B981" // WhatsApp/Trust Green
      },
      boxShadow: {
        'premium': '0 40px 60px -15px rgba(0, 0, 0, 0.05)',
        'float': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }
    } 
  },
  plugins: [],
}

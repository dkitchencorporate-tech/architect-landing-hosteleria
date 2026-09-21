/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: { 
    extend: { 
      colors: { 
        background: "#FDFCF8", // Premium warm alabaster white
        foreground: "#0A0A0A", // Deep obsidian luxury black
        brand: "#D9531E", // Naranja quemado/terracota — actualizado 2026-09-21 (Parte 7, Sección 5): el OrangeRed puro leía a acento SaaS genérico, no a hostelería
        brandHover: "#B8451A",
        brandAccent: "#B8863B", // Mostaza/ámbar apagado — acento secundario minoritario, nunca sustituye a `brand` en el CTA principal
        trust: "#10B981", // WhatsApp/Trust Green
        "dash-bg": "#171008", // Negro base espresso — actualizado 2026-09-21 (Parte 7, Sección 5), mismo rol que el #050505 anterior
        "dash-surface": "#121212", // Dashboard surface elements
        "dash-surface-hover": "#1A1A1A", // Dashboard surface elements on hover
        "dash-border": "#2A2A2A", // Dashboard border
        "dash-accent": "#EAB308", // Dashboard gold accent
        "dash-text-primary": "#F3F4F6", // Dashboard main text
        "dash-text-secondary": "#9CA3AF" // Dashboard muted text
      },
      boxShadow: {
        'premium': '0 40px 60px -15px rgba(0, 0, 0, 0.05)',
        'float': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }
    } 
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

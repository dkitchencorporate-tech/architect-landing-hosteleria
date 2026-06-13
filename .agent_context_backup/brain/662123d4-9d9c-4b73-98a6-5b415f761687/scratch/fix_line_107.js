const fs = require('fs');
const filepath = 'src/lib/demo-data.ts';
let content = fs.readFileSync(filepath, 'utf8');

const oldLine = `  { id: "t28", category: "t_bebidas", name: { es: "Tinto de Verano Premium", en: "Premium Tinto de Verano", fr: "Tinto de Verano Premium" }, description: { es: "Vino tinto joven mezclado con refresco de limón, rodajas de cítricos frescos y extra de hielo.", en: "Young red wine mixed with lemon soda, fresh citrus slices, and extra ice.", fr: "Vin rouge jeune mélangé avec soda au citron, tranches d'agrumes fraîches y supplément de glace." }, price: 3.5, allergens: ["SU"], image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&q=50&fm=webp" },m" }, description: { es: "Vino tinto joven mezclado con refresco de limón, rodajas de cítricos frescos y extra de hielo.", en: "Young red wine mixed with lemon soda, fresh citrus slices, and extra ice.", fr: "Vin rouge jeune mélangé avec soda au citron, tranches d'agrumes fraîches et supplément de glace." }, price: 3.5, allergens: ["SU"], image: "/images/demo/t28.png" },`;

const newLine = `  { id: "t28", category: "t_bebidas", name: { es: "Tinto de Verano Premium", en: "Premium Tinto de Verano", fr: "Tinto de Verano Premium" }, description: { es: "Vino tinto joven mezclado con refresco de limón, rodajas de cítricos frescos y extra de hielo.", en: "Young red wine mixed with lemon soda, fresh citrus slices, and extra ice.", fr: "Vin rouge jeune mélangé avec soda au citron, tranches d'agrumes fraîches y supplément de glace." }, price: 3.5, allergens: ["SU"], image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&q=50&fm=webp" },`;

if (content.includes(oldLine)) {
  content = content.replace(oldLine, newLine);
  fs.writeFileSync(filepath, content, 'utf8');
  console.log('Successfully replaced line 107 by exact match!');
} else {
  // Try split-by-newline index replace
  const lines = content.split('\n');
  lines[106] = newLine;
  fs.writeFileSync(filepath, lines.join('\n'), 'utf8');
  console.log('Successfully replaced line 107 by index!');
}

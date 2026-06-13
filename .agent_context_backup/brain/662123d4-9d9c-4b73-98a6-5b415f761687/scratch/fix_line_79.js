const fs = require('fs');
const filepath = 'src/lib/demo-data.ts';
let content = fs.readFileSync(filepath, 'utf8');

const newLine = `  { id: "t5", category: "t_frituras", name: { es: "Croquetas Melosas de Rabo de Toro", en: "Oxtail Croquettes", fr: "Croquettes de Queue de Bœuf" }, description: { es: "Bechamel untuosa infusionada con el jugo de un guiso de rabo de toro de 6 horas, rebozadas en panko extracrujiente.", en: "Unctuous bechamel infused with 6-hour oxtail stew juices, breaded in extra-crispy panko.", fr: "Béchamel onctueuse infusée au jus d'un ragoût de queue de bœuf de 6h, panées au panko extra-croustillant." }, price: 11.0, allergens: ["GL", "LE", "HU"], isChefRecommendation: true, image: "/images/demo/t5.png" },
  { id: "t6", category: "t_frituras", name: { es: "Cazón en Adobo Gaditano", en: "Marinated Dogfish", fr: "Requin Mariné" }, description: { es: "Dados de bienmesabe marinados en vinagre, orégano y comino, fritos en aceite de oliva a alta temperatura.", en: "Cubes of marinated fish in vinegar, oregano, and cumin, fried in high-temperature olive oil.", fr: "Dés de requin marinés au vinaigre, origan et cumin, frits dans l'huile d'olive à haute temperatura." }, price: 12.5, allergens: ["PE", "GL", "SU"], image: "/images/demo/t6.png" },`;

const lines = content.split('\n');
lines[78] = newLine;
fs.writeFileSync(filepath, lines.join('\n'), 'utf8');
console.log('Successfully replaced line 79 by index!');

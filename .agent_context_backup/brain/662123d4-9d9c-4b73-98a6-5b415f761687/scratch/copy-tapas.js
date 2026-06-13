const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\Administrator\\Downloads\\Carta Bar';
const destDir = 'C:\\Users\\Administrator\\.gemini\\antigravity\\scratch\\architect-landing-hosteleria\\public\\images\\demo';

const mapping = {
  't1.jpeg': 'Spanish_Ensaladilla',
  't2.jpeg': 'Spanish_potato',
  't3.jpeg': 'Bowl_of_Salmorejo',
  't4.jpeg': 'Patatas_Bravas',
  't5.jpeg': 'Oxtail_croquettes',
  't6.jpeg': 'Dogfish_cubes',
  't7.jpeg': 'Eggplant_slices',
  't8.jpeg': 'Fried_calamari',
  't9.jpeg': 'Iberian_ham_slices',
  't10.jpeg': 'Aged_sheep_cheese',
  't11.jpeg': 'Spanish_Iberian_cured',
  't12.jpeg': 'Baked_bread',
  't13.jpeg': 'Stewed_Iberian_pork',
  't14.jpeg': 'Andalusian_tripe',
  't15.jpeg': 'Beef_and_pork_meatballs',
  't16.jpeg': 'Spinach_chickpea',
  't17.jpeg': 'Gourmet_Huevos_Rotos',
  't18.jpeg': 'Grilled_Iberian',
  't19.jpeg': 'Octopus_leg',
  't20.jpeg': 'Homemade_XXL',
  't21.jpeg': 't21',
  't22.jpeg': 'Caramelized_torrija',
};

const files = fs.readdirSync(srcDir);

for (const [destName, prefix] of Object.entries(mapping)) {
  const matchedFile = files.find(f => f.startsWith(prefix) && f.endsWith('.jpeg'));
  if (matchedFile) {
    fs.copyFileSync(path.join(srcDir, matchedFile), path.join(destDir, destName));
    console.log(`Copied ${matchedFile} -> ${destName}`);
  } else {
    console.log(`NOT FOUND for prefix: ${prefix}`);
  }
}

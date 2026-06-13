const fs = require('fs');
const path = require('path');

const filePath = 'c:\\Users\\Administrator\\.gemini\\antigravity\\scratch\\architect-landing-hosteleria\\src\\lib\\demo-data.ts';
let content = fs.readFileSync(filePath, 'utf8');
let lines = content.split('\n');

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];
  // Check for sushi
  for (let s = 1; s <= 28; s++) {
    if (line.includes(`id: "s${s}"`) || line.includes(`id: 's${s}'`)) {
      lines[i] = line.replace(/image:\s*["'][^"']*["']/, `image: "/images/demo/s${s}.png"`);
    }
  }
  // Check for tapas
  for (let t = 1; t <= 28; t++) {
    if (line.includes(`id: "t${t}"`) || line.includes(`id: 't${t}'`)) {
      lines[i] = line.replace(/image:\s*["'][^"']*["']/, `image: "/images/demo/t${t}.png"`);
    }
  }
  // Check for burger
  for (let b = 1; b <= 28; b++) {
    if (line.includes(`id: "b${b}"`) || line.includes(`id: 'b${b}'`)) {
      lines[i] = line.replace(/image:\s*["'][^"']*["']/, `image: "/images/demo/b${b}.png"`);
    }
  }
}

fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
console.log('Successfully updated all images in demo-data.ts');

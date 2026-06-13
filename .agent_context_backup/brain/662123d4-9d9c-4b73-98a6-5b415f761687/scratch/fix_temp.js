const fs = require('fs');
const filepath = 'src/lib/demo-data.ts';
let content = fs.readFileSync(filepath, 'utf8');
content = content.replace('haute temperatura.', 'haute température.');
fs.writeFileSync(filepath, content, 'utf8');
console.log('Fixed spelling of température!');

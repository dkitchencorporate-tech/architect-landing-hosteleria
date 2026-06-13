const fs = require('fs');
const path = require('path');

const brainDir = 'C:\\Users\\Administrator\\.gemini\\antigravity\\brain\\662123d4-9d9c-4b73-98a6-5b415f761687';
const destDir = 'c:\\Users\\Administrator\\.gemini\\antigravity\\scratch\\architect-landing-hosteleria\\public\\images\\demo';

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(brainDir);
for (let i = 1; i <= 6; i++) {
  const prefix = `t${i}_`;
  const matchedFile = files.find(f => f.startsWith(prefix) && f.endsWith('.png'));
  if (matchedFile) {
    const srcPath = path.join(brainDir, matchedFile);
    const destPath = path.join(destDir, `t${i}.png`);
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${matchedFile} to t${i}.png`);
  } else {
    console.log(`Could not find image for t${i}`);
  }
}

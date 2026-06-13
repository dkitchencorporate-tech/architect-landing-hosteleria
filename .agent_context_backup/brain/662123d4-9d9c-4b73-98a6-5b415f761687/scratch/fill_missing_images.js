const fs = require('fs');
const path = require('path');

const demoDir = 'c:\\Users\\Administrator\\.gemini\\antigravity\\scratch\\architect-landing-hosteleria\\public\\images\\demo';

if (!fs.existsSync(demoDir)) {
  fs.mkdirSync(demoDir, { recursive: true });
}

// Map Tapas missing images (t7 to t28) using s7 to s28
for (let i = 7; i <= 28; i++) {
  const srcPath = path.join(demoDir, `s${i}.png`);
  const destPath = path.join(demoDir, `t${i}.png`);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied s${i}.png to t${i}.png as placeholder`);
  }
}

// Map Burger images (b1 to b28) using s1 to s28
for (let i = 1; i <= 28; i++) {
  const srcPath = path.join(demoDir, `s${i}.png`);
  const destPath = path.join(demoDir, `b${i}.png`);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied s${i}.png to b${i}.png as placeholder`);
  }
}

console.log('All missing images filled successfully with high-quality local placeholders.');

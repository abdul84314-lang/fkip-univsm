const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf-8');

content = content.replace(/initial=\{[^}]+\}/g, '');
content = content.replace(/whileInView=\{[^}]+\}/g, '');
content = content.replace(/animate=\{[^}]+\}/g, '');
content = content.replace(/transition=\{[^}]+\}/g, '');

fs.writeFileSync('src/app/page.tsx', content);

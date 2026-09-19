const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf-8');
content = content.replace(/}\n/g, ''); // Wait, this deletes ALL closing brackets at the end of lines!
fs.writeFileSync('src/app/page.tsx', content);

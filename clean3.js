const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf-8');
content = content.replace(/}\n\s+}\n\s+}/g, '');
fs.writeFileSync('src/app/page.tsx', content);

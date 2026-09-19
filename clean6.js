const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf-8');

// The problematic string looks like:
/*
<div 
  }
>
*/
content = content.replace(/\n\s+}\n\s*>/g, '>');
content = content.replace(/\n\s+}>/g, '>');
content = content.replace(/className="animate-fade-in-up"/g, 'className="animate-fade-in-up"'); // just to be safe

fs.writeFileSync('src/app/page.tsx', content);

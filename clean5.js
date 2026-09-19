const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf-8');

// The issue is I have `<div \n } \n } \n >` or similar.
// Let's replace any `}` that is directly inside a `<div ... >` tag!
// Actually, it's easier to just match `\s+}\s*>` and replace with `>`!
content = content.replace(/\s+}\s*>/g, '>');
content = content.replace(/\s+}\s+className=/g, ' className=');
content = content.replace(/\s+}\s+}\s+className=/g, ' className=');
content = content.replace(/\s+}\s+}\s+>/g, '>');

fs.writeFileSync('src/app/page.tsx', content);

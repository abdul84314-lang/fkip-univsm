const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf-8');

// 1. Remove use client
content = content.replace('"use client";', '');

// 2. Remove framer motion import and animations
content = content.replace(/import { motion[^}]+} from "framer-motion";/, '');
content = content.replace(/const fadeInUp = [^}]+};\n/g, '');

// 3. Convert motion elements to divs
content = content.replace(/<motion\.([a-zA-Z0-9]+)/g, '<$1');
content = content.replace(/<\/motion\.([a-zA-Z0-9]+)>/g, '</$1>');
content = content.replace(/variants=\{fadeInUp\}/g, '');
content = content.replace(/initial="initial"/g, '');
content = content.replace(/whileInView="animate"/g, 'className="animate-fade-in-up"');
content = content.replace(/viewport={{ once: true }}/g, '');

// 4. Import Navbar and KurikulumAccordion
content = content.replace(/import React, { useState } from "react";/, `import React from "react";
import Navbar from "../components/Navbar";
import KurikulumAccordion from "../components/KurikulumAccordion";
import { fetchSheetData } from "../lib/sheets";`);

fs.writeFileSync('src/app/page.tsx', content);

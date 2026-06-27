#!/usr/bin/env node

/**
 * Setup script for EtudeMax
 * Initializes project structure and dependencies
 */

const fs = require('fs');
const path = require('path');

const dirs = [
  'src/components',
  'src/services',
  'src/hooks',
  'src/utils',
  'public/images',
  'public/fonts',
];

console.log('🚀 Setting up EtudeMax...\n');

// Create directories
dirs.forEach(dir => {
  const fullPath = path.join(__dirname, '..', dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`✓ Created ${dir}`);
  }
});

// Create .env.local if it doesn't exist
const envLocal = path.join(__dirname, '..', '.env.local');
if (!fs.existsSync(envLocal)) {
  const envContent = `REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_GOOGLE_GEMINI_KEY=your_key_here
`;
  fs.writeFileSync(envLocal, envContent);
  console.log('✓ Created .env.local (don\'t forget to add your keys!)');
}

console.log('\n✅ Setup complete!');
console.log('\n📖 Next steps:');
console.log('1. npm install');
console.log('2. npm start');
console.log('3. For mobile: npx cap add android && npx cap add ios\n');

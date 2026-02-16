#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Read package.json
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const { name, version } = packageJson;
const filename = `${name}-${version}.zip`;

// Files and directories to exclude
const excludes = [
  'node_modules',
  'assets/scss',
  '.git',
  '.gitignore',
  'gulpfile.js',
  'scripts',
  '*.zip'
].map(pattern => `-x "${pattern}/*" "${pattern}"`).join(' ');

// Create zip file
console.log(`Creating ${filename}...`);

try {
  execSync(`zip -r ${filename} . ${excludes}`, { stdio: 'inherit' });
  console.log(`✓ Theme packaged successfully: ${filename}`);
} catch (error) {
  console.error('✗ Failed to create package');
  process.exit(1);
}

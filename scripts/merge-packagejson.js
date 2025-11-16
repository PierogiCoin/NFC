#!/usr/bin/env node

/**
 * Safe package.json merge script
 * 
 * Usage:
 *   node scripts/merge-packagejson.js           # Creates package.json.merged.json (preview)
 *   node scripts/merge-packagejson.js --apply   # Applies changes to package.json (creates backup)
 * 
 * This script merges package.json.suggested into the existing package.json
 * in a safe, non-destructive way by default.
 */

const fs = require('fs');
const path = require('path');

const PACKAGE_JSON_PATH = path.join(__dirname, '..', 'package.json');
const SUGGESTED_PATH = path.join(__dirname, '..', 'package.json.suggested');
const MERGED_OUTPUT_PATH = path.join(__dirname, '..', 'package.json.merged.json');
const BACKUP_PATH = path.join(__dirname, '..', 'package.json.backup');

const APPLY_FLAG = process.argv.includes('--apply');

/**
 * Deep merge two objects, with priority given to the source object
 */
function deepMerge(target, source) {
  const result = { ...target };
  
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        // Recursively merge objects
        result[key] = deepMerge(result[key] || {}, source[key]);
      } else {
        // For primitives and arrays, source takes priority
        result[key] = source[key];
      }
    }
  }
  
  return result;
}

/**
 * Main execution
 */
function main() {
  try {
    // Read existing package.json
    if (!fs.existsSync(PACKAGE_JSON_PATH)) {
      console.error('Error: package.json not found');
      process.exit(1);
    }
    
    const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf8'));
    
    // Read suggested changes
    if (!fs.existsSync(SUGGESTED_PATH)) {
      console.error('Error: package.json.suggested not found');
      process.exit(1);
    }
    
    const suggested = JSON.parse(fs.readFileSync(SUGGESTED_PATH, 'utf8'));
    
    // Merge the configurations
    const merged = deepMerge(packageJson, suggested);
    
    // Ensure proper field ordering for readability
    const orderedMerged = {
      name: merged.name,
      version: merged.version,
      ...(merged.description && { description: merged.description }),
      ...(merged.private !== undefined && { private: merged.private }),
      ...(merged.main && { main: merged.main }),
      ...(merged.module && { module: merged.module }),
      ...(merged.types && { types: merged.types }),
      ...(merged.exports && { exports: merged.exports }),
      ...(merged.files && { files: merged.files }),
      scripts: merged.scripts,
      dependencies: merged.dependencies,
      devDependencies: merged.devDependencies,
    };
    
    // Remove undefined values
    Object.keys(orderedMerged).forEach(key => {
      if (orderedMerged[key] === undefined) {
        delete orderedMerged[key];
      }
    });
    
    // Write merged output
    fs.writeFileSync(
      MERGED_OUTPUT_PATH,
      JSON.stringify(orderedMerged, null, 2) + '\n',
      'utf8'
    );
    
    console.log('✓ Created package.json.merged.json');
    console.log('\nMerge summary:');
    console.log('  Added/Updated fields:');
    
    if (suggested.main) console.log(`    - main: ${suggested.main}`);
    if (suggested.module) console.log(`    - module: ${suggested.module}`);
    if (suggested.types) console.log(`    - types: ${suggested.types}`);
    if (suggested.exports) console.log(`    - exports: [conditional exports]`);
    if (suggested.files) console.log(`    - files: ${JSON.stringify(suggested.files)}`);
    if (suggested.scripts) {
      console.log('    - scripts:');
      Object.keys(suggested.scripts).forEach(script => {
        console.log(`        ${script}: ${suggested.scripts[script]}`);
      });
    }
    if (suggested.devDependencies) {
      console.log('    - devDependencies:');
      Object.keys(suggested.devDependencies).forEach(dep => {
        console.log(`        ${dep}: ${suggested.devDependencies[dep]}`);
      });
    }
    
    if (APPLY_FLAG) {
      // Create backup
      fs.copyFileSync(PACKAGE_JSON_PATH, BACKUP_PATH);
      console.log(`\n✓ Created backup at package.json.backup`);
      
      // Apply changes
      fs.writeFileSync(
        PACKAGE_JSON_PATH,
        JSON.stringify(orderedMerged, null, 2) + '\n',
        'utf8'
      );
      console.log('✓ Applied changes to package.json');
      console.log('\nNext steps:');
      console.log('  1. npm install');
      console.log('  2. npm run prepare');
      console.log('  3. npm run build');
      console.log('  4. npm test');
    } else {
      console.log('\n→ Review package.json.merged.json');
      console.log('→ When satisfied, run: node scripts/merge-packagejson.js --apply');
    }
    
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();

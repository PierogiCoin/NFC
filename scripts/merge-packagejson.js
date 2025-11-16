#!/usr/bin/env node
/*
 Safe merge script for package.json
 Usage:
   node scripts/merge-packagejson.js           # creates package.json.merged.json and exits
   node scripts/merge-packagejson.js --apply   # backs up package.json and overwrites it with merged result
   node scripts/merge-packagejson.js --force --apply  # override existing top-level fields like main/module/types/exports
   node scripts/merge-packagejson.js --help

 Behavior:
 - Reads package.json and package.json.suggested (both must exist in repo root)
 - Merges:
    - scripts: overwrite/add keys from suggested into existing scripts
    - devDependencies: add missing devDependencies from suggested; do not downgrade existing versions
    - lint-staged: if missing in package.json, copy from suggested
    - top-level fields (main,module,types,files,exports): will be copied only if missing unless --force is provided
 - Writes result to package.json.merged.json by default for review. Use --apply to overwrite package.json (creates backup package.json.bak.<timestamp>)
 - Prints summary of changes
*/

const fs = require('fs');
const path = require('path');

function readJSON(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (err) {
    console.error(`Error reading/parsing ${file}: ${err.message}`);
    process.exit(1);
  }
}

function writeJSON(file, obj) {
  fs.writeFileSync(file, JSON.stringify(obj, null, 2) + '\n', 'utf8');
}

function mergePackage(existing, suggested, opts) {
  const result = JSON.parse(JSON.stringify(existing)); // clone
  const changed = {
    scripts: {},
    devDependencies: {},
    topLevel: {},
    lintStaged: false
  };

  // Merge scripts: overwrite/add keys from suggested
  result.scripts = result.scripts || {};
  if (suggested.scripts) {
    for (const [k, v] of Object.entries(suggested.scripts)) {
      if (result.scripts[k] !== v) {
        changed.scripts[k] = { from: result.scripts[k], to: v };
        result.scripts[k] = v;
      }
    }
  }

  // Merge devDependencies: add missing only, keep existing versions
  result.devDependencies = result.devDependencies || {};
  if (suggested.devDependencies) {
    for (const [k, v] of Object.entries(suggested.devDependencies)) {
      if (!result.devDependencies[k]) {
        changed.devDependencies[k] = { from: null, to: v };
        result.devDependencies[k] = v;
      }
    }
  }

  // Merge lint-staged
  if (!result['lint-staged'] && suggested['lint-staged']) {
    result['lint-staged'] = suggested['lint-staged'];
    changed.lintStaged = true;
  }

  // Top-level fields to copy if missing (or if force)
  const topKeys = ['main', 'module', 'types', 'files', 'exports'];
  for (const key of topKeys) {
    if ((opts.force || result[key] === undefined) && suggested[key] !== undefined) {
      changed.topLevel[key] = { from: result[key], to: suggested[key] };
      result[key] = suggested[key];
    }
  }

  return { result, changed };
}

function printSummary(changed) {
  console.log('\nMerge summary:');
  if (Object.keys(changed.scripts).length) {
    console.log('  Scripts added/changed:');
    for (const k of Object.keys(changed.scripts)) {
      console.log(`    - ${k}: ${changed.scripts[k].from || '<none>'} -> ${changed.scripts[k].to}`);
    }
  }
  if (Object.keys(changed.devDependencies).length) {
    console.log('  DevDependencies added:');
    for (const k of Object.keys(changed.devDependencies)) {
      console.log(`    - ${k}: ${changed.devDependencies[k].to}`);
    }
  }
  if (changed.lintStaged) {
    console.log('  lint-staged: added');
  }
  if (Object.keys(changed.topLevel).length) {
    console.log('  Top-level fields added/changed:');
    for (const k of Object.keys(changed.topLevel)) {
      console.log(`    - ${k}: ${changed.topLevel[k].from || '<none>'} -> ${JSON.stringify(changed.topLevel[k].to)}`);
    }
  }
  if (!Object.keys(changed.scripts).length && !Object.keys(changed.devDependencies).length && !changed.lintStaged && !Object.keys(changed.topLevel).length) {
    console.log('  No changes detected.');
  }
}

function main() {
  const args = process.argv.slice(2);
  const apply = args.includes('--apply');
  const force = args.includes('--force');
  const help = args.includes('--help') || args.includes('-h');

  if (help) {
    console.log('Usage: node scripts/merge-packagejson.js [--apply] [--force]');
    process.exit(0);
  }

  const root = process.cwd();
  const pkgPath = path.join(root, 'package.json');
  const suggestedPath = path.join(root, 'package.json.suggested');

  if (!fs.existsSync(pkgPath)) {
    console.error('package.json not found in repository root.');
    process.exit(1);
  }
  if (!fs.existsSync(suggestedPath)) {
    console.error('package.json.suggested not found in repository root.');
    process.exit(1);
  }

  const existing = readJSON(pkgPath);
  const suggested = readJSON(suggestedPath);

  const { result, changed } = mergePackage(existing, suggested, { force });

  printSummary(changed);

  const mergedPath = path.join(root, 'package.json.merged.json');
  writeJSON(mergedPath, result);
  console.log(`\nMerged file written to ${mergedPath}. Please review before applying.`);

  if (apply) {
    const backupPath = path.join(root, `package.json.bak.${Date.now()}`);
    fs.copyFileSync(pkgPath, backupPath);
    writeJSON(pkgPath, result);
    console.log(`Backup of original package.json saved to ${backupPath}. package.json overwritten with merged result.`);
  } else {
    console.log('\nTo apply the merged file to package.json run with --apply.');
  }
}

main();
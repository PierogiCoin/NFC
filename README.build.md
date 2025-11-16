# Build and Publishing Instructions

## Overview

This project uses `tsup` to build TypeScript library code with ESM, CJS, and TypeScript declaration outputs.

> **Note**: This project is a Next.js application. The library build configuration is optional and only needed if you want to publish reusable components as an npm package. If you only need the Next.js app, you can ignore the library build setup.

## Setup

### Option 1: Merge package.json fields (Recommended)

Use the safe merge script to combine suggested fields:

```bash
# Preview changes
node scripts/merge-packagejson.js

# Review the generated package.json.merged.json
# If satisfied, apply the changes (creates backup automatically)
node scripts/merge-packagejson.js --apply

# Install new dependencies
npm install
```

### Option 2: Manual setup

Alternatively, manually add the fields from `package.json.suggested` to your `package.json`, then:

```bash
npm install
```

## Building

Build the library:

```bash
npm run build
```

This will generate the following outputs in the `dist/` directory:
- `index.js` - CommonJS build
- `index.mjs` - ESM build
- `index.d.ts` - TypeScript declarations for CommonJS
- `index.d.mts` - TypeScript declarations for ESM

### Watch Mode

For development, you can run the build in watch mode:

```bash
npm run build:watch
```

## Type Checking

To run TypeScript type checking without emitting files:

```bash
npm run typecheck
```

## Publishing

Before publishing:

1. Ensure all tests pass:
   ```bash
   npm test
   ```

2. Build the library:
   ```bash
   npm run build
   ```

3. Update the version in `package.json`:
   ```bash
   npm version [major|minor|patch]
   ```

4. Publish to npm:
   ```bash
   npm publish
   ```

## Package.json Fields

The suggested `package.json` fields configure dual-package support:
- `main` - Entry point for CommonJS (Node.js)
- `module` - Entry point for ESM bundlers
- `types` - TypeScript declarations
- `exports` - Modern package exports for conditional loading
- `files` - Specifies which files to include in the npm package

## Notes

- The `prepare` script runs automatically before publishing and after `npm install`
- External dependencies (react, react-dom, next) are not bundled
- Source maps are generated for easier debugging
- The `dist/` directory is gitignored and will be created during build
- Backup files (`package.json.bak.*`) and merge outputs (`package.json.merged.json`) are also gitignored

## Removing Library Build (if not needed)

If you decide not to publish this as a library:

```bash
# Remove library-related files
rm tsup.config.ts package.json.suggested README.build.md scripts/merge-packagejson.js src/index.ts

# Remove the tsup devDependency from package.json
npm uninstall tsup
```

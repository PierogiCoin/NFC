# Build and Publishing Instructions

## Overview

This project uses `tsup` to build TypeScript library code with ESM, CJS, and TypeScript declaration outputs.

## Setup

After merging the suggested package.json fields, install dependencies:

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

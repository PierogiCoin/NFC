# Development Add-ons

This document describes the additional development tools and configurations added to improve code quality, automation, and developer experience.

## 🔄 GitHub Actions CI/CD

**File:** `.github/workflows/ci.yml`

Automated workflow that runs on pushes and pull requests:
- Tests on Node.js 18.x and 20.x
- Runs linting
- Performs type checking
- Builds Next.js app and library (if configured)
- Runs tests

### Usage
The workflow runs automatically on push/PR. View results in the "Actions" tab on GitHub.

## 🎨 Prettier Code Formatting

**Files:** `.prettierrc.json`, `.prettierignore`

Ensures consistent code formatting across the project.

### Configuration
- Single quotes
- 2-space indentation
- Trailing commas (ES5)
- 100 character line width
- Arrow functions without parentheses for single params

### Usage
```bash
# Format all files (requires prettier to be installed)
npm run format

# Check formatting without making changes
npm run format:check
```

### Installation
```bash
npm install --save-dev prettier
```

## 📝 Changelog

**File:** `CHANGELOG.md`

Tracks all notable changes following [Keep a Changelog](https://keepachangelog.com/) format and [Semantic Versioning](https://semver.org/).

### Usage
Update the `[Unreleased]` section when making changes:
- **Added** - new features
- **Changed** - changes to existing functionality
- **Deprecated** - soon-to-be removed features
- **Removed** - removed features
- **Fixed** - bug fixes
- **Security** - security updates

When releasing, move `[Unreleased]` items to a new version section.

## 🚀 Quick Setup

To enable all add-ons:

```bash
# Install Prettier
npm install --save-dev prettier

# Format existing code
npm run format

# Verify CI workflow
git add .github/workflows/ci.yml
git commit -m "ci: add GitHub Actions workflow"
git push
```

## 📦 Summary of Additions

| Feature | File(s) | Purpose |
|---------|---------|---------|
| CI/CD | `.github/workflows/ci.yml` | Automated testing and building |
| Code Formatting | `.prettierrc.json`, `.prettierignore` | Consistent code style |
| Changelog | `CHANGELOG.md` | Track project changes |
| Format Scripts | `package.json.suggested` | Easy formatting commands |

## 🔧 Optional Enhancements

Consider adding these in the future:
- **Husky** - Git hooks for pre-commit linting/formatting
- **Commitlint** - Enforce conventional commit messages
- **Size Limit** - Monitor bundle size
- **Testing Framework** - Jest or Vitest for unit tests
- **Dependabot** - Automated dependency updates

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

## 🔧 EditorConfig

**File:** `.editorconfig`

Maintains consistent coding styles across different editors and IDEs:
- UTF-8 charset
- LF line endings
- 2-space indentation for code files
- Trim trailing whitespace
- Insert final newline

Supported by most modern editors automatically or via plugins.

## 💻 VSCode Configuration

**Files:** `.vscode/settings.json`, `.vscode/extensions.json`

### Recommended Extensions
- ESLint - JavaScript/TypeScript linting
- Prettier - Code formatting
- Tailwind CSS IntelliSense - Tailwind autocomplete
- TypeScript Next - Enhanced TypeScript support
- EditorConfig - EditorConfig support

### Settings
- Format on save enabled
- Auto-fix ESLint issues on save
- Prettier as default formatter
- TypeScript workspace version
- Tailwind CSS class regex support

## 📋 Issue & PR Templates

**Files:** 
- `.github/ISSUE_TEMPLATE/bug_report.md`
- `.github/ISSUE_TEMPLATE/feature_request.md`
- `.github/pull_request_template.md`

Standardized templates for:
- **Bug Reports** - Structured bug reporting with environment details
- **Feature Requests** - Clear feature proposal format
- **Pull Requests** - Comprehensive PR checklist and description

These templates ensure consistent, high-quality contributions.

## 🤖 Dependabot

**File:** `.github/dependabot.yml`

Automated dependency updates:
- Weekly npm dependency updates (Mondays)
- Weekly GitHub Actions updates (Mondays)
- Auto-labels PRs as "dependencies"
- Limits concurrent PRs to prevent spam
- Assigns to repository owner for review

## 🚀 Quick Setup

To enable all add-ons:

```bash
# Install Prettier
npm install --save-dev prettier

# Format existing code
npm run format

# Open in VSCode to get extension recommendations
code .

# Verify CI workflow (runs automatically on push)
git add .
git commit -m "chore: add development tooling"
git push
```

## 📦 Summary of Additions

| Feature | File(s) | Purpose |
|---------|---------|---------|
| CI/CD | `.github/workflows/ci.yml` | Automated testing and building |
| Code Formatting | `.prettierrc.json`, `.prettierignore` | Consistent code style |
| Changelog | `CHANGELOG.md` | Track project changes |
| EditorConfig | `.editorconfig` | Cross-editor consistency |
| VSCode Config | `.vscode/settings.json`, `.vscode/extensions.json` | Enhanced VSCode experience |
| Issue Templates | `.github/ISSUE_TEMPLATE/*.md` | Structured issue reporting |
| PR Template | `.github/pull_request_template.md` | Comprehensive PR guidelines |
| Dependabot | `.github/dependabot.yml` | Automated dependency updates |
| Format Scripts | `package.json.suggested` | Easy formatting commands |

## 🔧 Optional Future Enhancements

Consider adding these later:
- **Husky** - Git hooks for pre-commit linting/formatting
- **Commitlint** - Enforce conventional commit messages
- **Size Limit** - Monitor bundle size
- **Testing Framework** - Jest or Vitest for unit tests
- **Semantic Release** - Automated versioning and changelog
- **Storybook** - Component documentation and development

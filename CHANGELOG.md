# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- TypeScript library build configuration with tsup
- Safe package.json merge script for library setup
- Build and publishing documentation (README.build.md)
- Component exports via src/index.ts
- GitHub Actions CI workflow for automated testing
- Prettier configuration for code formatting
- Support for dual ESM/CJS output
- EditorConfig for cross-editor consistency
- VSCode settings and recommended extensions
- Issue templates (bug report, feature request)
- Pull request template with comprehensive checklist
- Dependabot configuration for automated dependency updates
- Development add-ons documentation (README.addons.md)

### Changed
- Enhanced .gitignore for build artifacts and merge outputs
- Improved documentation with setup options and removal instructions
- Updated package.json.suggested with format scripts

### Fixed
- Script name conflict: using build:lib instead of build for library builds

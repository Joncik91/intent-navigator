# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- 

### Changed
- 

### Fixed
- 

## [1.1.0] - 2025-12-18

### Added
- **Intent Evolution**: Expand intent lifecycle beyond archiving
  - Ctrl+Shift+E: Evolve intent with three pivot options (narrow focus, shift audience, new insight)
  - Ctrl+Shift+D: Declare ship target with optional commit tag
- **Enhanced Control Index**: Now counts all intentional acts (L+P+A+E+D) instead of just exits
- **Editable insights**: Evolve command allows custom insight text input

### Changed
- Updated README to reflect full Intent Lifecycle (not just "archive")
- Control Index formula: (L + P + A + E + D) / total workspace actions

## [1.0.0] - 2025-12-18

### Added
- Initial release of Intent Navigator
- Three keyboard shortcuts for intent management:
  - Ctrl+Shift+L: Jump to latest intent line in README
  - Ctrl+Shift+P: Peek intent reminder
  - Ctrl+Shift+A: Archive with reason
- Local-only intent logging to `.intent.log`
- Control Index calculation for sovereignty tracking
- Sovereignty-first design with no cloud dependencies
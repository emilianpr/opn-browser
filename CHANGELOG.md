# Changelog

All notable changes to OPN Browser will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-11-13

### Added
- Initial release of OPN Browser
- Modern monochrome UI design with 5 color themes:
  - Monochrome (default)
  - Ocean Blue
  - Purple Haze
  - Forest Green
  - Sunset Orange
- Workspace system for organizing tabs by project/context
- Split view mode for side-by-side browsing
- Session management with auto-save functionality
- Complete navigation controls (back, forward, refresh)
- URL bar with smart search (Google integration)
- Settings panel with customization options:
  - Theme selection
  - Compact mode
  - Auto-save sessions toggle
  - Tab grouping preferences
  - Privacy controls
- Theme selector modal with visual previews
- Responsive sidebar for workspace management
- Tab bar with close buttons and active indicators
- Chromium-based rendering engine via Electron
- macOS-native menu integration
- Privacy features (tracker blocking)
- localStorage-based state persistence

### Technical
- Electron v39.1.2 (latest stable)
- electron-builder for macOS packaging
- Secure IPC communication with contextBridge
- Modern ES6+ JavaScript
- CSS variables for dynamic theming
- Responsive design with smooth animations

### Documentation
- Comprehensive README with installation instructions
- Development guide (DEVELOPMENT.md)
- MIT License
- Resources documentation for icon generation
- GitHub Actions workflow for automated builds

### Security
- Updated Electron to fix ASAR integrity bypass vulnerability
- Context isolation enabled
- Node integration disabled in renderer
- Secure webview partition configuration

## [Unreleased]

### Planned Features
- Advanced keyboard shortcuts
- Tab search and filtering
- Bookmark management system
- Chrome extension compatibility
- Advanced privacy controls
- Cross-platform support (Windows, Linux)
- Cloud sync for sessions
- Advanced tab grouping with automation
- Picture-in-Picture implementation
- Performance monitoring dashboard
- Custom theme creator
- Import/export sessions
- Tab suspension for memory optimization
- Advanced history search
- Developer tools integration

### Known Issues
- Picture-in-Picture UI is present but not yet functional
- App icon needs to be converted to .icns for proper macOS integration
- Keyboard shortcuts not yet implemented
- No bookmark system in v1.0

---

## Version History

- **1.0.0** - Initial release with core browser functionality and multitasking features

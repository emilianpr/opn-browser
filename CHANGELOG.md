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

## [1.1.0] - 2025-11-14

### Added
- **Comprehensive Keyboard Shortcuts** - Full Chrome-compatible keyboard navigation:
  - `Cmd + T` - New tab
  - `Cmd + W` - Close tab
  - `Cmd + R` - Refresh page
  - `Cmd + L` - Focus URL bar
  - `Cmd + [` - Back
  - `Cmd + ]` - Forward
  - `Cmd + D` - Add bookmark
  - `Cmd + Shift + B` - Toggle bookmarks bar
  - `Cmd + Shift + T` - Reopen closed tab
  - `Cmd + Shift + [` / `]` - Previous/Next tab
  - `Cmd + 1-9` - Jump to tab by number
  - `Cmd + F` - Find in page
  - `Cmd + Shift + N` - New workspace
- **Bookmark System**:
  - Add bookmarks with keyboard shortcut (Cmd+D)
  - Visual bookmarks bar below navigation
  - Click bookmarks to navigate
  - Delete bookmarks with hover button
  - Toggle bookmarks bar visibility
  - Persistent storage with localStorage
  - Visual notification when bookmark added
  - Prevents duplicate bookmarks
- **Enhanced Menu System**:
  - File menu with shortcuts
  - History menu for navigation
  - Bookmarks menu
  - Improved menu organization
- **Reopen Closed Tab**:
  - Stores last 10 closed tabs
  - Reopen with Cmd+Shift+T
  - Restores URL and title
- **Find in Page**:
  - Search current page with Cmd+F
  - Uses Electron's built-in find functionality

### Changed
- Updated main.js menu to include keyboard shortcuts
- Enhanced IPC communication for menu shortcuts
- Improved tab switching logic
- Better keyboard event handling

### Technical
- Added keyboard event listeners in renderer
- Implemented IPC channels for shortcuts
- Enhanced BrowserState class with bookmark methods
- Added closed tabs tracking
- Improved preload script security

## [Unreleased]

### Planned Features
- Tab search and filtering
- Chrome extension compatibility
- Advanced privacy controls
- Cross-platform support (Windows, Linux)
- Cloud sync for sessions
- Advanced tab grouping with automation
- Picture-in-Picture implementation
- Performance monitoring dashboard
- Custom theme creator
- Import/export sessions and bookmarks
- Tab suspension for memory optimization
- Advanced history search
- Developer tools integration
- Bookmark folders and organization

### Known Issues
- Picture-in-Picture UI is present but not yet functional
- App icon needs to be converted to .icns for proper macOS integration
- Find in page uses basic prompt UI (can be enhanced with custom find bar)

---

## Version History

- **1.0.0** - Initial release with core browser functionality and multitasking features

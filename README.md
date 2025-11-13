# OPN Browser

A modern, customizable Chromium-based browser built for multitasking and workflow optimization on macOS.

## ✨ Features

### 🎨 Customization
- **Monochrome Modern Design** - Clean, minimal interface
- **Multiple Themes** - Ocean Blue, Purple Haze, Forest Green, Sunset Orange
- **Theme Switching** - Instant theme changes with live preview
- **Compact Mode** - Optimize screen space

### 🚀 Multitasking & Workflow
- **Workspaces** - Organize tabs by project or context
- **Split View** - Browse two sites side-by-side
- **Tab Groups** - Organize and color-code related tabs
- **Session Management** - Auto-save and restore your browsing sessions
- **Picture-in-Picture** - Keep content visible while browsing (coming soon)

### 🔒 Privacy & Performance
- **Built on Chromium** - Fast, secure, and modern web engine
- **Tracker Blocking** - Enhanced privacy protection
- **macOS Optimized** - Native macOS integration

## 🛠️ Installation

### Prerequisites
- macOS 10.13 or later
- Node.js 16.x or later
- npm 7.x or later

### Setup

1. Clone the repository:
```bash
git clone https://github.com/emilianpr/opn-browser.git
cd opn-browser
```

2. Install dependencies:
```bash
npm install
```

3. Run in development mode:
```bash
npm start
```

### Build for Production

Build a distributable macOS app:
```bash
npm run build
```

The app will be available in the `dist` folder as a `.dmg` installer.

## 🎯 Usage

### Workspaces
- Click the `+` button in the sidebar to create a new workspace
- Click on a workspace icon to switch between them
- Each workspace maintains its own set of tabs

### Split View
- Click the split view icon in the toolbar
- Browse two websites simultaneously
- Perfect for research, comparison, and reference

### Themes
- Click the theme button in the sidebar
- Choose from 5 carefully crafted themes
- Themes persist across sessions

### Keyboard Shortcuts
- `Cmd + T` - New tab (coming soon)
- `Cmd + W` - Close tab (coming soon)
- `Cmd + R` - Refresh page (coming soon)
- `Cmd + L` - Focus URL bar (coming soon)

## 🏗️ Technology Stack

- **Electron** - Cross-platform desktop framework with Chromium
- **Node.js** - JavaScript runtime
- **HTML/CSS/JavaScript** - Modern web technologies
- **electron-builder** - Package and distribute the app

## 📁 Project Structure

```
opn-browser/
├── src/
│   ├── main.js       # Electron main process
│   ├── preload.js    # Preload script for security
│   ├── renderer.js   # Browser logic and state management
│   ├── index.html    # Browser UI structure
│   └── styles.css    # Modern styling and themes
├── resources/        # App icons and assets
├── package.json      # Dependencies and scripts
└── README.md         # Documentation
```

## 🤝 Contributing

This is an open source project built entirely with AI assistance to test the power of AI-driven development.

## 📝 License

MIT License - feel free to use and modify as needed.

## 🎯 Roadmap

- [ ] Advanced keyboard shortcuts
- [ ] Tab search and filtering
- [ ] Bookmark management
- [ ] Extension support
- [ ] Advanced privacy controls
- [ ] Cross-platform support (Windows, Linux)
- [ ] Cloud sync for sessions
- [ ] Advanced tab grouping with automation

---

**Built with ❤️ using AI** - A demonstration of AI-powered software development

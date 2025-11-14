# Development Guide

## Getting Started

### Running the Browser

On macOS, run the following command to start the browser in development mode:

```bash
npm start
```

The browser will launch with the following features enabled:
- Hot reload for development
- Developer tools accessible via the menu
- Console logging for debugging

### Development Mode Features

When running with `npm run dev`, you get:
- Detailed logging to the console
- Easy access to Chrome DevTools (View → Toggle DevTools)
- Real-time updates without rebuilding

## Architecture

### Main Process (main.js)
- Creates and manages browser windows
- Handles application lifecycle events
- Manages IPC communication with renderer processes
- Implements native macOS menu integration

### Preload Script (preload.js)
- Provides secure bridge between main and renderer processes
- Uses contextBridge for security
- Exposes limited APIs to the renderer

### Renderer Process (renderer.js)
- Manages browser state (tabs, workspaces, settings)
- Handles UI interactions
- Persists data to localStorage
- Manages webview lifecycle

### UI Structure (index.html + styles.css)
- Modern monochrome design with theme support
- Responsive sidebar for workspaces
- Tab bar with drag support
- Navigation controls
- Modal dialogs for settings and themes

## Key Features Implementation

### Workspaces
- Each workspace maintains its own tab collection
- Workspaces are saved to localStorage
- Visual indicators show active workspace and tab counts

### Themes
- CSS variables enable instant theme switching
- 5 pre-built themes (Monochrome, Blue, Purple, Green, Orange)
- Theme preference persists across sessions

### Split View
- Enables side-by-side browsing
- Automatically creates second tab if needed
- Toggle via toolbar button

### Session Management
- Auto-saves every 30 seconds (configurable)
- Saves workspace structure, tabs, and URLs
- Restores complete browsing session on restart

## Debugging

### Opening DevTools

In the running application:
1. Use the menu: View → Toggle DevTools
2. Or press: `Cmd + Option + I` (when keyboard shortcuts are implemented)

### Console Logging

The application logs important events to the console:
- Tab creation/destruction
- Workspace switching
- Navigation events
- Settings changes

## Building for Distribution

### Create macOS App

```bash
npm run build
```

This creates:
- A signed .app bundle
- A .dmg installer in the `dist` folder
- A .zip archive for distribution

### Build Configuration

The build configuration in `package.json` includes:
- App ID: `com.opn.browser`
- Category: Productivity
- Icon: resources/icon.icns (needs to be created)
- Code signing (requires Apple Developer account)

## Testing

### Manual Testing Checklist

- [ ] Create a new workspace
- [ ] Open multiple tabs
- [ ] Switch between workspaces
- [ ] Change themes
- [ ] Use split view mode
- [ ] Test navigation (back, forward, refresh)
- [ ] Check session persistence (restart app)
- [ ] Test settings changes

### Browser Compatibility

The browser uses Electron's Chromium engine, which provides:
- Modern web standards support
- Fast JavaScript execution
- GPU acceleration
- WebGL support
- HTML5 video/audio

## Performance Optimization

### Memory Management
- Inactive webviews are not destroyed (for instant switching)
- Consider implementing tab suspension for very large sessions
- Monitor memory usage with Chrome DevTools

### Startup Time
- Lazy-load workspaces
- Defer non-critical initialization
- Use localStorage for fast state restoration

## Security Considerations

### Content Security
- contextIsolation is enabled
- nodeIntegration is disabled in renderer
- Webviews use persistent partitions for cookie/storage isolation

### Privacy Features
- Tracker blocking (configurable)
- No telemetry or analytics
- Local-only data storage

## Troubleshooting

### Common Issues

**Browser won't start:**
- Check that Node.js is installed: `node --version`
- Verify dependencies are installed: `npm install`
- Check for errors in the console

**Webviews not loading:**
- Ensure you have an internet connection
- Check if URLs have proper protocol (https://)
- Verify webview tag is enabled in webPreferences

**Settings not persisting:**
- Check localStorage is not disabled
- Verify write permissions
- Check browser console for errors

## Implemented Features

### Keyboard Shortcuts
- Full keyboard navigation implemented
- Chrome-compatible shortcuts (Cmd+T, Cmd+W, etc.)
- Menu integration with accelerators
- IPC communication for shortcuts
- Tab switching and navigation shortcuts

### Bookmark System
- Add bookmarks with Cmd+D
- Bookmarks bar for quick access
- Toggle visibility with Cmd+Shift+B
- Delete and manage bookmarks
- Persistent storage with localStorage

## Future Enhancements

### Planned Features
1. **Extensions** - Chrome extension compatibility
2. **Tab Search** - Quickly find tabs across workspaces
3. **Cloud Sync** - Sync sessions across devices
4. **Advanced Privacy** - Built-in VPN, advanced tracker blocking
5. **Tab Automation** - Auto-group similar tabs
6. **Performance Monitoring** - Built-in resource usage dashboard
7. **Bookmark Folders** - Organize bookmarks in folders
8. **Import/Export** - Import bookmarks from other browsers

### Code Improvements
- Add TypeScript for better type safety
- Implement unit tests with Jest
- Add E2E tests with Spectron
- Improve error handling and user feedback
- Add proper logging framework

## Contributing

When contributing:
1. Follow the existing code style
2. Test thoroughly on macOS
3. Update documentation as needed
4. Keep commits focused and atomic
5. Write clear commit messages

## Resources

- [Electron Documentation](https://www.electronjs.org/docs)
- [Chromium Web Platform Status](https://chromestatus.com/)
- [macOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/macos)

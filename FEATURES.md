# OPN Browser - Features Guide

## User Interface Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         OPN BROWSER                              │
├──────┬──────────────────────────────────────────────────────────┤
│      │  ┌─────┬─────┬─────┬─────┐  [+]                          │
│ OPN  │  │ Tab │ Tab │ Tab │ Tab │                                │
│ [+]  │  └─────┴─────┴─────┴─────┘                               │
│      ├──────────────────────────────────────────────────────────┤
│ [W1] │  [←] [→] [↻]  [Search or enter address...]  [Split] [PiP]│
│ [W2] ├──────────────────────────────────────────────────────────┤
│ [W3] │                                                            │
│      │                    BROWSER CONTENT                         │
│      │                                                            │
│ [⚙]  │                   (Webview Area)                          │
│ [🎨] │                                                            │
└──────┴──────────────────────────────────────────────────────────┘
```

## Feature Descriptions

### 1. Sidebar (Left Panel)

#### Logo & New Workspace Button
- **OPN** logo at the top
- **[+]** button creates new workspace
- Minimal, clean design

#### Workspace List
- Each workspace shown as a rounded square
- Shows first 2 letters of workspace name
- Badge shows number of tabs in workspace
- Active workspace highlighted with accent color
- Click to switch between workspaces

#### Bottom Controls
- **[⚙]** Settings button
- **[🎨]** Theme selector button

### 2. Tab Bar (Top)

#### Tab Display
- Multiple tabs shown horizontally
- Active tab highlighted
- Each tab shows:
  - Page title
  - Close button (×)
- Scrollable if many tabs

#### New Tab Button
- **[+]** button at the end of tab bar
- Creates new tab in current workspace

### 3. Navigation Bar

#### Navigation Controls
- **[←]** Back button
- **[→]** Forward button
- **[↻]** Refresh button

#### URL Bar
- Central search/address bar
- Placeholder: "Search or enter address..."
- Auto-detects URLs vs search queries
- Integrates with Google search

#### View Controls
- **[Split]** Split view toggle
- **[PiP]** Picture-in-Picture toggle

### 4. Browser View Area

#### Single View Mode
- Full-width webview
- Shows active tab content

#### Split View Mode
- Two webviews side-by-side
- Each shows different tab
- Equal width distribution
- Thin divider between views

#### Welcome Screen
- Shown when no tabs are open
- Welcome message
- Quick action buttons:
  - "Start Browsing"
  - "Create Workspace"

## Modal Windows

### Settings Modal

```
┌────────────────────────────────────┐
│  Settings                       [×] │
├────────────────────────────────────┤
│                                     │
│  Appearance                         │
│  ├ Theme: [Monochrome ▼]           │
│  └ □ Compact Mode                  │
│                                     │
│  Workflow                           │
│  ├ ☑ Auto-save Sessions            │
│  └ □ Auto-group Similar Tabs       │
│                                     │
│  Privacy                            │
│  └ ☑ Block Trackers                │
│                                     │
└────────────────────────────────────┘
```

### Theme Selector Modal

```
┌────────────────────────────────────┐
│  Choose Theme                   [×] │
├────────────────────────────────────┤
│                                     │
│  ┌──────┐ ┌──────┐ ┌──────┐       │
│  │█████▒│ │█████░│ │█████▓│       │
│  │████▒▒│ │████░░│ │████▓▓│       │
│  └──────┘ └──────┘ └──────┘       │
│  Monochme  Blue     Purple         │
│                                     │
│  ┌──────┐ ┌──────┐                │
│  │█████▒│ │█████▒│                │
│  │████░░│ │████▒▒│                │
│  └──────┘ └──────┘                │
│  Green     Orange                  │
│                                     │
└────────────────────────────────────┘
```

## Keyboard Interactions (Planned)

### Navigation
- `Cmd + L` - Focus URL bar
- `Cmd + R` - Refresh page
- `Cmd + [` - Back
- `Cmd + ]` - Forward

### Tabs
- `Cmd + T` - New tab
- `Cmd + W` - Close tab
- `Cmd + Shift + ]` - Next tab
- `Cmd + Shift + [` - Previous tab
- `Cmd + 1-9` - Jump to tab

### Workspaces
- `Cmd + Shift + N` - New workspace
- `Cmd + Shift + 1-9` - Jump to workspace

### View
- `Cmd + D` - Toggle split view
- `Cmd + Shift + F` - Full screen

## Workflow Examples

### Example 1: Research Project

1. Create workspace "Research"
2. Open multiple tabs with sources
3. Use split view to compare documents
4. Session auto-saves progress
5. Resume exactly where you left off

### Example 2: Development Work

1. Create workspace "Development"
2. Tab 1: Documentation
3. Tab 2: Stack Overflow
4. Tab 3: GitHub repository
5. Tab 4: Live preview
6. Use split view for docs + preview

### Example 3: Multiple Projects

1. Workspace "Client A" with project tabs
2. Workspace "Client B" with project tabs
3. Workspace "Personal" with misc tabs
4. Quick switch between contexts
5. No tab mixing or confusion

## Theme Descriptions

### Monochrome (Default)
- **Background**: Pure black (#0a0a0a)
- **Accent**: White (#ffffff)
- **Style**: Classic, high contrast
- **Best for**: Extended use, night mode

### Ocean Blue
- **Background**: Deep navy (#0a1628)
- **Accent**: Bright blue (#4a9eff)
- **Style**: Calming, professional
- **Best for**: Long sessions, focus work

### Purple Haze
- **Background**: Dark purple (#1a0a28)
- **Accent**: Vibrant purple (#a84aff)
- **Style**: Creative, modern
- **Best for**: Design work, evening use

### Forest Green
- **Background**: Dark green (#0a1a0f)
- **Accent**: Lime green (#4aff88)
- **Style**: Natural, refreshing
- **Best for**: Reduced eye strain

### Sunset Orange
- **Background**: Dark brown (#1a0f0a)
- **Accent**: Warm orange (#ff884a)
- **Style**: Warm, energetic
- **Best for**: Creative projects

## Privacy Features

### Tracker Blocking
- Blocks common tracking scripts
- Configurable in settings
- Privacy-first approach

### Local Storage Only
- No cloud sync (by default)
- All data stored locally
- Full control over your data

### No Telemetry
- No usage tracking
- No analytics sent
- Your browsing stays private

## Performance Tips

### Memory Management
- Close unused workspaces
- Limit tabs per workspace (10-15)
- Use split view instead of many tabs

### Speed Optimization
- Clear cache regularly
- Disable unused features
- Use compact mode on older Macs

### Session Management
- Auto-save runs every 30 seconds
- Disable for better performance
- Manual save on quit available

## Customization Tips

### Theme Creation (Advanced)
1. Copy existing theme CSS
2. Modify color variables
3. Test in developer tools
4. Submit as contribution

### Icon Customization
1. Edit `resources/icon.svg`
2. Generate new .icns file
3. Rebuild application
4. New icon appears

### Layout Modifications
1. Edit `src/styles.css`
2. Adjust spacing, sizes
3. Test with `npm start`
4. Keep changes minimal

## Troubleshooting

### Common Issues

**Tabs not loading:**
- Check internet connection
- Verify URL format
- Try refreshing

**Settings not saving:**
- Check browser console
- Verify localStorage access
- Clear cache if needed

**Split view not working:**
- Need at least 2 tabs
- Click split view button
- Tabs should appear side-by-side

**Theme not applying:**
- Select theme in settings
- Check if theme modal closes
- Restart browser if needed

## Advanced Features

### Developer Tools
- Menu: View → Toggle DevTools
- Inspect any page
- Debug JavaScript
- Network monitoring

### Custom Search Engine
- Currently uses Google
- Can be modified in renderer.js
- Update handleNavigate function

### Extension Support (Future)
- Chrome extension compatibility planned
- Will support standard APIs
- Installation through UI

## Tips & Tricks

1. **Use workspaces liberally** - Don't be afraid to create many workspaces
2. **Split view for comparisons** - Great for shopping, research, coding
3. **Theme switching** - Change based on time of day or mood
4. **Auto-save is your friend** - Never lose your session
5. **Keyboard navigation** - Much faster once implemented

---

**Need help?** Check `README.md` and `DEVELOPMENT.md` for more information.

# Resources Directory

This directory contains application assets and icons.

## App Icon

### Current Icon
- `icon.svg` - Source SVG icon file (512x512)
- `icon.png` - Placeholder PNG file

### Generating macOS .icns File

To build the macOS app properly, you need to convert the SVG icon to an .icns file.

#### Option 1: Using Online Tools
1. Open `icon.svg` in a graphics editor
2. Export as PNG at 1024x1024 resolution
3. Use an online converter like [iConvert Icons](https://iconverticons.com/online/) to convert PNG to .icns

#### Option 2: Using macOS Command Line

1. First, create PNG files at multiple resolutions:
   ```bash
   # Requires ImageMagick or similar tool
   convert icon.svg -resize 16x16 icon_16x16.png
   convert icon.svg -resize 32x32 icon_16x16@2x.png
   convert icon.svg -resize 32x32 icon_32x32.png
   convert icon.svg -resize 64x64 icon_32x32@2x.png
   convert icon.svg -resize 128x128 icon_128x128.png
   convert icon.svg -resize 256x256 icon_128x128@2x.png
   convert icon.svg -resize 256x256 icon_256x256.png
   convert icon.svg -resize 512x512 icon_256x256@2x.png
   convert icon.svg -resize 512x512 icon_512x512.png
   convert icon.svg -resize 1024x1024 icon_512x512@2x.png
   ```

2. Create an iconset folder:
   ```bash
   mkdir icon.iconset
   mv icon_*.png icon.iconset/
   ```

3. Convert to .icns:
   ```bash
   iconutil -c icns icon.iconset
   ```

#### Option 3: Using electron-icon-builder

Install and use electron-icon-builder:
```bash
npm install -g electron-icon-builder
electron-icon-builder --input=./icon.png --output=./
```

### Icon Design Guidelines

The current icon design represents:
- **Circle**: Represents the browser window
- **6 Dots**: Represent workspaces (multitasking feature)
- **Center Dot + Line**: Represents split view feature
- **Monochrome Style**: Matches the app's design philosophy

Feel free to customize the icon to match your preferences!

## Other Assets

Add other application assets here:
- Loading screens
- Background images
- Custom cursors
- Sound effects
- etc.

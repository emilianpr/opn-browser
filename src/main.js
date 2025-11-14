const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
      webviewTag: true
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Create application menu
  createMenu();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function createMenu() {
  const template = [
    {
      label: 'OPN Browser',
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideOthers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    },
    {
      label: 'File',
      submenu: [
        {
          label: 'New Tab',
          accelerator: 'CmdOrCtrl+T',
          click: () => {
            mainWindow.webContents.send('shortcut-new-tab');
          }
        },
        {
          label: 'New Workspace',
          accelerator: 'CmdOrCtrl+Shift+N',
          click: () => {
            mainWindow.webContents.send('shortcut-new-workspace');
          }
        },
        {
          label: 'Close Tab',
          accelerator: 'CmdOrCtrl+W',
          click: () => {
            mainWindow.webContents.send('shortcut-close-tab');
          }
        },
        { type: 'separator' },
        {
          label: 'Reopen Closed Tab',
          accelerator: 'CmdOrCtrl+Shift+T',
          click: () => {
            mainWindow.webContents.send('shortcut-reopen-tab');
          }
        },
        { type: 'separator' },
        {
          label: 'Find in Page',
          accelerator: 'CmdOrCtrl+F',
          click: () => {
            mainWindow.webContents.send('shortcut-find');
          }
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectAll' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        {
          label: 'Split View',
          accelerator: 'CmdOrCtrl+D',
          click: () => {
            mainWindow.webContents.send('shortcut-split-view');
          }
        },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: 'History',
      submenu: [
        {
          label: 'Back',
          accelerator: 'CmdOrCtrl+[',
          click: () => {
            mainWindow.webContents.send('shortcut-back');
          }
        },
        {
          label: 'Forward',
          accelerator: 'CmdOrCtrl+]',
          click: () => {
            mainWindow.webContents.send('shortcut-forward');
          }
        },
        { type: 'separator' },
        {
          label: 'Refresh',
          accelerator: 'CmdOrCtrl+R',
          click: () => {
            mainWindow.webContents.send('shortcut-refresh');
          }
        }
      ]
    },
    {
      label: 'Bookmarks',
      submenu: [
        {
          label: 'Add Bookmark',
          accelerator: 'CmdOrCtrl+D',
          click: () => {
            mainWindow.webContents.send('shortcut-add-bookmark');
          }
        },
        {
          label: 'Show All Bookmarks',
          accelerator: 'CmdOrCtrl+Shift+B',
          click: () => {
            mainWindow.webContents.send('shortcut-show-bookmarks');
          }
        },
        { type: 'separator' },
        {
          label: 'Toggle Bookmarks Bar',
          accelerator: 'CmdOrCtrl+Shift+B',
          click: () => {
            mainWindow.webContents.send('shortcut-toggle-bookmarks-bar');
          }
        }
      ]
    },
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'zoom' },
        { type: 'separator' },
        { role: 'front' }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// IPC handlers for browser controls
ipcMain.on('navigate', (event, url) => {
  event.reply('navigate-reply', url);
});

ipcMain.on('new-tab', () => {
  // Future enhancement: handle multiple tabs
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

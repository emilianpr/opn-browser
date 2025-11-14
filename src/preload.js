const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  navigate: (url) => ipcRenderer.send('navigate', url),
  onNavigateReply: (callback) => ipcRenderer.on('navigate-reply', callback),
  newTab: () => ipcRenderer.send('new-tab'),
  onShortcut: (channel, callback) => {
    const validChannels = [
      'shortcut-new-tab',
      'shortcut-new-workspace',
      'shortcut-close-tab',
      'shortcut-reopen-tab',
      'shortcut-find',
      'shortcut-split-view',
      'shortcut-back',
      'shortcut-forward',
      'shortcut-refresh',
      'shortcut-add-bookmark',
      'shortcut-show-bookmarks',
      'shortcut-toggle-bookmarks-bar'
    ];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, callback);
    }
  }
});

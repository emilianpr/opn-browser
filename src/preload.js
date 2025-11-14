const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  navigate: (url) => ipcRenderer.send('navigate', url),
  onNavigateReply: (callback) => ipcRenderer.on('navigate-reply', callback),
  newTab: () => ipcRenderer.send('new-tab')
});

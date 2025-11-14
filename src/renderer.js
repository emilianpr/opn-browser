// Browser State Management
class BrowserState {
  constructor() {
    this.workspaces = [];
    this.currentWorkspaceId = null;
    this.tabs = new Map();
    this.currentTabId = null;
    this.splitViewEnabled = false;
    this.splitTabs = [];
    this.settings = this.loadSettings();
    this.bookmarks = this.loadBookmarks();
    this.closedTabs = [];
    this.init();
  }

  init() {
    // Load saved state or create default workspace
    const savedState = localStorage.getItem('browserState');
    if (savedState) {
      const state = JSON.parse(savedState);
      this.workspaces = state.workspaces || [];
      this.currentWorkspaceId = state.currentWorkspaceId;
    }
    
    if (this.workspaces.length === 0) {
      this.createWorkspace('Main');
    }
    
    this.applyTheme(this.settings.theme);
  }

  loadSettings() {
    const defaultSettings = {
      theme: 'monochrome',
      compactMode: false,
      autoSaveSessions: true,
      groupSimilarTabs: false,
      blockTrackers: true,
      showBookmarksBar: true
    };
    
    const saved = localStorage.getItem('settings');
    return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
  }

  loadBookmarks() {
    const saved = localStorage.getItem('bookmarks');
    return saved ? JSON.parse(saved) : [];
  }

  saveBookmarks() {
    localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
  }

  saveSettings() {
    localStorage.setItem('settings', JSON.stringify(this.settings));
  }

  saveState() {
    const state = {
      workspaces: this.workspaces,
      currentWorkspaceId: this.currentWorkspaceId
    };
    localStorage.setItem('browserState', JSON.stringify(state));
  }

  createWorkspace(name) {
    const workspace = {
      id: Date.now().toString(),
      name: name || `Workspace ${this.workspaces.length + 1}`,
      tabs: [],
      color: this.getRandomColor()
    };
    this.workspaces.push(workspace);
    this.currentWorkspaceId = workspace.id;
    this.saveState();
    return workspace;
  }

  getCurrentWorkspace() {
    return this.workspaces.find(w => w.id === this.currentWorkspaceId);
  }

  createTab(url = 'about:blank', workspaceId = null) {
    const wsId = workspaceId || this.currentWorkspaceId;
    const workspace = this.workspaces.find(w => w.id === wsId);
    if (!workspace) return null;

    const tab = {
      id: Date.now().toString() + Math.random(),
      url: url,
      title: 'New Tab',
      workspaceId: wsId
    };
    
    workspace.tabs.push(tab.id);
    this.tabs.set(tab.id, tab);
    this.currentTabId = tab.id;
    this.saveState();
    return tab;
  }

  closeTab(tabId) {
    const tab = this.tabs.get(tabId);
    if (!tab) return;

    // Save to closed tabs for reopen functionality
    this.closedTabs.push({
      url: tab.url,
      title: tab.title,
      timestamp: Date.now()
    });
    // Keep only last 10 closed tabs
    if (this.closedTabs.length > 10) {
      this.closedTabs.shift();
    }

    const workspace = this.workspaces.find(w => w.id === tab.workspaceId);
    if (workspace) {
      workspace.tabs = workspace.tabs.filter(id => id !== tabId);
    }
    
    this.tabs.delete(tabId);
    
    // Select another tab if current was closed
    if (this.currentTabId === tabId) {
      const currentWs = this.getCurrentWorkspace();
      if (currentWs && currentWs.tabs.length > 0) {
        this.currentTabId = currentWs.tabs[currentWs.tabs.length - 1];
      } else {
        this.currentTabId = null;
      }
    }
    
    this.saveState();
  }

  getLastClosedTab() {
    return this.closedTabs.pop();
  }

  getRandomColor() {
    const colors = ['#4a9eff', '#a84aff', '#4aff88', '#ff884a', '#ff4a8a'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  applyTheme(themeName) {
    document.documentElement.setAttribute('data-theme', themeName);
    this.settings.theme = themeName;
    this.saveSettings();
  }

  addBookmark(url, title) {
    // Check if bookmark already exists
    const exists = this.bookmarks.find(b => b.url === url);
    if (exists) {
      return false;
    }

    const bookmark = {
      id: Date.now().toString() + Math.random(),
      url: url,
      title: title || url,
      createdAt: Date.now()
    };
    
    this.bookmarks.push(bookmark);
    this.saveBookmarks();
    return true;
  }

  removeBookmark(bookmarkId) {
    this.bookmarks = this.bookmarks.filter(b => b.id !== bookmarkId);
    this.saveBookmarks();
  }

  getBookmarks() {
    return this.bookmarks;
  }
}

// UI Manager
class UIManager {
  constructor(state) {
    this.state = state;
    this.initElements();
    this.attachEventListeners();
    this.render();
  }

  initElements() {
    // Workspace elements
    this.workspaceList = document.getElementById('workspaceList');
    this.newWorkspaceBtn = document.getElementById('newWorkspace');
    
    // Tab elements
    this.tabBar = document.getElementById('tabBar');
    this.newTabBtn = document.getElementById('newTabBtn');
    
    // Navigation elements
    this.backBtn = document.getElementById('backBtn');
    this.forwardBtn = document.getElementById('forwardBtn');
    this.refreshBtn = document.getElementById('refreshBtn');
    this.urlBar = document.getElementById('urlBar');
    
    // View control elements
    this.splitViewBtn = document.getElementById('splitViewBtn');
    this.pipBtn = document.getElementById('pipBtn');
    
    // Browser view
    this.browserView = document.getElementById('browserView');
    this.welcomeScreen = document.getElementById('welcomeScreen');
    
    // Modal elements
    this.settingsModal = document.getElementById('settingsModal');
    this.settingsBtn = document.getElementById('settingsBtn');
    this.closeSettings = document.getElementById('closeSettings');
    
    this.themeModal = document.getElementById('themeModal');
    this.themeBtn = document.getElementById('themeBtn');
    this.closeTheme = document.getElementById('closeTheme');
    
    this.bookmarksModal = document.getElementById('bookmarksModal');
    this.closeBookmarks = document.getElementById('closeBookmarks');
    
    // Quick action buttons
    this.quickNewTab = document.getElementById('quickNewTab');
    this.quickNewWorkspace = document.getElementById('quickNewWorkspace');
  }

  attachEventListeners() {
    // Workspace events
    this.newWorkspaceBtn.addEventListener('click', () => this.handleNewWorkspace());
    
    // Tab events
    this.newTabBtn.addEventListener('click', () => this.handleNewTab());
    
    // Navigation events
    this.backBtn.addEventListener('click', () => this.handleBack());
    this.forwardBtn.addEventListener('click', () => this.handleForward());
    this.refreshBtn.addEventListener('click', () => this.handleRefresh());
    this.urlBar.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.handleNavigate();
    });
    
    // View control events
    this.splitViewBtn.addEventListener('click', () => this.handleSplitView());
    this.pipBtn.addEventListener('click', () => this.handlePiP());
    
    // Modal events
    this.settingsBtn.addEventListener('click', () => this.showModal(this.settingsModal));
    this.closeSettings.addEventListener('click', () => this.hideModal(this.settingsModal));
    this.themeBtn.addEventListener('click', () => this.showModal(this.themeModal));
    this.closeTheme.addEventListener('click', () => this.hideModal(this.themeModal));
    
    // Close modals on background click
    [this.settingsModal, this.themeModal, this.bookmarksModal].forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) this.hideModal(modal);
      });
    });
    
    // Bookmarks modal close button
    if (this.closeBookmarks) {
      this.closeBookmarks.addEventListener('click', () => this.hideModal(this.bookmarksModal));
    }
    
    // Settings events
    document.getElementById('themeSelect').addEventListener('change', (e) => {
      this.state.applyTheme(e.target.value);
    });
    
    document.getElementById('compactMode').addEventListener('change', (e) => {
      this.state.settings.compactMode = e.target.checked;
      this.state.saveSettings();
    });
    
    document.getElementById('autoSaveSessions').addEventListener('change', (e) => {
      this.state.settings.autoSaveSessions = e.target.checked;
      this.state.saveSettings();
    });
    
    document.getElementById('groupSimilarTabs').addEventListener('change', (e) => {
      this.state.settings.groupSimilarTabs = e.target.checked;
      this.state.saveSettings();
    });
    
    document.getElementById('blockTrackers').addEventListener('change', (e) => {
      this.state.settings.blockTrackers = e.target.checked;
      this.state.saveSettings();
    });
    
    // Theme selection
    document.querySelectorAll('.theme-option').forEach(option => {
      option.addEventListener('click', () => {
        const theme = option.dataset.theme;
        this.state.applyTheme(theme);
        document.getElementById('themeSelect').value = theme;
      });
    });
    
    // Quick actions
    this.quickNewTab.addEventListener('click', () => this.handleNewTab());
    this.quickNewWorkspace.addEventListener('click', () => this.handleNewWorkspace());
    
    // Keyboard shortcuts
    this.setupKeyboardShortcuts();
    
    // IPC shortcuts from menu
    this.setupIPCShortcuts();
  }

  render() {
    this.renderWorkspaces();
    this.renderTabs();
    this.updateWelcomeScreen();
    this.syncSettings();
    this.renderBookmarks();
    this.updateBookmarksBarVisibility();
  }

  renderWorkspaces() {
    this.workspaceList.innerHTML = '';
    
    this.state.workspaces.forEach(workspace => {
      const wsElement = document.createElement('div');
      wsElement.className = 'workspace-item';
      if (workspace.id === this.state.currentWorkspaceId) {
        wsElement.classList.add('active');
      }
      
      wsElement.textContent = workspace.name.substring(0, 2).toUpperCase();
      
      if (workspace.tabs.length > 0) {
        const badge = document.createElement('span');
        badge.className = 'tab-count';
        badge.textContent = workspace.tabs.length;
        wsElement.appendChild(badge);
      }
      
      wsElement.addEventListener('click', () => {
        this.state.currentWorkspaceId = workspace.id;
        this.state.saveState();
        this.render();
      });
      
      this.workspaceList.appendChild(wsElement);
    });
  }

  renderTabs() {
    this.tabBar.innerHTML = '';
    const workspace = this.state.getCurrentWorkspace();
    
    if (!workspace || workspace.tabs.length === 0) {
      return;
    }
    
    workspace.tabs.forEach(tabId => {
      const tab = this.state.tabs.get(tabId);
      if (!tab) return;
      
      const tabElement = document.createElement('div');
      tabElement.className = 'tab';
      if (tab.id === this.state.currentTabId) {
        tabElement.classList.add('active');
      }
      
      const title = document.createElement('span');
      title.className = 'tab-title';
      title.textContent = tab.title;
      
      const closeBtn = document.createElement('button');
      closeBtn.className = 'tab-close';
      closeBtn.innerHTML = '×';
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.handleCloseTab(tab.id);
      });
      
      tabElement.addEventListener('click', () => {
        this.state.currentTabId = tab.id;
        this.render();
        this.updateWebview();
      });
      
      tabElement.appendChild(title);
      tabElement.appendChild(closeBtn);
      this.tabBar.appendChild(tabElement);
    });
  }

  updateWelcomeScreen() {
    const workspace = this.state.getCurrentWorkspace();
    if (workspace && workspace.tabs.length > 0) {
      this.welcomeScreen.style.display = 'none';
    } else {
      this.welcomeScreen.style.display = 'flex';
    }
  }

  handleNewWorkspace() {
    const name = prompt('Enter workspace name:');
    if (name) {
      this.state.createWorkspace(name);
      this.render();
    }
  }

  handleNewTab() {
    const tab = this.state.createTab();
    if (tab) {
      this.render();
      this.createWebview(tab);
      this.urlBar.focus();
    }
  }

  handleCloseTab(tabId) {
    this.state.closeTab(tabId);
    this.render();
    this.removeWebview(tabId);
  }

  handleBack() {
    const webview = this.getActiveWebview();
    if (webview && webview.canGoBack()) {
      webview.goBack();
    }
  }

  handleForward() {
    const webview = this.getActiveWebview();
    if (webview && webview.canGoForward()) {
      webview.goForward();
    }
  }

  handleRefresh() {
    const webview = this.getActiveWebview();
    if (webview) {
      webview.reload();
    }
  }

  handleNavigate() {
    let url = this.urlBar.value.trim();
    if (!url) return;
    
    // Add protocol if missing
    if (!url.match(/^https?:\/\//i)) {
      if (url.includes('.') && !url.includes(' ')) {
        url = 'https://' + url;
      } else {
        url = 'https://www.google.com/search?q=' + encodeURIComponent(url);
      }
    }
    
    const currentTab = this.state.tabs.get(this.state.currentTabId);
    if (currentTab) {
      currentTab.url = url;
      this.state.saveState();
    }
    
    const webview = this.getActiveWebview();
    if (webview) {
      webview.src = url;
    } else {
      this.createWebview(currentTab, url);
    }
  }

  handleSplitView() {
    this.state.splitViewEnabled = !this.state.splitViewEnabled;
    
    if (this.state.splitViewEnabled) {
      this.splitViewBtn.style.color = 'var(--accent-color)';
      // Create a second tab if only one exists
      const workspace = this.state.getCurrentWorkspace();
      if (workspace && workspace.tabs.length === 1) {
        this.handleNewTab();
      }
    } else {
      this.splitViewBtn.style.color = '';
    }
    
    this.updateWebviewLayout();
  }

  handlePiP() {
    // Picture-in-Picture mode implementation
    const webview = this.getActiveWebview();
    if (webview) {
      // This would require additional implementation for PiP
      alert('Picture-in-Picture feature coming soon!');
    }
  }

  createWebview(tab, url = null) {
    const container = document.createElement('div');
    container.className = 'webview-container';
    container.dataset.tabId = tab.id;
    
    const webview = document.createElement('webview');
    webview.src = url || tab.url || 'about:blank';
    webview.partition = 'persist:main';
    
    // Webview event listeners
    webview.addEventListener('did-start-loading', () => {
      // Add loading indicator if needed
    });
    
    webview.addEventListener('did-stop-loading', () => {
      // Remove loading indicator
    });
    
    webview.addEventListener('page-title-updated', (e) => {
      tab.title = e.title;
      this.renderTabs();
    });
    
    webview.addEventListener('did-navigate', (e) => {
      this.urlBar.value = e.url;
      tab.url = e.url;
      this.state.saveState();
    });
    
    webview.addEventListener('did-navigate-in-page', (e) => {
      this.urlBar.value = e.url;
      tab.url = e.url;
      this.state.saveState();
    });
    
    container.appendChild(webview);
    this.browserView.appendChild(container);
    
    this.updateWebview();
  }

  removeWebview(tabId) {
    const container = this.browserView.querySelector(`[data-tab-id="${tabId}"]`);
    if (container) {
      container.remove();
    }
  }

  getActiveWebview() {
    if (!this.state.currentTabId) return null;
    const container = this.browserView.querySelector(`[data-tab-id="${this.state.currentTabId}"]`);
    return container ? container.querySelector('webview') : null;
  }

  updateWebview() {
    const containers = this.browserView.querySelectorAll('.webview-container');
    containers.forEach(container => {
      if (container.dataset.tabId === this.state.currentTabId) {
        container.classList.add('active');
      } else {
        container.classList.remove('active');
      }
    });
    
    const currentTab = this.state.tabs.get(this.state.currentTabId);
    if (currentTab) {
      this.urlBar.value = currentTab.url || '';
    }
  }

  updateWebviewLayout() {
    const containers = this.browserView.querySelectorAll('.webview-container');
    
    if (this.state.splitViewEnabled && containers.length >= 2) {
      containers.forEach((container, index) => {
        if (index < 2) {
          container.classList.add('split');
          container.classList.add('active');
        }
      });
    } else {
      containers.forEach(container => {
        container.classList.remove('split');
      });
    }
  }

  showModal(modal) {
    modal.classList.add('active');
  }

  hideModal(modal) {
    modal.classList.remove('active');
  }

  syncSettings() {
    document.getElementById('themeSelect').value = this.state.settings.theme;
    document.getElementById('compactMode').checked = this.state.settings.compactMode;
    document.getElementById('autoSaveSessions').checked = this.state.settings.autoSaveSessions;
    document.getElementById('groupSimilarTabs').checked = this.state.settings.groupSimilarTabs;
    document.getElementById('blockTrackers').checked = this.state.settings.blockTrackers;
  }

  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;
      
      // Don't trigger shortcuts when typing in inputs
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        // Allow Cmd+L to focus URL bar even when in input
        if (cmdOrCtrl && e.key === 'l') {
          e.preventDefault();
          this.urlBar.focus();
          this.urlBar.select();
          return;
        }
        return;
      }
      
      // Cmd/Ctrl + T: New Tab
      if (cmdOrCtrl && e.key === 't') {
        e.preventDefault();
        this.handleNewTab();
      }
      
      // Cmd/Ctrl + W: Close Tab
      else if (cmdOrCtrl && e.key === 'w') {
        e.preventDefault();
        if (this.state.currentTabId) {
          this.handleCloseTab(this.state.currentTabId);
        }
      }
      
      // Cmd/Ctrl + R: Refresh
      else if (cmdOrCtrl && e.key === 'r') {
        e.preventDefault();
        this.handleRefresh();
      }
      
      // Cmd/Ctrl + L: Focus URL bar
      else if (cmdOrCtrl && e.key === 'l') {
        e.preventDefault();
        this.urlBar.focus();
        this.urlBar.select();
      }
      
      // Cmd/Ctrl + [: Back
      else if (cmdOrCtrl && e.key === '[') {
        e.preventDefault();
        this.handleBack();
      }
      
      // Cmd/Ctrl + ]: Forward
      else if (cmdOrCtrl && e.key === ']') {
        e.preventDefault();
        this.handleForward();
      }
      
      // Cmd/Ctrl + D: Add Bookmark (or Split View - we'll prioritize bookmark)
      else if (cmdOrCtrl && !e.shiftKey && e.key === 'd') {
        e.preventDefault();
        this.handleAddBookmark();
      }
      
      // Cmd/Ctrl + Shift + N: New Workspace
      else if (cmdOrCtrl && e.shiftKey && e.key === 'N') {
        e.preventDefault();
        this.handleNewWorkspace();
      }
      
      // Cmd/Ctrl + Shift + B: Toggle Bookmarks Bar
      else if (cmdOrCtrl && e.shiftKey && e.key === 'B') {
        e.preventDefault();
        this.toggleBookmarksBar();
      }
      
      // Cmd/Ctrl + Shift + T: Reopen Closed Tab
      else if (cmdOrCtrl && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        this.handleReopenTab();
      }
      
      // Cmd/Ctrl + Shift + ]: Next Tab
      else if (cmdOrCtrl && e.shiftKey && e.key === '}') {
        e.preventDefault();
        this.switchToNextTab();
      }
      
      // Cmd/Ctrl + Shift + [: Previous Tab
      else if (cmdOrCtrl && e.shiftKey && e.key === '{') {
        e.preventDefault();
        this.switchToPreviousTab();
      }
      
      // Cmd/Ctrl + 1-9: Switch to tab by number
      else if (cmdOrCtrl && e.key >= '1' && e.key <= '9') {
        e.preventDefault();
        this.switchToTabByIndex(parseInt(e.key) - 1);
      }
      
      // Cmd/Ctrl + F: Find in page
      else if (cmdOrCtrl && e.key === 'f') {
        e.preventDefault();
        this.handleFindInPage();
      }
    });
  }

  setupIPCShortcuts() {
    if (window.electronAPI && window.electronAPI.onShortcut) {
      window.electronAPI.onShortcut('shortcut-new-tab', () => this.handleNewTab());
      window.electronAPI.onShortcut('shortcut-new-workspace', () => this.handleNewWorkspace());
      window.electronAPI.onShortcut('shortcut-close-tab', () => {
        if (this.state.currentTabId) {
          this.handleCloseTab(this.state.currentTabId);
        }
      });
      window.electronAPI.onShortcut('shortcut-reopen-tab', () => this.handleReopenTab());
      window.electronAPI.onShortcut('shortcut-find', () => this.handleFindInPage());
      window.electronAPI.onShortcut('shortcut-split-view', () => this.handleSplitView());
      window.electronAPI.onShortcut('shortcut-back', () => this.handleBack());
      window.electronAPI.onShortcut('shortcut-forward', () => this.handleForward());
      window.electronAPI.onShortcut('shortcut-refresh', () => this.handleRefresh());
      window.electronAPI.onShortcut('shortcut-add-bookmark', () => this.handleAddBookmark());
      window.electronAPI.onShortcut('shortcut-show-bookmarks', () => this.showBookmarksModal());
      window.electronAPI.onShortcut('shortcut-toggle-bookmarks-bar', () => this.toggleBookmarksBar());
    }
  }

  switchToNextTab() {
    const workspace = this.state.getCurrentWorkspace();
    if (!workspace || workspace.tabs.length === 0) return;
    
    const currentIndex = workspace.tabs.indexOf(this.state.currentTabId);
    const nextIndex = (currentIndex + 1) % workspace.tabs.length;
    this.state.currentTabId = workspace.tabs[nextIndex];
    this.render();
    this.updateWebview();
  }

  switchToPreviousTab() {
    const workspace = this.state.getCurrentWorkspace();
    if (!workspace || workspace.tabs.length === 0) return;
    
    const currentIndex = workspace.tabs.indexOf(this.state.currentTabId);
    const prevIndex = currentIndex <= 0 ? workspace.tabs.length - 1 : currentIndex - 1;
    this.state.currentTabId = workspace.tabs[prevIndex];
    this.render();
    this.updateWebview();
  }

  switchToTabByIndex(index) {
    const workspace = this.state.getCurrentWorkspace();
    if (!workspace || workspace.tabs.length === 0) return;
    
    if (index < workspace.tabs.length) {
      this.state.currentTabId = workspace.tabs[index];
      this.render();
      this.updateWebview();
    }
  }

  handleReopenTab() {
    // Implement reopen last closed tab
    const lastClosedTab = this.state.getLastClosedTab();
    if (lastClosedTab) {
      const tab = this.state.createTab(lastClosedTab.url);
      if (tab) {
        tab.title = lastClosedTab.title;
        this.render();
        this.createWebview(tab);
      }
    }
  }

  handleFindInPage() {
    const webview = this.getActiveWebview();
    if (webview) {
      // Electron webview has built-in find functionality
      // For now, show an alert - can be enhanced with a find bar UI
      const searchTerm = prompt('Find in page:');
      if (searchTerm) {
        webview.findInPage(searchTerm);
      }
    }
  }

  handleAddBookmark() {
    const currentTab = this.state.tabs.get(this.state.currentTabId);
    if (currentTab) {
      this.state.addBookmark(currentTab.url, currentTab.title);
      this.renderBookmarks();
      // Show a brief notification
      this.showNotification('Bookmark added');
    }
  }

  showBookmarksModal() {
    this.showModal(document.getElementById('bookmarksModal'));
  }

  toggleBookmarksBar() {
    const bookmarksBar = document.getElementById('bookmarksBar');
    if (bookmarksBar) {
      bookmarksBar.classList.toggle('hidden');
      this.state.settings.showBookmarksBar = !bookmarksBar.classList.contains('hidden');
      this.state.saveSettings();
    }
  }

  showNotification(message) {
    // Simple notification system
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.classList.add('show'), 10);
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 2000);
  }

  renderBookmarks() {
    const bookmarksBar = document.getElementById('bookmarksList');
    if (!bookmarksBar) return;
    
    bookmarksBar.innerHTML = '';
    const bookmarks = this.state.getBookmarks();
    
    bookmarks.forEach(bookmark => {
      const bookmarkElement = document.createElement('div');
      bookmarkElement.className = 'bookmark-item';
      bookmarkElement.title = bookmark.url;
      
      const title = document.createElement('span');
      title.textContent = bookmark.title || bookmark.url;
      
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'bookmark-delete';
      deleteBtn.innerHTML = '×';
      deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.state.removeBookmark(bookmark.id);
        this.renderBookmarks();
      });
      
      bookmarkElement.addEventListener('click', () => {
        const currentTab = this.state.tabs.get(this.state.currentTabId);
        if (currentTab) {
          currentTab.url = bookmark.url;
          this.state.saveState();
        }
        
        const webview = this.getActiveWebview();
        if (webview) {
          webview.src = bookmark.url;
        } else if (currentTab) {
          this.createWebview(currentTab, bookmark.url);
        }
      });
      
      bookmarkElement.appendChild(title);
      bookmarkElement.appendChild(deleteBtn);
      bookmarksBar.appendChild(bookmarkElement);
    });
  }

  updateBookmarksBarVisibility() {
    const bookmarksBar = document.getElementById('bookmarksBar');
    if (bookmarksBar) {
      if (this.state.settings.showBookmarksBar) {
        bookmarksBar.classList.remove('hidden');
      } else {
        bookmarksBar.classList.add('hidden');
      }
    }
  }
}

// Initialize the browser
const browserState = new BrowserState();
const uiManager = new UIManager(browserState);

// Auto-save state periodically
setInterval(() => {
  if (browserState.settings.autoSaveSessions) {
    browserState.saveState();
  }
}, 30000); // Every 30 seconds

console.log('OPN Browser initialized');

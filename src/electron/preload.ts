import { contextBridge, ipcRenderer } from 'electron';

console.log('Preload script is running');

contextBridge.exposeInMainWorld('electronAPI', {

  // File operations
  openFile: (filters?: any[]) => ipcRenderer.invoke('file-open', filters).catch(() => null),
  saveFile: (content: string, defaultPath?: string) => 
    ipcRenderer.invoke('file-save', content, defaultPath).catch(() => null),
  showSaveDialog: (options?: any) => 
    ipcRenderer.invoke('file-save-dialog', options).catch(() => null),

  // Theme management
// 

  // Settings (localstorage-types)
  getSetting: (key: string) => ipcRenderer.invoke('settings-get', key),
  setSetting: (key: string, value: any) => ipcRenderer.invoke('settings-set', key, value),
  getAllSettings: () => ipcRenderer.invoke('settings-get-all'),

  // Audio/TTS functionality
  playAudio: (text: string, language: string) => ipcRenderer.invoke('audio-play', text, language),
  stopAudio: () => ipcRenderer.invoke('audio-stop'),

  // Notifications
  showNotification: (title: string, body: string) => ipcRenderer.invoke('notification-show', title, body),

  // External links
  openExternal: (url: string) => ipcRenderer.invoke('open-external', url),

});



// Development utilities
if (process.env.NODE_ENV === 'development') {
  contextBridge.exposeInMainWorld('electronDev', {
    reload: () => ipcRenderer.invoke('dev-reload'),
    openDevTools: () => ipcRenderer.invoke('dev-tools-open'),
  });
}
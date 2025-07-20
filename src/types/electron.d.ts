export interface IElectronAPI {
   // File operations
  openFile: (filters?: Electron.FileFilter[]) => Promise<string | null>;
  saveFile: (content: string, defaultPath?: string) => Promise<string | null>;
  showSaveDialog: (options?: Electron.SaveDialogOptions) => Promise<string | null>;

  // Theme management
  setTheme: (theme: 'light' | 'dark' | 'system') => Promise<void>;
  getTheme: () => Promise<string>;
  onThemeChanged: (callback: (theme: string) => void) => void;


  // Settings
  getSetting: (key: string) => Promise<any>;
  setSetting: (key: string, value: any) => Promise<void>;
  getAllSettings: () => Promise<Record<string, any>>;

  // Electron Store
  store: {
    get: (key: string) => Promise<any>;
    set: (key: string, value: any) => Promise<boolean>;
    delete: (key: string) => Promise<boolean>;
    clear: () => Promise<boolean>;
    has: (key: string) => Promise<boolean>;
    getAll: () => Promise<Record<string, any>>;
  };

  // Audio/TTS functionality
  playAudio: (text: string, language: string) => Promise<void>;
  stopAudio: () => Promise<void>;

  // Notifications
  showNotification: (title: string, body: string) => Promise<void>;

  // External links
  openExternal: (url: string) => Promise<void>;

}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
    electronAPICleanup: IElectronAPICleanup;
    electronDev?: IElectronDev; // Only available in development
  }
}
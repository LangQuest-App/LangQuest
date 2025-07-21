// Electron Store wrapper that communicates with main process via IPC
// This avoids the __dirname issue in the renderer process

interface ElectronStore {
  get: (key: string) => Promise<any>;
  set: (key: string, value: any) => Promise<boolean>;
  delete: (key: string) => Promise<boolean>;
  clear: () => Promise<boolean>;
  has: (key: string) => Promise<boolean>;
  getAll: () => Promise<Record<string, any>>;
  isAvailable: () => boolean;
}

const isElectronAvailable = (): boolean => {
  return typeof window !== 'undefined' && 
         window.electronAPI !== undefined && 
         window.electronAPI.store !== undefined;
};

const store: ElectronStore = {
  isAvailable: () => isElectronAvailable(),

  get: async (key: string) => {
    if (!isElectronAvailable()) {
      throw new Error('Electron API not available. Make sure the preload script is properly loaded and the store IPC handlers are set up.');
    }
    try {
      return await window.electronAPI.store.get(key);
    } catch (error) {
      console.error('Error getting value from electron store:', error);
      throw error;
    }
  },

  set: async (key: string, value: any) => {
    if (!isElectronAvailable()) {
      throw new Error('Electron API not available. Make sure the preload script is properly loaded and the store IPC handlers are set up.');
    }
    try {
      return await window.electronAPI.store.set(key, value);
    } catch (error) {
      console.error('Error setting value in electron store:', error);
      throw error;
    }
  },

  delete: async (key: string) => {
    if (!isElectronAvailable()) {
      throw new Error('Electron API not available. Make sure the preload script is properly loaded and the store IPC handlers are set up.');
    }
    try {
      return await window.electronAPI.store.delete(key);
    } catch (error) {
      console.error('Error deleting value from electron store:', error);
      throw error;
    }
  },

  clear: async () => {
    if (!isElectronAvailable()) {
      throw new Error('Electron API not available. Make sure the preload script is properly loaded and the store IPC handlers are set up.');
    }
    try {
      return await window.electronAPI.store.clear();
    } catch (error) {
      console.error('Error clearing electron store:', error);
      throw error;
    }
  },

  has: async (key: string) => {
    if (!isElectronAvailable()) {
      throw new Error('Electron API not available. Make sure the preload script is properly loaded and the store IPC handlers are set up.');
    }
    try {
      return await window.electronAPI.store.has(key);
    } catch (error) {
      console.error('Error checking key in electron store:', error);
      throw error;
    }
  },

  getAll: async () => {
    if (!isElectronAvailable()) {
      throw new Error('Electron API not available. Make sure the preload script is properly loaded and the store IPC handlers are set up.');
    }
    try {
      return await window.electronAPI.store.getAll();
    } catch (error) {
      console.error('Error getting all values from electron store:', error);
      throw error;
    }
  }
};

export default store;

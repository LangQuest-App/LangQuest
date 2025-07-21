import {
  app,
  BrowserWindow,
  ipcMain,
  shell,
  dialog,
  Notification,
} from "electron";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";
import Store from "electron-store";

// __dirname support (ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize electron-store
const store = new Store();

// Store for settings (in production, you might want to use a proper database or file)
const settings: Record<string, any> = {};

// IPC Handlers
ipcMain.handle(
  "notification-show",
  async (_event, title: string, body: string) => {
    try {
      if (Notification.isSupported()) {
        const notification = new Notification({
          title,
          body,
          icon: path.join(__dirname, "../../desktopIcon.png"),
        });
        notification.show();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to show notification:", error);
      throw error;
    }
  }
);

 ipcMain.handle("open-external", async (_event, url: string) => {
  try {
    await shell.openExternal(url);
    return true;
  } catch (error) {
    console.error("Failed to open external URL:", error);
    throw error;
  }
});

 ipcMain.handle("file-open", async (_event, filters?: Electron.FileFilter[]) => {
  try {
    const result = await dialog.showOpenDialog({
      properties: ["openFile"],
      filters: filters || [{ name: "All Files", extensions: ["*"] }],
    });

    if (!result.canceled && result.filePaths.length > 0) {
      const filePath = result.filePaths[0];
      const content = fs.readFileSync(filePath, "utf-8");
      return content;
    }
    return null;
  } catch (error) {
    console.error("Failed to open file:", error);
    throw error;
  }
});

ipcMain.handle(
  "file-save",
  async (_event, content: string, defaultPath?: string) => {
    try {
      const result = await dialog.showSaveDialog({
        defaultPath: defaultPath || "untitled.txt",
        filters: [
          { name: "Text Files", extensions: ["txt"] },
          { name: "All Files", extensions: ["*"] },
        ],
      });

      if (!result.canceled && result.filePath) {
        fs.writeFileSync(result.filePath, content, "utf-8");
        return result.filePath;
      }
      return null;
    } catch (error) {
      console.error("Failed to save file:", error);
      throw error;
    }
  }
);

ipcMain.handle(
  "file-save-dialog",
  async (_event, options?: Electron.SaveDialogOptions) => {
    try {
      const result = await dialog.showSaveDialog(options || {});
      return result.canceled ? null : result.filePath;
    } catch (error) {
      console.error("Failed to show save dialog:", error);
      throw error;
    }
  }
);

 ipcMain.handle("settings-get", async (_event, key: string) => {
  return settings[key] || null;
});

 ipcMain.handle("settings-set", async (_event, key: string, value: any) => {
  settings[key] = value;
  return true;
});

 ipcMain.handle("settings-get-all", async (_event) => {
  return { ...settings };
});

// Electron Store IPC handlers
 ipcMain.handle("store-get", async (_event, key: string) => {
  return store.get(key);
});

 ipcMain.handle("store-set", async (_event, key: string, value: any) => {
  store.set(key, value);
  return true;
});

 ipcMain.handle("store-delete", async (_event, key: string) => {
  store.delete(key);
  return true;
});

 ipcMain.handle("store-clear", async (_event) => {
  store.clear();
  return true;
});

 ipcMain.handle("store-has", async (_event, key: string) => {
  return store.has(key);
});

 ipcMain.handle("store-get-all", async (_event) => {
  return store.store;
});

 ipcMain.handle("audio-play", async (_event, text: string, language: string) => {
  // Note: This is a basic implementation. For production, you might want to use
  // a proper TTS library or system API
  console.log(`TTS Request: "${text}" in ${language}`);
  // You can implement actual TTS here using libraries like 'say' or system APIs
  return true;
});

 ipcMain.handle("audio-stop", async (_event) => {
  console.log("TTS Stop requested");
  // Implement TTS stop logic here
  return true;
});

// Development utilities
if (process.env.NODE_ENV === "development") {
  ipcMain.handle("dev-reload", async (event: Electron.IpcMainInvokeEvent) => {
    const webContents = event.sender;
    webContents.reload();
    return true;
  });

  ipcMain.handle("dev-tools-open", async (event: Electron.IpcMainInvokeEvent) => {
    const webContents = event.sender;
    webContents.openDevTools();
    return true;
  });
}

app.on("ready", () => {
  const preloadPath = path.resolve(__dirname, "preload.js");
  console.log("Preload script path:", preloadPath);
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: preloadPath, // Load preload script using absolute path
      sandbox: false,
    },
  });

  if (process.env.NODE_ENV === "development") {
    mainWindow.loadURL("http://localhost:5123");
  } else {
    console.log(process.env.NODE_ENV);
    mainWindow.loadFile(path.join(app.getAppPath(), "dist-react", "index.html"));
    // Fallback for SPA routes in production
    mainWindow.webContents.on('will-navigate', (event, url) => {
      const isFile = url.endsWith('.js') || url.endsWith('.css') || url.endsWith('.png') || url.endsWith('.jpg') || url.endsWith('.svg') || url.endsWith('.ico') || url.endsWith('.ttf') || url.endsWith('.woff') || url.endsWith('.map');
      if (!url.endsWith('index.html') && !isFile) {
        event.preventDefault();
        mainWindow.loadFile(path.join(app.getAppPath(), 'dist-react', 'index.html'));
      }
    });
  }

  mainWindow.webContents.openDevTools();
});

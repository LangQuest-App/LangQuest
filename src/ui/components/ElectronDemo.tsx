import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { useToast } from '../hooks/use-toast';

const ElectronDemo = () => {
  const [isElectronAvailable, setIsElectronAvailable] = useState(false);
  const [settings, setSettings] = useState<Record<string, any>>({});
  const { toast } = useToast();

  useEffect(() => {
    // Check if Electron API is available
    if (typeof window !== 'undefined' && window.electronAPI) {
      setIsElectronAvailable(true);
      console.log('✅ Electron API is available!', window.electronAPI);
      
      // Load all settings on component mount
      loadAllSettings();
    } else {
      console.log('❌ Electron API is not available - running in browser mode');
    }
  }, []);

  const loadAllSettings = async () => {
    if (window.electronAPI) {
      try {
        const allSettings = await window.electronAPI.getAllSettings();
        setSettings(allSettings);
        console.log('Loaded settings:', allSettings);
      } catch (error) {
        console.error('Failed to load settings:', error);
      }
    }
  };

  const testNotification = async () => {
    if (window.electronAPI) {
      try {
        await window.electronAPI.showNotification('LangQuest', 'Electron preload script is working! 🎉');
        toast({
          title: "Notification Sent",
          description: "Check your system notifications!"
        });
      } catch (error) {
        console.error('Failed to show notification:', error);
        toast({
          title: "Error",
          description: "Failed to show notification"
        });
      }
    }
  };

  const testSetting = async () => {
    if (window.electronAPI) {
      try {
        const testKey = 'lastTestTime';
        const testValue = new Date().toISOString();
        
        await window.electronAPI.setSetting(testKey, testValue);
        const retrievedValue = await window.electronAPI.getSetting(testKey);
        
        toast({
          title: "Setting Test Successful",
          description: `Stored and retrieved: ${retrievedValue}`
        });
        
        // Reload all settings to show the update
        loadAllSettings();
      } catch (error) {
        console.error('Failed to test setting:', error);
        toast({
          title: "Error",
          description: "Failed to test settings"
        });
      }
    }
  };

  const testFileDialog = async () => {
    if (window.electronAPI) {
      try {
        const result = await window.electronAPI.showSaveDialog({
          title: 'Save Test File',
          defaultPath: 'test-file.txt',
          filters: [
            { name: 'Text Files', extensions: ['txt'] },
            { name: 'All Files', extensions: ['*'] }
          ]
        });
        
        if (result) {
          toast({
            title: "File Dialog Result",
            description: `Selected path: ${result}`
          });
        } else {
          toast({
            title: "File Dialog",
            description: "Dialog was cancelled"
          });
        }
      } catch (error) {
        console.error('Failed to open file dialog:', error);
        toast({
          title: "Error",
          description: "Failed to open file dialog"
        });
      }
    }
  };

  const testTTS = async () => {
    if (window.electronAPI) {
      try {
        await window.electronAPI.playAudio('Hello from LangQuest! The preload script is working perfectly.', 'en-US');
        toast({
          title: "TTS Started",
          description: "Playing text-to-speech audio"
        });
      } catch (error) {
        console.error('Failed to play TTS:', error);
        toast({
          title: "Error",
          description: "Failed to play TTS audio"
        });
      }
    }
  };

  const openExternalLink = async () => {
    if (window.electronAPI) {
      try {
        await window.electronAPI.openExternal('https://github.com/Dev-Dhruba/LangQuest');
        toast({
          title: "External Link",
          description: "Opened GitHub repository in default browser"
        });
      } catch (error) {
        console.error('Failed to open external link:', error);
        toast({
          title: "Error",
          description: "Failed to open external link"
        });
      }
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Electron API Demo</h1>
        <div className="flex items-center gap-2">
          <Badge variant={isElectronAvailable ? "default" : "destructive"}>
            {isElectronAvailable ? "✅ Electron API Available" : "❌ Browser Mode"}
          </Badge>
          {isElectronAvailable && window.electronDev && (
            <Badge variant="outline">🛠️ Dev Tools Available</Badge>
          )}
        </div>
      </div>

      {isElectronAvailable ? (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>System Integration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button onClick={testNotification} className="w-full">
                Test System Notification
              </Button>
              <Button onClick={openExternalLink} variant="outline" className="w-full">
                Open External Link
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>File Operations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button onClick={testFileDialog} className="w-full">
                Test Save Dialog
              </Button>
              <Button onClick={testTTS} variant="outline" className="w-full">
                Test Text-to-Speech
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Settings Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button onClick={testSetting} className="w-full">
                Test Setting Storage
              </Button>
              <div className="text-sm text-muted-foreground">
                <p>Current settings: {Object.keys(settings).length} items</p>
                {Object.keys(settings).length > 0 && (
                  <pre className="mt-2 text-xs bg-muted p-2 rounded overflow-auto max-h-32">
                    {JSON.stringify(settings, null, 2)}
                  </pre>
                )}
              </div>
            </CardContent>
          </Card>

          {window.electronDev && (
            <Card>
              <CardHeader>
                <CardTitle>Development Tools</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={() => window.electronDev?.openDevTools()} 
                  variant="secondary" 
                  className="w-full"
                >
                  Open Dev Tools
                </Button>
                <Button 
                  onClick={() => window.electronDev?.reload()} 
                  variant="outline" 
                  className="w-full"
                >
                  Reload App
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        <Card>
          <CardContent className="p-6">
            <p className="text-center text-muted-foreground">
              This demo requires the Electron desktop app. 
              The web version doesn't have access to system APIs.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ElectronDemo;

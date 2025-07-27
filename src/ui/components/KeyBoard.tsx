import React, { useState, useEffect } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import KeyboardLayouts from "simple-keyboard-layouts";

interface MultilingualKeyboardProps {
    onKeyPress?: (key: string) => void;
    language: string;
}

const MultilingualKeyboard = ({ onKeyPress,language }:MultilingualKeyboardProps) => {
  const [layoutName, setLayoutName] = useState("default");
  const [availableLanguages, setAvailableLanguages] = useState<string[]>([]);
  const [currentLayout, setCurrentLayout] = useState({});
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    // const layoutsInstance = new KeyboardLayouts();
    // const languages = Object.keys(layoutsInstance.layouts);
    
    // console.log("Available languages:", languages);
    
  }, []);

  useEffect(() => {
    if (language) {
      try {
        const layoutsInstance = new KeyboardLayouts();
        const layout = layoutsInstance.get(language);
        
        // console.log(`Layout for ${language}:`, layout);
        setCurrentLayout(layout.layout || layout);
      } catch (error) {
        console.error(`Error loading layout for ${language}:`, error);
      }
    }
  }, [language]);

  const handleKeyPress = (button:any) => {
    // console.log("Button pressed", button);
    
    if (button === "{shift}" || button === "{lock}") {
      handleShift();
    } else if (button === "{enter}") {
      const newValue = inputValue + "\n";
      setInputValue(newValue);
      if (onKeyPress) onKeyPress(button);
    } else if (button === "{bksp}") {
      const newValue = inputValue.slice(0, -1);
      setInputValue(newValue);
      if (onKeyPress) onKeyPress(button);
    } else if (button === "{space}") {
      const newValue = inputValue + " ";
      setInputValue(newValue);
      if (onKeyPress) onKeyPress(button);
    } else if (button === "{tab}") {
      const newValue = inputValue + "\t";
      setInputValue(newValue);
      if (onKeyPress) onKeyPress(button);
    } else {
      const newValue = inputValue + button;
      setInputValue(newValue);
      if (onKeyPress) onKeyPress(button);
    }
  };

  const handleShift = () => {
    const newLayoutName = layoutName === "default" ? "shift" : "default";
    setLayoutName(newLayoutName);
  };

  const onInputChange = (input:any) => {
    setInputValue(input);
  };


  const getLanguageDisplayName = (langCode:string) => {
    // You can create a mapping for better display names
    const displayNames: Record<string, string> = {
      'english': 'English',
      'french': 'Français (French)',
      'german': 'Deutsch (German)',
      'hindi': 'हिन्दी (Hindi)',
      'japanese': '日本語 (Japanese)',
      'korean': '한국어 (Korean)',
      'russian': 'Русский (Russian)',
      'spanish': 'Español (Spanish)',
      'italian': 'Italiano (Italian)',
    };
    
    return displayNames[langCode] || langCode.charAt(0).toUpperCase() + langCode.slice(1);
  };

  return (
    <div className="w-full bg-white border-t border-gray-200 shadow-lg flex flex-col items-center justify-center">
      {Object.keys(currentLayout).length > 0 && (
        <div className="w-full max-w-4xl mx-auto p-4">
          <Keyboard
            layout={currentLayout}
            layoutName={layoutName}
            onKeyPress={handleKeyPress}
            onChange={onInputChange}
            inputName="default"
            theme="hg-theme-default hg-layout-default"
            buttonTheme={[
              {
                class: "hg-red",
                buttons: "{bksp}"
              },
              {
                class: "hg-blue",
                buttons: "{shift} {lock} {enter} {space} {tab}"
              }
            ]}
          />
          <div className="mt-2 text-xs text-gray-500 text-center">
            Current Layout: {getLanguageDisplayName(language)} - {layoutName}
          </div>
        </div>
      )}
      <style>{`
        .hg-theme-default {
          background-color: transparent;
          border-radius: 0.5rem;
          box-sizing: border-box;
          font-family: theme(fontFamily.sans);
          height: auto;
          padding: 0.5rem;
          touch-action: manipulation;
          user-select: none;
          width: 100%;
        }
        .hg-button {
          border-width: 0;
          outline: 0;
          cursor: pointer;
          border-radius: 0.375rem;
          line-height: 1;
          display: inline-block;
          background: #fff;
          border: 1px solid #e5e7eb;
          color: #374151;
          font-size: 1rem;
          height: 2.5rem;
          max-width: 6rem;
          min-width: 1.5rem;
          padding: 0.25rem 0.5rem;
          font-weight: 500;
        }
        .hg-button:hover {
          background: #f3f4f6;
          border-color: #9ca3af;
        }
        .hg-button:active {
          background: #e5e7eb;
          transform: scale(0.98);
        }
        .hg-red {
          background: #ef4444 !important;
          color: white !important;
        }
        .hg-blue {
          background: #3b82f6 !important;
          color: white !important;
        }
      `}</style>
    </div>
  );
};

export default MultilingualKeyboard;
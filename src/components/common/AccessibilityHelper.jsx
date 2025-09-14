import React, { useState, useEffect } from 'react';
import { 
  Type, 
  Volume2, 
  VolumeX, 
  Eye, 
  EyeOff, 
  RotateCcw,
  Settings,
  X
} from 'lucide-react';
import { Button } from '../ui/button';

const AccessibilityHelper = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState({
    fontSize: 'normal',
    highContrast: false,
    screenReader: false,
    largeText: false,
    reducedMotion: false
  });

  useEffect(() => {
    // Apply accessibility settings to document
    const root = document.documentElement;
    
    // Font size
    if (settings.fontSize === 'large') {
      root.style.fontSize = '18px';
    } else if (settings.fontSize === 'extra-large') {
      root.style.fontSize = '20px';
    } else {
      root.style.fontSize = '16px';
    }

    // High contrast
    if (settings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Large text
    if (settings.largeText) {
      root.classList.add('large-text');
    } else {
      root.classList.remove('large-text');
    }

    // Reduced motion
    if (settings.reducedMotion) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }

  }, [settings]);

  const toggleSetting = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const changeFontSize = (size) => {
    setSettings(prev => ({
      ...prev,
      fontSize: size
    }));
  };

  const resetSettings = () => {
    setSettings({
      fontSize: 'normal',
      highContrast: false,
      screenReader: false,
      largeText: false,
      reducedMotion: false
    });
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <>
      {/* Accessibility Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        aria-label="Open accessibility options"
        title="Accessibility Options"
      >
        <Settings className="h-6 w-6" />
      </button>

      {/* Accessibility Panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 z-50 bg-white rounded-lg shadow-xl border border-gray-200 p-6 w-80 max-h-96 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Accessibility Options
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Close accessibility options"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-4">
            {/* Font Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Type className="inline h-4 w-4 mr-1" />
                Text Size
              </label>
              <div className="flex space-x-2">
                {[
                  { value: 'normal', label: 'Normal' },
                  { value: 'large', label: 'Large' },
                  { value: 'extra-large', label: 'Extra Large' }
                ].map((size) => (
                  <button
                    key={size.value}
                    onClick={() => changeFontSize(size.value)}
                    className={`px-3 py-1 text-sm rounded ${
                      settings.fontSize === size.value
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>

            {/* High Contrast */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                <Eye className="inline h-4 w-4 mr-1" />
                High Contrast
              </label>
              <button
                onClick={() => toggleSetting('highContrast')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.highContrast ? 'bg-blue-600' : 'bg-gray-200'
                }`}
                aria-label="Toggle high contrast mode"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.highContrast ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Large Text */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                <Type className="inline h-4 w-4 mr-1" />
                Large Text
              </label>
              <button
                onClick={() => toggleSetting('largeText')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.largeText ? 'bg-blue-600' : 'bg-gray-200'
                }`}
                aria-label="Toggle large text mode"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.largeText ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Reduced Motion */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                <RotateCcw className="inline h-4 w-4 mr-1" />
                Reduced Motion
              </label>
              <button
                onClick={() => toggleSetting('reducedMotion')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.reducedMotion ? 'bg-blue-600' : 'bg-gray-200'
                }`}
                aria-label="Toggle reduced motion"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.reducedMotion ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Screen Reader Helper */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                <Volume2 className="inline h-4 w-4 mr-1" />
                Screen Reader
              </label>
              <button
                onClick={() => {
                  const text = document.querySelector('main')?.textContent || 'No content to read';
                  speakText(text);
                }}
                className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200"
              >
                Read Page
              </button>
            </div>

            {/* Reset Button */}
            <div className="pt-2 border-t border-gray-200">
              <Button
                onClick={resetSettings}
                variant="outline"
                size="sm"
                className="w-full"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset All Settings
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccessibilityHelper;

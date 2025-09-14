import React, { useState, useEffect } from 'react';
import { 
  Type, 
  Volume2, 
  VolumeX, 
  Eye, 
  EyeOff, 
  RotateCcw,
  Settings,
  X,
  Square,
  Globe
} from 'lucide-react';
import { Button } from '../ui/button';

const AccessibilityHelper = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [translatedContent, setTranslatedContent] = useState({});
  const [isTranslating, setIsTranslating] = useState(false);
  const [settings, setSettings] = useState({
    fontSize: 'normal',
    highContrast: false,
    screenReader: false,
    largeText: false,
    reducedMotion: false,
    language: 'en'
  });

  const languages = {
    en: { name: 'English', code: 'en-US' },
    hi: { name: 'हिंदी', code: 'hi-IN' },
    te: { name: 'తెలుగు', code: 'te-IN' },
    kn: { name: 'ಕನ್ನಡ', code: 'kn-IN' },
    ta: { name: 'தமிழ்', code: 'ta-IN' }
  };

  const staticTranslations = {
    // Navigation
    'Home': { hi: 'होम', te: 'హోమ్', kn: 'ಮುಖ್ಯ', ta: 'முகப்பு' },
    'My Recommendations': { hi: 'मेरी सिफारिशें', te: 'నా సిఫార్సులు', kn: 'ನನ್ನ ಶಿಫಾರಸುಗಳು', ta: 'எனது பரிந்துரைகள்' },
    'All Internships': { hi: 'सभी इंटर्नशिप', te: 'అన్ని ఇంటర్న్‌షిప్‌లు', kn: 'ಎಲ್ಲಾ ಇಂಟರ್ನ್‌ಶಿಪ್‌ಗಳು', ta: 'அனைத்து பயிற்சிகள்' },
    'My Profile': { hi: 'मेरी प्रोफ़ाइल', te: 'నా ప్రొఫైల్', kn: 'ನನ್ನ ಪ್ರೊಫೈಲ್', ta: 'எனது சுயவிவரம்' },
    'Login': { hi: 'लॉगिन', te: 'లాగిన్', kn: 'ಲಾಗಿನ್', ta: 'உள்நுழைவு' },
    'Get Started': { hi: 'शुरू करें', te: 'ప్రారంభించండి', kn: 'ಪ್ರಾರಂಭಿಸಿ', ta: 'தொடங்குங்கள்' },
    'Logout': { hi: 'लॉगआउट', te: 'లాగ్అవుట్', kn: 'ಲಾಗ್ಔಟ್', ta: 'வெளியேறு' },
    // Common content
    'Find Your Perfect': { hi: 'अपना सही', te: 'మీ పరిపూర్ణమైన', kn: 'ನಿಮ್ಮ ಪರಿಪೂರ್ಣ', ta: 'உங்கள் சரியான' },
    'Dream Internship': { hi: 'सपनों की इंटर्नशिप', te: 'కలల ఇంటర్న్‌షిప్', kn: 'ಕನಸಿನ ಇಂಟರ್ನ್‌ಶಿಪ್', ta: 'கனவு பயிற்சி' },
    'Get Started Free': { hi: 'मुफ्त शुरू करें', te: 'ఉచితంగా ప్రారంభించండి', kn: 'ಉಚಿತವಾಗಿ ಪ್ರಾರಂಭಿಸಿ', ta: 'இலவசமாக தொடங்குங்கள்' },
    'Explore Internships': { hi: 'इंटर्नशिप देखें', te: 'ఇంటర్న్‌షిప్‌లను అన్వేషించండి', kn: 'ಇಂಟರ್ನ್‌ಶಿಪ್‌ಗಳನ್ನು ಅನ್ವೇಷಿಸಿ', ta: 'பயிற்சிகளை ஆராயுங்கள்' },
    'Apply Now': { hi: 'अभी आवेदन करें', te: 'ఇప్పుడే దరఖాస్తు చేయండి', kn: 'ಈಗ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ', ta: 'இப்போது விண்ணப்பிக்கவும்' },
    'View Details': { hi: 'विवरण देखें', te: 'వివరాలు చూడండి', kn: 'ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಿ', ta: 'விவரங்களைப் பார்க்கவும்' }
  };

  const translations = {
    en: {
      title: 'Accessibility Options',
      textSize: 'Text Size',
      normal: 'Normal',
      large: 'Large',
      extraLarge: 'Extra Large',
      highContrast: 'High Contrast',
      largeText: 'Large Text',
      reducedMotion: 'Reduced Motion',
      screenReader: 'Screen Reader',
      language: 'Language',
      readPage: 'Read Page',
      stopReading: 'Stop Reading',
      resetSettings: 'Reset All Settings'
    },
    hi: {
      title: 'पहुंच विकल्प',
      textSize: 'टेक्स्ट आकार',
      normal: 'सामान्य',
      large: 'बड़ा',
      extraLarge: 'अतिरिक्त बड़ा',
      highContrast: 'उच्च कंट्रास्ट',
      largeText: 'बड़ा टेक्स्ट',
      reducedMotion: 'कम गति',
      screenReader: 'स्क्रीन रीडर',
      language: 'भाषा',
      readPage: 'पेज पढ़ें',
      stopReading: 'पढ़ना बंद करें',
      resetSettings: 'सभी सेटिंग्स रीसेट करें'
    },
    te: {
      title: 'ప్రాప్యత ఎంపికలు',
      textSize: 'టెక్స్ట్ పరిమాణం',
      normal: 'సాధారణ',
      large: 'పెద్దది',
      extraLarge: 'అధిక పెద్దది',
      highContrast: 'అధిక కాంట్రాస్ట్',
      largeText: 'పెద్ద టెక్స్ట్',
      reducedMotion: 'తగ్గిన చలనం',
      screenReader: 'స్క్రీన్ రీడర్',
      language: 'భాష',
      readPage: 'పేజీ చదవండి',
      stopReading: 'చదవడం ఆపండి',
      resetSettings: 'అన్ని సెట్టింగ్‌లను రీసెట్ చేయండి'
    },
    kn: {
      title: 'ಪ್ರವೇಶಿಸುವಿಕೆ ಆಯ್ಕೆಗಳು',
      textSize: 'ಪಠ್ಯ ಗಾತ್ರ',
      normal: 'ಸಾಮಾನ್ಯ',
      large: 'ದೊಡ್ಡದು',
      extraLarge: 'ಅತಿ ದೊಡ್ಡದು',
      highContrast: 'ಹೆಚ್ಚಿನ ವ್ಯತ್ಯಾಸ',
      largeText: 'ದೊಡ್ಡ ಪಠ್ಯ',
      reducedMotion: 'ಕಡಿಮೆ ಚಲನೆ',
      screenReader: 'ಪರದೆ ಓದುಗ',
      language: 'ಭಾಷೆ',
      readPage: 'ಪುಟ ಓದಿ',
      stopReading: 'ಓದುವುದನ್ನು ನಿಲ್ಲಿಸಿ',
      resetSettings: 'ಎಲ್ಲಾ ಸೆಟ್ಟಿಂಗ್‌ಗಳನ್ನು ಮರುಹೊಂದಿಸಿ'
    },
    ta: {
      title: 'அணுகல் விருப்பங்கள்',
      textSize: 'உரை அளவு',
      normal: 'சாதாரண',
      large: 'பெரிய',
      extraLarge: 'மிகப் பெரிய',
      highContrast: 'அதிக மாறுபாடு',
      largeText: 'பெரிய உரை',
      reducedMotion: 'குறைந்த இயக்கம்',
      screenReader: 'திரை வாசகர்',
      language: 'மொழி',
      readPage: 'பக்கத்தைப் படிக்கவும்',
      stopReading: 'படிப்பதை நிறுத்தவும்',
      resetSettings: 'அனைத்து அமைப்புகளையும் மீட்டமைக்கவும்'
    }
  };

  const t = translations[settings.language];

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

  useEffect(() => {
    // Apply translations to page content
    if (Object.keys(translatedContent).length > 0) {
      const allElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, button, a, span');
      
      allElements.forEach(element => {
        if (element.closest('[data-no-translate]')) return;
        const originalText = element.textContent.trim();
        if (translatedContent[originalText]) {
          element.textContent = translatedContent[originalText];
        }
      });
    }
  }, [translatedContent]);

  useEffect(() => {
    // Auto-translate when page content changes
    if (settings.language !== 'en') {
      const observer = new MutationObserver(() => {
        setTimeout(() => translatePageContent(settings.language), 300);
      });
      
      observer.observe(document.body, { childList: true, subtree: true });
      
      return () => observer.disconnect();
    }
  }, [settings.language]);

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

  const translateText = async (text, targetLang) => {
    if (targetLang === 'en') return text;
    
    try {
      const response = await fetch(`https://lingva.ml/api/v1/auto/${targetLang}/${encodeURIComponent(text)}`);
      const data = await response.json();
      return data.translation || text;
    } catch (error) {
      console.warn('Translation failed:', error);
      return text;
    }
  };

  const translatePageContent = async (targetLang) => {
    if (targetLang === 'en') {
      setTranslatedContent({});
      return;
    }

    setIsTranslating(true);
    const allElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, button, a, span');
    const translations = {};
    const uniqueTexts = new Set();

    // Collect unique texts first
    allElements.forEach(element => {
      if (element.closest('[data-no-translate]')) return;
      const text = element.textContent.trim();
      if (text && text.length > 2 && text.length < 100) {
        uniqueTexts.add(text);
      }
    });

    // Translate unique texts (limit to 15 for demo)
    const textsArray = Array.from(uniqueTexts).slice(0, 15);
    for (const text of textsArray) {
      const translated = await translateText(text, targetLang);
      if (translated !== text) {
        translations[text] = translated;
      }
    }

    setTranslatedContent(translations);
    setIsTranslating(false);
  };

  const changeLanguage = async (lang) => {
    setSettings(prev => ({
      ...prev,
      language: lang
    }));
    
    await translatePageContent(lang);
  };

  const resetSettings = () => {
    speechSynthesis.cancel();
    setIsReading(false);
    setSettings({
      fontSize: 'normal',
      highContrast: false,
      screenReader: false,
      largeText: false,
      reducedMotion: false,
      language: 'en'
    });
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.lang = languages[settings.language].code;
      
      utterance.onstart = () => setIsReading(true);
      utterance.onend = () => setIsReading(false);
      utterance.onerror = () => setIsReading(false);
      
      speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    speechSynthesis.cancel();
    setIsReading(false);
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
        <div className="fixed bottom-20 right-4 z-50 bg-white rounded-lg shadow-xl border border-gray-200 p-6 w-80 max-h-96 overflow-y-auto" data-no-translate>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {t.title}
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
            {/* Language Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Globe className="inline h-4 w-4 mr-1" />
                {t.language}
                {isTranslating && (
                  <span className="ml-2 text-xs text-blue-600">
                    Translating...
                  </span>
                )}
              </label>
              <select
                value={settings.language}
                onChange={(e) => changeLanguage(e.target.value)}
                disabled={isTranslating}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  isTranslating ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {Object.entries(languages).map(([code, lang]) => (
                  <option key={code} value={code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Font Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Type className="inline h-4 w-4 mr-1" />
                {t.textSize}
              </label>
              <div className="flex space-x-2">
                {[
                  { value: 'normal', label: t.normal },
                  { value: 'large', label: t.large },
                  { value: 'extra-large', label: t.extraLarge }
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
                {t.highContrast}
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
                {t.largeText}
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
                {t.reducedMotion}
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Volume2 className="inline h-4 w-4 mr-1" />
                {t.screenReader}
              </label>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    const text = document.querySelector('main')?.textContent || 'No content to read';
                    speakText(text);
                  }}
                  disabled={isReading}
                  className={`flex-1 px-3 py-2 text-sm rounded flex items-center justify-center ${
                    isReading 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  <Volume2 className="h-4 w-4 mr-1" />
                  {t.readPage}
                </button>
                <button
                  onClick={stopSpeaking}
                  disabled={!isReading}
                  className={`flex-1 px-3 py-2 text-sm rounded flex items-center justify-center ${
                    !isReading 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-red-100 text-red-700 hover:bg-red-200'
                  }`}
                >
                  <Square className="h-4 w-4 mr-1" />
                  {t.stopReading}
                </button>
              </div>
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
                {t.resetSettings}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccessibilityHelper;





import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from '../contexts/I18nContext';
import { WeatherWidget } from './WeatherWidget';

const logoSvg = `
<svg width="64" height="64" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <!-- Abstract Africa Outline (Slate Gray) -->
    <path d="M52,12 C42,15 35,30 38,55 C32,65 35,80 48,90 C55,85 60,85 65,90 C80,75 75,45 62,20 C59,15 55,13 52,12Z" fill="#708090" />
    
    <!-- Scanner Arc (High-visibility Orange) -->
    <path d="M15 65 A 60 60, 0, 0, 1, 85 65" fill="none" stroke="#FF4500" stroke-width="4" stroke-linecap="round" />

    <!-- Drone Icon (High-visibility Orange) -->
    <g transform="translate(15, 65) rotate(-45)">
        <path fill="#FF4500" d="M-7,-1 L7,-1 L7,1 L-7,1Z" />
        <path fill="#FF4500" d="M-1,-7 L1,-7 L1,7 L-1,7Z" />
        <circle cx="0" cy="0" r="3" fill="#FFFFFF"/>
        <path stroke="#FF4500" stroke-width="1.5" stroke-linecap="round" d="M-9,-9 L-6,-6 M9,-9 L6,-6 M-9,9 L-6,6 M9,9 L6,6" />
    </g>
</svg>
`;

const logoSrc = `data:image/svg+xml;base64,${btoa(logoSvg)}`;

const LanguageSelector: React.FC = () => {
    const { language, setLanguage, t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const languages = [
        { code: 'en', name: t('settings.language.en') },
        { code: 'fr', name: t('settings.language.fr') },
        { code: 'zh', name: t('settings.language.zh') },
        { code: 'ru', name: t('settings.language.ru') },
    ];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLanguageChange = (langCode: string) => {
        setLanguage(langCode);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center h-10 w-12 bg-gray-700 rounded-md hover:bg-gray-600 transition font-bold text-sm"
                aria-haspopup="true"
                aria-expanded={isOpen}
                aria-label={t('header.language_selector_label')}
            >
                {language.toUpperCase()}
            </button>
            {isOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-gray-800 border border-gray-600 rounded-md shadow-lg z-50">
                    <ul className="py-1">
                        {languages.map(lang => (
                             <li key={lang.code}>
                                <button
                                    onClick={() => handleLanguageChange(lang.code)}
                                    className={`w-full text-left px-4 py-2 text-sm ${language === lang.code ? 'bg-cyan-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                                >
                                    {lang.name} ({lang.code.toUpperCase()})
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export const Header: React.FC = () => {
    const { t } = useTranslation();

    return (
        <header className="relative py-4 mb-8">
            <WeatherWidget />
            <div className="absolute top-4 right-4">
                <LanguageSelector />
            </div>
            <div className="flex flex-col items-center justify-center text-center">
                 <img src={logoSrc} alt="AFRi-iQ Defense Scope AI Geo-Scanner Logo" className="h-16 w-auto mb-2" />
                <h1 className="text-4xl font-extrabold tracking-wider text-blue-500" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>AFRi-iQ Defense Scope AI℠</h1>
                <p className="text-base font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 tracking-widest mt-2 uppercase">{t('header.tagline')}</p>
                 <a href="mailto:ops-control@afri-iq.defense.ai" className="mt-3 flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-400 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span>ops-control@afri-iq.defense.ai</span>
                </a>
            </div>
        </header>
    );
};
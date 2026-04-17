import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useEffect, useState } from 'react';
import { Language, LanguageContextType } from '../types';
import { translations } from '../utils/translations';

const LANGUAGE_STORAGE_KEY = 'app_language';

export const LanguageContext = createContext<LanguageContextType>({
    language: 'en',
    setLanguage: async () => {},
    t: (key: string) => key,
});

interface LanguageProviderProps {
    children: React.ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
    const [language, setLanguageState] = useState<Language>('en');
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const loadLanguage = async () => {
            try {
                const storedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
                if (savedLanguage === 'en' || savedLanguage === 'fi') {
                    setLanguageState(storedLanguage);
                }
            } catch (error) {
                console.error('Failed to load language', error);
            } finally {
                setIsInitialized(true);
            }
        };
        loadLanguagePreferences();
    }, []);

    const setLanguage = useCallback(async (newLanguage: Language) => {
        setLanguageState(newLanguage);
        try {
            await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, newLanguage);
        } catch (error) {
            console.error('Failed to save language', error);
        }
    }, []);
    const t = useCallback((key: string): string => {
        return translations[language][key] || key;
    }, [language]);

    if (!isInitialized) {
        return null; // or a loading spinner
    }

    const value: LanguageContextType = {
        language,
        setLanguage,
        t,
    };
    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );

}
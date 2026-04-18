import React, { createContext, useCallback, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContextType } from '../types';

const THEME_STORAGE_KEY = 'app_theme';

export const ThemeContext = createContext<ThemeContextType>({
    isDarkMode: false,
    toggleTheme: () => {},
});

interface ThemeProviderProps {
    children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
    const systemColorScheme = useColorScheme();
    const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const loadThemePreference = async () => {
            try {
                const storedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
                if (storedTheme !== null) {
                    setIsDarkMode(storedTheme === 'dark');
                } else {
                    setIsDarkMode(systemColorScheme === 'dark');
                }
            } catch (error) {
                console.error('Failed to load theme', error);
            } finally {
                setIsInitialized(true);
            }
        };
        loadThemePreference();
    }, [systemColorScheme]);

    const toggleTheme = useCallback(() => {
        setIsDarkMode((prev) => {
            const newTheme = !prev;
            AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme ? 'dark' : 'light').catch(
                (error) => console.error('Failed to save theme', error)
            );
            return newTheme;
        });
    }, []);

    if (!isInitialized) {
        return null;
    }

    const value: ThemeContextType = {
        isDarkMode,
        toggleTheme,
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}
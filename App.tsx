import React from 'react';
import { PaperProvider, MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { CitiesProvider } from './src/context/CityContext';
import { LanguageProvider } from './src/context/LanguageContext';
import { ThemeContext, ThemeProvider } from './src/context/ThemeContext';
import AppNavigator from './src/navigation/AppNavigator';

function AppContent() {
    const { isDarkMode } = React.useContext(ThemeContext);
    const theme = isDarkMode ? MD3DarkTheme : MD3LightTheme;

    return (
        <PaperProvider theme={theme}>
            <AppNavigator />
        </PaperProvider>
    );
}

export default function App() {
    return (
        <ThemeProvider>
            <LanguageProvider>
                <CitiesProvider>
                    <AppContent />
                </CitiesProvider>
            </LanguageProvider>
        </ThemeProvider>
    );
}
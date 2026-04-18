import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { List } from 'react-native-paper';
import { Language } from '../src/types';
import { LanguageContext } from '../src/context/LanguageContext';

export default function LanguageSelector() {
    const { language, setLanguage, t } = useContext(LanguageContext);

    return (
        <View style={styles.container}>
            <List.Item
                title="English"
                description={language === 'en' ? '✓' : ''}
                onPress={() => setLanguage('en')}
                style={language === 'en' ? styles.activeLanguage : undefined}
            />
            <List.Item
                title="Suomi"
                description={language === 'fi' ? '✓' : ''}
                onPress={() => setLanguage('fi')}
                style={language === 'fi' ? styles.activeLanguage : undefined}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 32,
    },
    activeLanguage: {
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
    },
});
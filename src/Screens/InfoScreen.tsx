import React, { useContext } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Card, Divider, List, Switch, Text } from 'react-native-paper';
import { LanguageContext } from '../context/LanguageContext';
import { ThemeContext } from '../context/ThemeContext';
import { Language } from '../types';

export default function InfoScreen() {
    const { language, setLanguage, t } = useContext(LanguageContext);
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);

    const handleLanguageChange = (lang: Language) => {
        setLanguage(lang);
    };

    return (
        <ScrollView style={styles.container}>
            <Card style={styles.card}>
                <Card.Content>
                    <View style={styles.header}>
                        <Avatar.Icon size={64} icon="information" />
                        <Text variant="headlineMedium" style={styles.title}>
                            City Tracker
                        </Text>
                        <Text variant="bodyLarge" style={styles.version}>
                            v1.0.0
                        </Text>
                    </View>
                </Card.Content>
            </Card>

            <Card style={styles.card}>
                <Card.Title title={t('settings')} />
                <Card.Content>
                    <List.Item
                        title={t('darkMode')}
                        left={(props) => <List.Icon {...props} icon="theme-light-dark" />}
                        right={() => (
                            <Switch
                                value={isDarkMode}
                                onValueChange={toggleTheme}
                            />
                        )}
                    />
                    <Divider />
                    <List.Item
                        title={t('language')}
                        description={language === 'en' ? 'English' : 'Suomi'}
                        left={(props) => <List.Icon {...props} icon="translate" />}
                    />
                    <View style={styles.languageButtons}>
                        <List.Item
                            title="English"
                            onPress={() => handleLanguageChange('en')}
                            style={[
                                styles.languageButton,
                                language === 'en' && styles.activeLanguageButton,
                            ]}
                            right={(props) => language === 'en' ? <List.Icon {...props} icon="check" /> : null}
                        />
                        <List.Item
                            title="Suomi"
                            onPress={() => handleLanguageChange('fi')}
                            style={[
                                styles.languageButton,
                                language === 'fi' && styles.activeLanguageButton,
                            ]}
                            right={(props) => language === 'fi' ? <List.Icon {...props} icon="check" /> : null}
                        />
                    </View>
                </Card.Content>
            </Card>

            <Card style={styles.card}>
                <Card.Title title={t('about')} />
                <Card.Content>
                    <List.Item
                        title={t('developer')}
                        description="Your Name"
                        left={(props) => <List.Icon {...props} icon="account" />}
                    />
                    <Divider />
                    <List.Item
                        title={t('version')}
                        description="1.0.0"
                        left={(props) => <List.Icon {...props} icon="information" />}
                    />
                </Card.Content>
            </Card>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
    },
    card: {
        margin: 8,
    },
    header: {
        alignItems: 'center',
        padding: 16,
    },
    title: {
        marginBottom: 4,
    },
    version: {
        opacity: 0.6,
    },
    languageButtons: {
        marginLeft: 32,
    },
    languageButton: {
        marginVertical: 4,
    },
    activeLanguageButton: {
        backgroundColor: '#54156167',
    },
});
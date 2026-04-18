import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

interface EmptyStateProps {
    title: string;
    subtitle?: string;
}

export default function EmptyState({ title, subtitle }: EmptyStateProps) {
    return (
        <View style={styles.container}>
            <Text variant="titleLarge">{title}</Text>
            {subtitle && (
                <Text variant="bodyMedium" style={styles.subtitle}>
                    {subtitle}
                </Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    subtitle: {
        marginTop: 10,
        opacity: 0.7,
    },
});
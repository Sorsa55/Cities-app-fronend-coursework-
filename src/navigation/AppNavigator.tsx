import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React, { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { ThemeContext } from '../context/ThemeContext';
import HomeStackNavigator from './HomeStackNavigator';
import InfoScreen from '../Screens/InfoScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
    const { t } = useContext(LanguageContext);
    const { isDarkMode } = useContext(ThemeContext);

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={HomeStackNavigator}
                    options={{
                        tabBarLabel: t('homeTitle'),
                        tabBarIcon: ({ color, size }) => null,
                    }}
                />
                <Tab.Screen
                    name="Info"
                    component={InfoScreen}
                    options={{
                        tabBarLabel: t('info'),
                        tabBarIcon: ({ color, size }) => null,
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
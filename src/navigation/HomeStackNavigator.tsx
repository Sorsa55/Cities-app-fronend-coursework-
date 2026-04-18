import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AddCityScreen from '../Screens/AddCityScreen';
import AddLocationScreen from '../Screens/AddLocationScreen';
import CityDetailsScreen from '../Screens/CityDetailsScreen';
import EditCityScreen from '../Screens/EditCityScreen';
import EditLocationScreen from '../Screens/EditLocationScreen';
import HomeScreen from '../Screens/HomeScreen';
import { HomeStackParamList } from './types';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="AddCity" component={AddCityScreen} />
            <Stack.Screen name="EditCity" component={EditCityScreen} />
            <Stack.Screen name="CityDetails" component={CityDetailsScreen} />
            <Stack.Screen name="AddLocation" component={AddLocationScreen} />
            <Stack.Screen name="EditLocation" component={EditLocationScreen} />
        </Stack.Navigator>
    );
}
import AsyncStorage from '@react-native-async-storage/async-storage';
import { City, Location } from '../types';

const STORAGE_KEYS = {
    CITIES: '@cities',
    LOCATIONS: '@locations',
};

export const storage = {
    saveCities: async (cities: City[]): Promise<void> => {
        try {
            await AsyncStorage.setItem(STORAGE_KEYS.CITIES, JSON.stringify(cities));
        } catch (error) {
            console.error('Failed to save cities', error);
            throw error;
        }
    },

    loadCities: async (): Promise<City[]> => {
        try {
            const data = await AsyncStorage.getItem(STORAGE_KEYS.CITIES);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Failed to load cities', error);
            return [];
        }
    },

    saveLocations: async (locations: Location[]): Promise<void> => {
        try {
            await AsyncStorage.setItem(STORAGE_KEYS.LOCATIONS, JSON.stringify(locations));
        } catch (error) {
            console.error('Failed to save locations', error);
            throw error;
        }
    },

    loadLocations: async (): Promise<Location[]> => {
        try {
            const data = await AsyncStorage.getItem(STORAGE_KEYS.LOCATIONS);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Failed to load locations', error);
            return [];
        }
    },
};
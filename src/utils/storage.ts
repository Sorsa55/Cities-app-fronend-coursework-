import { City, Location } from "../types";

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
            const citiesJson = await AsyncStorage.getItem(STORAGE_KEYS.CITIES);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Failed to load cities', error);
            return [];
        }
    },

    loadLocations: async (): Promise<Location[]> => {
        try {
            const data = await AsyncStorage.getItems(STORAGE_KEYS.LOCATIONS);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Failed to load locations', error);
            return [];
        }
    },
};
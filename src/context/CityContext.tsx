import React, { createContext, useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CitiesContextType, City, Location } from '../types';
import { storage } from '../utils/storage';

export const CitiesContext = createContext<CitiesContextType>({
    cities: [],
    locations: [],
    addCity: async () => {},
    updateCity: async () => {},
    deleteCity: () => {},
    addLocation: async () => {},
    updateLocation: async () => {},
    deleteLocation: () => {},
    getCityLocations: () => [],
    isLoading: true,
});

interface CitiesProviderProps {
    children: React.ReactNode;
}

export function CitiesProvider({ children }: CitiesProviderProps) {
    const [cities, setCities] = useState<City[]>([]);
    const [locations, setLocations] = useState<Location[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const savedCities = await storage.loadCities();
                const savedLocations = await storage.loadLocations();
                setCities(savedCities);
                setLocations(savedLocations);
            } catch (error) {
                console.error('Failed to load data', error);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);

    useEffect(() => {
        if (!isLoading) {
            storage.saveCities(cities);
        }
    }, [cities, isLoading]);

    const addCity = useCallback(async (name: string, country: string) => {
        const newCity: City = {
            id: uuidv4(),
            name: name.trim(), 
            country: country.trim(),
            createdAt: Date.now(),
        };
        setCities((prevCities) => [...prevCities, newCity]);
    }, []);

    const updateCity = useCallback(async (id: string, name: string, country: string) => {
        setCities((prevCities) =>
            prevCities.map((city) =>
                city.id === id
                    ? { ...city, name: name.trim(), country: country.trim() }
                    : city
            )
        );
    }, []);

    const deleteCity = useCallback((id: string) => {
        setCities((prevCities) => prevCities.filter((city) => city.id !== id));
        
        setLocations(prevLocations => prevLocations.filter(location => location.cityId !== id));
    }, []);

    const addLocation = useCallback(async (cityId: string, name: string, description: string) => {
        const newLocation: Location = {
            id: uuidv4(),
            cityId,
            name: name.trim(),
            description: description.trim(),
            createdAt: Date.now(),
        };
        setLocations((prevLocations) => [...prevLocations, newLocation]);
    }, []);

    const updateLocation = useCallback(async (id: string, name: string, description: string) => {
        setLocations((prevLocations) =>
            prevLocations.map((location) =>
                location.id === id
                    ? { ...location, name: name.trim(), description: description.trim() }
                    : location
            )
        );
    }, []);

    const deleteLocation = useCallback((id: string) => {
        setLocations((prevLocations) => prevLocations.filter((location) => location.id !== id));
    }, []);

    const getCityLocations = useCallback((cityId: string) => {
        return locations.filter(location => location.cityId === cityId);
    }, [locations]);

    const value: CitiesContextType = {
        cities,
        locations,
        addCity,
        updateCity,
        deleteCity,
        addLocation,
        updateLocation,
        deleteLocation,
        getCityLocations,
        isLoading,
    };

    return (
        <CitiesContext.Provider value={value}>
            {children}
        </CitiesContext.Provider>
     );
    }
export interface City {
    id: string;
    name: string;
    country: string;
    createdAt: number;
}

export interface Location {
    id: string;
    cityId: string;
    name: string;
    description: string;
    createdAt: number;
}

export interface CitiesContextType {
    cities: City[];
    locations: Location[];
    addCity: (name: string, country: string) => Promise<void>;
    updateCity: (id: string, name: string, country: string) => Promise<void>;
    deleteCity: (id: string) => void;
    addLocation: (cityId: string, name: string, description: string) => Promise<void>;
    updateLocation: (id: string, name: string, description: string) => Promise<void>;
    deleteLocation: (id: string) => void;
    getCityLocations: (cityId: string) => Location[];
    isLoading: boolean;
}

export type Language = 'en' | 'fi' ;

export interface LanguageContextType {
    language: Language;
    setLanguage: (language: Language) => Promise<void>;
    t: (key: string) => string;
}

export interface ThemeContextType {
    isDarkMode: boolean;
    toggleTheme: () => void;
}
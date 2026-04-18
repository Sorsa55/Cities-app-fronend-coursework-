import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type HomeStackParamList = {
    Home: undefined;
    AddCity: undefined;
    EditCity: { cityId: string };
    CityDetails: { cityId: string; cityName: string };
    AddLocation: { cityId: string; cityName: string };
    EditLocation: { cityId: string; cityName: string; locationId: string };
};

export type RootTabParamList = {
    Home: undefined;
    Info: undefined;
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'Home'>;
export type AddCityScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'AddCity'>;
export type EditCityScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'EditCity'>;
export type CityDetailsScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'CityDetails'>;
export type AddLocationScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'AddLocation'>;
export type EditLocationScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'EditLocation'>;

export type InfoScreenNavigationProp = BottomTabNavigationProp<RootTabParamList, 'Info'>;
import React, { useContext, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { FAB, IconButton, List, Menu, Divider, Text } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { CitiesContext } from '../context/CityContext';
import { LanguageContext } from '../context/LanguageContext';
import { City } from '../types';
import { HomeStackParamList } from '../navigation/types';

type HomeScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'Home'>;

export default function HomeScreen() {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const { cities, locations, deleteCity } = useContext(CitiesContext);
    const { t } = useContext(LanguageContext);
    const [menuVisible, setMenuVisible] = useState<string | null>(null);

    const getLocationCount = (cityId: string) => {
        return locations.filter((location) => location.cityId === cityId).length;
    };

    const handleEditCity = (city: City) => {
        setMenuVisible(null);
        navigation.navigate('EditCity', { cityId: city.id });
    };

    const handleDeleteCity = (cityId: string) => {
        setMenuVisible(null);
        deleteCity(cityId);
    };

    const renderCityItem = ({ item }: { item: City }) => (
        <View>
            <List.Item
                title={item.name}
                description={`${item.country} · ${getLocationCount(item.id)} ${t('locations')}`}
                onPress={() => navigation.navigate('CityDetails', { cityId: item.id, cityName: item.name })}
                right={() => (
                    <Menu
                        visible={menuVisible === item.id}
                        onDismiss={() => setMenuVisible(null)}
                        anchor={
                            <IconButton
                                icon="dots-vertical"
                                onPress={() => setMenuVisible(item.id)}
                            />
                        }
                    >
                        <Menu.Item
                            title={t('edit')}
                            onPress={() => handleEditCity(item)}
                            leadingIcon="pencil"
                        />
                        <Menu.Item
                            title={t('delete')}
                            onPress={() => handleDeleteCity(item.id)}
                            leadingIcon="trash"
                            titleStyle={{ color: 'red' }}
                        />
                    </Menu>
                )}
            />
            <Divider />
        </View>
    );

    return (
        <View style={styles.container}>
            {cities.length === 0 ? (
                <View style={styles.emptyState}>
                    <Text variant="titleLarge">{t('noCities')}</Text>
                    <Text variant="bodyMedium" style={styles.emptySubtitle}>
                        {t('tapToAdd')}
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={[...cities].sort((a, b) => a.name.localeCompare(b.name))}
                    keyExtractor={(item) => item.id}
                    renderItem={renderCityItem}
                />
            )}
            <FAB
                style={styles.fab}
                icon="plus"
                onPress={() => navigation.navigate('AddCity')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptySubtitle: {
        marginTop: 10,
        opacity: 0.7,
    },
});
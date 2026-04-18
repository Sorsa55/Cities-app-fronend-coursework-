import React, { useContext, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Appbar, Divider, FAB, IconButton, List, Menu, Text } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { CitiesContext } from '../context/CityContext';
import { LanguageContext } from '../context/LanguageContext';
import { Location } from '../types';
import { HomeStackParamList } from '../navigation/types';

type CityDetailsRouteProp = RouteProp<HomeStackParamList, 'CityDetails'>;
type CityDetailsNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'CityDetails'>;

export default function CityDetailsScreen() {
    const navigation = useNavigation<CityDetailsNavigationProp>();
    const route = useRoute<CityDetailsRouteProp>();
    const { cities, locations, deleteLocation } = useContext(CitiesContext);
    const { t } = useContext(LanguageContext);
    const [menuVisible, setMenuVisible] = useState<string | null>(null);

    const { cityId, cityName } = route.params;
    const city = cities.find((c) => c.id === cityId);
    const cityLocations = locations.filter((loc) => loc.cityId === cityId);

    const handleEditLocation = (location: Location) => {
        setMenuVisible(null);
        navigation.navigate('EditLocation', { cityId, cityName, locationId: location.id });
    };

    const handleDeleteLocation = (locationId: string) => {
        setMenuVisible(null);
        deleteLocation(locationId);
    };

    const renderLocationItem = ({ item }: { item: Location }) => (
        <View>
            <List.Item
                title={item.name}
                description={item.description}
                descriptionNumberOfLines={2}
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
                            onPress={() => handleEditLocation(item)}
                            title={t('edit')}
                            leadingIcon="pencil"
                        />
                        <Menu.Item
                            onPress={() => handleDeleteLocation(item.id)}
                            title={t('delete')}
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
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title={cityName} subtitle={city?.country} />
            </Appbar.Header>

            {cityLocations.length === 0 ? (
                <View style={styles.emptyState}>
                    <Text variant="titleLarge">{t('noLocations')}</Text>
                    <Text variant="bodyMedium" style={styles.emptySubtitle}>
                        {t('tapToAdd')}
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={[...cityLocations].sort((a, b) => a.name.localeCompare(b.name))}
                    keyExtractor={(item) => item.id}
                    renderItem={renderLocationItem}
                />
            )}
            <FAB
                icon="plus"
                style={styles.fab}
                onPress={() => navigation.navigate('AddLocation', { cityId, cityName })}
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
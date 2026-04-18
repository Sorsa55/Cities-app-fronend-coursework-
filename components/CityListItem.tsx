import React from 'react';
import { View, StyleSheet } from 'react-native';
import { List, IconButton, Menu } from 'react-native-paper';
import { City } from '../src/types';

interface CityListItemProps {
    city: City;
    locationCount: number;
    onPress: (city: City) => void;
    onEdit: (city: City) => void;
    onDelete: (cityId: string) => void;
    editLabel: string;
    deleteLabel: string;
}

export default function CityListItem({ city, locationCount, onPress, onEdit, onDelete, editLabel, deleteLabel }: CityListItemProps) {
    const [menuVisible, setMenuVisible] = React.useState(false);

    return (
        <View>
            <List.Item
                title={city.name}
                description={`${city.country} · ${locationCount}`}
                onPress={() => onPress(city)}
                right={() => (
                    <Menu
                        visible={menuVisible}
                        onDismiss={() => setMenuVisible(false)}
                        anchor={
                            <IconButton
                                icon="dots-vertical"
                                onPress={() => setMenuVisible(true)}
                            />
                        }
                    >
                        <Menu.Item
                            title={editLabel}
                            onPress={() => {
                                setMenuVisible(false);
                                onEdit(city);
                            }}
                            leadingIcon="pencil"
                        />
                        <Menu.Item
                            title={deleteLabel}
                            onPress={() => {
                                setMenuVisible(false);
                                onDelete(city.id);
                            }}
                            leadingIcon="trash"
                            titleStyle={{ color: 'red' }}
                        />
                    </Menu>
                )}
            />
        </View>
    );
}
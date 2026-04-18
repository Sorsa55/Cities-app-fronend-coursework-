import React from 'react';
import { View, StyleSheet } from 'react-native';
import { List, IconButton, Menu } from 'react-native-paper';
import { Location } from '../src/types';

interface LocationListItemProps {
    location: Location;
    onEdit: (location: Location) => void;
    onDelete: (locationId: string) => void;
    editLabel: string;
    deleteLabel: string;
}

export default function LocationListItem({ location, onEdit, onDelete, editLabel, deleteLabel }: LocationListItemProps) {
    const [menuVisible, setMenuVisible] = React.useState(false);

    return (
        <View>
            <List.Item
                title={location.name}
                description={location.description}
                descriptionNumberOfLines={2}
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
                                onEdit(location);
                            }}
                            leadingIcon="pencil"
                        />
                        <Menu.Item
                            title={deleteLabel}
                            onPress={() => {
                                setMenuVisible(false);
                                onDelete(location.id);
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
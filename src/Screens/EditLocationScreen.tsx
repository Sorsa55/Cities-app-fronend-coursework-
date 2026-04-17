import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Appbar, Button, HelperText, TextInput } from 'react-native-paper';

type EditLocationScreenProps = RouteProp<HomeStackParamList, 'EditLocation'>;

export default function EditLocationScreen() {
    const navigation = useNavigation();
    const route = useRoute<EditLocationScreenProps>();
    const { locations, updateLocation } = useContext(CitiesContext);
    const { t } = useContext(LanguageContext);

    const { locationId, cityName } = route.params;
    const location = locations.find(l => l.id === locationId);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (location) {
            setName(location.name);
            setDescription(location.description);
        }
    }, [location]);

    const handleSave = async () => {
        const validationError = validateLocation(name, description);
        if (validationError) {
            setError(validationError);
            return;
        }

        if (location) {
            await updateLocation(location.id, name, description);
            navigation.goBack();
        }
    };

    if (!location) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title={t('edit_location')} subtitle={cityName} />
            </Appbar.Header>
        
        <View style={styles.form}>
            <TextInput
                label={t('location_name')}
                value={name}
                onChangeText={(text) => {
                    setName(text);
                    setError(null);
                }}  
                mode="outlined"
                style={styles.input}
            />
            <TextInput
                label={t('description')}
                value={description}
                onChangeText={(text) => {
                    setDescription(text);
                    setError(null);
                }}
                mode="outlined"
                multiline
                numberOfLines={4}
                style={styles.input}
            />
            {error && (
                <HelperText type="error" visible={true}>
                    {error}
                </HelperText>
            )}
            <Button
                mode="contained"
                onPress={handleSave}
                style={styles.button}
                disabled={!name.trim() || !description.trim()}
            >
                {t('save')}
            </Button>
        </View>
    </View>
    );
}


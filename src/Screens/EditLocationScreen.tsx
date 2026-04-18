import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, Button, HelperText, TextInput } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { CitiesContext } from '../context/CityContext';
import { LanguageContext } from '../context/LanguageContext';
import { validateLocation } from '../utils/validation';
import { HomeStackParamList } from '../navigation/types';

type EditLocationRouteProp = RouteProp<HomeStackParamList, 'EditLocation'>;
type EditLocationNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'EditLocation'>;

export default function EditLocationScreen() {
    const navigation = useNavigation<EditLocationNavigationProp>();
    const route = useRoute<EditLocationRouteProp>();
    const { locations, updateLocation } = useContext(CitiesContext);
    const { t } = useContext(LanguageContext);

    const { locationId, cityName } = route.params;
    const location = locations.find((l) => l.id === locationId);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState<string | null>(null);

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
                <Appbar.Content title={t('editLocation')} subtitle={cityName} />
            </Appbar.Header>

            <View style={styles.form}>
                <TextInput
                    label={t('locationName')}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    form: {
        padding: 16,
    },
    input: {
        marginBottom: 16,
    },
    button: {
        marginTop: 8,
    },
});
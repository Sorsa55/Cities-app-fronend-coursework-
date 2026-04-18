import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, Button, HelperText, Text, TextInput } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { CitiesContext } from '../context/CityContext';
import { LanguageContext } from '../context/LanguageContext';
import { validateCity } from '../utils/validation';
import { HomeStackParamList } from '../navigation/types';

type EditCityRouteProp = RouteProp<HomeStackParamList, 'EditCity'>;
type EditCityNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'EditCity'>;

export default function EditCityScreen() {
    const navigation = useNavigation<EditCityNavigationProp>();
    const route = useRoute<EditCityRouteProp>();
    const { cities, updateCity } = useContext(CitiesContext);
    const { t } = useContext(LanguageContext);

    const city = cities.find((c) => c.id === route.params.cityId);

    const [name, setName] = useState('');
    const [country, setCountry] = useState('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (city) {
            setName(city.name);
            setCountry(city.country);
        }
    }, [city]);

    const handleSave = async () => {
        const validationError = validateCity(name, country);
        if (validationError) {
            setError(validationError);
            return;
        }

        if (city) {
            await updateCity(city.id, name, country);
            navigation.goBack();
        }
    };

    if (!city) {
        return (
            <View style={styles.container}>
                <Text>{t('cityNotFound')}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title={t('editCity')} />
            </Appbar.Header>

            <View style={styles.form}>
                <TextInput
                    label={t('cityName')}
                    value={name}
                    onChangeText={(text) => {
                        setName(text);
                        setError(null);
                    }}
                    mode="outlined"
                    style={styles.input}
                />
                <TextInput
                    label={t('country')}
                    value={country}
                    onChangeText={(text) => {
                        setCountry(text);
                        setError(null);
                    }}
                    mode="outlined"
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
                    disabled={!name.trim() || !country.trim()}
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
        marginTop: 16,
    },
});
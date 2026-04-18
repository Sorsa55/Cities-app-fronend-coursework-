import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, Button, HelperText, TextInput } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { CitiesContext } from '../context/CityContext';
import { LanguageContext } from '../context/LanguageContext';
import { validateCity } from '../utils/validation';
import { HomeStackParamList } from '../navigation/types';

type AddCityScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'AddCity'>;

export default function AddCityScreen() {
    const navigation = useNavigation<AddCityScreenNavigationProp>();
    const { addCity } = useContext(CitiesContext);
    const { t } = useContext(LanguageContext);
    const [name, setName] = useState('');
    const [country, setCountry] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSave = async () => {
        const validationError = validateCity(name, country);
        if (validationError) {
            setError(validationError);
            return;
        }

        await addCity(name, country);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title={t('addCity')} />
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
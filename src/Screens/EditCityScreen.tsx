import React, { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Appbar, Button, HelperText, TextInput } from 'react-native-paper';



type EditCityScreenProps = RouteProp<HomeStackParamList, 'EditCity'>;

export default function EditCityScreen({ route, navigation }: { route: EditCityScreenProps, navigation: any }) {
    const navigation = useNavigation();
    const route = useRoute<EditCityScreenProps>();
    const { cities, updateCity } = useContext(CitiesContext);
    const { t } = useContext(LanguageContext);

    const city = cities.find(c => c.id === route.params.cityId);

    const [name, setName] = useState('');
    const [country, setCountry] = useState('');
    const [error, setError] = useState('');
    
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
                <Text>{t('city_not_found')}</Text>
            </View>
        );
    }

    return (
    <View style={styles.container}>
        <Appbar.Header>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Content title={t('edit_city')} />
        </Appbar.Header>

        <View style={styles.form}>
            <TextInput
                label={t('city_name')}
                value={name}
                onChangeText={(text) => {
                    setName(text);
                    setError(null);
                }}
                mode = "outlined"
                style={styles.input}
            />

            <TextInput
                label={t('country')}
                value={country}
                onChangeText={(text) => {
                    setCountry(text);
                    setError(null);
                }} 
                mode= "outlined"
                style={styles.input}
            />
            {error && (
                <HelperText type="error" visible={true}>
                    {error}
                </HelperText>
            )}
            <Button
                mode= "contained"
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

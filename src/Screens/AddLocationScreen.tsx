import { useRoute } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, Button, HelperText, TextInput } from 'react-native-paper';

type AddLocationRouteProp = RouteProp<HomeStackParamList, 'AddLocation'>;

export default function AddLocationScreen() {
    const navigation = useNavigation();
    const route = useRoute<AddLocationRouteProp>();
    const { addLocation } = useContext(CitiesContext);
    const { t } = useContext(LanguageContext);

    const { cityId, cityName } = route.params;

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    const handleSave = async () => {
        const validationError = validateLocation(name, description);
        if (validationError) {
            setError(validationError);
            return;
        }
        await addLocation(cityId, name, description);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.content title={t('addLocation')} subtitle={cityName} />
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
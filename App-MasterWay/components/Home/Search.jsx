import { View, TextInput, StyleSheet } from "react-native";
import React, { useState } from 'react';
import firestore from '@react-native-firebase/firestore'; // Importa Firebase Firestore

export default function Search({ onSearch }) {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleSearch = async () => {
        if (query.trim()) {
            try {
                const recommendations = await fetchDataByLocation(query);
                if (onSearch) {
                    onSearch(recommendations); // Envía los resultados filtrados a la función `onSearch`
                }
            } catch (error) {
                console.error("Error al buscar recomendaciones:", error);
            }
        }
    };

    const fetchDataByLocation = async (location) => {
        const snapshot = await firestore()
            .collection('recomendaciones')
            .where('Ubicación', '==', location) // Filtra por ubicación
            .get();

        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={[
                    styles.input,
                    { borderColor: isFocused ? '#3AB2B9' : '#63D2D9' }
                ]}
                placeholder="Busca tu destino"
                placeholderTextColor="#B0B0B0"
                value={query}
                onChangeText={setQuery}
                onSubmitEditing={handleSearch}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    input: {
        height: 40,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        color: '#333',
        fontSize: 16,
    },
});

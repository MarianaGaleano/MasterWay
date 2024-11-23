import { View, TextInput, StyleSheet } from "react-native";
import React, { useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './../../configs/FirebaseConfig'; // Ajusta la ruta según tu configuración

export default function Search({ onSearch, selectedCategory, queryText, setQueryText }) {
    const [isFocused, setIsFocused] = useState(false);

    const handleSearch = async () => {
        if (queryText.trim()) {
            try {
                const recommendations = await fetchDataByLocation(queryText, selectedCategory);
                if (onSearch) {
                    onSearch(recommendations); // Envía los resultados filtrados a la función `onSearch`
                }
            } catch (error) {
                console.error("Error al buscar recomendaciones:", error);
            }
        }
    };

    const fetchDataByLocation = async (location, category) => {
        try {
            const recommendationsQuery = query(
                collection(db, 'recomendaciones '), // Nota el espacio al final
                where('Category', '==', category) // Filtra por categoría
            );
            const snapshot = await getDocs(recommendationsQuery);

            if (snapshot.empty) {
                console.log("No se encontraron resultados para esta categoría.");
                return [];
            }

            // Filtrar los resultados de acuerdo con la ubicación sin considerar mayúsculas/minúsculas y con coincidencia parcial
            const filteredRecommendations = snapshot.docs.filter(doc => {
                const ubicacion = doc.data().Ubicación.toLowerCase(); // Convertir a minúsculas
                const queryLocation = location.toLowerCase().trim(); // Convertir a minúsculas
                return ubicacion.includes(queryLocation); // Permitir coincidencia parcial en cualquier parte de la palabra
            });

            return filteredRecommendations.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error("Error al obtener datos por ubicación:", error);
            return [];
        }
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
                value={queryText} // El valor ahora es el estado desde el componente principal
                onChangeText={setQueryText} // Usamos la función para actualizar el estado
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

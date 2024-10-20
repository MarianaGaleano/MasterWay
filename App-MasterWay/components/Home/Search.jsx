import { View, TextInput, StyleSheet } from "react-native";
import React, { useState } from 'react';

export default function Search({ onSearch }) {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false); // Estado para manejar el enfoque

    const handleSearch = () => {
        if (onSearch) {
            onSearch(query);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={[
                    styles.input,
                    { borderColor: isFocused ? '#3AB2B9' : '#63D2D9' } // Color del borde cambia al enfocarse
                ]}
                placeholder="Busca tu destino"
                placeholderTextColor="#B0B0B0" // Color gris para el texto del placeholder
                value={query}
                onChangeText={setQuery}
                onSubmitEditing={handleSearch}
                onFocus={() => setIsFocused(true)} // Cambia el estado al enfocar
                onBlur={() => setIsFocused(false)} // Cambia el estado al perder el enfoque
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10, // Reducido para que haya menos espacio entre el cuadro de búsqueda y las categorías
    },
    input: {
        height: 40,
        backgroundColor: '#FFFFFF', // Color de fondo blanco
        borderWidth: 1, // Ancho del borde
        borderRadius: 5,
        paddingHorizontal: 10,
        color: '#333', // Color del texto ingresado
        fontSize: 16,
    },
});

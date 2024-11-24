import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation
import { Colors } from './../../constants/Colors';
import { useRouter } from 'expo-router';

export default function TravelListItem({recomendacion}) { 
    const router=useRouter();
    return (
        <TouchableOpacity 
            onPress={() => router.push({
                pathname: '/recomendaciones-details',
                params:recomendacion
            })}
            style={styles.container} // Usa estilos de StyleSheet
        >
            <Image 
                source={{ uri: recomendacion?.imageUrl }} // Correcto
                style={styles.image} // Usa estilos de StyleSheet
            />
            <Text style={styles.title}>{recomendacion.NombreDelLugar}</Text>
            <View style={styles.infoContainer}>
                <Text style={styles.location}>{recomendacion?.Ubicación}</Text>
                <Text style={styles.rating}>{recomendacion.Calificación}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginRight: 15,
        backgroundColor: Colors.WHITE,
        borderRadius: 10,
        alignItems: 'center', // Alinea todo al centro
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 10,
        resizeMode: 'cover', // Cambia objectFit a resizeMode
    },
    title: {
        fontFamily: 'outfit-medium',
        fontSize: 16,
        marginTop: 5, // Espacio entre la imagen y el texto
    },
    infoContainer: {
        flexDirection: 'column', // Asegúrate de que la dirección sea vertical
        alignItems: 'center', // Alinea la información al centro
        marginTop: 5, // Espacio entre el título y la información
    },
    location: {
        color: Colors.GRAY,
        fontFamily: 'outfit',
        marginBottom: 2, // Espacio entre ubicación y calificación
    },
    rating: {
        fontFamily: 'outfit',
        color: Colors.PRINCIPAL,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: Colors.PRINCIPAL,
        fontSize: 11,
    },
});
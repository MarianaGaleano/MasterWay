import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Importamos Ionicons
import RecomendacionInfo from '../../components/RecomendacionesDetails/RecomendacionInfo';
import Comentarios from '../../components/RecomendacionesDetails/Comentarios';

export default function RecomendacionesDetails() {
    const recomendacion = useLocalSearchParams();
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerTransparent: true,
            headerTitle: ''
        });
    }, []);

    // Función para regresar a la pantalla anterior
    const handleBackPress = () => {
        navigation.navigate('home'); 
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {/* Flecha de retroceso */}
            <TouchableOpacity
                onPress={handleBackPress}
                style={{
                    position: 'absolute',
                    top: 40, 
                    left: 20, 
                    zIndex: 10
                }}
            >
                <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>

            <View>
                {/* RecomendacionInfo */}
                <RecomendacionInfo recomendacion={recomendacion} />

                {/* comentarios*/}
                <Comentarios placeId={recomendacion?.id} />
            </View>
        </ScrollView>
    );
}

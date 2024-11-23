import { View, Pressable, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import Shared from './RecomendacionesDetails/Shared';

export default function MarkFav({ recomendacion }) {
    const [favList, setFavList] = useState([]);
    const userId = "usuarioActual"; // Sustituir por el ID real del usuario autenticado

    useEffect(() => {
        GetFav();
    }, []);

    const GetFav = async () => {
        const result = await Shared.GetFavList(userId); // Se pasa userId
        setFavList(result || []);
    };

    const AddToFav = async () => {
        if (recomendacion?.id) {
            const favResult = [...favList, recomendacion.id];

            try {
                await Shared.UpdateFav(favResult, userId); // Se pasa userId
                setFavList(favResult);
                Alert.alert("Guardado", "Recomendación guardada en favoritos.");
            } catch (error) {
                console.error("Error al agregar a favoritos:", error);
                Alert.alert("Error", "No se pudo guardar en favoritos.");
            }
        } else {
            console.warn("ID de la recomendación no definido");
        }
    };

    const removeFromFavorite = async () => {
        const favResult = favList.filter(item => item !== recomendacion.id);

        try {
            await Shared.UpdateFav(favResult, userId); // Se pasa userId
            setFavList(favResult);
            Alert.alert("Eliminado", "Recomendación eliminada de favoritos.");
        } catch (error) {
            console.error("Error al eliminar de favoritos:", error);
            Alert.alert("Error", "No se pudo eliminar de favoritos.");
        }
    };

    return (
        <View>
            {favList.includes(recomendacion.id) ? (
                <Pressable onPress={removeFromFavorite}>
                    <Ionicons name="heart" size={30} color="red" />
                </Pressable>
            ) : (
                <Pressable onPress={AddToFav}>
                    <Ionicons name="heart-outline" size={30} color="gray" />
                </Pressable>
            )}
        </View>
    );
}

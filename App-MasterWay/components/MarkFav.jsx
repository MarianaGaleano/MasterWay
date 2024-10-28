import { View, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import Shared from '../Shared/Shared';
import { useUser } from '@clerk/clerk-expo';

export default function MarkFav({ recomendacion }) {
    const { user } = useUser();
    const [favList, setFavList] = useState([]); // Asegúrate de inicializar como un array vacío

    useEffect(() => {
        if (user) {
            GetFav();
        }
    }, [user]);

    const GetFav = async () => {
        const result = await Shared.GetFavList(user);
        setFavList(result?.favorites || []); // Asegúrate de que favList sea un array
    };

    const AddToFav = async () => {
        if (recomendacion?.id) {
            const favResult = [...favList, recomendacion.id]; // Crear una nueva lista de favoritos
            console.log("Updating favorites:", favResult); // Para depuración
            await Shared.UpdateFav(user, favResult);
            setFavList(favResult); // Actualizar favList directamente
        } else {
            console.warn("Recommendation ID is undefined"); // Mensaje de advertencia si id es undefined
        }
    };

    const removeFromFavorite=async()=>{
        const favResult = favList.filter(item=>item!==recomendacion.id)
        await Shared.UpdateFav(user, favResult);
        GetFav();
    }
    return (
        <View>
            {favList.includes(recomendacion.id) ? (
                <Pressable onPress={removeFromFavorite}>
                    <Ionicons name="heart" size={30} color="red" /> {/* Corazón lleno rojo */}
                </Pressable>
            ) : (
                <Pressable onPress={AddToFav}>
                    <Ionicons name="heart-outline" size={30} color="gray" /> {/* Corazón contorno gris */}
                </Pressable>
            )}
        </View>
    );
}


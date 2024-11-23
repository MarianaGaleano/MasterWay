import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import Shared from '../../components/RecomendacionesDetails/Shared';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from './../../configs/FirebaseConfig';
import TravelListItem from '../../components/Home/TravelListItem';

export default function Favorites() {
    const [favRecomendacionesList, setFavRecomendacionesList] = useState([]); // Datos completos de las recomendaciones
    const [loader, setLoader] = useState(false);
    const userId = "usuarioActual"; // Sustituir por el ID real del usuario autenticado

    useEffect(() => {
        GetFavRecomendacionesIds();
    }, []);

    // Paso 1: Obtener los IDs de los favoritos
    const GetFavRecomendacionesIds = async () => {
        setLoader(true);
        const result = await Shared.GetFavList(userId); // Se pasa userId para obtener los IDs de los favoritos
        console.log('Favoritos obtenidos:', result);
        GetFavRecomendacionesList(result || []); // Llamamos a la función para obtener los detalles completos
    };

    // Paso 2: Obtener las recomendaciones completas basadas en los IDs
    const GetFavRecomendacionesList = async (favIds) => {
        if (favIds.length > 0) {
            setLoader(true);
            const chunkSize = 10; // Firestore permite máximo 10 IDs por consulta
            const chunks = [];

            // Divide el array de IDs en "chunks" de hasta 10 elementos
            for (let i = 0; i < favIds.length; i += chunkSize) {
                chunks.push(favIds.slice(i, i + chunkSize));
            }

            // Aquí hacemos la consulta por cada bloque de IDs
            for (let chunk of chunks) {
                const q = query(collection(db, 'recomendaciones'), where('id', 'in', chunk)); // Se filtra por los IDs de las recomendaciones
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const eventData = querySnapshot.docs.map(doc => ({
                        ...doc.data(),
                        id: doc.id,  // Agregamos el ID del documento
                    }));
                    setFavRecomendacionesList(prevData => [...prevData, ...eventData]); // Concatenamos las recomendaciones obtenidas
                }
            }
            setLoader(false);
        } else {
            setLoader(false); // Si no hay favoritos, se detiene el loader
        }
    };

    return (
        <View style={{ padding: 20, marginTop: 20 }}>
            <Text style={{ fontFamily: 'popins-bold', fontSize: 30 }}>Favoritos</Text>

            <FlatList
                onRefresh={GetFavRecomendacionesIds}
                data={favRecomendacionesList}
                numColumns={2}
                refreshing={loader}
                renderItem={({ item }) => (
                    <View>
                        <TravelListItem recomendacion={item} /> {/* Renderiza cada recomendación */}
                    </View>
                )}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}

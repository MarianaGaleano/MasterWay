// TravelListByCategory.js
import { View, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from 'react';
import Category from './Category'; // Asegúrate de que este componente esté definido
import TravelListItem from './TravelListItem'; // Asegúrate de que este componente esté definido
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './../../configs/FirebaseConfig'; // Ajusta la ruta según tu configuración


export default function TravelListByCategory() {
    const [travelList, setTravelList] = useState([]);
    const [loader, setLoader] = useState(false);

    // Función para obtener la lista de viajes
    const GetTravelList = async (category) => {
        setLoader(true); // Muestra el loader
        try {
            const q = query(collection(db, 'recomendaciones '), where('Category', '==', category)); // Cambia 'Restaurantes' por la categoría que desees filtrar
            const querySnapshot = await getDocs(q);
    
            if (querySnapshot.empty) {
                console.log("No se encontraron documentos para la categoría especificada.");
                setTravelList([]); // Asegúrate de limpiar la lista si no hay datos
            } else {
                const travelData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                console.log("Datos obtenidos:", travelData); // Verifica los datos antes de actualizar el estado
                setTravelList(travelData); // Actualiza el estado con los datos obtenidos
            }
        } catch (error) {
            console.error("Error al obtener documentos:", error);
        } finally {
            setLoader(false); // Oculta el loader
        }
    };
    

    useEffect(() => {
        GetTravelList('Hoteles'); // Cambia la categoría inicial según sea necesario
    }, []);

    return (
        <View>
            <Category category={(value) => GetTravelList(value)} />
            {loader ? (
                <ActivityIndicator size="large" color="#0000ff" /> // Loader mientras se carga la lista
            ) : (
                <FlatList
                    data={travelList}
                    style={{ marginTop: 10 }}
                    horizontal={true}
                    renderItem={({ item }) => (
                        <TravelListItem recomendacion={item} />
                    )}
                    keyExtractor={item => item.id} // Asegúrate de proporcionar una clave única para cada elemento
                />
            )}
        </View>
    );
}

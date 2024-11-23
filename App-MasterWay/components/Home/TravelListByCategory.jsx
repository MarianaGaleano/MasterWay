import { View, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import React, { useEffect, useState } from 'react';
import Category from './Category';
import TravelListItem from './TravelListItem';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './../../configs/FirebaseConfig';
import Search from './Search'; // Importa correctamente el componente Search

export default function TravelListByCategory() {
    const [travelList, setTravelList] = useState([]);
    const [loader, setLoader] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('Hoteles'); // Categoría seleccionada
    const [listKey, setListKey] = useState('initial');
    const [queryText, setQueryText] = useState(''); // Estado para el texto de búsqueda

    const GetTravelList = async (category) => {
        setLoader(true);
        try {
            const q = query(collection(db, 'recomendaciones '), where('Category', '==', category));
            const querySnapshot = await getDocs(q);
    
            if (querySnapshot.empty) {
                console.log("No se encontraron documentos para la categoría especificada.");
                setTravelList([]);
            } else {
                const travelData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                console.log("Datos obtenidos:", travelData);
                setTravelList(travelData);

                // Actualiza la clave para forzar un nuevo render
                setListKey(category);
            }
        } catch (error) {
            console.error("Error al obtener documentos:", error);
        } finally {
            setLoader(false);
        }
    };

    useEffect(() => {
        GetTravelList(selectedCategory); // Filtra por categoría seleccionada
    }, [selectedCategory]);

    // Función que se llama cuando se cambia de categoría
    const handleCategoryChange = (category) => {
        setSelectedCategory(category); // Cambiar la categoría
        setQueryText(''); // Reiniciar la barra de búsqueda al cambiar de categoría
        GetTravelList(category); // Obtener los elementos de la nueva categoría
    };

    return (
        <View style={styles.container}>
            {/* Barra de búsqueda arriba */}
            <Search 
                onSearch={(results) => setTravelList(results)} 
                selectedCategory={selectedCategory} 
                queryText={queryText} // Pasar el estado de búsqueda actual
                setQueryText={setQueryText} // Función para actualizar el estado de búsqueda
            />
            
            {/* Categorías debajo */}
            <Category category={handleCategoryChange} />
            
            {loader ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    key={listKey} // Se forza el render al cambiar la clave
                    data={travelList}
                    style={{ marginTop: 10 }}
                    numColumns={2} // Muestra 2 columnas
                    renderItem={({ item }) => (
                        <TravelListItem recomendacion={item} />
                    )}
                    keyExtractor={item => item.id}
                    columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 10 }}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10, // Espaciado general para los componentes
    }
});


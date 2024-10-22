import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './../../configs/FirebaseConfig';
import Colors from './../../constants/Colors';

// Mapeo de categorías con los logos correspondientes
const categoryIcons = {
    Restaurantes: require('./../../assets/images/restaurant-building.png'),
    Hoteles: require('./../../assets/images/hotel.png'),
    'Sitios turísticos': require('./../../assets/images/tour-guide.png'),
    Tours: require('./../../assets/images/destination.png')
};

export default function Category({ category }) {
    const [categories, setCategoryList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Hoteles'); // Categoría por defecto

    useEffect(() => {
        GetCategories();
    }, []);

    const GetCategories = async () => {
        try {
            const snapshot = await getDocs(collection(db, 'Category'));
            const categoriesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Mapea los datos
            setCategoryList(categoriesData);
        } catch (error) {
            console.error("Error al obtener categorías:", error); // Manejo de errores
        }
    };

    return (
        <View style={{ marginTop: 20 }}>
            <FlatList
                data={categories}
                numColumns={4}
                keyExtractor={(item) => item.id} // Usar id del documento como clave única
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => {
                            setSelectedCategory(item.name);
                            category(item.name); // Disparar el evento con la categoría seleccionada
                        }}
                        style={{ flex: 1, alignItems: 'center', margin: 5 }} // Centrar los elementos
                    >
                        <View style={[styles.container, selectedCategory === item.name && styles.selectedCategoryContainer]}>
                            {/* Mostrar el ícono desde el mapeo */}
                            <Image
                                source={categoryIcons[item.name]} // Mapea el nombre de la categoría al ícono
                                style={styles.image}
                                resizeMode="cover"
                            />
                        </View>
                        <Text style={styles.categoryText}>
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#6DD5ED', // Color de fondo del círculo
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center', // Centrar la imagen en el contenedor circular
        width: 70, // Tamaño del círculo
        height: 70,
        borderRadius: 40, // Hacemos el contenedor circular
        margin: 5,
    },
    selectedCategoryContainer: {
        backgroundColor: Colors.SECONDARY, // Color cuando está seleccionado
    },
    image: {
        width: 40, // Tamaño de la imagen dentro del círculo
        height: 40,
        tintColor: null, // No modificar el color, mantener el original del logo
    },
    categoryText: {
        fontFamily: 'outfit-medium', // Fuente
        fontSize: 12, // Tamaño del texto
        textAlign: 'center',
        color: '#808080', // Color gris
        marginTop: 5, // Separar el texto del ícono
    }
});

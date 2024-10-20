import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './../../configs/FirebaseConfig';
import Colors from './../../constants/Colors';
export default function Category({category}) {

    const [categories, setCategoryList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Travel');

    useEffect(() => {
        GetCategories();
    }, []);

    const GetCategories = async () => {
        setCategoryList([]);
        const snapshot = await getDocs(collection(db, 'Category'));
        snapshot.forEach((doc) => {
            setCategoryList(categoryList => [...categoryList, doc.data()]);
        });
    };

    return (
        <View style={{ marginTop: 20 }}>
            <FlatList
                data={categories}
                numColumns={4}
                keyExtractor={(item, index) => index.toString()} // Asegurarse de que haya una clave única para cada elemento
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() =>{ 
                            setSelectedCategory(item.name)
                            category(item.name)
                        }}
                        style={{ flex: 1, alignItems: 'center', margin: 5 }} // centrar los elementos
                    >
                        <View style={[
                            styles.container,
                            selectedCategory === item.name && styles.selectedCategoryContainer
                        ]}>
                            {/* Corregido el error tipográfico en width */}
                            <Image
                                source={{ uri: item?.image }}
                                style={{ width: 40, height: 40 }} // Corregir "widht" a "width"
                                resizeMode="cover" // Asegura que la imagen se ajuste bien
                            />
                        </View>

                        {/* Asegurarse de que el texto del nombre del item se muestre */}
                        <Text style={{
                            fontFamily: 'outfit-medium',
                            fontSize: 12,
                            textAlign: 'center',
                            marginTop: 5 // Un pequeño margen para separar la imagen del texto
                        }}>
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
        backgroundColor: '#6DD5ED', // Color de fondo del círculo (el mismo que en tu imagen)
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center', // Centrar la imagen en el contenedor circular
        width: 70, // Ajustar el tamaño del círculo
        height: 70,
        borderRadius: 40, // Hacemos el contenedor circular (la mitad del tamaño)
        margin: 5,
    },
    selectedCategoryContainer: {
        backgroundColor: Colors.SECONDARY, // Cambiar el color cuando se selecciona
    },
    image: {
        width: 40, // Ajustar el tamaño de la imagen dentro del círculo
        height: 40,
        tintColor: '#fff', // Poner la imagen en blanco
    },
    categoryText: {
        fontFamily: 'outfit-medium', // Fuente
        fontSize: 12, // Tamaño del texto
        textAlign: 'center',
        color: '#808080', // Color gris, similar al de la imagen
        marginTop: 5, // Separar un poco el texto del círculo
    }
});
import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from 'react';  // Asegúrate de importar useState y useEffect
import Category from './Category';  // Importa el componente 'Category'
import RecomendacionesListItem from './RecomendacionesListItem';  // Importa el componente 'RecomendacionesListItem'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './../../configs/FirebaseConfig';

export default function TravelListByCategory() {

    const [RecomendacionesList, setRecomendacionesList] = useState([]);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        GetRecomendacionesList('Travel');
    }, []);

    /**
     * 
     * @param {*} category 
     *
     */

    const GetRecomendacionesList = async (category) => {
        setLoader(true);
        setRecomendacionesList([]);
        
        const q = query(collection(db, 'Recomendaciones'), where('category', '==', category));
        const querySnapshot = await getDocs(q);

        const recomendaciones = [];
        querySnapshot.forEach((doc) => {
            recomendaciones.push(doc.data());
        });

        setRecomendacionesList(recomendaciones);  // Actualiza el estado una sola vez
        setLoader(false);
    };

    return (
        <View>
            <Category category={(value) => GetRecomendacionesList(value)} />
            <FlatList
                data={RecomendacionesList}
                style={{ marginTop: 10 }}
                horizontal={true}
                refreshing={loader}
                onRefresh={() => GetRecomendacionesList('Travel')}
                renderItem={({ item, index }) => (
                    <RecomendacionesListItem recomendaciones={item} />
                )}
            />
        </View>
    );
}

import { View, Text, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import Shared from '../../components/RecomendacionesDetails/Shared';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from './../../configs/FirebaseConfig';
import TravelListItem from '../../components/Home/TravelListItem';
import { useFocusEffect } from '@react-navigation/native';

export default function Favorites() {
    const [favIds, setFavIds] = useState([]);
    const [favRecomendacionesList, setFavRecomendacionesList] = useState([]);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        GetFavRecomendacionesIds();
    }, []);

    const GetFavRecomendacionesIds = async () => {
        setLoader(true);
        const result = await Shared.GetFavList();
        console.log('Favoritos obtenidos:', result);
        setFavIds(result || []);
        setLoader(false);
        GetFavRecomendacionesList(result || []);
    };

    const GetFavRecomendacionesList = async (favId_) => {
        setLoader(true);
        if (favId_ && favId_.length > 0) {
            const chunkSize = 10; // Firestore permite máximo 10 IDs por consulta
            const chunks = [];
            
            // Divide el array en chunks de hasta 10 elementos
            for (let i = 0; i < favId_.length; i += chunkSize) {
                chunks.push(favId_.slice(i, i + chunkSize));
            }

            const recomendacionList = [];
            for (let i = 0; i < chunks.length; i++) {
                const q = query(collection(db, 'recomendaciones '), where('id', 'in', chunks[i]));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const eventData = querySnapshot.docs.map(doc => ({
                        ...doc.data(),
                        id: doc.id,
                    }));
                    recomendacionList.push(...eventData);
                }
            }
            setFavRecomendacionesList(recomendacionList);
            console.log('lista recomendaciones:', recomendacionList)
        }
        setLoader(false);
    };

    useFocusEffect(
        useCallback(() => {
            GetFavRecomendacionesIds();
        }, [])
    );

    const containerStyle = {
        padding: 20,
        marginTop: 20,
    };

    const headerStyle = {
        fontFamily: 'popins-bold',
        fontSize: 30,
    };

    const itemContainerStyle = {
        flex: 1,
        margin: 5,
    };

    const columnWrapperStyle = {
        justifyContent: 'space-between',
        marginBottom: 10,
    };

    return (
        <ScrollView style={containerStyle}>
            <Text style={headerStyle}>Favoritos</Text>
            {loader ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    onRefresh={GetFavRecomendacionesIds}
                    data={favRecomendacionesList}
                    numColumns={2} // Muestra en 2 columnas
                    refreshing={loader}
                    renderItem={({ item }) => (
                        <View style={itemContainerStyle}>
                            <TravelListItem recomendacion={item} />
                        </View>
                    )}
                    keyExtractor={(item) => item.id}
                    columnWrapperStyle={columnWrapperStyle}
                />
            )}
        </ScrollView>
    );
}
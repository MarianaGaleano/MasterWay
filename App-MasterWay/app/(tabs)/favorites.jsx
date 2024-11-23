import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import Shared from '../../components/RecomendacionesDetails/Shared';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from './../../configs/FirebaseConfig';
import TravelListItem from '../../components/Home/TravelListItem';

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
        setFavIds(result || []);
        setLoader(false);

        GetFavRecomendacionesList(result || []);
    };

    const GetFavRecomendacionesList = async (favId_) => {
        if (favId_ && favId_.length > 0) {
            setLoader(true);
            const q = query(collection(db, 'recomendaciones'), where('id', 'in', favId_));
            const querySnapshot = await getDocs(q);

            const recomendaciones = [];
            querySnapshot.forEach((doc) => {
                recomendaciones.push(doc.data());
            });
            setFavRecomendacionesList(recomendaciones);
            setLoader(false);
        }
    };

    return (
        <View style={{
            padding: 20,
            marginTop: 20
        }}>
            <Text style={{
                fontFamily: 'popins-bold',
                fontSize: 30
            }}>Favoritos</Text>

            <FlatList
                data={favRecomendacionesList}
                numColumns={2}
                onRefresh={GetFavRecomendacionesIds}
                refreshing={loader}
                renderItem={({ item }) => (
                    <View>
                        <TravelListItem recomendacion={item} />
                    </View>
                )}
            />
        </View>
    );
}
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
        console.log('Favoritos obtenidos:', result);
        setFavIds(result || []);
        setLoader(false);

        GetFavRecomendacionesList(result || []);
    };

    const GetFavRecomendacionesList = async (favId_) => {
        if (favId_ && favId_.length > 0) {
            setLoader(true);
            const chunkSize = 10; // Firestore permite máximo 10 IDs por consulta
            const chunks = [];
                // Divide el array en chunks de hasta 10 elementos
            for (let i = 0; i < favId_.length; i += chunkSize) {
                chunks.push(favId_.slice(i, i + chunkSize));
            
                const q = query(collection(db, 'recomendaciones '), where('id', 'in', favId_));
                const querySnapshot = await getDocs(q);

                if(!querySnapshot.empty){
                    const eventData = querySnapshot.docs.map(doc =>({
                        ...doc.data(),
                        id: doc.id,
                    }));
                    setFavRecomendacionesList(eventData);
                    console.log('recomendaciones:', favRecomendacionesList);
                }
            }
            //querySnapshot.forEach((doc) => {
            //    recomendaciones.push(doc.data());
            //});
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
                onRefresh={GetFavRecomendacionesIds}
                data={favRecomendacionesList}
                numColumns={2}
                refreshing={loader}
                renderItem={({ item }) => (
                    <View>
                        <TravelListItem recomendacion={item} />
                    </View>
                )}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}
import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from 'react';
import Category from './Category';
import TravelListItem from './TravelListItem';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './../../configs/FirebaseConfig';


export default function TravelListByCategory() {

    const [travelList, setTravelList] = useState([]);
    const [loader,setLoader]=useState(false);
    useEffect(() => {
        GetTravelList('Hoteles')
    },[])
    /**
     * Used to get recamendaciones list on category selection
     * @param {*} category 
     */
    const GetTravelList=async(category)=>{
        setLoader(true)
        setTravelList([]);
        const q=query(collection(db,'recomendaciones'),where('Category','==',category))
        const querySnapshot=await getDocs(q);

        querySnapshot.forEach(doc=>{
            setTravelList(travelList=>[...travelList,doc.data()])
        })
        setLoader(false);

    }

    return (
        <View>
            <Category category={(value)=>GetTravelList(value)}/>
            <FlatList
                data={travelList}
                style={{marginTop:10}}
                horizontal={true}
                refreshing={loader}
                onRefresh={()=>GetTravelList('Hoteles')}
                renderItem={({item,index}) => (
                    <TravelListItem recomendacion={item} />
                )}
            />
        </View>
    )
}


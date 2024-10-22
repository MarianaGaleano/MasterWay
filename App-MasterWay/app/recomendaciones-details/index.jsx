import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import RecomendacionInfo from '../../components/RecomendacionesDetails/RecomendacionInfo';

export default function RecomendacionesDetails() {
    const recomendacion=useLocalSearchParams();
    const navigation=useNavigation();

    useEffect(()=>{
        navigation.setOptions({
          headerTransparent:true,
          headerTitle:''
        })
    },[])
  return (
    <View>
      {/*RecomendacionInfo*/}
        <RecomendacionInfo recomendacion={recomendacion}/>

      {/*RecomendacionInfo*/}

      {/*RecomendacionInfo*/}

      {/*RecomendacionInfo*/}

    </View>
  )
}

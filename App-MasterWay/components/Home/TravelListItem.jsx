import { View, Text, Image } from 'react-native';
import React from 'react';
import { Colors } from './../../constants/Colors';

export default function TravelListItem({recomendacion}) {  
  return (
    <View style={{
      padding:10,
      marginRight:15,
      backgroundColor:Colors.WHITE,
      borderRadius:10
    }}>
      <Image source={{uri:recomendacion?.imageUrl}} // Correcto
      style={{
        width:150,
        height:150,
        objectFit:'cover',
        borderRadius:10
      }}
      />

      <Text style={{
        fontFamily:'outfit-medium',
        fontSize:16
      }}>{recomendacion.NombreDelLugar}</Text>

      <View style={{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
      }}>

        <Text style={{
          color:Colors.GRAY,
          fontFamily:'outfit'
        }}>{recomendacion?.Ubicación}</Text>
        <Text style={{
          fontFamily:'outfit',
          color:Colors.PRIMARY,
          paddingHorizontal:10,
          borderRadius:10,
          backgroundColor:Colors.LIGHT.PRIMARY,
          fontSize:11
        }}>{recomendacion.Calificación}</Text>
      </View>
      
    </View>
  )
}

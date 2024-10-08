import { View, Text } from 'react-native'
import React from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen'

export default function RecomendacionesListItem({Travel}){
  return (
    <View style={{
        padding:10,
        marginRight:15,
        backgroundColor:Colors.WHITE,
        borderRadius:10
    }}>
        <Image sourse={{uri:Recomendaciones?.imageUrl}}
        style={{
            width:100,
            height:100,
            objectFit:'cover',
            borderRadius:10
        }}
        />
        <Text style={{
            fontFamily:'outfit',
            color:Colors.BLACK
        }}>{recomendaciones?.name}</Text>
        <View style={{
            display:'flex',
            fexDirection:'row',
            justifyContent:'space-between',
            alingItems:'center'
        }}>
        <Text style={{
            fontFamily:'outfit-light',
            color:Colors.BLACK
        }}>{recomendaciones?.breed}</Text>
        <Text style={{
            fontFamily:'outfit-light',
            color:Colors.PRIMARY,
            paddingHorizontal:7,
            borderRadius:10,
            fontSize:11,
            backgroundColor:Colors.LIGHT_PRIMARY
        }}>{recomendaciones?.age} YRS</Text>
        </View>
    </View>
  )
}
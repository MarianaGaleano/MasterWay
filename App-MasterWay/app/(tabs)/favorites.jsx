import { View, Text } from 'react-native'
import React from 'react'

export default function favorites() {
  return (
    <View style={{
      padding:20, 
      marginTop:20
    }}>
      <Text style={{
        fontFamily: 'popins-bold',
        fontSize: 30
      }}>Favoritos</Text>
    </View>
  )
}
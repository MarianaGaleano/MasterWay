import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

export default function SingIn() {
  const navigation = useNavigation();

  useEffect(() => {
      navigation.setOptions({
        headerShown: false,
      })
  },[])


  return (
    <View style={{
      padding:25
    }}>
    </View>
  )
}
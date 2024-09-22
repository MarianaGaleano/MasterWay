import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'

export default function Login() {
  return (
    <View>
      <Image source={require('./../assets/images/logo.png')}
        style={{
          width:'100%',
          height:510,
          backgroundColor:Colors.PRINCIPAL
        }}
      />
      <View style={styles.container}>
        <Text style={{
          fontSize:50,
          fontFamily:'outfit-bold',
          textAlign: 'center',
          marginTop:10
        }}>Master<Text style={{ color: '#63D2D9' }}>Way</Text></Text>

        <Text style={{
          fontFamily:'outfit-regular',
          fontSize:20,
          textAlign: 'center',
          color:Colors.GRIS,
          marginTop:20
        }}>Descubre los mejores restaurantes, actividades y lugares de interés en cada destino, mientras aprovechas las recomendaciones de otros viajeros. ¡Explora el mundo a tu manera con itinerarios adaptados y el apoyo de la comunidad viajera!</Text>  
      
        <View style={styles.button}>
          <Text style={{
            textAlign:'center',
            color:Colors.BLANCO,
            fontFamily:'outfit-bold',
            fontSize:20
          }}>CONTINUAR</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:Colors.BLANCO,
    marginTop:-20,
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    height:'100%',
    padding:25
  },
  button:{
    padding: 15,
    backgroundColor:Colors.PRINCIPAL,
    borderRadius:99,
    marginTop:'12%'
  }
})
 
import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '@/constants/Colors'

export default function SingIn() {
  const navigation = useNavigation();

  useEffect(() => {
      navigation.setOptions({
        headerShown: false,
      })
  },[])


  return (
    <View style={{
      padding:25,
      marginTop:60
    }}>
      <Text style={{
          fontSize:50,
          fontFamily:'outfit-bold',
          textAlign: 'center',
        }}>Master<Text style={{ color: '#63D2D9' }}>Way</Text></Text>

      <Text style={{
          fontSize:30,
          fontFamily:'outfit-bold',
          color:Colors.GRAY,
          marginTop:15
        }}>Inicia Sesion</Text>

        {/*USUSARIO O EMAIL */}
        <View style={{
          marginTop:50
        }}>
          <Text style={{
            fontSize:20,
            color:Colors.PRINCIPAL
          }}>Usuario o Gmail</Text>
          <TextInput
            style={styles.input}
            placeholder='Ingresa tu usuario o gmail'/>
        </View>

        {/*CONTRASEÑA */}
        <View style={{
          marginTop:50
        }}>
          <Text style={{
            fontSize:20,
            color:Colors.PRINCIPAL
          }}>Contraseña</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            placeholder='Ingresa tu contraseña'/>
            <Text style={{
              color:Colors.BLACK,
              textAlign:'right',
              marginTop:10
            }}>Olvidaste tu contraseña?</Text>
        </View>

        {/*BOTON INICIAR SESION */}
        <View style={{
          padding:15,
          backgroundColor:Colors.PRINCIPAL,
          borderRadius:15,
          marginTop:30
        }}>
          <Text style={{
            color:Colors.BLACK,
            textAlign:'center',
            fontSize:20
          }}>Iniciar Sesion</Text>
        </View>

        {/*BOTON CREAR CUENTA */}
        <View style={{
          marginTop:15
        }}>
          <Text style={{
            color:Colors.BLACK,
            fontSize:20
          }}>No tienes una cuenta? <Text style={{
            color:Colors.PRINCIPAL,
            fontSize:20
          }}>Crear Cuenta</Text></Text>
        </View>

        <View style={styles.separatorContainer}>
          <View style={styles.line} />
          <Text style={styles.separatorText}>O</Text>
          <View style={styles.line} />
        </View>


        {/*BOTON INICIAR CON NUMERO DE TELEFONO */}
        <View style={{
          padding:15,
          backgroundColor:Colors.WHITE,
          borderRadius:15,
          marginTop:30,
          borderWidth:1
        }}>
          <Text style={{
            color:Colors.BLACK,
            textAlign:'center',
            fontSize:20
          }}>Registrarse con numero de telefono</Text>
        </View>

        {/*BOTON INICIAR CON GMAIL */}
        <View style={{
          padding:15,
          backgroundColor:Colors.WHITE,
          borderRadius:15,
          marginTop:20,
          borderWidth:1
        }}>
          <Text style={{
            color:Colors.BLACK,
            textAlign:'center',
            fontSize:20
          }}>Registrarse con google</Text>
        </View>

    </View>
  )
}

const styles = StyleSheet.create({
  input:{
    padding:15,
    borderWidth:1,
    borderRadius:15,
    marginTop:10,
    borderColor:Colors.GRAY,
    fontFamilys:'outfit'
  },
  separatorContainer: {
    marginTop:30,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,  // Ajusta el margen según necesites
  },
  line: {
    flex: 1,  // Esto hace que la línea se ajuste al espacio disponible
    height: 1,
    backgroundColor: Colors.GRAY,  // Color de la línea
  },
  separatorText: {
    marginHorizontal: 10,  // Espacio a los lados de la "O"
    fontSize: 18,
    color: Colors.BLACK,  // Color del texto
  },
});

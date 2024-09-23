import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './../../../configs/FirebaseConfig'

export default function SingIn() {
  const navigation = useNavigation();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
      navigation.setOptions({
        headerShown: false,
      })
  },[])

  const onSignIn=()=>{

    if(!email || !password){
      alert("Por favor, completa todos los campos");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("--",errorMessage, errorCode);
    // ..
  });
  }

  return (
    <View style={{
      padding:25,
      marginTop:60
    }}>
      <Text style={{
          fontSize:50,
          fontFamily:'outfit-bold',
          textAlign: 'center',
          fontWeight: 'bold'
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
            color:Colors.PRINCIPAL,
            fontWeight: '500'
          }}>Usuario o Gmail</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value)=>setEmail(value)}
            placeholder='Ingresa tu usuario o gmail'/>
        </View>

        {/*CONTRASEÑA */}
        <View style={{
          marginTop:50
        }}>
          <Text style={{
            fontSize:20,
            color:Colors.PRINCIPAL,
            fontWeight: '500'
          }}>Contraseña</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            onChangeText={(value)=>setPassword(value)}
            placeholder='Ingresa tu contraseña'/>
            <Text style={{
              color:Colors.BLACK,
              textAlign:'right',
              marginTop:10,
              fontWeight: '600'
            }}>Olvidaste tu contraseña?</Text>
        </View>

        {/*BOTON INICIAR SESION */}
        <TouchableOpacity onPress={onSignIn} style={{
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
        </TouchableOpacity>

        {/*BOTON CREAR CUENTA */}
        <View style={{
          marginTop:15
        }}>
          <Text style={{
            color:Colors.BLACK,
            fontSize:20
          }}>No tienes una cuenta? <TouchableOpacity
            onPress={() => router.replace('auth/sign-up')}
            style={{
            color:Colors.PRINCIPAL,
            fontSize:20,
            fontWeight: '500'
          }}>Crear Cuenta</TouchableOpacity></Text>
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
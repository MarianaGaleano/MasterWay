import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Pressable, Platform } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './../../../configs/FirebaseConfig'
import * as WebBrowser from 'expo-web-browser'
import { useOAuth } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    if (Platform.OS !== 'web') { // Verificación para evitar el error en web
      void WebBrowser.warmUpAsync();
      return () => {
        void WebBrowser.coolDownAsync();
      };
    }
  }, [])
}

WebBrowser.maybeCompleteAuthSession()

export default function SingIn() {
  const navigation = useNavigation();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
      navigation.setOptions({
        headerShown: false,
      })
  },[])

  const onSignIn=()=>{

    if (!email || !password) {
      setErrorMessage("Por favor, completa todos los campos");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    router.replace('/home')
    console.log(user);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("--",errorMessage, errorCode);
    // ..
    if (errorCode === 'auth/invalid-credential') {
      setErrorMessage("Error al iniciar sesión. Por favor, verifica tus datos.");
    }
  });
  }

  const handleForgotPassword = () => {
    if(!email){
      alert("Por favor, ingresa tu correo electrónico");
      return;
  }

  sendPasswordResetEmail(auth, email)
  .then(() => {
    alert("Se ha enviado un correo electrónico para restablecer tu contraseña");
  })
  .catch((error) => {
    console.error("Error al enviar el correo electrónico de restablecimiento de contraseña:", error);
  });

  }

  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/(tabs)/home', { scheme: 'myapp' }),
      });
  
      if (createdSessionId) {
        await setActive({ session: createdSessionId });
        router.replace('/home');
      } else if (signIn) {
        // Handle sign-in response, e.g. additional steps like MFA
      } else if (signUp) {
        router.replace('/auth/sign-up');
      }
    } catch (err) {
      console.error('OAuth error', err);
      setErrorMessage('Error al iniciar sesión con Google.');
    }
  }, []);

  return (
    <ScrollView style={{
      padding:25,
      marginTop:60
    }}>
      <Text style={{
          fontSize:50,
          fontFamily:'popins-bold',
          textAlign: 'center'
        }}>Master<Text style={{ color: '#63D2D9' }}>Way</Text></Text>

      <Text style={{
          fontSize:30,
          fontFamily:'popins-bold',
          color:Colors.GRAY,
          marginTop:15
        }}>Inicia Sesion</Text>

        {/*EMAIL */}
        <View style={{
          marginTop:50
        }}>
          <Text style={{
            fontSize:20,
            color:Colors.PRINCIPAL,
            fontWeight: '500',
            fontFamily:'popins-bold'
          }}>Usuario o Gmail</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value)=>setEmail(value)}
            placeholder='Ingresa tu Email'/>
        </View>

        {/*CONTRASEÑA */}
        <View style={{
          marginTop:50
        }}>
          <Text style={{
            fontSize:20,
            color:Colors.PRINCIPAL,
            fontWeight: '500',
            fontFamily:'popins-bold'
          }}>Contraseña</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            onChangeText={(value)=>setPassword(value)}
            placeholder='Ingresa tu contraseña'/>
            {/* MENSAJE DE ERROR */}
          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
          {/* BOTON RECUPERAR CONTRASEÑA */}
            <TouchableOpacity onPress={handleForgotPassword} style={{
              color:Colors.BLACK,
              fontSize:15,
              fontFamily:'popins-bold',
              textAlign:'right',
              marginTop:10
            }}>Olvidaste tu contraseña?</TouchableOpacity>
        </View>

        {/*BOTON INICIAR SESION */}
        <TouchableOpacity onPress={onSignIn} style={{
          padding:15,
          backgroundColor:Colors.PRINCIPAL,
          borderRadius:15,
          marginTop:30,
          fontFamily:'popins-bold'
        }}>
          <Text style={{
            color:Colors.BLACK,
            textAlign:'center',
            fontSize:20,
            fontFamily:'popins-bold'
          }}>Iniciar Sesion</Text>
        </TouchableOpacity>

        {/*BOTON CREAR CUENTA */}
        <View style={{
          marginTop:15
        }}>
          <Text style={{
            color:Colors.BLACK,
            fontSize:15,
            fontFamily:'popins'
          }}>No tienes una cuenta? <TouchableOpacity
            onPress={() => router.replace('auth/sign-up')}
            style={{
            color:Colors.PRINCIPAL,
            fontSize:15,
            fontWeight: '500',
            fontFamily:'popins-bold'
          }}>Crear Cuenta</TouchableOpacity></Text>
        </View>

        <View style={styles.separatorContainer}>
          <View style={styles.line} />
          <Text style={styles.separatorText}>O</Text>
          <View style={styles.line} />
        </View>


        {/*BOTON INICIAR CON NUMERO DE TELEFONO */}
        {/* <View style={{
          padding:15,
          backgroundColor:Colors.WHITE,
          borderRadius:15,
          marginTop:30,
          borderWidth:1
        }}>
          <Text style={{
            color:Colors.BLACK,
            textAlign:'center',
            fontSize:15,
            fontFamily:'popins-bold'
          }}>Registrarse con numero de telefono</Text>
        </View> */}

        {/*BOTON INICIAR CON GMAIL */}
        <TouchableOpacity onPress={onPress} style={{
          padding:15,
          backgroundColor:Colors.WHITE,
          borderRadius:15,
          marginTop:20,
          borderWidth:1
        }}>
          <Text style={{
            color:Colors.BLACK,
            textAlign:'center',
            fontSize:15,
            fontFamily:'popins-bold'
          }}>Registrarse con google</Text>
        </TouchableOpacity>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  input:{
    padding:15,
    borderWidth:1,
    borderRadius:15,
    marginTop:10,
    borderColor:Colors.GRAY,
    fontFamily:'poppins'
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
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
  },
});
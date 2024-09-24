import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './../../../configs/FirebaseConfig';

export default function SignUp() {
  const navigation = useNavigation();
  const router = useRouter();

  // Estados para los campos del formulario
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);


  const OncreateAccount=()=>{

    //VALIDACION DE CAMPOS VACIOS
    if (!fullName || !username || !email || !phoneNumber || !password || !confirmPassword) {
      alert("Por favor, completa todos los campos");
      return;
    }

    //VALIDACION DE EMAIL
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
      alert("Por favor, ingresa un correo electrónico válido");
      return;
    }

    //VALIDACION DE CONTRASEÑA
    if(password !== confirmPassword){
      alert("Las contraseñas no coinciden");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up
    const user = userCredential.user;
    console.log(user);
    router.replace('/mytrip')
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
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View
        style={{
          padding: 25,
          paddingTop: 50,
        }}
      >
        {/* Flecha de regreso y titulo */}
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => router.replace('auth/sign-in')}>
            <MaterialIcons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Regístrate</Text>
        </View>

        {/* NOMBRE COMPLETO */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nombre completo</Text>
          <TextInput style={styles.input} placeholder="Ingresa tu nombre completo" 
          onChangeText={(value)=>setFullName(value)}/>
        </View>

        {/* NOMBRE DE USUARIO */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nombre de usuario</Text>
          <TextInput style={styles.input} placeholder="Ingresa tu nombre de usuario" 
          onChangeText={(value)=>setUsername(value)}/>
        </View>

        {/* EMAIL */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Correo electrónico</Text>
          <TextInput style={styles.input} placeholder="Ingresa tu correo electrónico"
          onChangeText={(value)=>setEmail(value)} />
        </View>

        {/* TELEFONO */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Número de teléfono</Text>
          <TextInput style={styles.input} placeholder="Ingresa tu número de teléfono"
          onChangeText={(value)=>setPhoneNumber(value)} />
        </View>

        {/* CREAR CONTRASEÑA */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Crear contraseña</Text>
          <TextInput secureTextEntry={true} style={styles.input} placeholder="Ingresa tu nueva contraseña" 
          onChangeText={(value)=>setPassword(value)}/>
        </View>

        {/* CONFIRMAR CONTRASEÑA */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirmar contraseña</Text>
          <TextInput secureTextEntry={true} style={styles.input} placeholder="Confirma tu nueva contraseña"
          onChangeText={(value)=>setConfirmPassword(value)} />
        </View>

        {/* BOTON CREAR CUENTA */}
        <TouchableOpacity onPress={OncreateAccount}
        style={styles.createAccountButton}>
          <Text style={styles.createAccountButtonText}>Crear Cuenta</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  headerContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 20,
  },
  title: {
    fontFamily: 'popins-bold',
    fontSize: 30,
    fontWeight: '600',
    marginLeft: 10, 
  },
  inputContainer: {
    marginTop: 30,
  },
  label: {
    fontSize: 20,
    color: Colors.PRINCIPAL,
    fontWeight: '500',
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    marginTop: 10,
    borderColor: Colors.GRAY,
    fontFamily: 'popins',
  },
  createAccountButton: {
    padding: 15,
    backgroundColor: Colors.PRINCIPAL,
    borderRadius: 15,
    marginTop: 30,
  },
  createAccountButtonText: {
    color: Colors.BLACK,
    textAlign: 'center',
    fontSize: 20,
    fontFamily:'popins-bold'
  },
});

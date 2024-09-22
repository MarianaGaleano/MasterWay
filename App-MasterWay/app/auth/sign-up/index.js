import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';

export default function SignUp() {
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

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
          <TextInput style={styles.input} placeholder="Ingresa tu nombre completo" />
        </View>

        {/* NOMBRE DE USUARIO */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nombre de usuario</Text>
          <TextInput style={styles.input} placeholder="Ingresa tu nombre de usuario" />
        </View>

        {/* EMAIL */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Correo electrónico</Text>
          <TextInput style={styles.input} placeholder="Ingresa tu correo electrónico" />
        </View>

        {/* TELEFONO */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Número de teléfono</Text>
          <TextInput style={styles.input} placeholder="Ingresa tu número de teléfono" />
        </View>

        {/* CREAR CONTRASEÑA */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Crear contraseña</Text>
          <TextInput secureTextEntry={true} style={styles.input} placeholder="Ingresa tu nueva contraseña" />
        </View>

        {/* CONFIRMAR CONTRASEÑA */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirmar contraseña</Text>
          <TextInput secureTextEntry={true} style={styles.input} placeholder="Confirma tu nueva contraseña" />
        </View>

        {/* BOTON CREAR CUENTA */}
        <TouchableOpacity style={styles.createAccountButton}>
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
    fontFamily: 'outfit-bold',
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
    fontFamily: 'outfit',
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
  },
});

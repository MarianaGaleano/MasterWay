import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Colors } from '@/constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { useRouter } from 'expo-router';
import React from 'react';

// Placeholder de imagen de perfil, la puedes cambiar por una real
const profileImage = 'https://via.placeholder.com/40';

export default function Discover() {

  const router = useRouter();

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      keyboardVerticalOffset={80} // Ajusta según la altura de tu barra de navegación
    >

      <ScrollView 
        style={{
          padding: 20, 
          marginTop: 20
        }} 
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace('/home')}>
          <Icon name="arrow-left" size={25} color={Colors.BLACK} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Nueva Recomendacion</Text>
        </View>
      </View>

        <View>
          <Text style={styles.inputContainer}>Nombre del lugar</Text>
          <TextInput style={styles.input}></TextInput>
        </View>

        <View>
          <Text style={styles.inputContainer}>Ubicacion</Text>
          <TextInput style={styles.input}></TextInput>
        </View>

        <View>
          <Text style={styles.inputContainer}>Tipo</Text>
          <TextInput style={styles.input}></TextInput>
        </View>

        <View>
          <Text style={styles.inputContainer}>Calificacion</Text>
          <TextInput style={styles.input}></TextInput>
        </View>

        <View>
          <Text style={styles.inputContainer}>Descripcion</Text>
          <TextInput 
            style={styles.input}
            numberOfLines={5}
            multiline={true}
          ></TextInput>
        </View>

        <View>
          <Text style={styles.inputContainer}>Subir fotos</Text>
          <TouchableOpacity>
            <Image 
              source={{ uri: profileImage }} 
              style={styles.profileImage} 
            />
          </TouchableOpacity>
        </View>

        {/*BOTON PUBLICAR */}
      <TouchableOpacity style={{
          padding: 15,
          backgroundColor: Colors.PRINCIPAL,
          borderRadius: 15,
          margin: 20, // Ajusta el margen según sea necesario
          fontFamily: 'popins-bold'
        }}>
        <Text style={{
          color: Colors.BLACK,
          textAlign: 'center',
          fontSize: 20,
          fontFamily: 'popins-bold'
        }}>Publicar</Text>
      </TouchableOpacity>

        {/* Espaciador para asegurar que el botón sea visible */}
        <View style={{ height: 100 }} />

      </ScrollView>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  titleContainer: {
    flexDirection: 'column', // Cambiar a columna para que el título y la fecha se apilen
    marginLeft: 10, // Espacio entre la flecha y el título
    color: Colors.PRINCIPAL,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'popins-bold'
  },
  inputContainer: {
    fontSize: 20,
    marginTop: 25,
    color: Colors.PRINCIPAL,
    fontFamily: 'popins-bold'
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    marginTop: 5,
    borderColor: Colors.GRAY,
    fontFamily: 'poppins'
  },
  profileImage: {
    width: 100,
    height: 100
  },
});

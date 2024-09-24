import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';

export default function Login() {
  const router = useRouter();

  return (
    <ScrollView>
      <Image
        source={require('./../assets/images/logo.png')}
        style={styles.logo}
      />
      <View style={styles.container}>
        <Text style={styles.title}>
          Master<Text style={styles.highlight}>Way</Text>
        </Text>
        <Text style={styles.description}>
          Descubre los mejores restaurantes, actividades y lugares de interés en cada destino, mientras aprovechas las recomendaciones de otros viajeros. ¡Explora el mundo a tu manera con itinerarios adaptados y el apoyo de la comunidad viajera!
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('./../auth/sign-in')}
          accessible={true}
          accessibilityLabel="Continuar a inicio de sesión"
        >
          <Text style={styles.buttonText}>CONTINUAR</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: '100%',
    height: 510,
    backgroundColor: Colors.PRINCIPAL,
  },
  container: {
    backgroundColor: Colors.WHITE,
    marginTop: -20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: '100%',
    padding: 25,
  },
  title: {
    fontSize: 50,
    fontFamily: 'popins-bold',
    textAlign: 'center',
    marginTop: 10,
  },
  highlight: {
    color: '#63D2D9',
  },
  description: {
    fontFamily: 'popins',
    fontSize: 20,
    textAlign: 'center',
    color: Colors.GRAY,
    marginTop: 20,
  },
  button: {
    padding: 15,
    backgroundColor: Colors.PRINCIPAL,
    borderRadius: 99,
    marginTop: '12%',
  },
  buttonText: {
    textAlign: 'center',
    color: Colors.WHITE,
    fontFamily: 'popins-bold',
    fontSize: 20,
  },
});

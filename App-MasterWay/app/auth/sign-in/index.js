import React, { useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';

// Componente reutilizable para entradas de texto
const InputField = ({ label, placeholder, secureTextEntry }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
    />
  </View>
);

// Componente reutilizable para botones principales
const PrimaryButton = ({ title, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.primaryButton, style]}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

// Componente reutilizable para el separador
const Separator = () => (
  <View style={styles.separatorContainer}>
    <View style={styles.line} />
    <Text style={styles.separatorText}>O</Text>
    <View style={styles.line} />
  </View>
);

// Pantalla principal de inicio de sesión
export default function SignInScreen() {
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View style={styles.container}>
      {/* Título */}
      <Text style={styles.title}>
        Master<Text style={styles.highlight}>Way</Text>
      </Text>
      
      {/* Subtítulo */}
      <Text style={styles.subtitle}>Inicia Sesión</Text>

      {/* Entrada de Usuario o Email */}
      <InputField
        label="Usuario o Gmail"
        placeholder="Ingresa tu usuario o gmail"
      />

      {/* Entrada de Contraseña */}
      <InputField
        label="Contraseña"
        placeholder="Ingresa tu contraseña"
        secureTextEntry={true}
      />

      {/* Texto de contraseña olvidada */}
      <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>

      {/* Botón de iniciar sesión */}
      <PrimaryButton title="Iniciar Sesión" onPress={() => console.log("Iniciar Sesión")} />

      {/* Texto para crear una cuenta */}
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>¿No tienes una cuenta? </Text>
        <TouchableOpacity onPress={() => router.replace('auth/sign-up')}>
          <Text style={styles.signUpLink}>Crear Cuenta</Text>
        </TouchableOpacity>
      </View>

      {/* Separador */}
      <Separator />

      {/* Botones de métodos alternativos */}
      <PrimaryButton
        title="Registrarse con número de teléfono"
        onPress={() => console.log("Registrarse con número de teléfono")}
        style={styles.secondaryButton}
      />
      <PrimaryButton
        title="Registrarse con Google"
        onPress={() => console.log("Registrarse con Google")}
        style={styles.secondaryButton}
      />
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    padding: 25,
    marginTop: 60,
  },
  title: {
    fontSize: 50,
    fontFamily: 'outfit-bold',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  highlight: {
    color: '#63D2D9',
  },
  subtitle: {
    fontSize: 30,
    fontFamily: 'outfit-bold',
    color: Colors.GRAY,
    marginTop: 15,
  },
  inputContainer: {
    marginTop: 50,
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
  forgotPasswordText: {
    color: Colors.BLACK,
    textAlign: 'right',
    marginTop: 10,
    fontWeight: '600',
  },
  primaryButton: {
    padding: 15,
    backgroundColor: Colors.PRINCIPAL,
    borderRadius: 15,
    marginTop: 30,
  },
  buttonText: {
    color: Colors.BLACK,
    textAlign: 'center',
    fontSize: 20,
  },
  signUpContainer: {
    marginTop: 15,
    flexDirection: 'row',
  },
  signUpText: {
    fontSize: 20,
    color: Colors.BLACK,
  },
  signUpLink: {
    color: Colors.PRINCIPAL,
    fontSize: 20,
    fontWeight: '500',
  },
  separatorContainer: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.GRAY,
  },
  separatorText: {
    marginHorizontal: 10,
    fontSize: 18,
    color: Colors.BLACK,
  },
  secondaryButton: {
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.GRAY,
  },
});

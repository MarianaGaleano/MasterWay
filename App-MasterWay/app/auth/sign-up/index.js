import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRouter, useSearchParams } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './../../../configs/FirebaseConfig'; 
import { setDoc, doc, query, where, getDocs, collection } from 'firebase/firestore';

export default function SignUp() {
  const navigation = useNavigation();
  const router = useRouter();
  const { email: emailParam } = useSearchParams(); // Obtener el correo como parámetro


  // Estados para los campos del formulario
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(null); // Estado para verificar si coinciden
  const [loading, setLoading] = useState(false); // Estado de carga

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });

    // Si el parámetro de email está presente, establecer el estado de email
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [emailParam]);

  // Función para verificar si el nombre de usuario ya existe en Firestore
  const checkUsername = async (username) => {
    if (!username) return;
    const q = query(collection(db, 'users'), where('username', '==', username));
    const querySnapshot = await getDocs(q);
    setUsernameAvailable(querySnapshot.empty); // true si está disponible, false si ya está tomado
  };

  // Escucha los cambios en el nombre de usuario y verifica su disponibilidad
  useEffect(() => {
    const timer = setTimeout(() => {
      if (username) {
        checkUsername(username);
      }
    }, 500); // Esperar 500ms para no hacer consultas cada vez que el usuario teclea

    return () => clearTimeout(timer); // Limpiar el timer en cada cambio
  }, [username]);

  // Verificación de si las contraseñas coinciden
  useEffect(() => {
    if (password && confirmPassword) {
      setPasswordsMatch(password === confirmPassword);
    }
  }, [password, confirmPassword]);

  // Validar el formato del correo electrónico
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  
  // Validar el formato del número de teléfono
  const validatePhoneNumber = (phone) => /^\d{10}$/.test(phone); // Ejemplo para números de 10 dígitos

  const onCreateAccount = async () => {
    if (!fullName || !username || !phoneNumber || !email || !password || !confirmPassword) {
      alert("Por favor, completa todos los campos");
      return;
    }

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    if (usernameAvailable === false) {
      alert("El nombre de usuario ya está en uso. Por favor, elige otro.");
      return;
    }

    if (!validateEmail(email)) {
      alert("Por favor, ingresa un correo electrónico válido.");
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      alert("Por favor, ingresa un número de teléfono válido.");
      return;
    }

    setLoading(true); // Activar estado de carga

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        fullName,
        username,
        phoneNumber,
        email,
        createdAt: new Date(),
      });

      alert("Cuenta creada exitosamente");
      router.replace('/home');
    } catch (error) {
      // Manejo de errores
      switch (error.code) {
        case 'auth/email-already-in-use':
          alert('Este correo electrónico ya está en uso.');
          break;
        case 'auth/invalid-email':
          alert('El correo electrónico no es válido.');
          break;
        case 'auth/weak-password':
          alert('La contraseña es muy débil. Debe tener al menos 6 caracteres.');
          break;
        default:
          alert(`Error al crear la cuenta: ${error.message}`);
      }
    } finally {
      setLoading(false); // Desactivar estado de carga
    }
  };

  const isFormValid = fullName && username && phoneNumber && email && password && confirmPassword && 
                      passwordsMatch && usernameAvailable;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={{ padding: 25, paddingTop: 50 }}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => router.replace('auth/sign-in')}>
            <MaterialIcons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Regístrate</Text>
        </View>

        {/* NOMBRE COMPLETO */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nombre completo</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu nombre completo"
            onChangeText={setFullName}
          />
        </View>

        {/* NOMBRE DE USUARIO */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nombre de usuario</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu nombre de usuario"
            onChangeText={setUsername}
          />
          {username && (
            <Text
              style={[styles.usernameCheck, { color: usernameAvailable === null ? 'black' : usernameAvailable ? 'green' : 'red' }]}
            >
              {usernameAvailable === null ? 'Verificando...' :
                usernameAvailable ? 'Nombre de usuario disponible' : 'Nombre de usuario no disponible'}
            </Text>
          )}
        </View>

        {/* TELEFONO */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Número de teléfono</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu número de teléfono"
            onChangeText={setPhoneNumber}
          />
        </View>

        {/* EMAIL */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Correo electrónico</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu correo electrónico"
            onChangeText={setEmail}
            value={email} // Configurar el valor del correo automáticamente
            editable={!emailParam} // Deshabilitar la edición si viene de OAuth
          />
        </View>

        {/* CREAR CONTRASEÑA */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Crear contraseña</Text>
          <TextInput
            secureTextEntry
            style={styles.input}
            placeholder="Ingresa tu nueva contraseña"
            onChangeText={setPassword}
          />
        </View>

        {/* CONFIRMAR CONTRASEÑA */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirmar contraseña</Text>
          <TextInput
            secureTextEntry
            style={styles.input}
            placeholder="Confirma tu nueva contraseña"
            onChangeText={setConfirmPassword}
          />
          {/* Mostrar mensaje de coincidencia de contraseñas */}
          {confirmPassword && (
            <Text
              style={[styles.passwordCheck, { color: passwordsMatch === null ? 'black' : passwordsMatch ? 'green' : 'red' }]}
            >
              {passwordsMatch === null ? '' :
                passwordsMatch ? 'Las contraseñas coinciden' : 'Las contraseñas no coinciden'}
            </Text>
          )}
        </View>

        {/* BOTON CREAR CUENTA */}
        <TouchableOpacity onPress={onCreateAccount} style={styles.createAccountButton} disabled={loading || !isFormValid}>
          <Text style={styles.createAccountButtonText}>{loading ? 'Cargando...' : 'Crear Cuenta'}</Text>
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
  usernameCheck: {
    marginTop: 5,
    fontSize: 16,
  },
  passwordCheck: {
    marginTop: 5,
    fontSize: 16,
  },
  createAccountButton: {
    marginTop: 30,
    backgroundColor: Colors.PRINCIPAL,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  createAccountButtonText: {
    color: Colors.BLACK,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'popins-bold',
  },
});

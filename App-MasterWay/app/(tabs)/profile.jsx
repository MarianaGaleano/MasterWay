import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { signOut } from 'firebase/auth';
import { useRouter } from 'expo-router';
import { auth } from './../../configs/FirebaseConfig';  
import { doc, getDoc } from 'firebase/firestore';  
import { db } from './../../configs/FirebaseConfig';

export default function Profile() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      if (auth.currentUser) {
        const userDocRef = doc(db, 'users', auth.currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      }
    };
    getUserData();
  }, []);

  // Función para manejar el cierre de sesión
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Redirige al usuario a la pantalla de inicio de sesión
        router.replace('/auth/sign-in');
      })
      .catch((error) => {
        console.error("Error al cerrar sesión:", error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil de Usuario</Text>

      {/* Tarjeta de usuario */}
      {userData && (
        <View style={styles.profileCard}>
          <Image
            source={require('./../../assets/images/logo.png')}
            style={styles.avatar}
          />
          <View style={styles.userInfo}>
            <Text style={styles.fullName}>{userData.fullName}</Text>
            <Text style={styles.username}>@{userData.username}</Text>
          </View>
        </View>
      )}

      {/* Información de contacto */}
      <View style={styles.contactInfo}>
        <Text style={styles.sectionTitle}>Información de Contacto</Text>
        {userData && (
          <>
            <Text style={styles.contactText}>Email: {userData.email}</Text>
            <Text style={styles.contactText}>Teléfono: +57 {userData.phoneNumber}</Text>
          </>
        )}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Confirmar/Cambiar Email</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Cambiar/Confirmar Teléfono</Text>
        </TouchableOpacity>
      </View>

      {/* Botón de cerrar sesión */}
      <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
        <Text style={styles.signOutButtonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 20,
  },
  title: {
    fontFamily: 'popins-bold',
    fontSize: 30,
    marginBottom: 20,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  fullName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 16,
    color: '#757575',
  },
  contactInfo: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  contactText: {
    fontSize: 16,
    color: '#757575',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  signOutButton: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: Colors.PRINCIPAL,
    paddingVertical: 15,
    borderRadius: 25,
  },
  signOutButtonText: {
    color: Colors.BLACK,
    textAlign: 'center',
    fontFamily: 'popins-bold',
    fontSize: 16,
  },
});

import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { auth } from './../../configs/FirebaseConfig';  
import { doc, getDoc } from 'firebase/firestore';  
import { db } from './../../configs/FirebaseConfig';

export default function Dashboard() {
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      
      {/* Componente de la tarjeta de perfil */}
      <View style={styles.card}>
        <View style={styles.profileHeader}>
          <Image 
            source={require('./../../assets/images/logo.png')}
            style={styles.image} 
          />
          {userData && ( 
            <View style={styles.textContainer}> {/* Contenedor del texto */}
              <Text style={styles.userName} numberOfLines={1} ellipsizeMode="tail">
                {userData.username}
              </Text>
              <Text style={styles.description}>
                {userData.description || 'Descripción breve sobre el usuario.'}
              </Text>
              <Text style={styles.interest}>Interés: Tecnología</Text>
            </View>
          )}
        </View>
        
        <TouchableOpacity onPress={() => router.replace('/profile')}
         style={[styles.button, styles.editProfile]}>
          <Text style={styles.editProfileText}>Editar</Text>
        </TouchableOpacity>
      </View>


    {/* componente calendario */}
    <View style={styles.container}>
      <Text style={styles.title}>Calendario</Text>
        </View>

        <TouchableOpacity onPress={() => router.replace('/calendar')}
         style={[styles.button, styles.editProfile]}>
          <Text style={styles.editProfileText}>Calendario</Text>
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
  card: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    padding: 20,
    backgroundColor: Colors.PRINCIPAL,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  image: {
    width: 85,
    height: 85,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flexShrink: 1, // Hace que el texto se ajuste al espacio disponible
  },
  userName: {
    fontSize: 24, 
    fontFamily: 'popins-bold',
    fontWeight: '500',
    margin: 0,
    maxWidth: 200, // Limita el ancho del nombre de usuario
  },
  description: {
    color: Colors.GRAY,
  },
  interest: {
    color: Colors.GRAY,
  },
  button: {
    backgroundColor: Colors.WHITE,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  editProfile: {
    borderColor: Colors.BLACK,
    borderWidth: 1,
  },
  editProfileText: {
    color: Colors.BLACK,
    textAlign: 'center',
    fontFamily: 'popins-bold',
  },
});

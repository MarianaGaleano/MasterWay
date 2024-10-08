import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { auth } from './../../configs/FirebaseConfig';  
import { doc, getDoc, updateDoc } from 'firebase/firestore';  
import { db } from './../../configs/FirebaseConfig';

export default function Add_Event() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [editingField, setEditingField] = useState(null); // Controla qué campo está en modo de edición
  const [editedData, setEditedData] = useState({}); // Almacena los cambios que el usuario hace

  useEffect(() => {
    const getUserData = async () => {
      if (auth.currentUser) {
        const userDocRef = doc(db, 'users', auth.currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserData(userDoc.data());
          setEditedData(userDoc.data()); // Inicializa los valores editados con los datos actuales
        }
      }
    };
    getUserData();
  }, []);

  const handleSave = async (field) => {
    if (auth.currentUser) {
      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userDocRef, { [field]: editedData[field] });
    }
    setEditingField(null); // Sale del modo de edición
  };

  return (
    <View style={styles.container}>
        <Text style={styles.evento}>evento</Text>
        <Text style={styles.descripcion}>descripcion</Text>
    </View>

  );
}

const styles = StyleSheet.create({
  container:{
    padding: 20, 
    marginTop: 20,
  }
  
  });
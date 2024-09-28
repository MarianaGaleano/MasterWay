import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Colors } from '@/constants/Colors';
import { signOut } from 'firebase/auth';
import { useRouter } from 'expo-router';
import { auth } from './../../configs/FirebaseConfig';  
import { doc, getDoc, updateDoc } from 'firebase/firestore';  
import { db } from './../../configs/FirebaseConfig';

export default function Profile() {
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

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        router.replace('/auth/sign-in');
      })
      .catch((error) => {
        console.error("Error al cerrar sesión:", error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil de Usuario</Text>

      {/* Imagen de perfil */}
      {userData && (
        <View style={styles.profileSection}>
          <Image
            source={userData.profilePictureUrl ? { uri: userData.profilePictureUrl } : require('./../../assets/images/logo.png')}
            style={styles.avatar}
          />
        </View>
      )}

      {/* Información del usuario */}
      {userData && (
        <>
          <View style={styles.infoSection}>
            <Text style={styles.label}>Nombre de Usuario</Text>
            {editingField === 'username' ? (
              <View style={styles.infoRow}>
                <TextInput
                  style={styles.input}
                  value={editedData.username}
                  onChangeText={(text) => setEditedData({ ...editedData, username: text })}
                />
                <TouchableOpacity onPress={() => handleSave('username')}>
                  <Text style={styles.editButton}>Guardar</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.infoRow}>
                <Text style={styles.infoText}>@{userData.username}</Text>
                <TouchableOpacity onPress={() => setEditingField('username')}>
                  <Text style={styles.editButton}>Editar</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.label}>Nombre Completo</Text>
            {editingField === 'fullName' ? (
              <View style={styles.infoRow}>
                <TextInput
                  style={styles.input}
                  value={editedData.fullName}
                  onChangeText={(text) => setEditedData({ ...editedData, fullName: text })}
                />
                <TouchableOpacity onPress={() => handleSave('fullName')}>
                  <Text style={styles.editButton}>Guardar</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.infoRow}>
                <Text style={styles.infoText}>{userData.fullName}</Text>
                <TouchableOpacity onPress={() => setEditingField('fullName')}>
                  <Text style={styles.editButton}>Editar</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.label}>Email</Text>
            {editingField === 'email' ? (
              <View style={styles.infoRow}>
                <TextInput
                  style={styles.input}
                  value={editedData.email}
                  onChangeText={(text) => setEditedData({ ...editedData, email: text })}
                />
                <TouchableOpacity onPress={() => handleSave('email')}>
                  <Text style={styles.editButton}>Guardar</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.infoRow}>
                <Text style={styles.infoText}>{userData.email}</Text>
                <TouchableOpacity onPress={() => setEditingField('email')}>
                  <Text style={styles.editButton}>Editar</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.label}>Teléfono</Text>
            {editingField === 'phoneNumber' ? (
              <View style={styles.infoRow}>
                <TextInput
                  style={styles.input}
                  value={editedData.phoneNumber}
                  onChangeText={(text) => setEditedData({ ...editedData, phoneNumber: text })}
                />
                <TouchableOpacity onPress={() => handleSave('phoneNumber')}>
                  <Text style={styles.editButton}>Guardar</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.infoRow}>
                <Text style={styles.infoText}>+57 {userData.phoneNumber}</Text>
                <TouchableOpacity onPress={() => setEditingField('phoneNumber')}>
                  <Text style={styles.editButton}>Editar</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.label}>Descripción</Text>
            {editingField === 'description' ? (
              <View style={styles.infoRow}>
                <TextInput
                  style={styles.input}
                  value={editedData.description}
                  onChangeText={(text) => setEditedData({ ...editedData, description: text })}
                />
                <TouchableOpacity onPress={() => handleSave('description')}>
                  <Text style={styles.editButton}>Guardar</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.infoRow}>
                <Text style={[styles.infoText, styles.gray]}>
                  {userData.description || 'Breve descripción sobre ti...'}
                </Text>
                <TouchableOpacity onPress={() => setEditingField('description')}>
                  <Text style={styles.editButton}>Editar</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </>
      )}

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
  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  infoSection: {
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    color: '#757575',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 16,
    flex: 1,
    marginRight: 10,
  },
  editButton: {
    fontSize: 14,
    color: Colors.PRINCIPAL,
  },
  gray: {
    color: Colors.GRAY,
  },
  signOutButton: {
    marginTop: 30,
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

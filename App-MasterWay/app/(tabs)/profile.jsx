import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { signOut } from 'firebase/auth';
import { useRouter } from 'expo-router';
import { auth } from './../../configs/FirebaseConfig';  // Ajusta la ruta a tu configuración de Firebase

export default function Profile() {
  const router = useRouter();

  // Función para manejar el cierre de sesión
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Una vez que se cierre la sesión, redirige al usuario a la pantalla de inicio de sesión
        router.replace('/auth/sign-in');
      })
      .catch((error) => {
        console.error("Error al cerrar sesión:", error);
      });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Perfil</Text>

      {/* Botón para cerrar sesión */}
      <TouchableOpacity
        onPress={handleSignOut}
        style={{
          backgroundColor: '#ff3b30',
          padding: 15,
          borderRadius: 10,
          marginTop: 20,
        }}
      >
        <Text style={{ color: 'white', fontSize: 16 }}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

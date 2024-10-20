import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native'; 

export default function PerfilDeUsuario({ usuario }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity 
      style={styles.perfilContainer} 
      onPress={() => navigation.navigate('PerfilUsuario', { usuarioId: usuario.id })}
    >
      <Image 
        source={{ uri: usuario.imageUrl }} 
        style={styles.perfilImage} 
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  perfilContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
  },
  perfilImage: {
    width: '100%',
    height: '100%',
  },
});

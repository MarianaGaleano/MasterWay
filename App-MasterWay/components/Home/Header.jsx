import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from './../../constants/Colors';

export default function Header() {
  const navigation = useNavigation();

  // Placeholder de imagen de perfil, la puedes cambiar por una real
  const profileImage = 'https://via.placeholder.com/40';

  return (
    <View style={styles.header}>
        <Text style={styles.title}>
          Master<Text style={styles.highlight}>Way</Text>
        </Text>
      
      <TouchableOpacity onPress={() => navigation.navigate('profile')}>
        <Image 
          source={{ uri: profileImage }} 
          style={styles.profileImage} 
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    fontFamily: 'popins-bold',
    textAlign: 'center',
    marginTop: 10,
  },
  highlight: {
    color: Colors.PRINCIPAL,
  },
  profileImage: {
    width: 65,
    height: 65,
    borderRadius: 50, // Hace la imagen circular
  },
});

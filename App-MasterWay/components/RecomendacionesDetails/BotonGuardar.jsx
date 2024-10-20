import { View, Button, StyleSheet, Alert } from 'react-native';
import React from 'react';

export default function BotonGuardar() {
  const handleGuardar = () => {
    
    Alert.alert("Guardado", "Recomendación guardada en tus preferencias.");
  };

  return (
    <View style={styles.container}>
      <Button 
        title="Guardar recomendación" 
        onPress={handleGuardar} 
        color="#00a680" 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    marginHorizontal: 10,
  },
});

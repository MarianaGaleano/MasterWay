import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';

export default function RecomendacionesInfo({ recomendacion }) {
  const { NombreDelLugar, Calificacion, Category, Descripción, ImageUrl, Ubicación } = recomendacion;

  return (
    <View>
      {/* Imagen del lugar */}
      <Image 
        source={{ uri: ImageUrl }} 
        style={styles.image} 
      />

      {/* Información del hotel */}
      <View style={styles.infoContainer}>
        <Text style={styles.nombreLugar}>{NombreDelLugar}</Text>
        <Text style={styles.ubicacion}>{Ubicación}</Text>
        <View style={styles.calificacionContainer}>
          <Text style={styles.calificacion}>Rating: {Calificacion} ⭐</Text>
          <Text style={styles.categoria}>{Category}</Text>
        </View>
        <Text style={styles.descripcion}>{Descripción}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 250,
    objectFit: 'cover',
  },
  infoContainer: {
    padding: 20,
  },
  nombreLugar: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  ubicacion: {
    fontSize: 16,
    color: 'gray',
    marginVertical: 5,
  },
  calificacionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  calificacion: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  categoria: {
    fontSize: 16,
    color: 'blue',
  },
  descripcion: {
    fontSize: 14,
    marginTop: 10,
  },
});

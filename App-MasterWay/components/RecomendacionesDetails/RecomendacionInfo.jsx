import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { Colors } from './../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';

// Componente para mostrar las estrellas doradas
const Estrellas = ({ calificacion }) => {
  const estrellaDorada = require('./../../assets/images/star.png');

  // Generar un array con la cantidad de estrellas doradas basada en la calificación
  const estrellas = Array(calificacion).fill(0);

  return (
    <View style={styles.estrellasContainer}>
      {estrellas.map((_, index) => (
        <Image
          key={index}
          source={estrellaDorada}
          style={styles.estrella}
        />
      ))}
    </View>
  );
};

export default function RecomendacionInfo({ recomendacion }) {
  return (
    <View>
      <Image 
        source={{uri: recomendacion.imageUrl}}
        style={{
          width: '100%',
          height: 400,
          objectFit: 'cover',
        }}
      />
      <View style={styles.tituloContainer}>
        <Text style={styles.titulo}>
          {recomendacion?.NombreDelLugar}
        </Text>
        <Ionicons name="heart-outline" size={30} color="gray" />
      </View>
      <View style={{ padding: 20 }}>
        <View>
          <Text style={styles.ubicacion}>
            {recomendacion?.Ubicación}
          </Text>
          <Text style={styles.categoria}>
            Categoría: {recomendacion?.Category}
          </Text>
        </View>
        
        <View style={styles.calificacionContainer}>
          <Text style={styles.calificacionTexto}>
            Calificación:
          </Text>
          <Estrellas calificacion={recomendacion?.Calificación} />
          <Text style={styles.calificacionNumero}>
            {recomendacion?.Calificación} / 5
          </Text>
        </View>

        {/* Nuevo subtítulo para la descripción */}
        <Text style={styles.subtitulo}>
          Descripción
        </Text>

        <View style={styles.descripcionContainer}>
          <Text style={styles.descripcion}>
            {recomendacion?.Descripción}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tituloContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.PRIMARY,
  },
  ubicacion: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.GRAY,
  },
  categoria: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.GRAY,
    marginTop: 5,
  },
  calificacionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  calificacionTexto: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.GRAY,
    marginRight: 10,
  },
  calificacionNumero: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.GRAY,
    marginLeft: 10,
  },
  estrellasContainer: {
    flexDirection: 'row',
  },
  estrella: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
  subtitulo: {
    fontSize: 18,  // Tamaño del subtítulo
    fontWeight: 'bold',
    color: Colors.PRIMARY,  // Color primario
    marginTop: 20,  // Espacio superior para separación
    marginBottom: 5, // Espacio inferior para separación con la descripción
  },
  descripcionContainer: {
    marginTop: 10,  // Espacio entre subtítulo y descripción
  },
  descripcion: {
    fontSize: 16,
    color: Colors.BLACK,
  },
});

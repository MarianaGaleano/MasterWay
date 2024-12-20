import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { Colors } from './../../constants/Colors';
import MarkFav from './../../components/MarkFav';
import { doc, getDoc } from 'firebase/firestore';  
import { db } from './../../configs/FirebaseConfig';

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
  const [imageUrl, setImageUrl] = useState(recomendacion?.imageUrl || null);
  const [error, setError] = useState(null);

  useEffect(() => { 
    const fetchImage = async () => { 
      try { 
        const docRef = doc(db, 'recomendaciones ', recomendacion.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setImageUrl(docSnap.data().imageUrl);
        } else {
          console.error('No such document!');
          setError('La imagen no existe en Firestore Database.');
        }
      } catch (error) { 
        console.error('Error fetching image:', error);
        setError('Error al obtener la imagen de Firestore Database.');
      } 
    }; 
    fetchImage(); 
  }, [recomendacion.id]);

  return (
    <View>
      {/* Imagen de la recomendación */}
      <Image 
        source={{ uri: imageUrl }}
        style={{
          width: '100%',
          height: 400,
          objectFit: 'cover',
        }}
        onError={(error) => {
          console.error('Error al cargar la imagen: ', error.nativeEvent.error);
        }}
      />
      
      {/* Contenedor del título y el icono de favoritos */}
      <View style={styles.tituloContainer}>
        <Text style={styles.titulo}>
          {recomendacion?.NombreDelLugar}
        </Text>
        {/* Componente de favoritos */}
        <MarkFav recomendacion={recomendacion} />
      </View>
      
      {/* Información adicional de la recomendación */}
      <View style={{ padding: 20 }}>
        <View>
          <Text style={styles.ubicacion}>
            {recomendacion?.Ubicación}
          </Text>
          <Text style={styles.categoria}>
            Categoría: {recomendacion?.Category}
          </Text>
        </View>
        
        {/* Calificación con estrellas */}
        <View style={styles.calificacionContainer}>
          <Text style={styles.calificacionTexto}>
            Calificación:
          </Text>
          <Estrellas calificacion={recomendacion?.Calificación} />
          <Text style={styles.calificacionNumero}>
            {recomendacion?.Calificación} / 5
          </Text>
        </View>

        {/* Subtítulo para la descripción */}
        <Text style={styles.subtitulo}>
          Descripción
        </Text>

        {/* Contenedor de la descripción */}
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
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.PRIMARY,
    marginTop: 20,
    marginBottom: 5,
  },
  descripcionContainer: {
    marginTop: 10,
  },
  descripcion: {
    fontSize: 16,
    color: Colors.BLACK,
  },
});

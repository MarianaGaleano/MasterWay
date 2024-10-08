import { View, Text, Image } from 'react-native'; // Asegúrate de importar Image correctamente
import React from 'react';

export default function RecomendacionesListItem({ recomendaciones }) {  // Asegúrate de recibir correctamente 'recomendaciones'
  return (
    <View style={{
        padding: 10,
        marginRight: 15,
        backgroundColor: '#FFFFFF',  // Define el color directamente
        borderRadius: 10
    }}>
      <Image 
        source={{ uri: recomendaciones?.imageUrl }}  // Corrige el typo en 'source'
        style={{
            width: 100,
            height: 100,
            resizeMode: 'cover',  // Usa 'resizeMode' en vez de 'objectFit'
            borderRadius: 10
        }}
      />
      <Text style={{
          fontFamily: 'outfit',
          color: '#000000'  // Define el color directamente
      }}>
        {recomendaciones?.name}
      </Text>
      <View style={{
          display: 'flex',
          flexDirection: 'row',  // Corrige 'fexDirection' por 'flexDirection'
          justifyContent: 'space-between',
          alignItems: 'center'  // Corrige 'alingItems' por 'alignItems'
      }}>
        <Text style={{
            fontFamily: 'outfit-light',
            color: '#000000'
        }}>
          {recomendaciones?.breed}
        </Text>
        <Text style={{
            fontFamily: 'outfit-light',
            color: '#007AFF',  // Define el color del texto
            paddingHorizontal: 7,
            borderRadius: 10,
            fontSize: 11,
            backgroundColor: '#E0F7FA'  // Define el color de fondo directamente
        }}>
          {recomendaciones?.age} YRS
        </Text>
      </View>
    </View>
  );
}

import { View, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { useLocalSearchParams } from 'react-router'; // Asumo que estás usando react-router para las rutas
import { useNavigation } from '@react-navigation/native'; // React Navigation
import RecomendacionesInfo from '../../components/RecomendacionesDetails/RecomendacionesInfo';
import PerfilDeUsuario from '../../components/RecomendacionesDetails/PerfilDeUsuario';
import BotonGuardar from '../../components/RecomendacionesDetails/BotonGuardar';
import Comentarios from '../../components/RecomendacionesDetails/Comentarios';

export default function RecomendacionesDetails() {
  const recomendacion = useLocalSearchParams(); // Obtiene los parámetros de la recomendación
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: '',
    });
  }, []);

  return (
    <ScrollView>
      {/* Recomendacion info */}
      <RecomendacionesInfo recomendacion={recomendacion} />

      {/* Perfil de usuario */}
      <PerfilDeUsuario usuario={recomendacion.usuario} />

      {/* Botón de guardar recomendación */}
      <BotonGuardar />

      {/* Comentarios */}
      <Comentarios comentarios={recomendacion.comentarios} />
    </ScrollView>
  );
}

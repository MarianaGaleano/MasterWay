import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from 'react-native';
import { Colors } from '@/constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { setDoc, doc, addDoc} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Storage, db } from './../../configs/FirebaseConfig'; // Asegúrate de que Firebase esté correctamente importado
import { Picker } from '@react-native-picker/picker';
import { collection, getDocs } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';

// Placeholder de imagen de perfil, la puedes cambiar por una real
const profileImage = 'https://via.placeholder.com/40';

export default function Discover() {

  const router = useRouter();
  const [formData, setFormData] = useState({ Category: 'Hoteles' });
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(''); // Cambié el valor inicial a una cadena vacía
  const [image, setImage] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    GetCategories();
  }, []);

  const GetCategories = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'Category'));
      const categoriesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Mapea los datos
      setCategoryList(categoriesData);
    } catch (error) {
      console.error("Error al obtener categorías:", error); // Manejo de errores
    }
  };

  const imagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      //console.log('image: ',image)
    }
  };

  const handleInputChange = (fieldName, fieldValue) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: fieldValue
    }));
  };

  const UploadImage = async () => {
    setLoader(true);
    try {
      console.log('Form Data:', formData); // Para depuración
      //console.log('image', image);
      const resp = await fetch(image);  // Obtiene la imagen desde la URI
      const blobImage = await resp.blob();  // Convierte la imagen en un blob para subirla
      const imageName = '/recomendacionImage/' + Date.now() + '.jpg';
      const storageRef = ref(Storage, imageName);  // Crea una referencia para la imagen
      //console.log('StorageRef: ',storageRef);

      const snapshot = await uploadBytes(storageRef, blobImage);
      const downloadUrl = await getDownloadURL(snapshot.ref);  // Obtiene la URL de la imagen subida
      console.log('Image URL:', downloadUrl);
      SaveFormData(downloadUrl);  // Guarda los datos del formulario junto con la URL de la imagen
    } catch (error) {
      setLoader(false);
      console.error("Error al subir la imagen:", error);
      Alert.alert('Error', 'Hubo un problema al subir la imagen');
    }
  };

  const SaveFormData = async (imageUrl) => {
    const docId = Date.now().toString();
    try {
      await setDoc(doc(db, 'recomendaciones ', docId), {
        ...formData,
        imageUrl: imageUrl,  // Incluye la URL de la imagen subida
        id: docId,  // ID único del documento
      });
      setLoader(false);
      Alert.alert('Éxito', 'Recomendación publicada correctamente');
      router.replace('/home');  // Redirige a la pantalla principal
    } catch (error) {
      setLoader(false);
      console.error("Error al guardar datos:", error);
      Alert.alert('Error', 'Hubo un problema al guardar la recomendación');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      keyboardVerticalOffset={80} // Ajusta según la altura de tu barra de navegación
    >
      <ScrollView 
        style={{
          padding: 20, 
          marginTop: 20
        }} 
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.replace('/home')}>
            <Icon name="arrow-left" size={25} color={Colors.BLACK} />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Nueva Recomendación</Text>
          </View>
        </View>

        <View>
          <Text style={styles.inputContainer}>Nombre del lugar</Text>
          <TextInput 
            style={styles.input}
            onChangeText={(value) => handleInputChange('NombreDelLugar', value)}
          />
        </View>

        <View>
          <Text style={styles.inputContainer}>Ubicación</Text>
          <TextInput 
            style={styles.input}
            onChangeText={(value) => handleInputChange('Ubicación', value)}
          />
        </View>

        <View>
          <Text style={styles.inputContainer}>Categoría</Text>
          <Picker
            selectedValue={selectedCategory}
            style={styles.input}
            onValueChange={(itemValue) => {
              setSelectedCategory(itemValue);
              handleInputChange('Category', itemValue);
            }} 
          >
            {categoryList.map((category, index) => (
              <Picker.Item key={index} label={category.name} value={category.name} />
            ))}
          </Picker>
        </View>

        <View>
          <Text style={styles.inputContainer}>Calificación</Text>
          <TextInput 
            style={styles.input}
            keyboardType='number-pad'
            onChangeText={(value) => handleInputChange('Calificación', value)}
          />
        </View>

        <View>
          <Text style={styles.inputContainer}>Descripción</Text>
          <TextInput 
            onChangeText={(value) => handleInputChange('Descripción', value)}
            style={styles.input}
            numberOfLines={5}
            multiline={true}
          />
        </View>

        <View>
          <Text style={styles.inputContainer}>Subir fotos</Text>
          <TouchableOpacity onPress={imagePicker}>
            {!image ? (
              <Image 
                source={{ uri: profileImage }} 
                style={styles.profileImage} 
              />
            ) : (
              <Image 
                source={{ uri: image }} 
                style={styles.profileImage} 
              />
            )}
          </TouchableOpacity>
        </View>

        {/* BOTÓN PUBLICAR */}
        <TouchableOpacity 
          style={{
            padding: 15,
            backgroundColor: Colors.PRINCIPAL,
            borderRadius: 15,
            margin: 20,
            fontFamily: 'popins-bold'
          }}
          disabled={loader}
          onPress={UploadImage}>
          {loader ? (
            <ActivityIndicator size={'large'} />
          ) : (
            <Text style={{
              color: Colors.BLACK,
              textAlign: 'center',
              fontSize: 20,
              fontFamily: 'popins-bold'
            }}>Publicar</Text>
          )}
        </TouchableOpacity>

        {/* Espaciador para asegurar que el botón sea visible */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  titleContainer: {
    flexDirection: 'column',
    marginLeft: 10,
    color: Colors.PRINCIPAL,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'popins-bold',
  },
  inputContainer: {
    fontSize: 20,
    marginTop: 25,
    color: Colors.PRINCIPAL,
    fontFamily: 'popins-bold',
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    marginTop: 5,
    borderColor: Colors.GRAY,
    fontFamily: 'poppins',
  },
  profileImage: {
    width: 100,
    height: 100,
  },
});
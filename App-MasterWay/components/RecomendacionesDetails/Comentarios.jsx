import { View, Text, TextInput, Button, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Colors } from './../../constants/Colors';

export default function Comentarios({ comentarios }) {
  const [newComment, setNewComment] = useState('');
  const [allComments, setAllComments] = useState(comentarios);
  
  const handleAddComment = () => {
    if (newComment.trim()) {
      const newComentario = {
        id: allComments.length + 1,
        usuario: 'Tú', 
        comentario: newComment,
        avatar: 'https://www.example.com/avatar.jpg' // URL de imagen de avatar de ejemplo
      };
      setAllComments([...allComments, newComentario]);
      setNewComment('');
    }
  };

  return (
    <View style={styles.container}>
      {/* Título de Comentarios */}
      <Text style={styles.title}>Comentarios</Text>

      {/* Campo de agregar comentario */}
      <View style={styles.addCommentContainer}>
        <Image 
          source={{ uri: './../../assets/images/logo.png' }} // URL de avatar de ejemplo
          style={styles.avatar}
        />
        <TextInput 
          style={styles.input} 
          placeholder="Añade un comentario..." 
          value={newComment} 
          onChangeText={setNewComment} 
        />
      </View>
      <Button 
        title="Comentar" 
        onPress={handleAddComment} 
        color="#63D2D9"
      />

      {/* Lista de comentarios */}
      <FlatList
        data={allComments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.commentContainer}>
            <View style={styles.commentHeader}>
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              <Text style={styles.commentUser}>{item.usuario.toUpperCase()}</Text>
            </View>
            <Text style={styles.commentText}>{item.comentario}</Text>
          </View>
        )}
      />

      {/* Botón para ver todos los comentarios */}
      <TouchableOpacity style={styles.viewAllButton} onPress={() => alert("Ver todos los comentarios")}>
        <Text style={styles.viewAllText}>Leer todos los comentarios</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    color: Colors.PRIMARY,
    fontWeight: 'bold',
    marginBottom: 15, // Espacio debajo del título
  },
  addCommentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  commentContainer: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#63D2D9', // Se corrige el color
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  commentUser: {
    fontWeight: 'bold',
    fontSize: 14,
    marginRight: 10,
  },
  commentText: {
    fontSize: 14,
    color: '#fff', // Color del texto del comentario
    marginTop: 5,
  },
  viewAllButton: {
    alignSelf: 'center',
    marginTop: 10,
    padding: 10,
    borderColor: '#63D2D9',
    borderWidth: 1,
    borderRadius: 5,
  },
  viewAllText: {
    color: '#63D2D9',
    fontWeight: 'bold',
  },
});

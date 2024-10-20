import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import React, { useState } from 'react';

export default function Comentarios({ comentarios }) {
  const [newComment, setNewComment] = useState('');
  const [allComments, setAllComments] = useState(comentarios);

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newComentario = {
        id: allComments.length + 1,
        usuario: 'Tú', 
        comentario: newComment,
      };
      setAllComments([...allComments, newComentario]);
      setNewComment('');
    }
  };

  return (
    <View style={styles.container}>
      {/* Campo de agregar comentario */}
      <TextInput 
        style={styles.input} 
        placeholder="Añade un comentario..." 
        value={newComment} 
        onChangeText={setNewComment} 
      />
      <Button 
        title="Comentar" 
        onPress={handleAddComment} 
      />

      {/* Lista de comentarios */}
      <FlatList
        data={allComments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.commentContainer}>
            <Text style={styles.commentUser}>{item.usuario}</Text>
            <Text style={styles.commentText}>{item.comentario}</Text>
          </View>
        )}
      />

      {/* Botón para ver todos los comentarios */}
      <Button 
        title="Leer todos los comentarios" 
        onPress={() => Alert.alert("Ver todos los comentarios")} 
        color="#00a680" 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  commentContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  commentUser: {
    fontWeight: 'bold',
  },
  commentText: {
    marginTop: 5,
  },
});

import { View, Text, TextInput, Button, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Colors } from './../../constants/Colors';
import { auth, db } from './../../configs/FirebaseConfig';  
import { doc, getDoc, collection, addDoc, onSnapshot, Timestamp } from 'firebase/firestore';

const addCommentToFirebase = async (placeId, user, commentText) => {
  try {
    const commentsRef = collection(db, `recomendaciones/${placeId}/comments`);
    await addDoc(commentsRef, {
      userId: user.id,
      userName: user.name,
      userPhoto: user.photo,
      comment: commentText,
      timestamp: Timestamp.now(),
    });
    console.log("Comentario agregado correctamente");
  } catch (error) {
    console.error("Error al agregar comentario:", error);
  }
};

export default function Comentarios({ placeId }) {
  const [newComment, setNewComment] = useState('');
  const [allComments, setAllComments] = useState([]);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      if (auth.currentUser) {
        const userDocRef = doc(db, 'users', auth.currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      }
    };
    getUserData();
  }, []);

  useEffect(() => {
    const commentsRef = collection(db, `recomendaciones/${placeId}/comments`);
    const unsubscribe = onSnapshot(commentsRef, (snapshot) => {
      const fetchedComments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAllComments(fetchedComments);
    });

    return () => unsubscribe();
  }, [placeId]);

  const handleAddComment = async () => {
    if (newComment.trim()) {
      const newComentario = {
        id: allComments.length + 1,
        usuario: 'Tú',
        comentario: newComment,
        avatar: userData?.profilePictureUrl || require('./../../assets/images/logo.png'),
      };
      setAllComments([...allComments, newComentario]);
      setNewComment('');

      // Agregar comentario a Firebase
      await addCommentToFirebase(placeId, userData, newComment);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comentarios</Text>
      <View style={styles.addCommentContainer}>
        <Image 
          source={
            userData?.profilePictureUrl
              ? { uri: userData.profilePictureUrl }
              : require('./../../assets/images/logo.png')
          } 
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
    marginBottom: 15,
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
    backgroundColor: '#63D2D9',
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
    color: '#fff',
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

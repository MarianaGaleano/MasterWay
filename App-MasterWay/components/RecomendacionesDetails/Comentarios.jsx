import { View, Text, TextInput, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Colors } from './../../constants/Colors';
import { auth, db } from './../../configs/FirebaseConfig';  
import { doc, getDoc, collection, addDoc, onSnapshot, Timestamp } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons'; 

// Función para agregar comentarios a Firestore
const addCommentToFirebase = async (placeId, user, commentText) => {
  try {
    const commentsRef = collection(db, `recomendaciones /${placeId}/comments`);
    await addDoc(commentsRef, {
      username: user.username, 
      profileImage: user.profilePictureUrl,
      commentText,
      createdAt: Timestamp.now(),
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
  const [showAllComments, setShowAllComments] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Obtener datos del usuario actual
  useEffect(() => {
    const getUserData = async () => {
      if (auth.currentUser) {
        const userDocRef = doc(db, 'users', auth.currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        } else {
          console.log("No se encontraron datos para el usuario.");
        }
      }
    };
    getUserData();
  }, []);

  // Verifica que el placeId esté correctamente recibido
  useEffect(() => {
    if (!placeId) {
      console.error("El placeId no se ha recibido correctamente.");
    }
  }, [placeId]);

  // Escuchar comentarios de Firestore
  useEffect(() => {
    const commentsRef = collection(db, `recomendaciones /${placeId}/comments`);
    const unsubscribe = onSnapshot(commentsRef, (snapshot) => {
      const fetchedComments = snapshot.docs.map((doc) => ({
        id: doc.id,
        username: doc.data().username,
        profileImage: doc.data().profileImage,
        commentText: doc.data().commentText,
        createdAt: doc.data().createdAt?.toDate(),
      }));
      setAllComments(fetchedComments);
    });

    return () => unsubscribe();
  }, [placeId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      alert("El comentario no puede estar vacío.");
      return;
    }

    if (!userData || !userData.username || !userData.profilePictureUrl) {
      alert("No se han cargado los datos del usuario.");
      console.error("Datos del usuario incompletos:", userData);
      return;
    }

    // Asegúrate de que `placeId` no sea undefined
    if (!placeId) {
      alert("ID del lugar no disponible.");
      console.error("placeId es undefined:", placeId);
      return;
    }

    try {
      await addCommentToFirebase(placeId, userData, newComment);
      setNewComment('');
    } catch (error) {
      console.error("Error al agregar comentario:", error);
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
        <TouchableOpacity 
          style={styles.commentButton}
          onPress={handleAddComment}
        >
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={showAllComments ? allComments : allComments.slice(0, 3)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.commentContainer}>
            <View style={styles.commentHeader}>
              <Image source={{ uri: item.profileImage }} style={styles.avatar} />
              <View style={styles.textContainer}>
                <Text style={styles.commentUser}>{item.username.toUpperCase()}</Text>
                <Text style={styles.commentText}>{item.commentText}</Text>
                <Text style={styles.commentDate}>{item.createdAt?.toLocaleString()}</Text>
              </View>
            </View>
          </View>
        )}
      />
      {allComments.length > 3 && (
        <TouchableOpacity 
          style={styles.viewAllButton} 
          onPress={() => setShowAllComments(!showAllComments)}
          onPressIn={() => setIsHovered(true)}
          onPressOut={() => setIsHovered(false)}
        >
          <Text style={styles.viewAllText}>{showAllComments ? "Ver menos comentarios" : "Leer todos los comentarios"}</Text>
        </TouchableOpacity>
      )}
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
    width: 50,
    height: 50,
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
  commentButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: Colors.PRINCIPAL,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  commentContainer: {
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 15,
    padding: 15,
    backgroundColor: Colors.PRINCIPAL,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    marginVertical: 10,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  textContainer: {
    flexShrink: 1, // Hace que el texto se ajuste al espacio disponible
  },
  commentUser: {
    fontSize: 15,
    fontWeight: 'bold',
    marginRight: 10,
    color: Colors.BLACK,
  },
  commentText: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
  },
  commentDate: {
    fontSize: 14,
    color: '#ddd',
    marginTop: 5,
  },
  viewAllButton: {
    marginTop: 8, 
    backgroundColor: Colors.WHITE, 
    paddingVertical: 15, 
    borderRadius: 25, 
    alignItems: 'center',
    borderColor: Colors.BLACK,
    borderWidth: 1,
  },
  viewAllText: {
    color: Colors.BLACK, 
    textAlign: 'center', 
    fontFamily: 'popins-bold',
  },
});

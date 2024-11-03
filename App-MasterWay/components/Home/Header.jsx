import React, { useState, useEffect } from 'react'; // Agregar useState y useEffect aquí
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from './../../constants/Colors';
import { auth } from './../../configs/FirebaseConfig';  
import { doc, getDoc } from 'firebase/firestore';  
import { db } from './../../configs/FirebaseConfig';

export default function Header() {
  const navigation = useNavigation();
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

  return (
    <View style={styles.header}>
      <Text style={styles.title}>
        Master<Text style={styles.highlight}>Way</Text>
      </Text>
      
      <TouchableOpacity onPress={() => navigation.navigate('profile')}>
        <Image 
          source={
            userData?.profilePictureUrl
              ? { uri: userData.profilePictureUrl }
              : require('./../../assets/images/logo.png')
          } 
          style={styles.profileImage} 
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'popins-bold',
    fontSize: 30,
    textAlign: 'center',
  },
  highlight: {
    color: Colors.PRINCIPAL,
  },
  profileImage: {
    width: 65,
    height: 65,
    borderRadius: 50,
  },
});

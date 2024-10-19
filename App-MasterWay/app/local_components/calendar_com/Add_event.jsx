import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Colors } from '@/constants/Colors';
import dayjs from 'dayjs';
//import { useRouter } from 'expo-router';
//import { auth } from '../../../configs/FirebaseConfig';  
//import { doc, getDoc, updateDoc } from 'firebase/firestore';  
//import { db } from '../../../configs/FirebaseConfig';
import { Input } from '@mui/material';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

export default function Add_Event() {
  const [value, setValue] = React.useState(dayjs('2022-04-17'));
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  //const [time, setTime] = useState(new ());
  //const router = useRouter();
  //const [userData, setUserData] = useState(null);
  //const [editingField, setEditingField] = useState(null); // Controla qué campo está en modo de edición
  //const [editedData, setEditedData] = useState({}); // Almacena los cambios que el usuario hace

 // useEffect(() => {
 //   const getUserData = async () => {
  //    if (auth.currentUser) {
  //      const userDocRef = doc(db, 'users', auth.currentUser.uid);
  //      const userDoc = await getDoc(userDocRef);
  //      if (userDoc.exists()) {
  //        setUserData(userDoc.data());
  //        setEditedData(userDoc.data()); // Inicializa los valores editados con los datos actuales
  //      }
  //    }
  //  };
  //  getUserData();
 // }, []);

//  const handleSave = async (field) => {
//    if (auth.currentUser) {
//      const userDocRef = doc(db, 'users', auth.currentUser.uid);
//      await updateDoc(userDocRef, { [field]: editedData[field] });
//    }
//    setEditingField(null); // Sale del modo de edición
//  };

  return (

    <><><View style={styles.container}>

            <Input
            placeholder='Seleccionar evento'
            value ={null}
            onChangeText={value => {}}
            />


            <Input
            placeholder='Descripcion'
            value ={null}
            onChangeText={value => {}}
            />
             
            <Input
            placeholder='Hora inicio'
            value ={null}
            onChangeText={value => {}}
            />
    </View><>

    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker']}>
        <DatePicker label="Uncontrolled picker" defaultValue={dayjs('2022-04-17')} />
        <DatePicker
          label="Controlled picker"
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
      </DemoContainer>
    </LocalizationProvider></></>
        

          <TouchableOpacity onPress={() => router.replace('../../calendar')}
          style={styles.button}>
          <Text style={styles.buttonText}>cancelar</Text>
          </TouchableOpacity></>
          

  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1, 
    paddingHorizontal: 4
  },
  form: {
    gap: 18,
    marginTop: 20,
  },
  button: {
    backgroundColor: '#63D2D9',
    padding: 10,
    borderRadius: 10,
    marginTop: 20
  }
  });
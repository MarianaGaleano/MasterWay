import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import dayjs from 'dayjs';
import { Input } from '@mui/material';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { TimeClock } from '@mui/x-date-pickers/TimeClock';

export default function Add_Event() {
  const [startSelectedDate, startsetSelectedDate] = useState(dayjs(new Date()));
  const [finalSelectedDate, finalsetSelectedDate] = useState(dayjs(new Date()));
  const [startSelectedTime, startsetSelectedTime] = useState(dayjs(new Date()));
  const [finalSelectedTime, finalsetSelectedTime] = useState(dayjs(new Date()));
  //const [value, setValue] = React.useState(dayjs('2022-04-17'));
  const handlestartDateChange = (newDate) => {
    startsetSelectedDate(newDate);
  };

  const handlefinalDateChange = (newDate) => {
    finalsetSelectedDate(newDate);
  };

  const handlestartTimeChange = (newTime) => {
    startsetSelectedTime(newTime);
  };

  const handlefinalTimeChange = (newTime) => {
    finalsetSelectedTime(newTime);
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
             
           
    </View><>

    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <View style={styles.container_date}>
          <View style={styles.row}>
          <Text style={styles.label}>Fecha inicio:</Text>
            <DatePicker
            value={startSelectedDate}
            onChange={handlestartDateChange}
            />
            <TimePicker
            value={startSelectedTime}
            onChange={handlestartTimeChange}
            />
          </View>
          
          <View style={styles.row}>
          <Text style={styles.label}>Fecha  final:</Text>
            <DatePicker
            value={finalSelectedDate}
            onChange={handlefinalDateChange}
            />
            <TimePicker
            value={finalSelectedTime}
            onChange={handlefinalTimeChange}
            />
          </View>
      </View>
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
  },

  container_date: {
    flex: 1,
    padding: 50,
    marginTop: 20,
  },
  row: {

    flexDirection: 'row',
    justifyConten: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#63D2D9',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  label: {
    marginRight: 10
  },
});
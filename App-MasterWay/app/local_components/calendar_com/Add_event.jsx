import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import dayjs from 'dayjs';
import { Input } from '@mui/material';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';

export default function Add_Event() {
  const [startSelectedDate, startsetSelectedDate] = useState(dayjs(new Date()));
  const [finalSelectedDate, finalsetSelectedDate] = useState(dayjs(new Date()));
  const [startSelectedTime, startsetSelectedTime] = useState(dayjs(new Date()));
  const [finalSelectedTime, finalsetSelectedTime] = useState(dayjs(new Date()));
  const [isToggled, setIsToggled] = useState(false);

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

  const toggleSwitch = () => {
    setIsToggled(!isToggled);
    if (isToggled) {
      startsetSelectedTime(dayjs().hour(12).minute(0)); // cambiar a 12:00am
      finalsetSelectedTime(dayjs().hour(23).minute(59)); // cambiar a 11:59pm
    }
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

          <View style={styles.form}>
            <Input
            placeholder='Seleccionar evento'
            value ={null}
            onChangeText={value => {}}
            />
          </View>

          <View style={styles.form}>
            <Input
            placeholder='Descripcion'
            value ={null}
            onChangeText={value => {}}
            />
          </View>

          <View style={styles.form}>
             <View style={styles.boxAllDay}>
                <AccessTimeIcon size={50} style={{ marginRight: 10}}/>
                <Text style={styles.allDayText}>Todo el día</Text>
                
                <TouchableOpacity onPress={toggleSwitch}>
                {isToggled ? (
                  <ToggleOnIcon size={50} color="success" style={{ marginLeft: 50}}/>
                ) : (
                  <ToggleOffIcon size={50}  color="disabled" style={{ marginLeft: 50}}/>
                )}</TouchableOpacity>
              </View>
          </View>
           
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
            disabled={isToggled}
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
            disabled={isToggled}
            />
          </View>
      </View>
    </LocalizationProvider></></>

        
    <View style={styles.row}>          
    <TouchableOpacity onPress={() => router.replace('../../calendar')}
      style={styles.button}>
      <Text style={styles.buttonText}>Cancelar</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => router.replace('../../calendar')}
    style={styles.button}>
    <Text style={styles.buttonText}>Guardar</Text>
    </TouchableOpacity>
    </View></>        

  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginTop: 50, 
    paddingHorizontal: 4,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  form: {
    flex: 1,
    marginTop: 10,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#63D2D9', // Color azul cian
    borderRadius: 5, // Agrega bordes redondeados para un aspecto más suave
    paddingHorizontal: 40,
    paddingVertical: 20,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  button: {
    backgroundColor: '#63D2D9',
    padding: 15,
    marginTop: 40,
    marginBottom: 50,
    marginLeft: 50,
    marginRight: 50,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  container_date: {
    flex: 1,
    marginTop: 120,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#63D2D9',
    padding: 10,
    paddingVertical: 10,
  },
  row: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    marginRight: 10
  },
  boxAllDay: {
    display: 'flex',
    flexDirection: 'row', // Establecemos la dirección de los elementos como fila
    alignItems: 'center', // Alineamos los elementos verticalmente al centro
    justifyContent: 'space-between',
  },
  allDayText: {
    fontSize: 20,
    color: '#6C6C6C',
    fontWeight: 'bold',
  },
});
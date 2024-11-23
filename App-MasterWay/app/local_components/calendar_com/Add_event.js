import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useRouter} from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { db } from '../../../configs/FirebaseConfig';
import { doc, addDoc, collection } from 'firebase/firestore';
import { auth } from '../../../configs/FirebaseConfig';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';  
import { useNavigation } from 'expo-router';
import dayjs from 'dayjs';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import { setDoc } from 'firebase/firestore';

export default function Add_Event() {
  const router = useRouter();
  const user = auth.currentUser;
  const queryParams = useLocalSearchParams();
  
  const isEditing = queryParams.isEditing === 'true'; // Asegúrate de convertir a booleano
  const eventToEdit = queryParams.eventToEdit;
  const parsedEvent = eventToEdit ? JSON.parse(decodeURIComponent(eventToEdit)) : null;

  //console.log(useLocalSearchParams());
  //console.log("isEditing:", isEditing);
  //console.log("eventToEdit:", parsedEvent);
  //console.log("startSelectedDateP ", parsedEvent.startSelectedDate)

  const navigation = useNavigation();
  const [startSelectedDate, startsetSelectedDate] = useState(dayjs(new Date()));
  const [finalSelectedDate, finalsetSelectedDate] = useState(dayjs(new Date()));
  const [startSelectedTime, startsetSelectedTime] = useState(dayjs(new Date()));
  const [finalSelectedTime, finalsetSelectedTime] = useState(dayjs(new Date()));
  const [isToggled, setIsToggled] = useState(false);
  const [nameEvent] = useState('');
  const [description] = useState('');
  

  const [newEvent, setnewEvent] = useState({
    nameEvent,
    description,
    startSelectedDate,
    finalSelectedDate,
    startSelectedTime,
    finalSelectedTime,
  })

  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    if (isEditing && parsedEvent && !isDataLoaded) {
      setnewEvent({
        nameEvent: parsedEvent.nameEvent || '',
        description: parsedEvent.description || '',
        startSelectedDate: dayjs(parsedEvent.startSelectedDate),
        finalSelectedDate: dayjs(parsedEvent.finalSelectedDate),
        startSelectedTime: dayjs(parsedEvent.startSelectedTime, 'HH:mm:ss'),
        finalSelectedTime: dayjs(parsedEvent.finalSelectedTime, 'HH:mm:ss'),
      });
    }
      setIsDataLoaded(true);
  }, [isEditing, parsedEvent, isDataLoaded]); // Se agrega dependencia de parsedEvent
  
  
  if (!isDataLoaded) {
    return <Text>Cargando...</Text>; // Placeholder mientras se cargan los datos
  }

  const UpdateEvent = async()=>{
    try{
    //if (!newEvent.nameEvent || !newEvent.description || !newEvent.startSelectedDate || !newEvent.finalSelectedDate) {
    //  alert("por favor llena todos los campos");
    //  return;
    //}
    console.log('fecha seleccionada: ',startSelectedDate);
    const formattedStartDate = dayjs(newEvent.startSelectedDate).format('YYYY-MM-DD');
    const formattedStartTime = dayjs(newEvent.startSelectedTime).format('HH:mm:ss');
    const formattedEndDate = dayjs(newEvent.finalSelectedDate).format('YYYY-MM-DD');
    const formattedEndTime = dayjs(newEvent.finalSelectedTime).format('HH:mm:ss');
        
    const eventToSave = {
    ...newEvent,
    userId: user.uid,
    startSelectedDate: formattedStartDate,
    startSelectedTime: formattedStartTime,
    finalSelectedDate: formattedEndDate,
    finalSelectedTime: formattedEndTime,
    };

    if (isEditing && eventToEdit) {
      // Actualizar evento existente
      const eventRef = doc(db, 'events', parsedEvent.id);
      await setDoc(eventRef, eventToSave, { merge: true }); // Actualización parcial
    }
    else {
      const eventRef = collection(db, "events");
      await addDoc(eventRef, eventToSave);
    }

    alert(isEditing === 'true' ? 'Evento actualizado con éxito' : 'Evento guardado con éxito');
    router.replace('../../calendar');
  } catch (error) {
    console.error('Error al guardar el evento:', error);
    alert('Hubo un error al guardar el evento. Por favor, inténtalo nuevamente.');
  }
    };
    
  //constantes que van a cambiar el estado de los campos;
  const handleNameChange = (text) => {
    setnewEvent((prevEvent) => ({
      ...prevEvent, //prevEventcopia todas las propiedades del estado anterior
                    //al nuevo objeto
      nameEvent: text,
    }));
  };
  
  const handleDescriptionChange = (text) => {
    setnewEvent((prevEvent) => ({
      ...prevEvent,
      description: text,
    }));
  };

  const handlestartDateChange = (newDate) => {
    setnewEvent((prevEvent) => ({
      ...prevEvent,
      startSelectedDate: dayjs(newDate),
    }));
  };

  const handlefinalDateChange = (newDate) => {
    setnewEvent((prevEvent) => ({
      ...prevEvent,
      finalSelectedDate: dayjs(newDate),
    }));
  };
  
  const handlestartTimeChange = (newTime) => {
    setnewEvent((prevEvent) => ({
      ...prevEvent,
      startSelectedTime: dayjs(newTime, 'HH:mm:ss'),
    }));
  };
  
  const handlefinalTimeChange = (newTime) => {
    setnewEvent((prevEvent) => ({
      ...prevEvent,
      finalSelectedTime: dayjs(newTime, 'HH:mm:ss'),
    }));
  };

  const toggleSwitch = () => {
    setIsToggled(!isToggled);
    if (isToggled) {
      startsetSelectedTime(dayjs().hour(0).minute(0)); // cambiar a 12:00am
      finalsetSelectedTime(dayjs().hour(23).minute(59)); // cambiar a 11:59pm
    }
  };

  return (

    <><><View style={styles.container}>

          <View style={styles.form}>
            <View style={styles.infoText}>
              <TextInput
              placeholder='Seleccionar evento'
              value ={newEvent.nameEvent}
              onChangeText={handleNameChange}
              />
            </View>
          </View>

          <View style={styles.form}>
            <View style={styles.infoText}>
              <TextInput
              placeholder='Descripcion'
              value ={newEvent.description}
              onChangeText={handleDescriptionChange}
                
              />
            </View>
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
            value={newEvent.startSelectedDate}
            type={Date}
            onChange={handlestartDateChange}
            />
            <TimePicker
            value={newEvent.startSelectedTime}
            onChange={handlestartTimeChange}
            disabled={isToggled}
            />
          </View>
          
          <View style={styles.row}>
          <Text style={styles.label}>Fecha  final:</Text>
            <DatePicker
            value={newEvent.finalSelectedDate}
            type={Date}
            onChange={handlefinalDateChange}
            />
            <TimePicker
            value={newEvent.finalSelectedTime}
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

    <TouchableOpacity onPress={() => UpdateEvent()}
    style={styles.button}>
    <Text style={styles.buttonText}>{isEditing ? 'Actualizar' : 'Guardar'}</Text>
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
    borderColor: '#63D2D9',
    borderRadius: 5,
    paddingHorizontal: 40,
    paddingVertical: 20,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  infoText: {
    fontSize: 16,
    color: '#757575',
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
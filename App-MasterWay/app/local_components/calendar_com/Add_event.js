import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
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
  
  const isSelectEvent = queryParams?.isSelectEvent === 'true';
  const nameEventFav = queryParams.setNameEvent || '';
  const paramEvent = queryParams.ParamEvent;
  const paramEventConv = paramEvent ? JSON.parse(decodeURIComponent(paramEvent)) : null;
  const isEditing = queryParams.isEditing === 'true'; // Asegúrate de convertir a booleano
  const eventToEdit = queryParams.eventToEdit;
  const parsedEvent = eventToEdit ? JSON.parse(decodeURIComponent(eventToEdit)) : null;
  const eventId = parsedEvent?.id;
  const eventParamId = paramEventConv?.id;
  console.log('eventParamId',eventParamId);

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
  const [nameEvent, setNameEvent] = useState('');
  const [description] = useState('');
  const [isLoader, setIsLoader] = useState(false);
  

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
    setIsLoader(true);

    if (isEditing && parsedEvent && !isDataLoaded) {
      setnewEvent({
        nameEvent: parsedEvent.nameEvent || '',
        description: parsedEvent.description || '',
        startSelectedDate: dayjs(parsedEvent.startSelectedDate),
        finalSelectedDate: dayjs(parsedEvent.finalSelectedDate),
        startSelectedTime: dayjs(parsedEvent.startSelectedTime, 'HH:mm:ss'),
        finalSelectedTime: dayjs(parsedEvent.finalSelectedTime, 'HH:mm:ss'),
      });
    } else if (isSelectEvent){
        setnewEvent({
          nameEvent: nameEventFav || '',
          description: paramEventConv.description || '',
          startSelectedDate: dayjs(paramEventConv.startSelectedDate),
          finalSelectedDate: dayjs(paramEventConv.finalSelectedDate),
          startSelectedTime: dayjs(paramEventConv.startSelectedTime, 'HH:mm:ss'),
          finalSelectedTime: dayjs(paramEventConv.finalSelectedTime, 'HH:mm:ss'),
        });
    }
      setIsDataLoaded(true);
      setIsLoader(false);
  }, [isEditing, parsedEvent, isDataLoaded]); // Se agrega dependencia de parsedEvent
  
  

  const UpdateEvent = async()=>{
    setIsLoader(true);
    console.log('isEditing',isEditing)
    try{
    if (!newEvent.nameEvent || !newEvent.description || !newEvent.startSelectedDate || !newEvent.finalSelectedDate) {
      alert("por favor llena todos los campos");
      return;
    }
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

    // Actualizar evento si `isEditing` es verdadero y hay un ID
    if (isEditing) {
      const idToUpdate = eventId || eventParamId; // Prioriza `eventId` y luego `eventParamId`
      if (!idToUpdate) {
        alert("No se encontró un ID válido para actualizar el evento.");
        return;
      }

      // Referencia al documento de Firestore
      const eventRef = doc(db, 'events', idToUpdate);
      await setDoc(eventRef, eventToSave, { merge: true }); // Actualiza parcialmente el documento
      alert('Evento actualizado con éxito');
    } else {
      // Crear un evento nuevo si no estamos en modo edición
      const eventRef = collection(db, 'events');
      await addDoc(eventRef, eventToSave); // Crea un nuevo documento
      alert('Evento guardado con éxito');
    }

    router.replace('../../calendar');
  } catch (error) {
    console.error('Error al guardar el evento:', error);
    alert('Hubo un error al guardar el evento. Por favor, inténtalo nuevamente.');
  } finally {
    setIsLoader(false); // Desactiva el loader al terminar
  }
  };
    
  //constantes que van a cambiar el estado de los campos;
  const handleEventNameClick = () => {

    if (eventId) {
      // Si el evento tiene un `eventId`, lo añadimos correctamente al estado.
      setnewEvent((prevEvent) => {
          const updatedEvent = {
              ...prevEvent,
              id: eventId,
          };
          const ParamEvent = encodeURIComponent(JSON.stringify(updatedEvent));
          console.log('eventId', updatedEvent.id);
          router.push(`../../(tabs)/favorites?isSelectEvent=true&isEditing=true&setNameEvent=${nameEvent}&ParamEvent=${ParamEvent}`);
          return updatedEvent;
      });
    } else {
      const formattedEvent = {
      ...newEvent,
      startSelectedTime: dayjs(newEvent.startSelectedTime).format('HH:mm:ss'),
      finalSelectedTime: dayjs(newEvent.finalSelectedTime).format('HH:mm:ss'),
      };
      const ParamEvent = encodeURIComponent(JSON.stringify(formattedEvent));
      router.push(`../../(tabs)/favorites?isSelectEvent=true&setNameEvent=${nameEvent}&ParamEvent=${ParamEvent}`); // Navegar a Favoritos y pasar la función
      console.log("setNameEvent: ", nameEvent);
      }
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
    setIsToggled((prev) => {
      const newToggledValue = !prev; // Invierte el estado actual
  
      // Actualiza las horas según el nuevo estado
      if (newToggledValue) {
        // Si el toggle está activado (Todo el día)
        setnewEvent((prevEvent) => ({
          ...prevEvent,
          startSelectedTime: dayjs().hour(0).minute(0), // 00:00
          finalSelectedTime: dayjs().hour(23).minute(59), // 23:59
        }));
      } else {
        // Si el toggle está desactivado, restablece las horas actuales
        setnewEvent((prevEvent) => ({
          ...prevEvent,
          startSelectedTime: dayjs(),
          finalSelectedTime: dayjs(),
        }));
      }
  
      return newToggledValue;
    });
  };

  return (

    <><><View style={styles.container}>

          <View style={styles.form}>
            <View style={styles.infoText}>
              <TouchableOpacity onPress={handleEventNameClick}>
              <TextInput
              placeholder='Seleccionar evento'
              value ={newEvent.nameEvent}
              onChangeText={handleEventNameClick}
              editable={false}
              />
              </TouchableOpacity>
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

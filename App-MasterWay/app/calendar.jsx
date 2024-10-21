import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native'
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { auth } from './../configs/FirebaseConfig';
import { db } from './../configs/FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { Link, useRouter, useNavigation} from 'expo-router';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import './local_components/calendar_com/calendar_comp';

export default function Calendar() {
  const navigation=useNavigation();
  const user = auth.currentUser;
  const router = useRouter();
  const backImage = 'https://via.placeholder.com/40';
  const profileImage = 'https://via.placeholder.com/40';
  const [value, setValue] = React.useState(new Date());
  //const [events, setEvents] = useState({});
  const [selectedEvent, setSelectedEvent] = useState(dayjs(new Date()));
  const [TimeEvent, setTimeEvent] = useState(dayjs(new Date()));
  //obtener los eventos de la base de datos
  //que fueron agregados por el usuario

  //useEffect(() => {
  //  const fetchEvents = async () => {
  //    if (auth.currentUser) {
  //      const eventDocRef = doc(db, 'events', auth.currentUser.uid);
  //      const eventDoc = await getDoc(eventDocRef);
  //      events(eventDoc.data);
  //      setEvents(eventDoc.data); // Actualiza el estado del componente con los eventos
  //    }
  //  };
  //  fetchEvents();
  //}, []);

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
  };

  const handleTimeSelect = (event) => {
    setTimeEvent(event);
  };

  //const dateEvent = [
  //  {date: events.startSelectedDate},
  //  {date: events.finalSelectedDate},
  //];

  //const markedDates = dateEvent.lenght > 0
  //? dateEvent.reduce((acc, event) => {
  //  acc[event.date] = { marked: true, dotColor: 'red' };
  //  return acc;
//}, {})
//: {};

  return (
    <><><View style={styles.container}>

      <TouchableOpacity onPress={() => router.replace('../(tabs)/dashboard')}>
        <Image
          source={{ uri: backImage }}
          style={styles.backImage} />
      </TouchableOpacity>

      <Text style={styles.title}>Calendario</Text>

      <TouchableOpacity onPress={() => router.replace('../(tabs)/profile')}>
        <Image
          source={{ uri: profileImage }}
          style={styles.profileImage} />
      </TouchableOpacity>
    </View><>

        <LocalizationProvider dateAdapter={AdapterDateFns}>

          <StaticDatePicker
            orientation="portrait"
            openTo='day'
            value={new Date}
            onChange={(newValue) => {
              setValue(newValue);
            } }
            renderInput={(params) => <TextField {...params} />} />
        </LocalizationProvider></></>

        <View style={styles.eventDetails}>
          <Text style={styles.eventDate}>
            {selectedEvent.startSelectedDate} - {selectedEvent.finalSelectedDate}
          </Text>
        </View>
        
        <TouchableOpacity onPress={() => router.replace('/local_components/calendar_com/Add_event')}
          style={styles.button}>
        <Text style={styles.buttonText}>Agregar evento</Text>
        </TouchableOpacity></>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'popins-bold',
    fontSize: 30,
    margintop: 20,
    color: '#63D2D9',
  },
  profileImage: {
    width: 65,
    height: 65,
    borderRadius: 50,
    marginTop: 20,
  },
  backImage: {
    width: 65,
    height: 65,
    borderRadius: 50,
    marginTop: 20,
  },
  eventDetails: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventDate: {
    marginTop: 5,
  },
  button: {
      backgroundColor: '#63D2D9',
      padding: 20,
      borderRadius: 10,
      marginTop: 20
  },
  buttonText: {
      color: '#FFFFFF',
      textAlign: 'center',
      fontFamily: 'popins-bold',
}
});
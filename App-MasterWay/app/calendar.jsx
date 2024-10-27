import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native'
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
//import Badge from '@mui/material/Badge';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { auth } from './../configs/FirebaseConfig';
import { db } from './../configs/FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { Link, useRouter, useNavigation} from 'expo-router';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import './local_components/calendar_com/calendar_comp';

dayjs.extend(isBetween);
  const CustomDay = ({ selected, ...other }) => {
    return (
      <PickersDay
        {...other}
        style={{ backgroundColor: selected ? '#63D2D9' : '' }}
      />
    );
  };
//serverDay se usa para personalizar la forma en que
//se muestran las fechas de los eventos
function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
  highlightedDays.some(
    (date) => dayjs(date).isSame(day, 'day')
  );

  return (
      <CustomDay {...other} outsideCurrentMonth={outsideCurrentMonth} 
      day={day} 
      selected={isSelected} />
  );
};

function rangeDates(startDate,endDate) {
  const start_date = dayjs(startDate).toDate();
  const end_date = dayjs(endDate).toDate();
  let currentDate = start_date
  let daysToHighlight = []
  while (currentDate.isBefore(end_date) || currentDate.isSame(end_date, 'day')) {
    daysToHighlight.push(currentDate);
    currentDate.setDate(currentDate.getDate()+1); // Incrementa un día
    }
    console.log("currentDate: ", currentDate)
    return daysToHighlight;
}

export default function Calendar() {
  const navigation=useNavigation();
  const user = auth.currentUser;
  const router = useRouter();
  const backImage = 'https://via.placeholder.com/40';
  const profileImage = 'https://via.placeholder.com/40';
  const [value, setValue] = React.useState(new Date());
  const [events, setEvents] = useState({});
  const [selectedEvent, setSelectedEvent] = useState(dayjs(new Date()));
  const [TimeEvent, setTimeEvent] = useState(dayjs(new Date()));
  const requestAbortController = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([]); //variables que capturan las fechas marcadas

  //obtener los eventos de la base de datos
  //que fueron agregados por el usuario

  //const [markedDates, setMarkedDates] = useState({});

  const fetchEvents = async () => {
    if (auth.currentUser) {
      const eventDocRef = doc(db, 'events', auth.currentUser.uid); 
      const eventDoc = await getDoc(eventDocRef);

      if (eventDoc.exists()) {
        const eventData = eventDoc.data();
        const fechaInicio = dayjs(eventData.startSelectedDate).toDate();
        const fechaFin = dayjs(eventData.finalSelectedDate).toDate();

        const startSelectedDate = dayjs(fechaInicio).format('YYYY-MM-DD');
        const finalSelectedDate = dayjs(fechaFin).format('YYYY-MM-DD');
        //const inicio = dayjs(startSelectedDate).format('DD');
        
        //const range = rangeDates(fechaInicio, fechaFin);

        //const dayRange = fechaInicio;
        //dayRange.setDate(dayRange.getDate()+1);

        //setHighlightedDays(range);
        setHighlightedDays([
          new Date(dayjs(startSelectedDate)),
          new Date(dayjs(finalSelectedDate))
        ]);

        //console.log("Datos de eventos obtenidos de Firebase:", eventData); // Console log para verificar los datos

        console.log("Fechas marcadas en el calendario:", highlightedDays);
        //console.log("Fecha inicio: ", startSelectedDate);
        //console.log("Fecha fin: ", finalSelectedDate);
      } else {
        console.log("No hay documentos de eventos para este usuario.");
    }
  }
  };

  React.useEffect(() => {
    setIsLoading(true);
    fetchEvents()
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, []);


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

  //const handleEventSelect = (event) => {
  //  setSelectedEvent(event);
  //};

  //const handleTimeSelect = (event) => {
  //  setTimeEvent(event);
  //};

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
            value={value}
            loading={isLoading}
            renderLoading={() => <DayCalendarSkeleton />}
            onChange={(newValue) => setValue(newValue)}
            //shouldDisableDate={(date) =>
            //  Object.keys(markedDates).includes(dayjs(date).format('YYYY-MM-DD'))
            //}
            slots={{
              day: ServerDay,
            }}
            slotProps={{
              day: {
                highlightedDays,
              },
            }}
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
  selectedDay: {
    backgroundColor: '#63D2D9',
    //border: '#63D2D9',
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
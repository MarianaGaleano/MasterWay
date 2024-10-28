import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native'
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
//import Badge from '@mui/material/Badge';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { auth } from './../configs/FirebaseConfig';
import { db } from './../configs/FirebaseConfig';
import { doc, getDoc, collection, getDocs} from 'firebase/firestore';
import { Link, useRouter, useNavigation} from 'expo-router';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import './local_components/calendar_com/calendar_comp';

dayjs.extend(isBetween);
  function CustomDay ({ selected, start, end, ...other }) {
    let style = { backgroundColor: selected ? '#63D2D9' : '' };

    if (start) {
      style = {
        ...style,
        //borderTopLeftRadius: '50%',
        //borderBottomLeftRadius: '50%',
        borderRadius: '50% 0 0 50%',
        marginLeft: 0,
        padding: 4,
      };
    }
  
    if (end) {
      style = {
        ...style,
        //borderTopRightRadius: '50%',
        //borderBottomRightRadius: '50%',
        borderRadius: '0 50% 50% 0',
        marginRight: 0,
        padding: 4,
      };
    }
  
    if (!start && !end && selected) {
      style = {
        ...style,
        borderRadius: 0,
        marginLeft: -4,
        marginRight: -4,
        padding: 4,
      };  
    }

    return (
      <PickersDay
        {...other}
        style={style}
      />
    );
  };
//serverDay se usa para personalizar la forma en que
//se muestran las fechas de los eventos
function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
  
  const isSelected = highlightedDays.some(event =>
    event.some(date => dayjs(date).isSame(day, 'day'))
  );
  const isStart = highlightedDays.some(event =>
    dayjs(day).isSame(event[0], 'day')
  );
  const isEnd = highlightedDays.some(event =>
    dayjs(day).isSame(event[event.length - 1], 'day')
  );
  console.log('fecha inicio', isStart);
  console.log('fecha fin', isEnd);

  return (
      <CustomDay {...other} outsideCurrentMonth={outsideCurrentMonth} 
      day={day} 
      selected={isSelected}
      start={isStart}
      end={isEnd}
      />
  );
};

function rangeDates(startDate,endDate) {
  const start_date = dayjs(startDate).toDate();
  const end_date = dayjs(endDate).toDate();
  let currentDate = start_date
  let daysToHighlight = []
  while (currentDate <= end_date) {
    daysToHighlight.push(new Date(currentDate));
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

  async function fetchEvents() {
      const eventsDocRef = collection(db, 'events'); 
      const eventsSnapshot = await getDocs(eventsDocRef);
      if (!eventsSnapshot.empty) {
        const eventsData = eventsSnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));
        setEvents(eventsData)

        const allHighlightedays = eventsData.map(eventData => {
          const fechaInicio = dayjs(eventData.startSelectedDate).toDate();
          const fechaFin = dayjs(eventData.finalSelectedDate).toDate();

          return rangeDates(fechaInicio, fechaFin);
        });

        setHighlightedDays(allHighlightedays);

        //console.log("Datos de eventos obtenidos de Firebase:", eventData); // Console log para verificar los datos

        //console.log("Fechas marcadas en el calendario:", highlightedDays);
        //console.log("Fecha inicio: ", startSelectedDate);
        //console.log("Fecha fin: ", finalSelectedDate);
      } else {
        console.log("No hay documentos de eventos para este usuario.");
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
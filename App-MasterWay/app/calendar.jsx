import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native'
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { query, where } from 'firebase/firestore';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { auth } from './../configs/FirebaseConfig';
import { db } from './../configs/FirebaseConfig';
import { doc, deleteDoc, collection, getDocs} from 'firebase/firestore';
import { Link, useRouter, useNavigation} from 'expo-router';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import './local_components/calendar_com/calendar_comp';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';


export default function Calendar() {
  const router = useRouter();
  const backImage = 'https://via.placeholder.com/40';
  const profileImage = 'https://via.placeholder.com/40';
  const [value, setValue] = React.useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState([]);
  const requestAbortController = React.useRef(null);
  const [forceUpdate, setForceUpdate] = useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([]); //variables que capturan las fechas marcadas

  //obtener los eventos de la base de datos
  //que fueron agregados por el usuario

  async function fetchEvents() {
      const user = auth.currentUser;
      const eventsDocRef = query(
        collection(db, 'events'), where("userId", "==", user.uid)
        ); 
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


  function CustomDay ({ selected, start, end, ...other }) {
    let style = { backgroundColor: selected ? '#63D2D9' : '' };

    //if (!selected && !start && !end) {
    //    style.backgroundColor = '#ADD8E6';
    //}

    if (start) {
      style = {
        ...style,
        
        //width: '80%',
        //height: '80%',
        borderRadius: '50% 0 0 50%',
        marginLeft: 0,
        margin: 0,
        padding: 4,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        position: 'relative',
      };
    }
  
    if (end) {
      style = {
        ...style,
        borderRadius: '0 50% 50% 0',
        marginRight: 0,
        margin: 0,
        padding: 4,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        position: 'relative',
      };
    }
  
    if (!start && !end && selected) {
      style = {
        ...style,
        borderRadius: 0,
        //margin: 0,
        padding: 4,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        position: 'relative',
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
  const { highlightedDays = [], day, outsideCurrentMonth, selectedDate, ...other } = props;
  const isSelected = highlightedDays.some(event =>
    event.some(date => dayjs(date).isSame(day, 'day'))
  );
  const isStart = highlightedDays.some(event =>
    dayjs(day).isSame(event[0], 'day')
  );
  const isEnd = highlightedDays.some(event =>
    dayjs(day).isSame(event[event.length - 1], 'day')
  );

  return (
      <TouchableOpacity onPress={() => handleDayClick(day)}>
          <CustomDay {...other} outsideCurrentMonth={outsideCurrentMonth} 
          day={day} 
          selected={isSelected}
          start={isStart}
          end={isEnd}
          />
      </TouchableOpacity>
  );
}


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


function handleDayClick(day) {
  
  if (events.length > 0) {
    // Filtrar eventos para el día seleccionado
    const selectedDay = dayjs(day);
    const eventsForDay = events.filter(event =>
      selectedDay.isBetween(dayjs(event.startSelectedDate), dayjs(event.finalSelectedDate), null, '[]') // '[]' incluye el inicio y el fin
    );

    // Si hay eventos para ese día, actualiza el estado con el primer evento
    setSelectedEvent(eventsForDay);
  } else {
    console.log("Eventos aún no cargados.");
    setSelectedEvent([]);
  }
}

console.log("eventos: ", events);
console.log("selectedEvents", selectedEvent);

const handleDateChange = (newValue) => {
    setValue(newValue)
};

//funcion para borrar evento
async function deleteEvent(eventId) {
  setIsLoading(true);
  try {
    const deleteDocRef = doc(db, 'events', eventId);
    await deleteDoc(deleteDocRef);

    // Después de eliminarlo de Firestore, también lo eliminamos del estado local
    const updatedEvents = events.filter(event => event.id !== eventId);
    setEvents(updatedEvents);
    setSelectedEvent(null); // Limpia la selección actual

    //recalcular las fechas marcadas en base a los eventos actualizados
    //anteriormente en updateEvents
    const updatedHighlightedDays = updatedEvents.map(eventData => {
      const fechaInicio = dayjs(eventData.startSelectedDate).toDate();
      const fechaFin = dayjs(eventData.finalSelectedDate).toDate();
      return rangeDates(fechaInicio, fechaFin);
    });
    setHighlightedDays(updatedHighlightedDays);
    console.log("Evento eliminado con éxito.");
  } catch (error) {
    console.error("Error al eliminar el evento: ", error);
    } finally {
    setIsLoading(false);
  }
}

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
            onChange={handleDateChange}
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
        
        <TouchableOpacity onPress={() => router.replace('/local_components/calendar_com/Add_event')}
          style={styles.button}>
        <CalendarTodayIcon sx={{color: '#FFFFFF', fontSize: 33}} style={{ marginLeft: 5}}/>
        <Text style={styles.buttonText}>Agregar evento</Text>
        </TouchableOpacity>

        <View style={styles.eventDetailsContainer}>
          {selectedEvent ? (
            selectedEvent.map((event) => (
              <>
              <Text style={styles.eventTitle}>{event.nameEvent}</Text>
              <View style={styles.eventCard}>
                <Text style={styles.eventTime}>
                  Desde: {event.startSelectedTime} - Hasta: {event.finalSelectedTime}
                </Text>
                <CreateIcon size={24} color="disabled" style={{ marginLeft: 20}}/>
                <TouchableOpacity onPress={() => deleteEvent(event.id)}>
                  <DeleteIcon size={24} color="disabled" style={{ marginLeft: 10}}/>
                </TouchableOpacity>

              </View>
              </>
            ))
        ) : (
          <Text style={styles.noEventText}>No hay eventos para esta fecha.</Text>
        )}
        </View></>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventDetailsContainer: {
    marginTop: 20,
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
  eventCard: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#63D2D9',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  eventTime: {
    fontSize: 14,
    color: '#666',
  },
  eventActions: {
    flexDirection: 'row',
  },
  noEventText: {
    color: '#666',
    fontStyle: 'italic',
  },
  addButton: {
    backgroundColor: '#63D2D9',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventDate: {
    marginTop: 5,
  },
  button: {
      backgroundColor: '#63D2D9',
      padding: 15,
      borderRadius: 10,
      marginTop: 20,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  },
  buttonText: {
      color: '#FFFFFF',
      textAlign: 'center',
      fontFamily: 'popins-bold',
      marginRight: 52,
      fontSize: 18,
}
});
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native'
import React from 'react';
import { Link, useRouter, useNavigation} from 'expo-router';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import './calendar_com/calendar_comp';

export default function Calendar() {
  const navigation=useNavigation();
  const router = useRouter();
  const backImage = 'https://via.placeholder.com/40';
  const profileImage = 'https://via.placeholder.com/40';
  const [value, setValue] = React.useState(new Date());

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
            onChange={(newValue) => {
              setValue(newValue);
            } }
            renderInput={(params) => <TextField {...params} />} />
        </LocalizationProvider></></>
        
        <TouchableOpacity onPress={() => router.replace('/calendar_com/Add_Event')}
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
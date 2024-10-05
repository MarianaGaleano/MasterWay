import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native'
import React from 'react';
import { Link, useNavigation} from 'expo-router'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import '../../components/calendar/calendar_comp';

export default function Index() {
  const navigation=useNavigation();
  const backImage = 'https://via.placeholder.com/40';
  const profileImage = 'https://via.placeholder.com/40';
  const [value, setValue] = React.useState(new Date());

  return (
    <><><View style={styles.container}>

      <TouchableOpacity onPress={() => navigation.navigate('dashboard')}>
        <Image
          source={{ uri: backImage }}
          style={styles.backImage} />
      </TouchableOpacity>

      <Text style={styles.title}>Calendario</Text>

      <TouchableOpacity onPress={() => navigation.navigate('profile')}>
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
        
        <Link href={'/app/components/calendar/Add_event'}
        style={{
          width: '100%',
          textAlign: 'center'
        }}
        >
        <TouchableOpacity
          style={styles.button}>
        <Text style={styles.buttonText}>Agregar evento</Text>
        </TouchableOpacity>
        </Link></>
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
      padding: 15,
      borderRadius: 25,
      marginTop: 20
  },
  buttonText: {
      color: '#FFFFFF',
      textAlign: 'center',
      fontFamily: 'popins-bold',
}
});
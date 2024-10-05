import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native'
import React from 'react';
import { useNavigation } from 'expo-router'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

export default function Index() {
    const navigation=useNavigation();
    
    return (
        <View>
            <Text>Agregar evento</Text>
        </View>
    );

}
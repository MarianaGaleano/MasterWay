import { View, Text } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import { Colors } from './../../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {
        position: "absolute",
        bottom: 20,
        left: 16,
        right: 16,
        height: 70,
        elevation: 5,
        backgroundColor: Colors.WHITE,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
      }
    }}>
      {/* Pestaña de Inicio */}
      <Tabs.Screen
        name="mytrip"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Ionicons 
                name={focused ? 'home' : 'home-outline'}
                color={focused ? Colors.PRINCIPAL : Colors.GRAY} 
                size={28} 
              />
              <Text style={{ 
                color: focused ? Colors.PRINCIPAL : Colors.GRAY, 
                fontSize: 14,  
                marginTop: 4 
              }}>Inicio</Text>
            </View>
          ),
        }}
      />

      {/* Botón Central de Agregar */}
      <Tabs.Screen
        name="discover"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 80,  
              width: 80,
              borderRadius: 40, 
              backgroundColor: Colors.PRINCIPAL,
              marginBottom: 30,  
              shadowColor: '#000',
              shadowOpacity: 0.2,
              shadowRadius: 10,
              shadowOffset: { width: 0, height: 5 },
            }}>
              <Ionicons 
                name='add' 
                color='white' 
                size={32}  
              />
              {/* Agregar texto debajo del ícono */}
              <Text style={{ 
                color: focused ? Colors.BLACK : 'white', 
                fontSize: 12, 
                marginTop: 4,
                textAlign: 'center'
              }}>Agregar</Text>
            </View>
          ),
        }}
      />

      {/* Pestaña de Perfil */}
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Ionicons 
                name={focused ? 'person' : 'person-outline'}
                color={focused ? Colors.PRINCIPAL : Colors.GRAY} 
                size={28}  
              />
              <Text style={{ 
                color: focused ? Colors.PRINCIPAL : Colors.GRAY, 
                fontSize: 14, 
                marginTop: 4 
              }}>Perfil</Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

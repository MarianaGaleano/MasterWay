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
      tabBarStyle:{
        position: "absolute",
        bottom: 20,
        left: 16,
        right: 16,
        height: 72,
        elevation: 0,
        backgroundColor: Colors.WHITE,
        borderRadius: 16,
      }
    }}>
      
      {/* MyTrip */}
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Ionicons name={focused ? 'home' : 'home-outline'}
              color={focused ? Colors.PRINCIPAL : Colors.GRAY} 
              size={24} 
              />
              <Text style={{ color: focused ? Colors.PRINCIPAL : Colors.GRAY, fontSize: 12, marginTop: 4 }}>Inicio</Text>
            </View>
          ),
        }}
      />

      {/* Favorites */}
      <Tabs.Screen
        name="favorites"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Ionicons name={focused ? 'heart' : 'heart-outline'}
              color={focused ? Colors.PRINCIPAL : Colors.GRAY} 
              size={24} 
              />
              <Text style={{ color: focused ? Colors.PRINCIPAL : Colors.GRAY, fontSize: 12, marginTop: 4 }}>Favoritos</Text>
            </View>
          ),
        }}
      />

      {/* Discover */}
      <Tabs.Screen
        name="add"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 65,
              width: 65,
              borderRadius: 999,
              backgroundColor: Colors.PRINCIPAL,
              marginBottom: 30, // Subir un poquito el botón
            }}>
              <Ionicons name='add'
              color='white' 
              size={40} 
              />
            </View>
          ),
        }}
      />

      {/* Dashboard */}
      <Tabs.Screen
        name="dashboard"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Ionicons name={focused ? 'grid' : 'grid-outline'}
              color={focused ? Colors.PRINCIPAL : Colors.GRAY} 
              size={24} 
              />
              <Text style={{ color: focused ? Colors.PRINCIPAL : Colors.GRAY, fontSize: 12, marginTop: 4 }}>Dashboard</Text>
            </View>
          ),
        }}
      />

      {/* Profile */}
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Ionicons name={focused ? 'person' : 'person-outline'}
              color={focused ? Colors.PRINCIPAL : Colors.GRAY} 
              size={24} 
              />
              <Text style={{ color: focused ? Colors.PRINCIPAL : Colors.GRAY, fontSize: 12, marginTop: 4 }}>Perfil</Text>
            </View>
          ),
        }}
      />

    </Tabs>
  );
}

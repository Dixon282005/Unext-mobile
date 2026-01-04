import { Tabs } from 'expo-router';
import { Briefcase, Home, User, Users } from 'lucide-react-native';
import React from 'react';
import { Platform } from 'react-native'; // 👈 Importamos Platform

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e2e8f0',
          // 👇 LÓGICA PARA IPHONE vs ANDROID
          height: Platform.OS === 'ios' ? 88 : 60, // En iOS más alto (88), en Android normal (60)
          paddingBottom: Platform.OS === 'ios' ? 28 : 8, // En iOS empujamos los iconos hacia arriba
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#7c3aed',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          // Ajuste fino para que el texto no quede pegado al borde en Android
          marginBottom: Platform.OS === 'android' ? 4 : 0, 
        },
      }}
    >
      <Tabs.Screen
        name="feed"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />

      <Tabs.Screen
        name="network"
        options={{
          title: 'Mi Red',
          tabBarIcon: ({ color, size }) => <Users size={size} color={color} />,
        }}
      />

      <Tabs.Screen
        name="jobs"
        options={{
          title: 'Empleos',
          tabBarIcon: ({ color, size }) => <Briefcase size={size} color={color} />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
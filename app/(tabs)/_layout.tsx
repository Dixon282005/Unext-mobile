import { Tabs } from 'expo-router';
import { Briefcase, Home, User, Users } from 'lucide-react-native';
import React from 'react';
import { Platform } from 'react-native';
// 👇 1. Importamos el hook para medir los márgenes seguros
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabsLayout() {
  // 👇 2. Obtenemos las medidas exactas del dispositivo actual
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e2e8f0',
          
          // 👇 3. ALTURA DINÁMICA:
          // Base de 60px + lo que mida la barra del sistema (insets.bottom)
          height: 60 + insets.bottom, 
          
          // 👇 4. PADDING DINÁMICO:
          // Empujamos los iconos hacia arriba para que no los tape la barra negra
          // Si insets.bottom es 0 (Android viejos), queda 8px. Si es 34 (iPhone), queda 42px.
          paddingBottom: insets.bottom + 8, 
          
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#7c3aed',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          // Un pequeño ajuste para que el texto no baile
          marginBottom: Platform.OS === 'android' ? 0 : 0, 
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
import { Tabs } from 'expo-router';
import { Briefcase, Home, User, Users } from 'lucide-react-native';
import React from 'react';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // Ocultamos el header nativo (usaremos el nuestro)
        tabBarStyle: {
          backgroundColor: '#ffffff', // Fondo blanco (Estilo Web/Ejecutivo)
          borderTopWidth: 1,
          borderTopColor: '#e2e8f0', // Borde sutil gris (slate-200)
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#7c3aed', // Violeta activo (violet-600)
        tabBarInactiveTintColor: '#94a3b8', // Gris inactivo (slate-400)
        tabBarShowLabel: true, // Mostrar texto abajo (opcional)
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      {/* 1. Feed (Inicio) */}
      <Tabs.Screen
        name="feed" // ⚠️ IMPORTANTE: Coincide con feed.tsx
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />

      {/* 2. Network (Red) */}
      <Tabs.Screen
        name="network" // Coincide con network.tsx
        options={{
          title: 'Mi Red',
          tabBarIcon: ({ color, size }) => <Users size={size} color={color} />,
        }}
      />

      {/* 3. Jobs (Empleos) */}
      <Tabs.Screen
        name="jobs" // Coincide con jobs.tsx
        options={{
          title: 'Empleos',
          tabBarIcon: ({ color, size }) => <Briefcase size={size} color={color} />,
        }}
      />

      {/* 4. Profile (Perfil) */}
      <Tabs.Screen
        name="profile" // Coincide con profile.tsx
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
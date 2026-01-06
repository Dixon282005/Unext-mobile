import { Tabs } from 'expo-router';
// 👇 Agregamos 'Zap' y 'View' a los imports
import { Briefcase, Home, User, Users, Zap } from 'lucide-react-native';
import React from 'react';
import { Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e2e8f0',
          
          // Altura dinámica
          height: 60 + insets.bottom, 
          paddingBottom: insets.bottom + 8, 
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#7c3aed',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 10, // 👇 Reduje un poco la letra para que quepan 5 tabs
          fontWeight: '600',
          marginBottom: Platform.OS === 'android' ? 0 : 0, 
        },
      }}
    >
      {/* 1. Feed */}
      <Tabs.Screen
        name="feed"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />

      {/* 2. Network */}
      <Tabs.Screen
        name="network"
        options={{
          title: 'Mi Red',
          tabBarIcon: ({ color, size }) => <Users size={size} color={color} />,
        }}
      />

      {/* 3. MAGIC MATCH (El Botón Central) */}
      <Tabs.Screen
        name="match" // ⚠️ Asegúrate que el archivo 'match.tsx' esté en la carpeta (tabs)
        options={{
          title: 'Match',
          tabBarIcon: ({ focused }) => (
            // 👇 Diseño especial: Botón con fondo cuando está activo
            <View className={`items-center justify-center p-1 rounded-full ${focused ? 'bg-violet-100' : ''} -mt-1`}>
               <Zap size={26} color="#7c3aed" fill={focused ? "#7c3aed" : "none"} />
            </View>
          ),
          tabBarLabelStyle: {
            color: '#7c3aed', // Texto siempre violeta
            fontWeight: '800',
            fontSize: 10
          }
        }}
      />

      {/* 4. Jobs */}
      <Tabs.Screen
        name="jobs"
        options={{
          title: 'Empleos',
          tabBarIcon: ({ color, size }) => <Briefcase size={size} color={color} />,
        }}
      />

      {/* 5. Profile */}
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
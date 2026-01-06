import { supabase } from '@/lib/supabase';
import { Slot, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
// 👇 1. IMPORTANTE: Importamos esto
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import "../styles/global.css";

export default function RootLayout() {
  const [session, setSession] = useState<any>(null);
  const [initialized, setInitialized] = useState(false);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setInitialized(true);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!initialized) return;

    const inTabsGroup = segments[0] === '(tabs)';

    if (session && !inTabsGroup) {
      router.replace('/(tabs)/feed'); 
    } else if (!session && inTabsGroup) {
      router.replace('/'); 
    }
  }, [session, initialized, segments]);

  if (!initialized) {
    return (
      <View className="flex-1 justify-center items-center bg-slate-950">
        <ActivityIndicator size="large" color="#8b5cf6" />
        <StatusBar style="light" />
      </View>
    );
  }

  return (
    // 👇 2. CAMBIO CLAVE: Cambiamos View por GestureHandlerRootView
    // Esto activa el sistema de gestos para toda la app (necesario para Magic Match)
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Slot /> 
      <StatusBar style="light" />
    </GestureHandlerRootView>
  );
}
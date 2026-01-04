import { supabase } from '@/lib/supabase';
import { Slot, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
// 👇 Asegúrate de importar View y ActivityIndicator
import { ActivityIndicator, View } from 'react-native';
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
    // Usamos una View con flex: 1. Esto le grita al iPhone: "¡OCUPA TODO EL ESPACIO!"
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <Slot /> 
      <StatusBar style="light" />
    </View>
  );
}
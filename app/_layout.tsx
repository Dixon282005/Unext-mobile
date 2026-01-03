import { supabase } from '@/lib/supabase';
import { Slot, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import "../styles/global.css";

export default function RootLayout() {
  const [session, setSession] = useState<any>(null);
  const [initialized, setInitialized] = useState(false);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    // 1. Escuchamos Auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setInitialized(true);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!initialized) return;

    // 2. Portero de Discoteca 👮‍♂️
    const inTabsGroup = segments[0] === '(tabs)';

    if (session && !inTabsGroup) {
      // CASO A: Tienes sesión -> Vete al FEED (no a la carpeta vacía)
      // 👇 AQUÍ ESTABA EL ERROR
      router.replace('/(tabs)/feed' ); 
      
    } else if (!session && inTabsGroup) {
      // CASO B: Sin sesión -> Vete a la Bienvenida
      router.replace('/'); 
    }
  }, [session, initialized, segments]);

  // 3. Loading
  if (!initialized) {
    return (
      <View className="flex-1 justify-center items-center bg-slate-950">
        <ActivityIndicator size="large" color="#8b5cf6" />
        <StatusBar style="light" />
      </View>
    );
  }

  return (
    <>
      <Slot /> 
      <StatusBar style="light" />
    </>
  );
}
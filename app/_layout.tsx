import { supabase } from '@/lib/supabase'; // Asegúrate que este path sea correcto
import { Slot, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import "../styles/global.css"; // Tus estilos globales

export default function RootLayout() {
  const [session, setSession] = useState<any>(null);
  const [initialized, setInitialized] = useState(false);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    // 1. Escuchamos si el usuario entra o sale (Login/Logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setInitialized(true);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!initialized) return;

    // 2. Lógica de Protección (El "Portero de Discoteca") 👮‍♂️
    
    // ¿En qué grupo de carpetas estamos?
    const inAuthGroup = segments[0] === '(auth)';
    const inTabsGroup = segments[0] === '(tabs)';
    const isWelcomeScreen = segments.length === 0; // Es el index.tsx raíz

    if (session && !inTabsGroup) {
      // CASO A: Tienes sesión, pero estás en Login o Bienvenida -> Vete a la App
      router.replace('/(tabs)');
    } else if (!session && inTabsGroup) {
      // CASO B: NO tienes sesión y quieres entrar a la App -> Vete a la Bienvenida
      router.replace('/'); 
    }
  }, [session, initialized, segments]);

  // 3. Pantalla de carga (Splash Screen casero)
  // Se muestra mientras preguntamos a SecureStore si hay sesión
  if (!initialized) {
    return (
      <View className="flex-1 justify-center items-center bg-slate-950">
        <ActivityIndicator size="large" color="#8b5cf6" />
        <StatusBar style="light" />
      </View>
    );
  }

  // 4. Renderizamos la App
  return (
    <>
      {/* Slot renderiza el hijo actual: (tabs), (auth) o index */}
      <Slot /> 
      <StatusBar style="light" />
    </>
  );
}
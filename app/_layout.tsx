import { supabase } from '@/lib/supabase';
import { Slot, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
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
    const inChatGroup = segments[0] === 'chat';
    
    const inProtectedGroup = inTabsGroup || inChatGroup;

    if (!session && inProtectedGroup) {
      // 🛑 CASO 1: No hay usuario y quiere entrar a lo privado -> Mandar al Login
      router.replace('/'); 
    } else if (session && !inProtectedGroup) {
      // 🚀 CASO 2: Hay usuario y NO está en lo privado (está en el Login) -> Mandar al Feed
      // Al usar "!inProtectedGroup" evitamos usar .length === 0 y TypeScript se calma.
      router.replace('/(tabs)/feed'); 
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Slot /> 
      <StatusBar style="light" />
    </GestureHandlerRootView>
  );
}
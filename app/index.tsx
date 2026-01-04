import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { ArrowRight, Zap } from 'lucide-react-native';
import React, { useState } from 'react';
import { StatusBar, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

// Importamos tus nuevas pantallas
import { OnboardingScreen } from '@/features/onboarding/screens/Onboarding';
import { SplashScreen } from '@/features/onboarding/screens/SplashScreen';

export default function Index() {
  const router = useRouter();
  
  // Estados para controlar qué pantalla mostrar
  const [isSplashVisible, setSplashVisible] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isReady, setIsReady] = useState(false); // Para saber cuando todo terminó de cargar

  // Lógica de inicio
  const handleSplashComplete = async () => {
    try {
      // Leemos si ya vio el tutorial
      const hasSeen = await AsyncStorage.getItem('hasSeenOnboarding');
      
      if (hasSeen === 'true') {
        // Ya es usuario recurrente -> Mostrar Welcome (Tu diseño)
        setShowOnboarding(false);
      } else {
        // Es usuario nuevo -> Mostrar Onboarding
        setShowOnboarding(true);
      }
    } catch (e) {
      setShowOnboarding(true); // Ante la duda, mostramos tutorial
    } finally {
      // Ocultamos splash y mostramos el contenido real
      setSplashVisible(false);
      setIsReady(true);
    }
  };

  // 1. Mostrar Splash Screen al inicio
  if (isSplashVisible) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  // 2. Mostrar Onboarding si es usuario nuevo
  if (showOnboarding) {
    return <OnboardingScreen />;
  }

  // 3. Mostrar TU PANTALLA WELCOME (Si ya vio el tutorial)
  // 👇 Aquí está tu diseño intacto 👇
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      {/* Círculos de fondo (Ajustados) */}
      <View className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <View className="absolute -top-20 -left-20 w-80 h-80 bg-violet-200/40 rounded-full blur-3xl" />
        <View className="absolute top-1/3 -right-20 w-60 h-60 bg-blue-200/40 rounded-full blur-3xl" />
        <View className="absolute -bottom-20 left-1/3 w-80 h-80 bg-indigo-200/40 rounded-full blur-3xl" />
      </View>

      <View className="flex-1 px-6 justify-between py-12">
        
        {/* Encabezado / Logo */}
        <Animated.View 
          entering={FadeInDown.delay(200).duration(1000).springify()}
          className="items-center mt-10"
        >
          {/* Caja del Logo */}
          <View className="bg-slate-100 p-4 rounded-3xl border border-slate-200 mb-6 shadow-sm">
             <Zap size={40} color="#8b5cf6" fill="#8b5cf6" />
          </View>
          
          <Text className="text-slate-900 text-5xl font-extrabold tracking-tighter">
            UNEXT
            <Text className="text-violet-600">.</Text>
          </Text>
          <Text className="text-slate-500 text-lg font-medium tracking-widest uppercase mt-2">
            Mobile Edition
          </Text>
        </Animated.View>

        {/* Cuerpo del Mensaje */}
        <Animated.View 
          entering={FadeInUp.delay(400).duration(1000).springify()}
          className="space-y-6"
        >
          <Text className="text-slate-900 text-4xl font-bold leading-tight">
            Conectando el <Text className="text-violet-600">talento joven</Text> con el futuro industrial.
          </Text>
          <Text className="text-slate-600 text-lg leading-relaxed font-medium">
            La red profesional líder de Venezuela ahora en tu bolsillo. Encuentra pasantías, conecta con empresas y despega tu carrera.
          </Text>
        </Animated.View>

        {/* Botones de Acción */}
        <Animated.View 
          entering={FadeInUp.delay(600).duration(1000).springify()}
          className="gap-4"
        >
          {/* Botón Principal (Login directo) */}
          <TouchableOpacity 
            className="bg-violet-600 py-4 px-6 rounded-2xl flex-row items-center justify-center shadow-lg shadow-violet-200"
            activeOpacity={0.8}
            onPress={() => router.push('/(auth)/login')}
          >
            <Text className="text-white font-bold text-lg mr-2">Empezar Ahora</Text>
            <ArrowRight size={24} color="white" />
          </TouchableOpacity>

          {/* Botón Secundario (Registro) */}
          <TouchableOpacity 
            className="bg-slate-100 py-4 px-6 rounded-2xl flex-row items-center justify-center border border-slate-200"
            activeOpacity={0.7}
            onPress={() => router.push('/(auth)/register')}
          >
            <Text className="text-slate-700 font-semibold text-lg">Crear cuenta nueva</Text>
          </TouchableOpacity>
        </Animated.View>

      </View>
    </SafeAreaView>
  );
}
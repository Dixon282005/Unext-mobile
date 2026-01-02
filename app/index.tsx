import { useRouter } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import React from 'react';
import { StatusBar, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-slate-950">
      <StatusBar barStyle="light-content" />

      {/* Círculos de fondo para efecto de luz ambiental */}
      <View className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <View className="absolute -top-20 -left-20 w-80 h-80 bg-violet-600/20 rounded-full blur-3xl" />
        <View className="absolute top-1/3 -right-20 w-60 h-60 bg-blue-600/20 rounded-full blur-3xl" />
        <View className="absolute -bottom-20 left-1/3 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl" />
      </View>

      <View className="flex-1 px-6 justify-between py-12">
        
        {/* Encabezado / Logo */}
        <Animated.View 
          entering={FadeInDown.delay(200).duration(1000).springify()}
          className="items-center mt-10"
        >
          <View className="bg-white/10 p-4 rounded-3xl border border-white/10 mb-6">
            
          </View>
          <Text className="text-white text-5xl font-extrabold tracking-tighter">
            UNEXT
            <Text className="text-violet-500">.</Text>
          </Text>
          <Text className="text-slate-400 text-lg font-medium tracking-widest uppercase mt-2">
            Mobile Edition
          </Text>
        </Animated.View>

        {/* Cuerpo del Mensaje */}
        <Animated.View 
          entering={FadeInUp.delay(400).duration(1000).springify()}
          className="space-y-6"
        >
          <Text className="text-white text-4xl font-bold leading-tight">
            Conectando el <Text className="text-violet-400">talento joven</Text> con el futuro industrial.
          </Text>
          <Text className="text-slate-400 text-lg leading-relaxed">
            La red profesional líder de Venezuela ahora en tu bolsillo. Encuentra pasantías, conecta con empresas y despega tu carrera.
          </Text>
        </Animated.View>

        {/* Botones de Acción */}
        <Animated.View 
          entering={FadeInUp.delay(600).duration(1000).springify()}
          className="gap-4"
        >
          {/* Botón Principal */}
          <TouchableOpacity 
            className="bg-violet-600 py-4 px-6 rounded-2xl flex-row items-center justify-center shadow-lg shadow-violet-900/50"
            activeOpacity={0.8}
            onPress={() => console.log('Login pressed')}
          >
            <Text className="text-white font-bold text-lg mr-2">Empezar Ahora</Text>
            <ArrowRight size={24} color="white" />
          </TouchableOpacity>

          {/* Botón Secundario */}
          <TouchableOpacity 
            className="bg-white/5 py-4 px-6 rounded-2xl flex-row items-center justify-center border border-white/10"
            activeOpacity={0.7}
          >
            <Text className="text-white font-semibold text-lg">Ya tengo cuenta</Text>
          </TouchableOpacity>
        </Animated.View>

      </View>
    </SafeAreaView>
  );
}
import { useRouter } from 'expo-router';
import { ArrowRight, ChevronLeft, Eye, EyeOff, Lock, Mail, Zap } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  ActivityIndicator // 👈 1. Importamos esto para el loading
  ,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

// 👈 2. Importamos el Hook
import { useAuth } from '@/features/auth/hooks/useAuth';

export function LoginScreen() {
  const router = useRouter();
  
  // 👈 3. Sacamos la función y el estado de carga del Hook
  const { signInWithEmail, loading } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView className="flex-1 bg-slate-950">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 px-6 justify-center">

            <TouchableOpacity 
              onPress={() => router.back()} 
              className="absolute top-4 left-6 z-10 w-10 h-10 bg-white/5 rounded-full items-center justify-center border border-white/10"
            >
              <ChevronLeft size={24} color="white" />
            </TouchableOpacity>

            <Animated.View 
              entering={FadeInDown.duration(800).springify()} 
              className="items-center mb-10"
            >
              <View className="bg-violet-600/20 p-4 rounded-3xl border border-violet-500/30 mb-4 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                <Zap size={48} color="#8b5cf6" fill="#8b5cf6" />
              </View>
              <Text className="text-white text-4xl font-extrabold tracking-tighter">
                UNEXT<Text className="text-violet-500">.</Text>
              </Text>
              <Text className="text-slate-400 text-base font-medium mt-2">
                Tu futuro profesional empieza aquí
              </Text>
            </Animated.View>

            <Animated.View 
              entering={FadeInUp.delay(200).duration(800).springify()} 
              className="space-y-5"
            >
              
              <View className="space-y-2">
                <Text className="text-slate-400 ml-1 text-sm font-medium">Correo Electrónico</Text>
                <View className="bg-white/5 border border-white/10 rounded-2xl flex-row items-center px-4 h-14 focus:border-violet-500 transition-colors">
                  <Mail size={20} color="#94a3b8" />
                  <TextInput 
                    className="flex-1 text-white ml-3 text-base font-medium"
                    placeholder="ejemplo@unext.com"
                    placeholderTextColor="#475569"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                    cursorColor="#8b5cf6"
                  />
                </View>
              </View>

              <View className="space-y-2">
                <Text className="text-slate-400 ml-1 text-sm font-medium">Contraseña</Text>
                <View className="bg-white/5 border border-white/10 rounded-2xl flex-row items-center px-4 h-14">
                  <Lock size={20} color="#94a3b8" />
                  <TextInput 
                    className="flex-1 text-white ml-3 text-base font-medium"
                    placeholder="••••••••"
                    placeholderTextColor="#475569"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                    cursorColor="#8b5cf6"
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    {showPassword 
                      ? <EyeOff size={20} color="#94a3b8" /> 
                      : <Eye size={20} color="#94a3b8" />
                    }
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity className="self-end pt-1">
                <Text className="text-violet-400 font-semibold text-sm">¿Olvidaste tu contraseña?</Text>
              </TouchableOpacity>

              {/* 👇 4. BOTÓN ACTUALIZADO CON LÓGICA REAL */}
              <TouchableOpacity 
                className={`bg-violet-600 h-16 rounded-2xl flex-row items-center justify-center shadow-lg shadow-violet-900/40 mt-4 active:scale-95 transition-transform ${loading ? 'opacity-50' : ''}`}
                activeOpacity={0.8}
                disabled={loading} // Deshabilita si está cargando
                onPress={() => signInWithEmail(email, password)} // 🔥 LLAMA AL HOOK
              >
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <>
                    <Text className="text-white font-bold text-lg mr-2">Iniciar Sesión</Text>
                    <ArrowRight size={24} color="white" />
                  </>
                )}
              </TouchableOpacity>

            </Animated.View>

            <Animated.View 
              entering={FadeInUp.delay(400).duration(800)} 
              className="mt-10 flex-row justify-center items-center"
            >
              <Text className="text-slate-500 font-medium">¿Aún no eres miembro? </Text>
              <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
                <Text className="text-violet-400 font-bold text-lg">Regístrate</Text>
              </TouchableOpacity>
            </Animated.View>

          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
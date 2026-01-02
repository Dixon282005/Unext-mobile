import { useRouter } from 'expo-router';
import { ArrowRight, ChevronLeft, Lock, Mail, User } from 'lucide-react-native';
import React, { useState } from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../hooks/useAuth'; // 👈 Tu hook de Supabase

export function RegisterScreen() {
  const router = useRouter();
  const { signUpWithEmail, loading } = useAuth(); // Usamos la función de registro

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Función para manejar el registro
  const handleRegister = () => {
    signUpWithEmail(email, password, fullName);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 px-6 justify-center relative">

            {/* Decoración de fondo */}
            <View className="absolute top-0 left-0 w-72 h-72 bg-violet-100/50 rounded-full blur-3xl -ml-24 -mt-24" />
            <View className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-100/50 rounded-full blur-3xl -mr-24 -mb-24" />

            {/* Botón Atrás */}
            <TouchableOpacity 
              onPress={() => router.back()} 
              className="absolute top-4 left-6 z-10 w-10 h-10 bg-slate-100 rounded-full items-center justify-center border border-slate-200 shadow-sm"
            >
              <ChevronLeft size={24} color="#1e293b" />
            </TouchableOpacity>

            {/* HEADER */}
            <Animated.View 
              entering={FadeInDown.duration(800).springify()} 
              className="items-center mb-8"
            >
              <Text className="text-slate-900 text-3xl font-extrabold tracking-tight">
                Crea tu cuenta 🚀
              </Text>
              <Text className="text-slate-500 text-base font-medium mt-2 text-center">
                Únete a la red profesional del futuro.
              </Text>
            </Animated.View>

            {/* FORMULARIO */}
            <Animated.View 
              entering={FadeInUp.delay(200).duration(800).springify()} 
              className="space-y-4"
            >
              
              {/* Input: Nombre Completo */}
              <View className="space-y-2">
                <Text className="text-slate-700 ml-1 text-sm font-bold">Nombre Completo</Text>
                <View className="bg-slate-50 border border-slate-200 rounded-2xl flex-row items-center px-4 h-14 focus:border-violet-600 focus:bg-white transition-all">
                  <User size={20} color="#64748b" />
                  <TextInput 
                    className="flex-1 text-slate-900 ml-3 text-base font-medium"
                    placeholder="Juan Pérez"
                    placeholderTextColor="#94a3b8"
                    value={fullName}
                    onChangeText={setFullName}
                    cursorColor="#7c3aed"
                  />
                </View>
              </View>

              {/* Input: Email */}
              <View className="space-y-2">
                <Text className="text-slate-700 ml-1 text-sm font-bold">Correo Electrónico</Text>
                <View className="bg-slate-50 border border-slate-200 rounded-2xl flex-row items-center px-4 h-14 focus:border-violet-600 focus:bg-white transition-all">
                  <Mail size={20} color="#64748b" />
                  <TextInput 
                    className="flex-1 text-slate-900 ml-3 text-base font-medium"
                    placeholder="ejemplo@unext.com"
                    placeholderTextColor="#94a3b8"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                    cursorColor="#7c3aed"
                  />
                </View>
              </View>

              {/* Input: Password */}
              <View className="space-y-2">
                <Text className="text-slate-700 ml-1 text-sm font-bold">Contraseña</Text>
                <View className="bg-slate-50 border border-slate-200 rounded-2xl flex-row items-center px-4 h-14 focus:border-violet-600 focus:bg-white transition-all">
                  <Lock size={20} color="#64748b" />
                  <TextInput 
                    className="flex-1 text-slate-900 ml-3 text-base font-medium"
                    placeholder="Mínimo 6 caracteres"
                    placeholderTextColor="#94a3b8"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    cursorColor="#7c3aed"
                  />
                </View>
              </View>

              {/* Botón: Registrarse */}
              <TouchableOpacity 
                className={`bg-violet-600 h-16 rounded-2xl flex-row items-center justify-center shadow-lg shadow-violet-200 mt-6 active:scale-95 ${loading ? 'opacity-70' : ''}`}
                activeOpacity={0.8}
                disabled={loading}
                onPress={handleRegister}
              >
                {loading ? (
                  <Text className="text-white font-bold text-lg">Creando cuenta...</Text>
                ) : (
                  <>
                    <Text className="text-white font-bold text-lg mr-2">Registrarse</Text>
                    <ArrowRight size={24} color="white" />
                  </>
                )}
              </TouchableOpacity>

            </Animated.View>

            {/* FOOTER */}
            <Animated.View 
              entering={FadeInUp.delay(400).duration(800)} 
              className="mt-10 flex-row justify-center items-center"
            >
              <Text className="text-slate-500 font-medium">¿Ya tienes cuenta? </Text>
              <TouchableOpacity onPress={() => router.back()}>
                <Text className="text-violet-600 font-bold text-lg">Inicia Sesión</Text>
              </TouchableOpacity>
            </Animated.View>

          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
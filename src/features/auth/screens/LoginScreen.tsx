import { useRouter } from 'expo-router';
import { ChevronLeft, Eye, EyeOff, Lock, Mail, Zap } from 'lucide-react-native';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

// 👇 Importamos TUS Componentes Globales
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Screen } from '@/components/ui/Screen';
import { useAuth } from '../hooks/useAuth';

export function LoginScreen() {
  const router = useRouter();
  const { signInWithEmail, loading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // 🛠️ LÓGICA REPARADA: Navegación Segura
  // Evita el error rojo si no hay historial
  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/'); // Si no se puede volver, vamos a la bienvenida
    }
  };

  return (
    // 👇 safeArea: Evita chocar con la hora/batería
    // 👇 px-6: Agrega margen a los lados
    <Screen scroll safeArea className="bg-white px-6">
      
      {/* Botón Atrás (Con lógica segura) */}
      <View className="mt-2 items-start">
        <TouchableOpacity 
          onPress={handleBack} 
          className="w-10 h-10 bg-slate-50 rounded-full items-center justify-center border border-slate-200"
        >
          <ChevronLeft size={24} color="#1e293b" />
        </TouchableOpacity>
      </View>

      {/* HEADER: Logo y Título */}
      <Animated.View 
        entering={FadeInDown.duration(800).springify()} 
        className="items-center my-8"
      >
        <View className="bg-violet-100 p-4 rounded-3xl mb-4 shadow-sm">
          <Zap size={48} color="#7c3aed" fill="#7c3aed" />
        </View>
        <Text className="text-slate-900 text-4xl font-extrabold tracking-tighter">
          UNEXT<Text className="text-violet-600">.</Text>
        </Text>
        <Text className="text-slate-500 text-base font-medium mt-2">
          Bienvenido de vuelta
        </Text>
      </Animated.View>

      {/* FORMULARIO */}
      {/* space-y-4: Separa los inputs para que respiren */}
      <Animated.View 
        entering={FadeInUp.delay(200).duration(800).springify()} 
        className="space-y-4" 
      >
        
        {/* Input Email */}
        <Input 
          label="Correo Electrónico"
          placeholder="ejemplo@unext.com"
          keyboardType="email-address"
          autoCapitalize="none"
          icon={<Mail size={20} color="#64748b" />}
          value={email}
          onChangeText={setEmail}
        />

        {/* Input Password */}
        <Input 
          label="Contraseña"
          placeholder="••••••••"
          secureTextEntry={!showPassword}
          icon={<Lock size={20} color="#64748b" />}
          value={password}
          onChangeText={setPassword}
          rightIcon={showPassword ? <EyeOff size={20} color="#64748b"/> : <Eye size={20} color="#64748b"/>}
          onRightIconPress={() => setShowPassword(!showPassword)}
        />

        {/* Link Olvidé Contraseña */}
        <TouchableOpacity className="self-end mb-2">
          <Text className="text-violet-600 font-bold text-sm">¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>

        {/* Botón Principal (Con margen arriba extra) */}
        <View className="pt-2">
          <Button 
            title="Iniciar Sesión"
            onPress={() => signInWithEmail(email, password)}
            loading={loading}
            className="shadow-violet-200"
          />
        </View>

      </Animated.View>

      {/* FOOTER */}
      <Animated.View 
        entering={FadeInUp.delay(400).duration(800)} 
        className="mt-12 flex-row justify-center items-center pb-10"
      >
        <Text className="text-slate-500 font-medium">¿Aún no eres miembro? </Text>
        <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
          <Text className="text-violet-600 font-bold text-lg">Regístrate</Text>
        </TouchableOpacity>
      </Animated.View>

    </Screen>
  );
}
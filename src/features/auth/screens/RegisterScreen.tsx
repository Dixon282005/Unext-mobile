import { useRouter } from 'expo-router';
import { Briefcase, ChevronLeft, Eye, EyeOff, Lock, Mail, User } from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

// 👇 Importamos TUS Componentes Globales
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Screen } from '@/components/ui/Screen';
import { useAuth } from '../hooks/useAuth';

export function RegisterScreen() {
  const router = useRouter();
  // ⚠️ Asegúrate de actualizar tu hook useAuth para recibir estos nuevos datos
  const { signUpWithEmail, loading } = useAuth(); 

  // Estados del Formulario
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Estado para el Tipo de Usuario (Por defecto 'talent')
  const [userType, setUserType] = useState<'talent' | 'company'>('talent');
  
  // Estados para visibilidad de contraseñas
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = () => {
    // 1. Validaciones básicas
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      Alert.alert("Campos incompletos", "Por favor llena todos los campos.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }

    // 2. Preparamos los datos
    // Concatenamos nombre para el display, pero enviamos todo a la DB
    const fullName = `${firstName} ${lastName}`; 
    const metadata = {
        firstName,
        lastName,
        userType // 'talent' o 'company'
    };

    // 3. Llamamos al registro (Pasando la metadata extra)
    // NOTA: Tu hook useAuth debe estar preparado para recibir 'metadata' o el objeto extra.
    signUpWithEmail(email, password, fullName, metadata); 
  };

  return (
    <Screen scroll safeArea className="bg-white px-6">
      
      {/* Botón Atrás */}
      <View className="mt-2 items-start">
        <TouchableOpacity 
          onPress={() => router.back()} 
          className="w-10 h-10 bg-slate-50 rounded-full items-center justify-center border border-slate-200"
        >
          <ChevronLeft size={24} color="#1e293b" />
        </TouchableOpacity>
      </View>

      {/* HEADER */}
      <Animated.View 
        entering={FadeInDown.duration(800).springify()} 
        className="items-center my-6"
      >
        <Text className="text-slate-900 text-3xl font-extrabold tracking-tight">
          Crea tu cuenta 🚀
        </Text>
        <Text className="text-slate-500 text-base font-medium mt-1 text-center">
          Únete como Talento o Empresa
        </Text>
      </Animated.View>

      {/* FORMULARIO */}
      <Animated.View 
        entering={FadeInUp.delay(200).duration(800).springify()} 
        className="space-y-4"
      >
        
        {/* SELECTOR DE TIPO DE USUARIO */}
        <View className="flex-row gap-3 mb-2">
            {/* Opción Talento */}
            <TouchableOpacity 
                onPress={() => setUserType('talent')}
                className={`flex-1 flex-row items-center justify-center p-4 rounded-2xl border transition-all ${
                    userType === 'talent' 
                    ? 'bg-violet-600 border-violet-600' 
                    : 'bg-slate-50 border-slate-200'
                }`}
            >
                <User size={20} color={userType === 'talent' ? 'white' : '#64748b'} />
                <Text className={`ml-2 font-bold ${userType === 'talent' ? 'text-white' : 'text-slate-500'}`}>
                    Talento
                </Text>
            </TouchableOpacity>

            {/* Opción Empresa */}
            <TouchableOpacity 
                onPress={() => setUserType('company')}
                className={`flex-1 flex-row items-center justify-center p-4 rounded-2xl border transition-all ${
                    userType === 'company' 
                    ? 'bg-violet-600 border-violet-600' 
                    : 'bg-slate-50 border-slate-200'
                }`}
            >
                <Briefcase size={20} color={userType === 'company' ? 'white' : '#64748b'} />
                <Text className={`ml-2 font-bold ${userType === 'company' ? 'text-white' : 'text-slate-500'}`}>
                    Empresa
                </Text>
            </TouchableOpacity>
        </View>

        {/* Nombre y Apellido (En una fila o separados, aquí los pongo separados para móvil) */}
        <View className="flex-row gap-3">
            <View className="flex-1">
                <Input 
                  label="Nombre"
                  placeholder="Juan"
                  value={firstName}
                  onChangeText={setFirstName}
                />
            </View>
            <View className="flex-1">
                <Input 
                  label="Apellido"
                  placeholder="Pérez"
                  value={lastName}
                  onChangeText={setLastName}
                />
            </View>
        </View>

        {/* Correo */}
        <Input 
          label="Correo Electrónico"
          placeholder="ejemplo@unext.com"
          keyboardType="email-address"
          autoCapitalize="none"
          icon={<Mail size={20} color="#64748b" />}
          value={email}
          onChangeText={setEmail}
        />

        {/* Contraseña */}
        <Input 
          label="Contraseña"
          placeholder="Mínimo 6 caracteres"
          secureTextEntry={!showPassword}
          icon={<Lock size={20} color="#64748b" />}
          value={password}
          onChangeText={setPassword}
          rightIcon={showPassword ? <EyeOff size={20} color="#64748b"/> : <Eye size={20} color="#64748b"/>}
          onRightIconPress={() => setShowPassword(!showPassword)}
        />

        {/* Repetir Contraseña */}
        <Input 
          label="Confirmar Contraseña"
          placeholder="Repite tu contraseña"
          secureTextEntry={!showConfirmPassword}
          icon={<Lock size={20} color="#64748b" />}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          rightIcon={showConfirmPassword ? <EyeOff size={20} color="#64748b"/> : <Eye size={20} color="#64748b"/>}
          onRightIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
        />

        {/* Botón de Registro */}
        <View className="pt-4">
          <Button 
            title={userType === 'company' ? "Registrar Empresa" : "Registrarme"}
            onPress={handleRegister}
            loading={loading}
            className="shadow-violet-200"
          />
        </View>

      </Animated.View>

      {/* FOOTER */}
      <Animated.View 
        entering={FadeInUp.delay(400).duration(800)} 
        className="mt-8 mb-6 flex-row justify-center items-center pb-10"
      >
        <Text className="text-slate-500 font-medium">¿Ya tienes cuenta? </Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-violet-600 font-bold text-lg">Inicia Sesión</Text>
        </TouchableOpacity>
      </Animated.View>

    </Screen>
  );
}
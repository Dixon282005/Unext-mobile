import { supabase } from '@/lib/supabase'; // Asegúrate de que esta ruta coincida con tu archivo de configuración
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';

export function useAuth() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // --- 1. INICIAR SESIÓN (Login) ---
  const signInWithEmail = async (email: string, password: string) => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor ingresa correo y contraseña');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      // Si todo sale bien, el _layout.tsx nos redirigirá, 
      // pero por seguridad forzamos la ruta al Home (Tabs)
      router.replace('/(tabs)/feed');

    } catch (error: any) {
      Alert.alert('Error al entrar', error.message);
    } finally {
      setLoading(false);
    }
  };

  // --- 2. REGISTRARSE (Sign Up) ---
  const signUpWithEmail = async (email: string, password: string, fullName: string) => {
    if (!email || !password || !fullName) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName, // Guardamos el nombre real en la metadata del usuario
          },
        },
      });

      if (error) throw error;

      // Verificamos si Supabase pide confirmar email o deja pasar directo
      if (!data.session) {
        Alert.alert('¡Registro Exitoso!', 'Por favor revisa tu correo para confirmar la cuenta.');
      } else {
        router.replace('/(tabs)');
      }

    } catch (error: any) {
      Alert.alert('Error en el registro', error.message);
    } finally {
      setLoading(false);
    }
  };

  // --- 3. CERRAR SESIÓN (Sign Out) ---
  const signOut = async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
      router.replace('/(auth)/login');
    } catch (error: any) {
      console.error('Error saliendo:', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Exportamos las funciones y el estado de carga
  return {
    signInWithEmail,
    signUpWithEmail,
    signOut,
    loading,
  };
}
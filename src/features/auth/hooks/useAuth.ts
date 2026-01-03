import { supabase } from '@/lib/supabase';
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
      
      // ✅ CORRECCIÓN: Quitamos el router.replace manual.
      // El _layout.tsx detectará la sesión y nos moverá automáticamente.
      console.log("Login exitoso. Esperando redirección del Layout...");

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
            full_name: fullName,
          },
        },
      });

      if (error) throw error;

      if (!data.session) {
        Alert.alert('¡Registro Exitoso!', 'Por favor revisa tu correo para confirmar la cuenta.');
      } else {
        // ✅ CORRECCIÓN: Aquí también quitamos la redirección manual.
        console.log("Registro exitoso. Esperando redirección del Layout...");
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
      // En el logout sí podemos forzar la salida por seguridad, 
      // aunque el layout también lo haría.
      router.replace('/(auth)/login');
    } catch (error: any) {
      console.error('Error saliendo:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    signInWithEmail,
    signUpWithEmail,
    signOut,
    loading,
  };
}
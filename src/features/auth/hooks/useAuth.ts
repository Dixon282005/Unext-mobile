import { supabase } from '@/lib/supabase';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';

// Definimos qué datos extra pueden venir en el registro
interface RegisterMetadata {
  firstName: string;
  lastName: string;
  userType: 'talent' | 'company';
}

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
      
      // El _layout.tsx detectará el cambio de sesión y redirigirá.
      console.log("Login exitoso.");

    } catch (error: any) {
      Alert.alert('Error al entrar', error.message);
    } finally {
      setLoading(false);
    }
  };

  // --- 2. REGISTRARSE (Sign Up) ---
  // 👇 ACTUALIZADO: Ahora recibe 'metadata' con los campos extra
  const signUpWithEmail = async (
    email: string, 
    password: string, 
    fullName: string,
    metadata?: RegisterMetadata 
  ) => {
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
            full_name: fullName, // Nombre completo para mostrar
            // 👇 Aquí desglosamos los datos extra (firstName, lastName, userType)
            // para que se guarden en la columna 'raw_user_meta_data' de Supabase
            ...metadata 
          },
        },
      });

      if (error) throw error;

      if (!data.session) {
        Alert.alert('¡Registro Exitoso!', 'Por favor revisa tu correo para confirmar la cuenta.');
      } else {
        console.log("Registro exitoso.");
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
      // El _layout.tsx nos mandará al login automáticamente.
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
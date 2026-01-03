import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

// ⚠️ RECUERDA: Pon aquí tus claves reales de Supabase
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!; 
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Usamos AsyncStorage directo: Sin límites de tamaño, simple y funcional.
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
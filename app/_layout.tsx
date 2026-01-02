import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

// ⚠️ CORRECCIÓN: Usamos ".." para salir de "app" y buscar "styles" en la raíz
import "../styles/global.css";

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Aquí definimos que la única pantalla es tu index.tsx */}
        <Stack.Screen name="index" />
      </Stack>
      <StatusBar style="light" /> 
    </>
  );
}
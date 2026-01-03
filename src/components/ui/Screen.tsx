import React from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    View,
    ViewStyle
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
  children: React.ReactNode;
  scroll?: boolean; // ¿La pantalla necesita scroll? (Por defecto: NO)
  className?: string; // Para color de fondo extra
  style?: ViewStyle;
}

export function Screen({ children, scroll = false, className = "bg-slate-50", style }: Props) {
  // Decidimos si usar ScrollView o View normal
  const Container = scroll ? ScrollView : View;
  
  // Propiedades específicas para el contenedor
  const containerProps = scroll 
    ? { 
        contentContainerStyle: { flexGrow: 1, paddingBottom: 24 }, 
        showsVerticalScrollIndicator: false 
      } 
    : { style: { flex: 1 } };

  return (
    <SafeAreaView className={`flex-1 ${className}`} edges={['top', 'left', 'right']}>
      {/* Barra de estado oscura (texto negro) para fondos claros */}
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <Container {...containerProps} className="flex-1 px-4" style={style}>
          {children}
        </Container>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
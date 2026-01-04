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
  scroll?: boolean;      // ¿Necesita scroll?
  safeArea?: boolean;    // 👈 ¡Agregado! ¿Respetar los márgenes del iPhone?
  className?: string;    // Clases de Tailwind extra
  style?: ViewStyle;     // Estilos en línea extra
}

export function Screen({ 
  children, 
  scroll = false, 
  safeArea = false, // Por defecto es false para que tú decidas cuándo usarlo
  className = "bg-slate-50", 
  style 
}: Props) {
  
  // 1. Decidimos el Contenedor Principal (Wrapper)
  // Si safeArea es true, usamos SafeAreaView. Si no, View normal.
  const Wrapper = safeArea ? SafeAreaView : View;

  // 2. Decidimos si el contenido interno lleva Scroll
  const Container = scroll ? ScrollView : View;
  
  // 3. Propiedades para el Scroll (si aplica)
  const containerProps = scroll 
    ? { 
        contentContainerStyle: { flexGrow: 1, paddingBottom: 24 }, 
        showsVerticalScrollIndicator: false,
        keyboardShouldPersistTaps: "handled" as const
      } 
    : { style: { flex: 1 } };

  return (
    // @ts-ignore - Ignoramos error de tipos en className de NativeWind si aparece
    <Wrapper className={`flex-1 ${className}`} style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        {/* @ts-ignore */}
        <Container {...containerProps} className="flex-1 px-4" style={style}>
          {children}
        </Container>
      </KeyboardAvoidingView>
    </Wrapper>
  );
}
import { LinearGradient } from 'expo-linear-gradient';
import { Zap } from 'lucide-react-native';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';

const { width, height } = Dimensions.get('window');

interface Props {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: Props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, friction: 4, tension: 40, useNativeDriver: true }),
    ]).start();

    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, { toValue: 0, duration: 400, useNativeDriver: true }).start(onComplete);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    // 👇 SOLUCIÓN: Usamos style={{ flex: 1 }} explícito para obligarlo a llenar la pantalla
    <LinearGradient
      colors={['#7c3aed', '#6d28d9', '#4c1d95']}
      style={styles.container} // Usamos estilo nativo aquí
    >
      {/* Decoración de fondo */}
      <View className="absolute top-1/4 left-[-50] w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      <View className="absolute bottom-1/4 right-[-50] w-80 h-80 bg-violet-400/20 rounded-full blur-3xl" />

      <Animated.View
        style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}
        className="items-center"
      >
        <View className="w-32 h-32 rounded-[32px] bg-white/10 border border-white/20 items-center justify-center mb-6 shadow-2xl backdrop-blur-md">
          <Zap size={64} color="white" fill="white" />
        </View>
        
        <Text className="text-5xl font-extrabold text-white tracking-tighter">
          UNEXT<Text className="text-violet-300">.</Text>
        </Text>
      </Animated.View>
    </LinearGradient>
  );
}

// 👇 Estilos nativos de respaldo
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,   // Fuerza ancho total
    height: height, // Fuerza alto total
    alignItems: 'center',
    justifyContent: 'center',
  }
});
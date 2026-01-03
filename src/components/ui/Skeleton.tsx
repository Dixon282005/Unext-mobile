import React, { useEffect, useRef } from 'react';
import { Animated, DimensionValue, ViewStyle } from 'react-native'; // 👈 1. Importamos DimensionValue

interface Props {
  width?: DimensionValue;  // 👈 2. Usamos el tipo oficial
  height?: DimensionValue; // 👈 2. Usamos el tipo oficial
  borderRadius?: number;
  style?: ViewStyle;
  className?: string;
}

export function Skeleton({ width = '100%', height = 20, borderRadius = 8, style, className = '' }: Props) {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    // Loop infinito de parpadeo (Pulse effect)
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      className={`bg-slate-200 ${className}`}
      style={[
        
        { opacity, width, height, borderRadius }, 
        style
      ]}
    />
  );
}
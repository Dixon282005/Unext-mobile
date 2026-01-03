import React from 'react';
import { TouchableOpacity, View, ViewStyle } from 'react-native';

interface Props {
  children: React.ReactNode;
  onPress?: () => void; // Si existe, la tarjeta es clickeable
  className?: string;
  style?: ViewStyle;
}

export function Card({ children, onPress, className = '', style }: Props) {
  // Clases base: Fondo blanco, bordes redondeados, sombra suave, borde gris fino
  const baseStyle = `bg-white rounded-xl border border-slate-200 shadow-sm p-4 ${className}`;

  // Si tiene función al presionar, usamos TouchableOpacity
  if (onPress) {
    return (
      <TouchableOpacity 
        onPress={onPress} 
        activeOpacity={0.7} 
        className={baseStyle}
        style={style}
      >
        {children}
      </TouchableOpacity>
    );
  }

  // Si es solo visual, usamos View
  return (
    <View className={baseStyle} style={style}>
      {children}
    </View>
  );
}
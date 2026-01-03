import React from 'react';
import { Image, Text, View } from 'react-native';

interface Props {
  uri?: string | null;            // URL de la imagen (puede ser null)
  fallback?: string;              // Iniciales (ej: "JP") por si no hay foto
  size?: 'sm' | 'md' | 'lg' | 'xl'; // Tamaños predefinidos
}

export function Avatar({ uri, fallback = '?', size = 'md' }: Props) {
  
  // Diccionario de tamaños (Tailwind classes no funcionan dinámicamente con w-[${size}], mejor pixel o maps)
  // Usamos clases de Tailwind predefinidas
  const sizeClasses = {
    sm: 'w-8 h-8',       // 32px (Comentarios, header pequeño)
    md: 'w-12 h-12',     // 48px (Feed estándar)
    lg: 'w-16 h-16',     // 64px (Listas grandes)
    xl: 'w-24 h-24',     // 96px (Perfil propio grande)
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-base',
    lg: 'text-xl',
    xl: 'text-3xl',
  };

  const containerClass = `${sizeClasses[size]} rounded-full overflow-hidden border border-slate-200 bg-slate-100 items-center justify-center`;

  // 1. Si hay URL válida, mostramos la imagen
  if (uri) {
    return (
      <View className={containerClass}>
        <Image 
          source={{ uri }} 
          className="w-full h-full" 
          resizeMode="cover" 
        />
      </View>
    );
  }

  // 2. Si no hay URL, mostramos las iniciales
  return (
    <View className={containerClass}>
      <Text className={`${textSizes[size]} font-bold text-slate-500`}>
        {fallback.slice(0, 2).toUpperCase()} {/* Máximo 2 letras */}
      </Text>
    </View>
  );
}
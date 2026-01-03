import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'; // Variantes visuales
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode; // Icono opcional a la izquierda
  className?: string;     // Para márgenes extra
}

export function Button({ 
  title, 
  onPress, 
  variant = 'primary', 
  loading = false, 
  disabled = false, 
  icon,
  className = '' 
}: Props) {

  // Lógica de estilos según la variante
  const getBackgroundStyle = () => {
    if (disabled) return 'bg-slate-200 border-slate-200'; // Deshabilitado
    
    switch (variant) {
      case 'primary': return 'bg-violet-600 border-violet-600 shadow-sm shadow-violet-200';
      case 'secondary': return 'bg-violet-100 border-violet-100';
      case 'outline': return 'bg-transparent border border-slate-300';
      case 'ghost': return 'bg-transparent border-transparent';
      default: return 'bg-violet-600';
    }
  };

  const getTextStyle = () => {
    if (disabled) return 'text-slate-400';
    
    switch (variant) {
      case 'primary': return 'text-white';
      case 'secondary': return 'text-violet-700';
      case 'outline': return 'text-slate-700';
      case 'ghost': return 'text-slate-600';
      default: return 'text-white';
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      className={`h-14 rounded-2xl border flex-row items-center justify-center px-4 ${getBackgroundStyle()} ${className}`}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? 'white' : '#7c3aed'} />
      ) : (
        <>
          {icon && <View className="mr-2">{icon}</View>}
          <Text className={`font-bold text-base ${getTextStyle()}`}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}
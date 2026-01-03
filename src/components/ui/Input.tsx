import React, { useState } from 'react';
import { Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';

interface Props extends TextInputProps {
  label?: string;          // Texto arriba del input
  error?: string;          // Mensaje de error abajo
  icon?: React.ReactNode;  // Icono a la izquierda (ej: Mail)
  rightIcon?: React.ReactNode; // Icono a la derecha (ej: Ojo contraseña)
  onRightIconPress?: () => void; // Acción al tocar icono derecho
}

export function Input({ 
  label, 
  error, 
  icon, 
  rightIcon, 
  onRightIconPress,
  className = '', 
  ...props 
}: Props) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className={`mb-4 ${className}`}>
      {/* Label (Opcional) */}
      {label && (
        <Text className="text-sm font-bold text-slate-700 mb-1.5 ml-1">
          {label}
        </Text>
      )}

      {/* Contenedor del Input */}
      <View 
        className={`
          flex-row items-center bg-slate-50 border rounded-xl px-4 h-14 transition-all
          ${error ? 'border-red-500 bg-red-50' : isFocused ? 'border-violet-600 bg-white' : 'border-slate-200'}
        `}
      >
        {/* Icono Izquierdo */}
        {icon && <View className="mr-3 opacity-70">{icon}</View>}

        <TextInput
          className="flex-1 text-slate-900 text-base font-medium h-full"
          placeholderTextColor="#94a3b8"
          cursorColor="#7c3aed"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        {/* Icono Derecho (Clickeable opcionalmente) */}
        {rightIcon && (
          <TouchableOpacity onPress={onRightIconPress} disabled={!onRightIconPress}>
            <View className="ml-2 opacity-70">{rightIcon}</View>
          </TouchableOpacity>
        )}
      </View>

      {/* Mensaje de Error */}
      {error && (
        <Text className="text-red-500 text-xs mt-1 ml-1 font-medium">
          {error}
        </Text>
      )}
    </View>
  );
}
import { SearchX } from 'lucide-react-native'; // Asegúrate de tener este icono o usa otro
import React from 'react';
import { View } from 'react-native';
import { Button } from './Button';
import { ThemedText } from './ThemedText';

interface Props {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({ 
  title = "No se encontraron resultados", 
  description = "Intenta ajustar los filtros o busca con otras palabras clave.", 
  icon, 
  actionLabel, 
  onAction,
  className = ''
}: Props) {
  return (
    <View className={`items-center justify-center py-12 px-6 ${className}`}>
      
      {/* Círculo de fondo para el icono */}
      <View className="bg-slate-100 p-6 rounded-full mb-6">
        {icon || <SearchX size={48} color="#94a3b8" />}
      </View>

      <ThemedText variant="h2" className="text-center mb-2">
        {title}
      </ThemedText>
      
      <ThemedText variant="body" className="text-center text-slate-500 mb-8 max-w-[300px]">
        {description}
      </ThemedText>

      {/* Botón de acción opcional (Ej: "Recargar", "Borrar filtros") */}
      {actionLabel && onAction && (
        <Button 
          title={actionLabel} 
          onPress={onAction} 
          variant="secondary" 
          className="h-12 px-8"
        />
      )}
    </View>
  );
}
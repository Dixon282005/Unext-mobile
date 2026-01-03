import React from 'react';
import { Text, View } from 'react-native';

interface Props {
  label: string;
  variant?: 'default' | 'outline' | 'success' | 'warning';
}

export function Badge({ label, variant = 'default' }: Props) {
  
  const getStyle = () => {
    switch (variant) {
      case 'outline': return 'border border-slate-300 bg-transparent';
      case 'success': return 'bg-emerald-100 border border-emerald-200'; // Verde (Ej: "Remoto")
      case 'warning': return 'bg-amber-100 border border-amber-200';     // Amarillo (Ej: "Urgente")
      default: return 'bg-slate-100 border border-slate-200';            // Gris (Default)
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'outline': return 'text-slate-600';
      case 'success': return 'text-emerald-700';
      case 'warning': return 'text-amber-700';
      default: return 'text-slate-600';
    }
  };

  return (
    <View className={`px-2.5 py-1 rounded-md self-start ${getStyle()}`}>
      <Text className={`text-xs font-bold ${getTextStyle()} uppercase tracking-wider`}>
        {label}
      </Text>
    </View>
  );
}
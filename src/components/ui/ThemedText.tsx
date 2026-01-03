import React from 'react';
import { Text, TextProps } from 'react-native';

interface Props extends TextProps {
  variant?: 'h1' | 'h2' | 'body' | 'caption' | 'link';
  className?: string; // Para agregar colores o márgenes extra si hace falta
}

export function ThemedText({ variant = 'body', className = '', style, ...props }: Props) {
  
  // Diccionario de estilos base para cada variante
  const variants = {
    h1: 'text-3xl font-extrabold text-slate-900 tracking-tight', // Títulos Grandes
    h2: 'text-xl font-bold text-slate-800',                     // Subtítulos
    body: 'text-base font-normal text-slate-600 leading-6',      // Texto normal
    caption: 'text-sm font-medium text-slate-400',               // Textos pequeños (ej. fechas)
    link: 'text-base font-bold text-violet-600 underline',       // Enlaces
  };

  // Combinamos la variante con tus clases extra
  const finalClass = `${variants[variant]} ${className}`;

  return (
    <Text className={finalClass} style={style} {...props} />
  );
}
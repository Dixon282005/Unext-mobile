import { Briefcase, Image as ImageIcon, Video } from 'lucide-react-native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native'; // Usamos View y Text nativos para evitar conflictos

import { Avatar } from '@/components/ui/Avatar';
import { ThemedText } from '@/components/ui/ThemedText';

export function CreatePostInput() {
  return (
    // 👇 CAMBIO IMPORTANTE: Usamos View en lugar de Card
    // Esto evita el error de "Maximum call stack size exceeded"
    <View className="bg-white mb-3 border-y border-slate-100 shadow-sm p-4">
      
      {/* 1. Input Falso Superior */}
      <View className="flex-row items-center mb-4">
        <Avatar 
          uri="https://i.pravatar.cc/300?u=juan" 
          fallback="YO" 
          size="md" 
        />
        
        <TouchableOpacity className="flex-1 ml-3 h-10 bg-slate-50 rounded-full justify-center px-4 border border-slate-200">
           <ThemedText className="text-slate-400 font-medium text-sm">
             ¿En qué estás pensando?
           </ThemedText>
        </TouchableOpacity>
      </View>

      {/* Línea divisoria */}
      <View className="h-[1px] bg-slate-100 w-full mb-2" />

      {/* 2. Botones de Acción Rápida */}
      <View className="flex-row justify-around">
        
        <TouchableOpacity className="flex-row items-center p-2">
          <ImageIcon size={20} color="#3b82f6" /> 
          <Text className="text-slate-600 font-bold text-xs ml-2">Multimedia</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center p-2">
          <Briefcase size={20} color="#a855f7" /> 
          <Text className="text-slate-600 font-bold text-xs ml-2">Vacante</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center p-2">
          <Video size={20} color="#ef4444" /> 
          <Text className="text-slate-600 font-bold text-xs ml-2">Video</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}
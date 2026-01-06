import { Briefcase, Image as ImageIcon, Video } from 'lucide-react-native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Avatar } from '@/components/ui/Avatar';
import { Card } from '@/components/ui/Card';
import { ThemedText } from '@/components/ui/ThemedText';

export function CreatePostInput() {
  return (
    <Card className="mx-0 mb-3 p-4 border-y border-slate-200 shadow-sm bg-white rounded-none">
      
      {/* 1. Input Falso Superior */}
      <View className="flex-row items-center mb-4">
        <Avatar 
          uri="https://i.pravatar.cc/300?u=juan" // Tu foto
          fallback="YO" 
          size="md" 
        />
        <TouchableOpacity className="flex-1 ml-3 h-10 bg-slate-100 rounded-full justify-center px-4 border border-slate-200">
           <ThemedText className="text-slate-500 font-medium">
             ¿En qué estás pensando?
           </ThemedText>
        </TouchableOpacity>
      </View>

      {/* 2. Botones de Acción Rápida (Como LinkedIn) */}
      <View className="flex-row justify-around pt-2 border-t border-slate-100">
        
        <TouchableOpacity className="flex-row items-center space-x-2 p-2">
          <ImageIcon size={20} color="#3b82f6" /> {/* Azul Foto */}
          <ThemedText className="text-slate-600 font-bold text-xs ml-1">Multimedia</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center space-x-2 p-2">
          <Briefcase size={20} color="#a855f7" /> {/* Violeta Trabajo */}
          <ThemedText className="text-slate-600 font-bold text-xs ml-1">Vacante</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center space-x-2 p-2">
          <Video size={20} color="#ef4444" /> {/* Rojo Video */}
          <ThemedText className="text-slate-600 font-bold text-xs ml-1">Video</ThemedText>
        </TouchableOpacity>

      </View>
    </Card>
  );
}
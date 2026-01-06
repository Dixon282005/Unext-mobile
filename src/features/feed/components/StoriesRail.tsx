import { Plus } from 'lucide-react-native';
import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';

import { Avatar } from '@/components/ui/Avatar';
import { ThemedText } from '@/components/ui/ThemedText';

// Datos Mock de Historias
const STORIES = [
  { id: '1', name: 'Tu historia', user: 'me', img: 'https://i.pravatar.cc/300?u=juan', seen: false },
  { id: '2', name: 'Maria Rod...', user: 'maria', img: 'https://i.pravatar.cc/150?u=maria', seen: false },
  { id: '3', name: 'Carlos Tech', user: 'carlos', img: 'https://i.pravatar.cc/150?u=carlos', seen: false },
  { id: '4', name: 'Ana Sofía', user: 'ana', img: 'https://i.pravatar.cc/150?u=ana', seen: true },
  { id: '5', name: 'Unext Official', user: 'unext', img: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80', seen: false },
  { id: '6', name: 'Elon Musk', user: 'elon', img: 'https://i.pravatar.cc/150?u=elon', seen: true },
];

export function StoriesRail() {
  return (
    <View className="py-4 border-b border-slate-100 bg-white mb-2">
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {/* 1. Botón "Tu Historia" (Agregar) */}
        <View className="mr-4 items-center">
          <View className="relative">
            <Avatar uri={STORIES[0].img} size="lg" />
            <TouchableOpacity className="absolute bottom-0 right-0 bg-violet-600 rounded-full w-6 h-6 items-center justify-center border-2 border-white">
              <Plus size={14} color="white" />
            </TouchableOpacity>
          </View>
          <ThemedText className="text-xs text-slate-600 mt-1 font-medium">Tu historia</ThemedText>
        </View>

        {/* 2. Lista de Historias de otros */}
        {STORIES.slice(1).map((story) => (
          <TouchableOpacity key={story.id} className="mr-4 items-center space-y-1">
            
            {/* Anillo de estado (Violeta = Nuevo, Gris = Visto) */}
            <View className={`p-[2px] rounded-full ${story.seen ? 'bg-slate-200' : 'bg-violet-600'}`}>
               <View className="border-2 border-white rounded-full">
                  <Avatar uri={story.img} size="lg" />
               </View>
            </View>

            <ThemedText className={`text-xs ${story.seen ? 'text-slate-400' : 'text-slate-800 font-semibold'}`}>
              {story.name}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
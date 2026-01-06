import { LinearGradient } from 'expo-linear-gradient';
import { Briefcase, MapPin } from 'lucide-react-native';
import React from 'react';
import { Dimensions, Image, View } from 'react-native';

import { ThemedText } from '@/components/ui/ThemedText';

const { width, height } = Dimensions.get('window');
// Calculamos un tamaño responsivo
const CARD_WIDTH = width * 0.9;
const CARD_HEIGHT = height * 0.65;

interface Props {
  user: {
    id: string;
    name: string;
    role: string;
    image: string;
    skills: string[];
    location: string;
    matchScore: number; // Porcentaje de compatibilidad IA
  };
}

export function MatchCard({ user }: Props) {
  return (
    <View 
      className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-300 relative border border-slate-200"
      style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
    >
      {/* 1. Imagen de Fondo Completa */}
      <Image 
        source={{ uri: user.image }} 
        className="w-full h-full absolute"
        resizeMode="cover"
      />

      {/* 2. Gradiente para que el texto se lea bien */}
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        className="absolute bottom-0 w-full h-1/2"
      />

      {/* 3. Badge de IA Match */}
      <View className="absolute top-4 right-4 bg-violet-600 px-3 py-1 rounded-full shadow-lg border border-white/20">
         <ThemedText className="text-white font-bold text-xs">
           ✨ {user.matchScore}% Match
         </ThemedText>
      </View>

      {/* 4. Información del Usuario (Abajo) */}
      <View className="absolute bottom-0 w-full p-6">
        
        <ThemedText className="text-white text-3xl font-extrabold mb-1 shadow-black">
          {user.name}
        </ThemedText>
        
        <View className="flex-row items-center mb-2">
          <Briefcase size={16} color="#cbd5e1" />
          <ThemedText className="text-slate-200 text-base font-medium ml-2">
            {user.role}
          </ThemedText>
        </View>

        <View className="flex-row items-center mb-4">
          <MapPin size={16} color="#cbd5e1" />
          <ThemedText className="text-slate-300 text-sm ml-2">
            {user.location}
          </ThemedText>
        </View>

        {/* Skills */}
        <View className="flex-row flex-wrap gap-2">
          {user.skills.map(skill => (
            <View key={skill} className="bg-white/20 px-3 py-1 rounded-full border border-white/10">
               <ThemedText className="text-white text-xs font-semibold">{skill}</ThemedText>
            </View>
          ))}
        </View>

      </View>
    </View>
  );
}
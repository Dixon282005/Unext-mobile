import { UserPlus } from 'lucide-react-native';
import React from 'react';
import { Dimensions, Image, View } from 'react-native';

import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ThemedText } from '@/components/ui/ThemedText';

const { width } = Dimensions.get('window');
// Calculamos el ancho para que quepan 2 columnas con margen
const CARD_WIDTH = (width - 48) / 2; 

interface Props {
  user: {
    name: string;
    role: string;
    avatar: string | null;
    mutual: number;
    cover?: string; // Portada opcional
  };
}

export function UserGridItem({ user }: Props) {
  return (
    <Card 
      className="mb-4 overflow-hidden border-slate-200 shadow-sm p-0 bg-white"
      style={{ width: CARD_WIDTH }}
    >
      {/* Portada decorativa (Gris o Imagen) */}
      <View className="h-14 bg-slate-100 w-full relative">
        {user.cover && (
            <Image source={{ uri: user.cover }} className="w-full h-full opacity-80" resizeMode="cover" />
        )}
        {/* Avatar superpuesto */}
        <View className="absolute -bottom-8 left-0 right-0 items-center">
            <View className="p-1 bg-white rounded-full">
                <Avatar uri={user.avatar} fallback={user.name} size="lg" />
            </View>
        </View>
      </View>

      {/* Contenido */}
      <View className="pt-10 pb-4 px-3 items-center">
        <ThemedText className="font-bold text-center text-slate-900 text-sm mb-1 line-clamp-1">
            {user.name}
        </ThemedText>
        <ThemedText className="text-slate-500 text-center text-xs h-8 leading-4 mb-2 line-clamp-2">
            {user.role}
        </ThemedText>
        
        <ThemedText className="text-slate-400 text-[10px] mb-3">
            {user.mutual} mutuos
        </ThemedText>

        <Button 
            title="Conectar" 
            variant="outline" 
            className="w-full h-9 rounded-lg"
            onPress={() => {}}
            icon={<UserPlus size={14} color="#475569" />}
        />
      </View>
    </Card>
  );
}
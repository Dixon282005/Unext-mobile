import { Heart, LogOut, MessageCircle, MoreHorizontal, Share2 } from 'lucide-react-native';
import React, { useCallback } from 'react';
import { Alert, FlatList, Image, TouchableOpacity, View } from 'react-native';

// Importamos componentes UI
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Divider } from '@/components/ui/Divider';
import { Screen } from '@/components/ui/Screen';
import { ThemedText } from '@/components/ui/ThemedText';

// Importamos el hook de autenticación
import { useAuth } from '@/features/auth/hooks/useAuth';

// Datos de prueba
const POSTS = [
  {
    id: '1',
    user: {
      name: 'Maria Rodriguez',
      role: 'UX Designer en Google',
      avatar: 'https://i.pravatar.cc/150?u=maria',
    },
    time: 'Hace 2h',
    content: '¡Emocionada de anunciar que terminé mi certificación de Diseño Accesible! 🎨✨ La inclusión no es una "feature", es un derecho.',
    tags: ['UX', 'Design', 'Inclusión'],
    likes: 45,
    comments: 12,
  },
  {
    id: '2',
    user: {
      name: 'Carlos Tech',
      role: 'Desarrollador React Native',
      avatar: null, 
    },
    time: 'Hace 5h',
    content: 'Buscando desarrolladores Junior para proyecto en Unext. Stack: React Native + Expo + Supabase. ¿Interesados? 👇',
    tags: ['Empleo', 'Remoto', 'React'],
    likes: 128,
    comments: 45,
    image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=1000&auto=format&fit=crop', 
  },
  {
    id: '3',
    user: {
      name: 'Ana Sofía',
      role: 'Recruiter IT',
      avatar: 'https://i.pravatar.cc/150?u=ana',
    },
    time: 'Hace 1d',
    content: 'Consejo del día: Tu portafolio vale más que tu título universitario en el mundo Tech. 💼🔥',
    tags: ['Consejos', 'Carrera', 'Tech'],
    likes: 230,
    comments: 89,
  }
];

export default function FeedScreen() {
  const { signOut } = useAuth(); 

  const handleLogout = () => {
    Alert.alert(
      "Cerrar Sesión",
      "¿Estás seguro que quieres salir?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Salir", style: "destructive", onPress: signOut }
      ]
    );
  };

  const renderPost = useCallback(({ item }: { item: typeof POSTS[0] }) => (
    <Card className="mx-4 mb-4 border border-slate-200 shadow-sm bg-white rounded-2xl overflow-hidden">
      
      {/* 1. HEADER */}
      <View className="flex-row items-center mb-3">
        <Avatar uri={item.user.avatar} fallback={item.user.name} size="md" />
        
        <View className="ml-3 flex-1">
          <ThemedText variant="h2" className="text-base font-bold text-slate-900">
            {item.user.name}
          </ThemedText>
          <ThemedText variant="caption" className="text-slate-500 text-xs font-medium">
            {item.user.role} • {item.time}
          </ThemedText>
        </View>

        <TouchableOpacity className="p-1">
          <MoreHorizontal size={20} color="#94a3b8" />
        </TouchableOpacity>
      </View>

      {/* 2. CONTENIDO */}
      <ThemedText variant="body" className="mb-3 text-slate-700 leading-6">
        {item.content}
      </ThemedText>

      {/* Imagen opcional */}
      {item.image && (
        <Image 
          source={{ uri: item.image }} 
          className="w-full h-52 rounded-xl mb-4 bg-slate-100"
          resizeMode="cover"
        />
      )}

      {/* Tags */}
      <View className="flex-row flex-wrap gap-2 mb-4">
        {item.tags.map(tag => (
          // Asegúrate de usar variantes que existan en tu Badge.tsx (secondary, outline, etc)
          <Badge key={tag} label={tag} variant="success" />
        ))}
      </View>

      <Divider className="my-1 bg-slate-100" />

      {/* 3. FOOTER (Botones) */}
      <View className="flex-row justify-between items-center mt-2 px-1">
        
        <TouchableOpacity className="flex-row items-center space-x-1 py-1 px-2 rounded-lg active:bg-slate-50">
          <Heart size={20} color="#64748b" />
          <ThemedText variant="caption" className="ml-2 font-medium text-slate-600">{item.likes}</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center space-x-1 py-1 px-2 rounded-lg active:bg-slate-50">
          <MessageCircle size={20} color="#64748b" />
          <ThemedText variant="caption" className="ml-2 font-medium text-slate-600">{item.comments}</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center space-x-1 py-1 px-2 rounded-lg active:bg-slate-50">
          <Share2 size={20} color="#64748b" />
        </TouchableOpacity>

      </View>
    </Card>
  ), []);

  return (
    // 👇 AQUÍ ESTÁ EL ARREGLO 1: safeArea={true} para respetar el notch
    <Screen safeArea className="bg-slate-50"> 
      
      {/* HEADER PRINCIPAL */}
      <View className="flex-row justify-between items-center px-6 py-3 bg-slate-50 z-10">
        <View>
          <ThemedText variant="h1" className="text-3xl font-extrabold tracking-tighter text-slate-900">
            Unext<ThemedText className="text-violet-600">.</ThemedText>
          </ThemedText>
        </View>

        <TouchableOpacity 
          onPress={handleLogout}
          className="bg-white p-2.5 rounded-full shadow-sm border border-slate-200 active:scale-95 transition-transform"
        >
           <LogOut size={20} color="#ef4444" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={POSTS}
        renderItem={renderPost}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        // 👇 AQUÍ ESTÁ EL ARREGLO 2: Padding inferior generoso (120) para que no choque con los Tabs
        contentContainerStyle={{ paddingBottom: 120, paddingTop: 8 }} 
      />
    </Screen>
  );
}
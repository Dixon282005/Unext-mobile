import { useAuth } from '@/features/auth/hooks/useAuth'; // Para probar el Logout
import { Heart, LogOut, MessageSquare, MoreHorizontal, Search, Share2 } from 'lucide-react-native';
import React from 'react';
import { FlatList, Image, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Datos falsos para que se vea bonito de entrada
const DUMMY_POSTS = [
  {
    id: '1',
    user: 'María Rodriguez',
    role: 'UX Designer en Google',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    content: '¡Feliz de anunciar que he comenzado mi nuevo puesto como Senior UX Designer! 🚀 #NewJob #UX #Design',
    time: '2h',
    likes: 45,
    comments: 12
  },
  {
    id: '2',
    user: 'Carlos Pérez',
    role: 'Desarrollador React Native',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    content: '¿Alguien más está usando Expo Router v3? La navegación basada en archivos es una locura. 🔥 Aquí probando el nuevo stack.',
    time: '5h',
    likes: 120,
    comments: 34
  },
  {
    id: '3',
    user: 'Ana García',
    role: 'Recruiter IT',
    avatar: 'https://i.pravatar.cc/150?u=a04258114e29026302d',
    content: 'Estamos buscando talento joven en Venezuela para trabajo remoto. ¡Envíenme su portafolio! 🇻🇪💻',
    time: '1d',
    likes: 89,
    comments: 56
  }
];

export function FeedScreen() {
  const { signOut } = useAuth(); // Hook para cerrar sesión

  // Componente para cada tarjeta (Post)
  const renderItem = ({ item }: { item: any }) => (
    <View className="bg-white mb-3 p-4 rounded-xl shadow-sm border border-slate-100 mx-4">
      
      {/* Header del Post */}
      <View className="flex-row justify-between items-start mb-3">
        <View className="flex-row gap-3">
          <Image 
            source={{ uri: item.avatar }} 
            className="w-10 h-10 rounded-full bg-slate-200" 
          />
          <View>
            <Text className="font-bold text-slate-900 text-base">{item.user}</Text>
            <Text className="text-slate-500 text-xs">{item.role}</Text>
            <Text className="text-slate-400 text-xs mt-0.5">{item.time} • 🌎</Text>
          </View>
        </View>
        <TouchableOpacity>
          <MoreHorizontal size={20} color="#94a3b8" />
        </TouchableOpacity>
      </View>

      {/* Contenido */}
      <Text className="text-slate-800 text-base leading-6 mb-4">
        {item.content}
      </Text>

      {/* Línea divisoria */}
      <View className="h-[1px] bg-slate-100 mb-3" />

      {/* Acciones (Like, Comment, Share) */}
      <View className="flex-row justify-between px-2">
        <TouchableOpacity className="flex-row items-center gap-2">
          <Heart size={20} color="#64748b" />
          <Text className="text-slate-500 text-sm font-medium">{item.likes}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity className="flex-row items-center gap-2">
          <MessageSquare size={20} color="#64748b" />
          <Text className="text-slate-500 text-sm font-medium">{item.comments}</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center gap-2">
          <Share2 size={20} color="#64748b" />
          <Text className="text-slate-500 text-sm font-medium">Compartir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />

      {/* Top Bar (Header) */}
      <View className="flex-row justify-between items-center px-6 py-4 bg-white border-b border-slate-100 mb-4 sticky top-0 z-10">
        <View className="flex-row items-center gap-2">
           <View className="w-8 h-8 bg-violet-600 rounded-lg items-center justify-center">
             <Text className="text-white font-bold text-lg">U</Text>
           </View>
           <Text className="text-xl font-extrabold text-slate-900 tracking-tight">Unext</Text>
        </View>

        <View className="flex-row gap-4">
          <TouchableOpacity className="bg-slate-50 p-2 rounded-full border border-slate-100">
            <Search size={22} color="#64748b" />
          </TouchableOpacity>
          
          {/* Botón Logout (Temporal para pruebas) */}
          <TouchableOpacity 
            onPress={signOut}
            className="bg-red-50 p-2 rounded-full border border-red-100"
          >
            <LogOut size={22} color="#ef4444" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Lista de Posts */}
      <FlatList
        data={DUMMY_POSTS}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListHeaderComponent={
          <Text className="mx-6 mb-4 text-slate-500 font-bold text-xs uppercase tracking-widest">
            Tu Feed Principal
          </Text>
        }
      />
    </SafeAreaView>
  );
}
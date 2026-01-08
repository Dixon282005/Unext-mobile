import { useRouter } from 'expo-router';
import { LogOut, MessageCircle, Search } from 'lucide-react-native';
import React from 'react';
import { Alert, FlatList, TouchableOpacity, View } from 'react-native';

// UI Components
import { Screen } from '@/components/ui/Screen';
import { ThemedText } from '@/components/ui/ThemedText';

// Features Components
import { CreatePostInput } from '@/features/feed/components/CreatePostInput';
import { PostCard } from '@/features/feed/components/PostCard';
import { StoriesRail } from '@/features/feed/components/StoriesRail';

// Auth
import { useAuth } from '@/features/auth/hooks/useAuth';

// MOCK DATA
const POSTS = [
  {
    id: '1',
    user: { name: 'Maria Rodriguez', role: 'UX Designer en Google', avatar: 'https://i.pravatar.cc/150?u=maria' },
    time: 'Hace 2h',
    content: '¡Emocionada de anunciar que terminé mi certificación de Diseño Accesible! 🎨✨ La inclusión no es una "feature", es un derecho.',
    tags: ['UX', 'Design', 'Inclusión'],
    likes: 45,
    comments: 12,
  },
  {
    id: '2',
    user: { name: 'Carlos Tech', role: 'Dev React Native', avatar: null },
    time: 'Hace 5h',
    content: 'Buscando desarrolladores Junior para proyecto en Unext. Stack: React Native + Expo + Supabase. ¿Interesados? 👇',
    tags: ['Empleo', 'Remoto', 'React'],
    likes: 128,
    comments: 45,
    image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80', 
  },
  {
    id: '3',
    user: { name: 'Ana Sofía', role: 'Recruiter IT', avatar: 'https://i.pravatar.cc/150?u=ana' },
    time: 'Hace 1d',
    content: 'Consejo del día: Tu portafolio vale más que tu título universitario en el mundo Tech. 💼🔥',
    tags: ['Consejos', 'Carrera', 'Tech'],
    likes: 230,
    comments: 89,
  }
];

export default function FeedScreen() {
  const router = useRouter();
  const { signOut } = useAuth(); 

  const handleLogout = () => {
    Alert.alert("Cerrar Sesión", "¿Seguro?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Salir", style: "destructive", onPress: signOut }
    ]);
  };

  const renderHeader = () => (
    <View className="mb-2">
      <StoriesRail />      
      <CreatePostInput />  
    </View>
  );

  return (
    // 👇 CAMBIO: bg-white en lugar de bg-slate-100
    <Screen safeArea className="bg-white"> 
      
      {/* HEADER SUPERIOR */}
      {/* Quitamos el borde inferior (border-b) para que se fusione con el fondo blanco limpiamente */}
      <View className="flex-row justify-between items-center px-4 py-2 bg-white z-10">
        <ThemedText variant="h1" className="text-2xl font-extrabold tracking-tighter text-slate-900">
          Unext<ThemedText className="text-violet-600">.</ThemedText>
        </ThemedText>

        <View className="flex-row gap-2">
            
            <TouchableOpacity className="w-10 h-10 bg-slate-50 rounded-full items-center justify-center">
                <Search size={20} color="#64748b" />
            </TouchableOpacity>

            {/* BOTÓN CHAT */}
            <TouchableOpacity 
                onPress={() => router.push("/chat")} 
                className="w-10 h-10 bg-slate-50 rounded-full items-center justify-center relative"
            >
                <MessageCircle size={20} color="#64748b" />
                <View className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleLogout} className="w-10 h-10 bg-slate-50 rounded-full items-center justify-center">
                <LogOut size={20} color="#ef4444" />
            </TouchableOpacity>
        </View>
      </View>

      {/* LISTA */}
      <FlatList
        data={POSTS}
        renderItem={({ item }) => <PostCard post={item} />} 
        keyExtractor={item => item.id}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </Screen>
  );
}
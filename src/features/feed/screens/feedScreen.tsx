import { useRouter } from 'expo-router';
import { LogOut, MessageCircle, Search } from 'lucide-react-native';
import React from 'react';
import { Alert, FlatList, TouchableOpacity, View } from 'react-native';

// 1. Importamos Componentes UI Globales
import { Screen } from '@/components/ui/Screen';
import { ThemedText } from '@/components/ui/ThemedText';

// 2. Importamos los Componentes del Feature (Arquitectura Limpia)
import { CreatePostInput } from '@/features/feed/components/CreatePostInput';
import { PostCard } from '@/features/feed/components/PostCard';
import { StoriesRail } from '@/features/feed/components/StoriesRail';

// 3. Auth
import { useAuth } from '@/features/auth/hooks/useAuth';

// --- DATOS DE PRUEBA (MOCK) ---
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
    Alert.alert(
      "Cerrar Sesión",
      "¿Estás seguro que quieres salir?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Salir", style: "destructive", onPress: signOut }
      ]
    );
  };

  // 👇 Esta función agrupa todo lo que va ARRIBA de los posts
  // para que scrollee junto con la lista (ListHeaderComponent)
  const renderHeader = () => (
    <View className="mb-2">
      {/* 1. Historias (Tipo Instagram/Facebook) */}
      <StoriesRail />      
      
      {/* 2. Caja de Publicar (Tipo LinkedIn) */}
      <CreatePostInput />  
    </View>
  );

  return (
    // Fondo gris claro (slate-100) para contraste con tarjetas blancas
  
      
      <Screen safeArea className="bg-slate-100"> 
      
      {/* --- NAVBAR SUPERIOR ACTUALIZADO --- */}
      <View className="flex-row justify-between items-center px-4 py-3 bg-white border-b border-slate-200 z-10">
        <ThemedText variant="h1" className="text-2xl font-extrabold tracking-tighter text-slate-900">
          Unext<ThemedText className="text-violet-600">.</ThemedText>
        </ThemedText>

        <View className="flex-row gap-2"> {/* Gap reducido un poco para que quepan todos */}
            
            <TouchableOpacity className="w-10 h-10 bg-slate-50 rounded-full items-center justify-center active:bg-slate-200">
                <Search size={20} color="#64748b" />
            </TouchableOpacity>

            {/* 👇 NUEVO BOTÓN DE CHAT (Estilo Messenger) */}
            <TouchableOpacity 
                onPress={() => router.push('/chat/index')} 
                className="w-10 h-10 bg-slate-50 rounded-full items-center justify-center active:bg-slate-200 relative"
            >
                <MessageCircle size={20} color="#64748b" />
                {/* Badge rojo de notificación (Opcional) */}
                <View className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
            </TouchableOpacity>

            {/* <TouchableOpacity className="w-10 h-10 bg-slate-50 rounded-full items-center justify-center active:bg-slate-200">
                <Bell size={20} color="#64748b" />
            </TouchableOpacity> */}
            {/* Comenté la campana para no saturar, pero puedes descomentarla si quieres los 4 botones */}

            <TouchableOpacity onPress={handleLogout} className="w-10 h-10 bg-slate-50 rounded-full items-center justify-center active:bg-slate-200">
                <LogOut size={20} color="#ef4444" />
            </TouchableOpacity>
        </View>
      </View>

      {/* --- LISTA PRINCIPAL --- */}
      <FlatList
        data={POSTS}
        // Renderizamos cada tarjeta usando el componente separado
        renderItem={({ item }) => <PostCard post={item} />} 
        keyExtractor={item => item.id}
        
        // Inyectamos el Header (Historias + Input) aquí
        ListHeaderComponent={renderHeader}
        
        showsVerticalScrollIndicator={false}
        // Padding inferior para no chocar con el Tab Bar
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </Screen>
  );
}
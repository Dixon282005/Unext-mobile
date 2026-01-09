import { useRouter } from 'expo-router';
import { ChevronLeft, Edit, Search } from 'lucide-react-native';
import React from 'react';
import { FlatList, TextInput, TouchableOpacity, View } from 'react-native';

import { Screen } from '@/components/ui/Screen';
import { ThemedText } from '@/components/ui/ThemedText';
import { ChatRow } from '../components/ChatRow'; // 👈 Importamos desde el mismo feature

// DATOS MOCK
const CHATS = [
  { id: '1', name: 'Maria Rodriguez', message: '¡Gracias! Nos vemos mañana...', time: '10:30 AM', unread: 2, avatar: 'https://i.pravatar.cc/150?u=maria', online: true },
  { id: '2', name: 'Carlos Tech', message: 'Te quiero mamar ese guevito.', time: 'Ayer', unread: 0, avatar: null, online: false },
  { id: '3', name: 'Ana Sofía', message: '¿Recibiste mi CV?', time: 'Ayer', unread: 0, avatar: 'https://i.pravatar.cc/150?u=ana', online: true },
  { id: '4', name: 'Elon Musk', message: 'Compramos Unext por $1B? 🚀', time: 'Lun', unread: 1, avatar: 'https://i.pravatar.cc/150?u=elon', online: false },
];

export function ChatListScreen() {
  const router = useRouter();

  return (
    <Screen safeArea className="bg-white">
      
      {/* HEADER */}
      <View className="px-4 py-3 border-b border-slate-100 flex-row justify-between items-center">
        <View className="flex-row items-center">
            <TouchableOpacity onPress={() => router.back()} className="mr-2 p-1 -ml-2">
                <ChevronLeft size={28} color="#1e293b" />
            </TouchableOpacity>
            <ThemedText variant="h2" className="text-2xl font-bold">Chats</ThemedText>
        </View>
        <TouchableOpacity className="w-10 h-10 bg-slate-100 rounded-full items-center justify-center">
            <Edit size={20} color="#1e293b" />
        </TouchableOpacity>
      </View>

      {/* BUSCADOR */}
      <View className="px-4 py-3">
        <View className="flex-row items-center bg-slate-100 h-10 rounded-xl px-3">
            <Search size={18} color="#94a3b8" />
            <TextInput 
                placeholder="Buscar..." 
                className="flex-1 ml-2 text-slate-800"
                placeholderTextColor="#94a3b8"
            />
        </View>
      </View>

      {/* LISTA */}
      <FlatList
        data={CHATS}
        renderItem={({ item }) => (
          <ChatRow 
            chat={item} 
            onPress={() => console.log('Ir a chat:', item.id)} 
          />
        )}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  );
}
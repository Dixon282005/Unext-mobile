import { Heart, MessageCircle, MoreHorizontal, Share2 } from 'lucide-react-native';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';

// Importamos tus componentes UI globales
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Divider } from '@/components/ui/Divider';
import { ThemedText } from '@/components/ui/ThemedText';

// Definimos qué datos recibe este componente
interface PostProps {
  post: {
    id: string;
    user: { name: string; role: string; avatar: string | null };
    time: string;
    content: string;
    tags: string[];
    likes: number;
    comments: number;
    image?: string;
  };
}

export function PostCard({ post }: PostProps) {
  return (
    <Card className="mx-0 mb-3 border-y border-slate-200 shadow-sm bg-white rounded-none sm:rounded-2xl sm:mx-4 sm:border">
      
      {/* 1. HEADER DEL POST */}
      <View className="flex-row items-center mb-3 px-4 pt-4">
        <Avatar uri={post.user.avatar} fallback={post.user.name} size="md" />
        
        <View className="ml-3 flex-1">
          <ThemedText variant="h2" className="text-base font-bold text-slate-900">
            {post.user.name}
          </ThemedText>
          <ThemedText className="text-slate-500 text-xs font-medium">
            {post.user.role} • {post.time}
          </ThemedText>
        </View>

        <TouchableOpacity className="p-1">
          <MoreHorizontal size={20} color="#94a3b8" />
        </TouchableOpacity>
      </View>

      {/* 2. CONTENIDO TEXTO */}
      <View className="px-4 mb-3">
        <ThemedText className="text-slate-700 leading-6 text-sm">
          {post.content}
        </ThemedText>
      </View>

      {/* 3. IMAGEN (Si existe) */}
      {post.image && (
        <Image 
          source={{ uri: post.image }} 
          className="w-full h-64 bg-slate-100"
          resizeMode="cover"
        />
      )}

      {/* 4. TAGS Y STATS */}
      <View className="px-4 mt-3">
        {/* Tags */}
        <View className="flex-row flex-wrap gap-2 mb-3">
          {post.tags.map(tag => (
            <Badge key={tag} label={tag} variant="success" />
          ))}
        </View>

        {/* Stats de Likes/Comentarios */}
        <View className="flex-row justify-between items-center py-2">
            <View className="flex-row items-center">
                <View className="bg-violet-100 p-1 rounded-full mr-1">
                    <Heart size={10} color="#7c3aed" fill="#7c3aed" />
                </View>
                <ThemedText className="text-xs text-slate-500">{post.likes}</ThemedText>
            </View>
            <ThemedText className="text-xs text-slate-500">{post.comments} comentarios</ThemedText>
        </View>
      </View>

      <Divider className="bg-slate-100" />

      {/* 5. BOTONES DE ACCIÓN (Like, Comment, Share) */}
      <View className="flex-row justify-between items-center px-2 py-1">
        <TouchableOpacity className="flex-1 flex-row items-center justify-center py-3 active:bg-slate-50 rounded-lg">
          <Heart size={20} color="#64748b" />
          <ThemedText className="ml-2 font-semibold text-slate-600 text-sm">Me gusta</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity className="flex-1 flex-row items-center justify-center py-3 active:bg-slate-50 rounded-lg">
          <MessageCircle size={20} color="#64748b" />
          <ThemedText className="ml-2 font-semibold text-slate-600 text-sm">Comentar</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity className="flex-1 flex-row items-center justify-center py-3 active:bg-slate-50 rounded-lg">
          <Share2 size={20} color="#64748b" />
          <ThemedText className="ml-2 font-semibold text-slate-600 text-sm">Compartir</ThemedText>
        </TouchableOpacity>
      </View>

    </Card>
  );
}
import { Check, X } from 'lucide-react-native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Avatar } from '@/components/ui/Avatar';
import { Card } from '@/components/ui/Card';
import { ThemedText } from '@/components/ui/ThemedText';

interface Props {
  user: {
    name: string;
    role: string;
    avatar: string | null;
    mutual: number;
  };
  onAccept: () => void;
  onReject: () => void;
}

export function InvitationRow({ user, onAccept, onReject }: Props) {
  return (
    <Card className="flex-row items-center p-4 mb-3 border-slate-100 shadow-sm">
      {/* Avatar */}
      <Avatar uri={user.avatar} fallback={user.name} size="md" />

      {/* Info */}
      <View className="flex-1 ml-3 mr-2">
        <ThemedText variant="h2" className="text-base font-bold text-slate-900">
          {user.name}
        </ThemedText>
        <ThemedText className="text-slate-500 text-xs line-clamp-1">
          {user.role}
        </ThemedText>
        <ThemedText className="text-slate-400 text-xs mt-0.5">
          {user.mutual} contactos en común
        </ThemedText>
      </View>

      {/* Botones de Acción (Redondos para ahorrar espacio) */}
      <View className="flex-row gap-2">
        <TouchableOpacity 
          onPress={onReject}
          className="w-10 h-10 rounded-full border border-slate-200 items-center justify-center bg-white"
        >
          <X size={20} color="#64748b" />
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={onAccept}
          className="w-10 h-10 rounded-full bg-violet-600 items-center justify-center shadow-sm shadow-violet-200"
        >
          <Check size={20} color="white" />
        </TouchableOpacity>
      </View>
    </Card>
  );
}
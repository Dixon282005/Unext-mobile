import { ChevronRight, Users } from 'lucide-react-native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Card } from '@/components/ui/Card';
import { Screen } from '@/components/ui/Screen';
import { ThemedText } from '@/components/ui/ThemedText';

// Importamos nuestros componentes nuevos
import { InvitationRow } from '@/features/network/components/InvitationRow';
import { UserGridItem } from '@/features/network/components/UserGridItem';

// --- DATA MOCK ---
const INVITATIONS = [
  { id: 1, name: 'Pedro Castillo', role: 'Full Stack Dev @ Amazon', avatar: 'https://i.pravatar.cc/150?u=pedro', mutual: 12 },
  { id: 2, name: 'Luisa Mendoza', role: 'Recruiter IT', avatar: 'https://i.pravatar.cc/150?u=luisa', mutual: 4 },
];

const SUGGESTIONS = [
  { id: 1, name: 'Andrea Tech', role: 'Python Developer', avatar: 'https://i.pravatar.cc/150?u=andrea', mutual: 8, cover: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b' },
  { id: 2, name: 'Miguel Code', role: 'CTO @ StartUp', avatar: null, mutual: 25 },
  { id: 3, name: 'Sarah Design', role: 'Product Designer', avatar: 'https://i.pravatar.cc/150?u=sarah', mutual: 2 },
  { id: 4, name: 'Kevin Security', role: 'Pentester & Hacker', avatar: 'https://i.pravatar.cc/150?u=kevin', mutual: 15, cover: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5' },
];

export default function NetworkScreen() {
  return (
    <Screen scroll safeArea className="bg-slate-50">
      
      {/* 1. Header Simple */}
      <View className="px-4 pt-2 mb-4">
         <ThemedText variant="h2" className="text-slate-900">Mi Red</ThemedText>
      </View>

      {/* 2. Resumen de Contactos (Caja tipo botón) */}
      <TouchableOpacity activeOpacity={0.7} className="mx-4 mb-6">
        <Card className="flex-row items-center justify-between p-4 border-slate-200 shadow-sm">
            <View className="flex-row items-center">
                <View className="w-10 h-10 bg-violet-100 rounded-full items-center justify-center mr-3">
                    <Users size={20} color="#7c3aed" />
                </View>
                <View>
                    <ThemedText className="font-bold text-slate-800 text-base">Gestionar mi red</ThemedText>
                    <ThemedText className="text-slate-500 text-xs">543 contactos</ThemedText>
                </View>
            </View>
            <ChevronRight size={20} color="#94a3b8" />
        </Card>
      </TouchableOpacity>

      {/* 3. Invitaciones */}
      {INVITATIONS.length > 0 && (
        <View className="mb-6 px-4">
            <View className="flex-row justify-between items-center mb-3">
                <ThemedText variant="h2" className="text-slate-700">Invitaciones ({INVITATIONS.length})</ThemedText>
                <TouchableOpacity>
                    <ThemedText className="text-violet-600 font-bold text-sm">Ver todas</ThemedText>
                </TouchableOpacity>
            </View>
            
            {INVITATIONS.map(invite => (
                <InvitationRow 
                    key={invite.id} 
                    user={invite} 
                    onAccept={() => console.log('Aceptar', invite.name)}
                    onReject={() => console.log('Rechazar', invite.name)}
                />
            ))}
        </View>
      )}

      {/* 4. Sugerencias (Grid de 2 columnas) */}
      <View className="px-4 pb-24">
         <ThemedText variant="h2" className="text-slate-700 mb-3">Gente que podrías conocer</ThemedText>
         
         <View className="flex-row flex-wrap justify-between">
            {SUGGESTIONS.map(user => (
                <UserGridItem key={user.id} user={user} />
            ))}
         </View>
      </View>

    </Screen>
  );
}
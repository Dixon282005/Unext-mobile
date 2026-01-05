import { Briefcase, Edit3, MapPin, Settings, Share2 } from 'lucide-react-native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

// 👇 Importamos TUS componentes
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button'; // Usamos tu botón nuevo
import { Card } from '@/components/ui/Card';
import { Divider } from '@/components/ui/Divider';
import { Screen } from '@/components/ui/Screen';
import { ThemedText } from '@/components/ui/ThemedText';

// Datos Mock (Falsos) del Usuario
const USER = {
  name: 'Juan Pérez',
  headline: 'Ingeniero de Software | React Native & Python',
  location: 'Villa de Cura, Venezuela',
  about: 'Apasionado por crear soluciones tecnológicas que impacten. Actualmente desarrollando Unext, la red del futuro. Me encanta resolver problemas complejos y aprender nuevas tecnologías.',
  stats: {
    connections: 543,
    views: 120,
  },
  skills: ['React Native', 'TypeScript', 'Python', 'Kali Linux', 'UI/UX'],
  experience: [
    { id: 1, role: 'Lead Developer', company: 'Unext Inc.', date: '2023 - Presente' },
    { id: 2, role: 'Freelance Dev', company: 'Upwork', date: '2021 - 2023' },
  ]
};

export default function ProfileScreen() {
  return (
    <Screen scroll safeArea className="bg-slate-50">
      
      {/* 1. HEADER (Título y Configuración) */}
      <View className="flex-row justify-between items-center px-4 mb-2 pt-2">
         <ThemedText variant="h2" className="text-slate-900">Mi Perfil</ThemedText>
         <TouchableOpacity className="p-2 bg-white rounded-full border border-slate-200 shadow-sm">
           <Settings size={20} color="#64748b" />
         </TouchableOpacity>
      </View>

      {/* 2. TARJETA PRINCIPAL (La Portada) */}
      <Card className="mx-4 mb-4 items-center p-6 border-slate-200 shadow-sm relative mt-2">
        
        {/* Avatar (Asegúrate de tener size="xl" o usa "lg") */}
        <View className="mb-4 shadow-lg shadow-violet-200">
          <Avatar 
            uri="https://i.pravatar.cc/300?u=juan" 
            fallback="JP" 
            size="lg" // Usamos 'lg' por seguridad, si tienes 'xl' cámbialo
          />
        </View>

        <ThemedText variant="h2" className="text-xl text-center mb-1 font-extrabold text-slate-900">
          {USER.name}
        </ThemedText>
        
        <ThemedText className="text-slate-500 text-center text-sm mb-3 px-2 font-medium">
          {USER.headline}
        </ThemedText>

        <View className="flex-row items-center space-x-1 mb-5 bg-slate-100 px-3 py-1 rounded-full">
          <MapPin size={12} color="#64748b" />
          <ThemedText className="text-slate-500 text-xs font-semibold">{USER.location}</ThemedText>
        </View>

        {/* Estadísticas */}
        <View className="flex-row w-full justify-around border-t border-slate-100 pt-4 mb-6">
          <View className="items-center">
            <ThemedText className="font-bold text-slate-900 text-lg">{USER.stats.connections}</ThemedText>
            <ThemedText className="text-slate-400 text-xs font-medium uppercase tracking-wider">Contactos</ThemedText>
          </View>
          <View className="w-[1px] bg-slate-200 h-10" />
          <View className="items-center">
            <ThemedText className="font-bold text-slate-900 text-lg">{USER.stats.views}</ThemedText>
            <ThemedText className="text-slate-400 text-xs font-medium uppercase tracking-wider">Vistas</ThemedText>
          </View>
        </View>

        {/* 👇 BOTONES (Usando tu componente Button.tsx) */}
        <View className="flex-row gap-3 w-full">
          {/* Botón Editar (Outline) */}
          <Button 
            title="Editar" 
            onPress={() => console.log('Editar')}
            variant="outline"
            icon={<Edit3 size={18} color="#475569" />} 
            className="flex-1 h-12" // Forzamos h-12 para que no sea tan alto como el del login (h-14)
          />
          
          {/* Botón Compartir (Secondary) */}
          <Button 
            title="Compartir" 
            onPress={() => console.log('Compartir')}
            variant="secondary"
            icon={<Share2 size={18} color="#7c3aed" />} 
            className="flex-1 h-12"
          />
        </View>
      </Card>

      {/* 3. ACERCA DE */}
      <View className="px-4 mb-6">
        <ThemedText variant="h2" className="mb-3 ml-1 text-slate-800">Acerca de</ThemedText>
        <Card className="p-4 border-slate-200 shadow-sm">
          <ThemedText className="text-slate-600 leading-6 text-sm">
            {USER.about}
          </ThemedText>
        </Card>
      </View>

      {/* 4. HABILIDADES */}
      <View className="px-4 mb-6">
        <ThemedText variant="h2" className="mb-3 ml-1 text-slate-800">Habilidades</ThemedText>
        <View className="flex-row flex-wrap gap-2">
          {USER.skills.map(skill => (
            // Usa variant="secondary" o "outline" según tu gusto
            <Badge key={skill} label={skill} variant="success" />
          ))}
        </View>
      </View>

      {/* 5. EXPERIENCIA */}
      <View className="px-4 mb-24">
        <ThemedText variant="h2" className="mb-3 ml-1 text-slate-800">Experiencia</ThemedText>
        <Card className="p-0 border-slate-200 shadow-sm overflow-hidden">
          {USER.experience.map((job, index) => (
            <View key={job.id}>
              <View className="flex-row items-start p-4">
                <View className="w-10 h-10 bg-violet-50 rounded-lg items-center justify-center mr-3 mt-1">
                  <Briefcase size={20} color="#7c3aed" />
                </View>
                <View className="flex-1">
                  <ThemedText className="font-bold text-slate-900 text-base">{job.role}</ThemedText>
                  <ThemedText className="text-slate-600 text-sm font-medium">{job.company}</ThemedText>
                  <ThemedText className="text-slate-400 text-xs mt-1">{job.date}</ThemedText>
                </View>
              </View>
              {/* Divider solo si no es el último elemento */}
              {index < USER.experience.length - 1 && <Divider className="bg-slate-100" />}
            </View>
          ))}
        </Card>
      </View>

    </Screen>
  );
}
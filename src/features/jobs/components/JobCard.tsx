import { Bookmark, Briefcase, Clock, DollarSign, MapPin } from 'lucide-react-native';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';

import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { ThemedText } from '@/components/ui/ThemedText';

interface JobProps {
  job: {
    id: string;
    title: string;
    company: string;
    logo: string;
    location: string;
    salary: string;
    type: string; // Full-time, Contract, etc.
    postedAt: string;
    tags: string[];
  };
}

export function JobCard({ job }: JobProps) {
  return (
    <Card className="mx-4 mb-4 p-4 border-slate-200 shadow-sm active:bg-slate-50">
      
      {/* 1. Encabezado: Logo + Título + Guardar */}
      <View className="flex-row items-start mb-3">
        {/* Logo Empresa */}
        <View className="w-12 h-12 rounded-xl bg-white border border-slate-100 items-center justify-center mr-3 overflow-hidden p-1">
          <Image 
            source={{ uri: job.logo }} 
            className="w-full h-full" 
            resizeMode="contain" 
          />
        </View>

        {/* Info Principal */}
        <View className="flex-1">
          <ThemedText variant="h2" className="text-base font-bold text-slate-900 leading-5 mb-1">
            {job.title}
          </ThemedText>
          <ThemedText className="text-slate-600 text-sm font-medium">
            {job.company}
          </ThemedText>
        </View>

        {/* Botón Guardar */}
        <TouchableOpacity className="p-1">
          <Bookmark size={22} color="#94a3b8" />
        </TouchableOpacity>
      </View>

      {/* 2. Detalles (Ubicación y Salario) */}
      <View className="flex-row flex-wrap gap-y-2 gap-x-4 mb-4">
        <View className="flex-row items-center">
          <MapPin size={14} color="#64748b" />
          <ThemedText className="text-slate-500 text-xs ml-1">{job.location}</ThemedText>
        </View>
        <View className="flex-row items-center">
          <DollarSign size={14} color="#64748b" />
          <ThemedText className="text-slate-500 text-xs ml-0.5">{job.salary}</ThemedText>
        </View>
        <View className="flex-row items-center">
          <Briefcase size={14} color="#64748b" />
          <ThemedText className="text-slate-500 text-xs ml-1">{job.type}</ThemedText>
        </View>
      </View>

      {/* 3. Tags (Tecnologías) */}
      <View className="flex-row flex-wrap gap-2 mb-3">
        {job.tags.map(tag => (
          <Badge key={tag} label={tag} variant="success" />
        ))}
      </View>

      {/* 4. Footer: Tiempo */}
      <View className="flex-row items-center mt-1">
        <Clock size={12} color="#94a3b8" />
        <ThemedText className="text-slate-400 text-[10px] ml-1">
          Publicado {job.postedAt}
        </ThemedText>
        
        {/* Indicador de "Solicitud fácil" opcional */}
        <View className="ml-auto">
            <ThemedText className="text-violet-600 font-bold text-xs">Solicitud sencilla</ThemedText>
        </View>
      </View>

    </Card>
  );
}
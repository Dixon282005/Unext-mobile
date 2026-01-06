import { Search, SlidersHorizontal } from 'lucide-react-native';
import React from 'react';
import { FlatList, TextInput, View } from 'react-native';

import { Screen } from '@/components/ui/Screen';
import { ThemedText } from '@/components/ui/ThemedText';

// Importamos componentes específicos
import { JobCard } from '@/features/jobs/components/JobCard';
import { JobFilters } from '@/features/jobs/components/JobFilter';

// --- MOCK DATA ---
const JOBS = [
  {
    id: '1',
    title: 'Senior React Native Developer',
    company: 'Spotify',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/1982px-Spotify_icon.svg.png',
    location: 'Remoto (Latam)',
    salary: '$4,500 - $6,000 USD',
    type: 'Full-time',
    postedAt: 'hace 2h',
    tags: ['React Native', 'TypeScript', 'Redux'],
  },
  {
    id: '2',
    title: 'Python Backend Engineer',
    company: 'Airbnb',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/1200px-Airbnb_Logo_B%C3%A9lo.svg.png',
    location: 'Híbrido - CDMX',
    salary: '$3,000 - $5,000 USD',
    type: 'Contract',
    postedAt: 'hace 5h',
    tags: ['Python', 'Django', 'AWS'],
  },
  {
    id: '3',
    title: 'Cybersecurity Analyst Junior',
    company: 'Microsoft',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png',
    location: 'Remoto',
    salary: '$2,500 USD',
    type: 'Full-time',
    postedAt: 'hace 1d',
    tags: ['Security', 'Kali Linux', 'Network'],
  },
  {
    id: '4',
    title: 'Mobile UI/UX Designer',
    company: 'Unext Inc.',
    logo: 'https://cdn-icons-png.flaticon.com/512/732/732221.png', // Logo genérico
    location: 'Villa de Cura, VE',
    salary: '$2,000 USD',
    type: 'Part-time',
    postedAt: 'hace 3d',
    tags: ['Figma', 'UI Design', 'App'],
  },
];

export default function JobsScreen() {
  return (
    <Screen safeArea className="bg-slate-50">
      
      {/* 1. HEADER + BÚSQUEDA */}
      <View className="px-4 pt-2 mb-4">
        <ThemedText variant="h2" className="text-slate-900 mb-4">Empleos para ti</ThemedText>
        
        {/* Barra de Búsqueda */}
        <View className="flex-row items-center space-x-2">
          <View className="flex-1 h-12 bg-white border border-slate-200 rounded-xl flex-row items-center px-3 shadow-sm">
            <Search size={20} color="#94a3b8" />
            <TextInput 
              placeholder="Buscar cargo, empresa o tecnología..."
              placeholderTextColor="#94a3b8"
              className="flex-1 ml-2 text-slate-700 font-medium"
            />
          </View>
          <View className="h-12 w-12 bg-violet-600 rounded-xl items-center justify-center shadow-sm shadow-violet-200">
             <SlidersHorizontal size={20} color="white" />
          </View>
        </View>
      </View>

      {/* 2. FILTROS HORIZONTALES */}
      <JobFilters />

      {/* 3. LISTA DE EMPLEOS */}
      <FlatList
        data={JOBS}
        renderItem={({ item }) => <JobCard job={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />

    </Screen>
  );
}
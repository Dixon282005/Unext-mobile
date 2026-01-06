import { Heart, X, Zap } from 'lucide-react-native';
import React, { useState } from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from 'react-native-reanimated';

import { Screen } from '@/components/ui/Screen';
import { ThemedText } from '@/components/ui/ThemedText';
import { MatchCard } from '@/features/matching/components/MatchCard';

// DATOS MOCK
const CANDIDATES = [
  { id: '1', name: 'Laura Dev', role: 'React Native Expert', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80', skills: ['React', 'Expo', 'Node.js'], location: 'Caracas, VE', matchScore: 95 },
  { id: '2', name: 'David UI', role: 'Product Designer', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80', skills: ['Figma', 'UI/UX', 'Motion'], location: 'Bogotá, CO', matchScore: 88 },
  { id: '3', name: 'Sarah Security', role: 'Cybersecurity Analyst', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80', skills: ['Kali', 'Python', 'Ethical Hacking'], location: 'Remote', matchScore: 92 },
];

const { width } = Dimensions.get('window');

export default function MatchScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Valores animados
  const translateX = useSharedValue(0);
  const rotate = useSharedValue(0);

  const nextCard = () => {
    setCurrentIndex(prev => prev + 1);
    translateX.value = 0;
    rotate.value = 0;
  };

  const handleNope = () => {
    translateX.value = withSpring(-width * 1.5);
    rotate.value = withSpring(-20, {}, () => runOnJS(nextCard)());
  };

  const handleLike = () => {
    translateX.value = withSpring(width * 1.5);
    rotate.value = withSpring(20, {}, () => runOnJS(nextCard)());
  };

  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { rotate: `${rotate.value}deg` }
    ]
  }));

  const currentProfile = CANDIDATES[currentIndex];

  return (
    // safeArea={true} para que no choque con la barra de estado
    <Screen safeArea className="bg-slate-50 flex-1 justify-between">
      
      {/* HEADER LIMPIO (Sin botón atrás) */}
      <View className="flex-row justify-center items-center py-4 border-b border-slate-100 bg-white shadow-sm mb-4">
          <Zap size={24} color="#7c3aed" fill="#7c3aed" />
          <ThemedText className="ml-2 font-bold text-violet-600 text-xl tracking-tighter">Magic Match</ThemedText>
      </View>

      {/* ÁREA DE TARJETAS */}
      <View className="flex-1 items-center justify-center -mt-6">
        {currentProfile ? (
          <Animated.View style={cardStyle}>
            <MatchCard user={currentProfile} />
          </Animated.View>
        ) : (
          <View className="items-center justify-center p-10">
            <View className="bg-slate-200 p-6 rounded-full mb-4">
                <Zap size={48} color="#94a3b8" />
            </View>
            <ThemedText variant="h2" className="text-center text-slate-800">¡Eso es todo!</ThemedText>
            <ThemedText className="text-center text-slate-500 mt-2">
              Vuelve mañana para más perfiles compatibles.
            </ThemedText>
          </View>
        )}
      </View>

      {/* BOTONES DE CONTROL */}
      {currentProfile && (
        <View className="flex-row justify-center items-center gap-8 mb-6">
          <TouchableOpacity 
            onPress={handleNope}
            className="w-16 h-16 bg-white rounded-full items-center justify-center shadow-lg shadow-red-100 border border-red-100 active:scale-90 transition-transform"
          >
            <X size={32} color="#ef4444" strokeWidth={3} />
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={handleLike}
            className="w-16 h-16 bg-violet-600 rounded-full items-center justify-center shadow-xl shadow-violet-300 active:scale-90 transition-transform"
          >
            <Heart size={30} color="white" fill="white" />
          </TouchableOpacity>
        </View>
      )}
    </Screen>
  );
}
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ArrowRight, Briefcase, Check, Users, Zap } from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import { Dimensions, FlatList, View, ViewToken } from 'react-native';

// 👇 Importamos TUS componentes globales (La "Santa Trinidad")
import { Button } from '@/components/ui/Button';
import { Screen } from '@/components/ui/Screen';
import { ThemedText } from '@/components/ui/ThemedText';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// 1. Datos del Carrusel
const slides = [
  {
    id: '1',
    icon: 'users',
    title: 'Conecta con oportunidades',
    description: 'Miles de empresas buscan talento como tú. Encuentra pasantías y trabajos perfectos para tu perfil.',
    colors: ['#7c3aed', '#c026d3'] as const, // Violeta -> Fucsia
  },
  {
    id: '2',
    icon: 'briefcase',
    title: 'Aplica en segundos',
    description: 'Olvida los formularios largos. Con un tap puedes postular a múltiples oportunidades al mismo tiempo.',
    colors: ['#2563eb', '#7c3aed'] as const, // Azul -> Violeta
  },
  {
    id: '3',
    icon: 'zap',
    title: 'IA que te entiende',
    description: 'Nuestra inteligencia artificial aprende de ti y te conecta solo con ofertas que realmente te interesan.',
    colors: ['#4c1d95', '#6d28d9'] as const, // Violeta Oscuro
  },
];

// 2. Icono Dinámico (Usando Lucide)
const OnboardingIcon = ({ icon }: { icon: string }) => {
  const size = 64;
  const color = "white";
  switch (icon) {
    case 'users': return <Users size={size} color={color} />;
    case 'briefcase': return <Briefcase size={size} color={color} />;
    case 'zap': return <Zap size={size} color={color} fill="white" />;
    default: return <Users size={size} color={color} />;
  }
};

export function OnboardingScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  // ✅ Acción al terminar: Guardar y navegar
  const finishOnboarding = async () => {
  try {
    await AsyncStorage.setItem('hasSeenOnboarding', 'true');
    // ANTES: router.replace('/(auth)/login');
    router.replace('/'); // 👈 Esto recarga el index y muestra la pantalla Welcome
  } catch (error) {
    // ...
  }
};

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      finishOnboarding();
    }
  };

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setCurrentIndex(viewableItems[0].index);
      }
    }
  ).current;

  // Renderizado de cada Slide
  const renderItem = ({ item }: { item: typeof slides[0] }) => (
    <View style={{ width: SCREEN_WIDTH }} className="flex-1 items-center justify-center px-6 pb-20">
      
      {/* Círculo con Gradiente */}
      <LinearGradient
        colors={item.colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="w-[280px] h-[280px] rounded-[60px] items-center justify-center mb-12 shadow-2xl shadow-violet-500/30"
      >
        {/* Icono */}
        <OnboardingIcon icon={item.icon} />
      </LinearGradient>

      {/* Títulos y Descripción usando ThemedText */}
      <ThemedText variant="h1" className="text-center mb-4 text-3xl">
        {item.title}
      </ThemedText>
      
      <ThemedText variant="body" className="text-center text-slate-500 px-4 leading-7">
        {item.description}
      </ThemedText>
    </View>
  );

  return (
    <Screen className="bg-white">
      
      {/* Botón SALTAR (Fantasma) */}
      <View className="absolute top-4 right-4 z-10">
        <Button 
          title="Saltar" 
          variant="ghost" 
          onPress={finishOnboarding} 
          className="h-10 px-0"
        />
      </View>

      {/* Carrusel */}
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        scrollEventThrottle={16}
      />

      {/* Footer */}
      <View className="px-6 pb-8 w-full">
        
        {/* Puntos (Dots) */}
        <View className="flex-row justify-center gap-2 mb-8 h-4 items-center">
          {slides.map((_, idx) => (
            <View
              key={idx}
              className={`rounded-full transition-all duration-300 ${
                idx === currentIndex 
                  ? 'w-8 h-2.5 bg-violet-600' 
                  : 'w-2.5 h-2.5 bg-slate-200'
              }`}
            />
          ))}
        </View>

        {/* Botón Principal (Unext Style) */}
        <Button
          title={currentIndex === slides.length - 1 ? 'Comenzar' : 'Siguiente'}
          onPress={handleNext}
          icon={currentIndex === slides.length - 1 ? <Check size={20} color="white"/> : <ArrowRight size={20} color="white"/>}
        />
      </View>
    </Screen>
  );
}
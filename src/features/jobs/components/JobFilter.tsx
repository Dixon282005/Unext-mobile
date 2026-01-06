import { ThemedText } from '@/components/ui/ThemedText';
import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';

const FILTERS = ['Para ti', 'Remoto', 'Python', 'React Native', 'Ciberseguridad', '+ $3k USD'];

export function JobFilters() {
  const [active, setActive] = React.useState('Para ti');

  return (
    <View className="mb-4">
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={{ paddingHorizontal: 16, paddingRight: 8 }}
      >
        {FILTERS.map((filter) => {
          const isActive = active === filter;
          return (
            <TouchableOpacity
              key={filter}
              onPress={() => setActive(filter)}
              className={`mr-2 px-4 py-2 rounded-full border ${
                isActive 
                  ? 'bg-violet-600 border-violet-600' 
                  : 'bg-white border-slate-200'
              }`}
            >
              <ThemedText 
                className={`text-xs font-bold ${isActive ? 'text-white' : 'text-slate-600'}`}
              >
                {filter}
              </ThemedText>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
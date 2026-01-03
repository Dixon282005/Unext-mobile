import { X } from 'lucide-react-native';
import React from 'react';
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { ThemedText } from './ThemedText';

interface Props {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function BottomSheet({ visible, onClose, title, children }: Props) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose} // Cierra con el botón "Atrás" en Android
    >
      {/* 1. Fondo Oscuro (Backdrop) - Al tocarlo se cierra */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 bg-black/40 justify-end">
          
          {/* 2. Contenido del Sheet (Evitamos que el click aquí cierre el modal) */}
          <TouchableWithoutFeedback>
            <KeyboardAvoidingView 
               behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
              <View className="bg-white w-full rounded-t-3xl pt-2 pb-8 px-6 shadow-2xl">
                
                {/* Barrita decorativa superior (Handle) */}
                <View className="items-center mt-3 mb-2">
                  <View className="w-12 h-1.5 bg-slate-200 rounded-full" />
                </View>

                {/* Header (Opcional) */}
                <View className="flex-row justify-between items-center mb-6 mt-2">
                  {title ? (
                    <ThemedText variant="h2">{title}</ThemedText>
                  ) : <View />} {/* Espaciador vacío si no hay título */}
                  
                  <TouchableOpacity 
                    onPress={onClose} 
                    className="p-2 bg-slate-100 rounded-full"
                  >
                    <X size={20} color="#64748b" />
                  </TouchableOpacity>
                </View>

                {/* El contenido que le pases (Filtros, Botones, etc) */}
                <View>
                  {children}
                </View>
                
              </View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>

        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
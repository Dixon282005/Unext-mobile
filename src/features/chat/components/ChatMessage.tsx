import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
    Check,
    CheckCheck,
    ChevronLeft,
    Phone,
    Video,
} from "lucide-react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    Animated,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { Avatar } from "@/components/ui/Avatar";
import { ThemedText } from "@/components/ui/ThemedText";
import { useChat } from "@/features/chat/hooks/useChat";
import { ChatInputProps, MessageBubbleProps, MessageStatus } from "../types";

// --- COMPONENTE: BURBUJA DE MENSAJE (Estilo Instagram Mejorado) ---
const MessageBubble = React.memo(
  ({ message, isMe, showAvatar = true, onLongPress }: MessageBubbleProps) => {
    const renderStatusIcon = () => {
      if (!isMe || !message.status) return null;

      switch (message.status) {
        case MessageStatus.SENDING:
          return (
            <View className="w-3 h-3 rounded-full border-2 border-white/50 ml-1" />
          );
        case MessageStatus.SENT:
          return <Check size={14} color="white" className="ml-1" />;
        case MessageStatus.DELIVERED:
          return <CheckCheck size={14} color="white" className="ml-1" />;
        case MessageStatus.READ:
          return <CheckCheck size={14} color="#3b82f6" className="ml-1" />;
        default:
          return null;
      }
    };

    return (
      <Pressable
        onLongPress={() => onLongPress?.(message)}
        className={`flex-row mb-2 w-full ${isMe ? "justify-end" : "justify-start"}`}
      >
        {/* Avatar solo si NO soy yo (lado izquierdo) */}
        {!isMe && showAvatar && (
          <View className="mr-2 self-end pb-1">
            <Avatar uri="https://i.pravatar.cc/100" fallback="U" size="sm" />
          </View>
        )}

        {/* La Burbuja */}
        <View className="max-w-[75%]">
          {isMe ? (
            // Burbuja con gradiente para mensajes propios (estilo Instagram)
            <LinearGradient
              colors={["#0084ff", "#00a3ff"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className={`px-4 py-3 rounded-3xl rounded-br-md`}
            >
              <View className="flex-row items-end">
                <ThemedText className="text-[15px] text-white flex-1">
                  {message.text}
                </ThemedText>
                {renderStatusIcon()}
              </View>
              {message.isEdited && (
                <ThemedText className="text-xs text-white/70 mt-0.5">
                  Editado
                </ThemedText>
              )}
            </LinearGradient>
          ) : (
            // Burbuja gris para mensajes recibidos
            <View className="bg-gray-100 px-4 py-3 rounded-3xl rounded-bl-md border border-gray-200">
              <ThemedText className="text-[15px] text-slate-800">
                {message.text}
              </ThemedText>
              {message.isEdited && (
                <ThemedText className="text-xs text-slate-500 mt-0.5">
                  Editado
                </ThemedText>
              )}
            </View>
          )}

          {/* Reacciones */}
          {message.reactions && message.reactions.length > 0 && (
            <View className="flex-row mt-1 ml-2">
              {message.reactions.slice(0, 3).map((reaction, idx) => (
                <View
                  key={idx}
                  className="bg-white border border-gray-200 rounded-full px-1.5 py-0.5 mr-1"
                >
                  <ThemedText className="text-xs">{reaction.emoji}</ThemedText>
                </View>
              ))}
            </View>
          )}
        </View>
      </Pressable>
    );
  },
);

MessageBubble.displayName = "MessageBubble";

// --- COMPONENTE: INDICADOR DE ESCRITURA ---
const TypingIndicator = () => {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = (dot: Animated.Value, delay: number) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dot, {
            toValue: -8,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    };

    animate(dot1, 0);
    animate(dot2, 150);
    animate(dot3, 300);
  }, []);

  return (
    <View className="flex-row mb-2 w-full justify-start">
      <View className="mr-2 self-end pb-1">
        <Avatar uri="https://i.pravatar.cc/100" fallback="U" size="sm" />
      </View>
      <View className="bg-gray-100 px-4 py-3 rounded-3xl rounded-bl-md border border-gray-200 flex-row gap-1">
        <Animated.View
          style={{ transform: [{ translateY: dot1 }] }}
          className="w-2 h-2 bg-gray-400 rounded-full"
        />
        <Animated.View
          style={{ transform: [{ translateY: dot2 }] }}
          className="w-2 h-2 bg-gray-400 rounded-full"
        />
        <Animated.View
          style={{ transform: [{ translateY: dot3 }] }}
          className="w-2 h-2 bg-gray-400 rounded-full"
        />
      </View>
    </View>
  );
};

// --- COMPONENTE: INPUT DE CHAT (Estilo Instagram) ---
const ChatInput = React.memo(
  ({
    onSend,
    placeholder = "Envía un mensaje...",
    disabled = false,
  }: ChatInputProps) => {
    const [text, setText] = useState("");
    const typingTimeoutRef = useRef<number | null>(null);

    const handleSend = useCallback(() => {
      if (text.trim().length === 0) return;
      onSend(text);
      setText("");
    }, [text, onSend]);

    const handleTextChange = useCallback((newText: string) => {
      setText(newText);

      // Indicador de escritura (implementar con el hook)
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      // Aquí podrías llamar a setIsTyping(true) del hook

      typingTimeoutRef.current = setTimeout(() => {
        // Aquí podrías llamar a setIsTyping(false) del hook
      }, 1000) as unknown as number;
    }, []);

    return (
      <View className="px-3 py-2 bg-white border-t border-gray-100 flex-row items-center pb-6">
        <View className="flex-1 flex-row items-center bg-gray-100 rounded-full px-4 py-2 mr-2 border border-gray-200">
          <TextInput
            className="flex-1 text-[16px] text-slate-800 leading-5 pt-0 pb-0"
            placeholder={placeholder}
            placeholderTextColor="#9ca3af"
            value={text}
            onChangeText={handleTextChange}
            multiline
            editable={!disabled}
          />
        </View>

        {text.length > 0 ? (
          <TouchableOpacity onPress={handleSend} disabled={disabled}>
            <ThemedText className="text-blue-500 font-semibold text-base ml-1">
              Enviar
            </ThemedText>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity disabled={disabled}>
            <View className="w-8 h-8 bg-blue-500 rounded-full items-center justify-center">
              <ThemedText className="text-white text-lg">👍</ThemedText>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  },
);

ChatInput.displayName = "ChatInput";

// --- PANTALLA PRINCIPAL ---
export function ChatScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string }>();
  const chatId = params.id || "";

  const currentUserId = "me"; // En producción, obtener del contexto de autenticación

  const { messages, sendMessage, isTyping, isConnected } = useChat(
    chatId,
    currentUserId,
  );

  const flatListRef = useRef<FlatList>(null);

  // Auto-scroll al final cuando llegan mensajes
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      {/* HEADER TIPO INSTAGRAM */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100 bg-white shadow-sm z-10">
        <View className="flex-row items-center flex-1">
          <TouchableOpacity onPress={() => router.back()} className="mr-3">
            <ChevronLeft size={30} color="#000" />
          </TouchableOpacity>

          <View className="flex-row items-center flex-1">
            <Avatar uri="https://i.pravatar.cc/100" fallback="U" size="sm" />
            <View className="flex-1 ml-3">
              <ThemedText className="font-bold text-base leading-tight">
                Chat #{chatId}
              </ThemedText>
              <ThemedText className="text-xs text-gray-500 leading-tight">
                {isConnected
                  ? isTyping
                    ? "Escribiendo..."
                    : "Activo ahora"
                  : "Desconectado"}
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Acciones del Header */}
        <View className="flex-row gap-4">
          <TouchableOpacity>
            <Phone size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Video size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* LISTA DE MENSAJES */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          const isMe =
            item.senderId === currentUserId || item.senderId === "Dixon";
          const prevMessage = index > 0 ? messages[index - 1] : null;
          const showAvatar =
            !prevMessage || prevMessage.senderId !== item.senderId;

          return (
            <MessageBubble message={item} isMe={isMe} showAvatar={showAvatar} />
          );
        }}
        ListFooterComponent={isTyping ? <TypingIndicator /> : null}
        contentContainerStyle={{ paddingHorizontal: 12, paddingVertical: 16 }}
        showsVerticalScrollIndicator={false}
      />

      {/* INPUT AREA */}
      <ChatInput
        onSend={(text) => sendMessage(text, currentUserId)}
        disabled={!isConnected}
      />
    </KeyboardAvoidingView>
  );
}

export default ChatScreen;

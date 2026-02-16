import { Avatar } from "@/components/ui/Avatar";
import { ThemedText } from "@/components/ui/ThemedText";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { ChatRowProps } from "../types";

export const ChatRow = React.memo(
  ({ chat, onPress, onLongPress }: ChatRowProps) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        className="flex-row items-center px-4 py-3 bg-white border-b border-slate-50 active:bg-slate-50"
        onPress={onPress}
        onLongPress={onLongPress}
      >
        {/* Avatar con indicador Online */}
        <View className="relative mr-3">
          <Avatar uri={chat.avatar} fallback={chat.name} size="md" />
          {chat.online && (
            <View className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
          )}
        </View>

        {/* Info del Chat */}
        <View className="flex-1">
          <View className="flex-row justify-between items-center mb-1">
            <ThemedText className="font-bold text-slate-900 text-base">
              {chat.name}
            </ThemedText>
            <ThemedText
              className={`text-xs ${chat.unread > 0 ? "text-violet-600 font-bold" : "text-slate-400"}`}
            >
              {chat.time}
            </ThemedText>
          </View>

          <View className="flex-row justify-between items-center">
            <ThemedText
              numberOfLines={1}
              className={`text-sm flex-1 mr-4 ${chat.unread > 0 ? "text-slate-900 font-semibold" : "text-slate-500"}`}
            >
              {chat.typing ? (
                <ThemedText className="text-blue-500 italic">
                  Escribiendo...
                </ThemedText>
              ) : (
                chat.message
              )}
            </ThemedText>

            {/* Badge de No Leídos */}
            {chat.unread > 0 && (
              <View className="bg-violet-600 min-w-[20px] h-5 rounded-full items-center justify-center px-1.5">
                <ThemedText className="text-white text-[10px] font-bold">
                  {chat.unread}
                </ThemedText>
              </View>
            )}

            {/* Indicador de silenciado */}
            {chat.isMuted && (
              <View className="ml-2">
                <ThemedText className="text-slate-400 text-xs">🔇</ThemedText>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  },
);

ChatRow.displayName = "ChatRow";

import { useCallback, useEffect, useState } from "react";
import { socket } from "../../../lib/socket";
import {
  Message,
  MessageStatus,
  MessageType,
  SocketMessageData,
  TypingEvent,
  UseChatReturn,
} from "../types";

export const useChat = (
  roomId: string,
  currentUserId: string,
): UseChatReturn => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!roomId) return;

    socket.connect();

    socket.on("connect", () => setIsConnected(true));
    socket.on("disconnect", () => setIsConnected(false));

    // Unirse a la sala del chat específico
    socket.emit("join_room", roomId);

    // Escuchar mensajes nuevos
    socket.on("receive_message", (data: SocketMessageData) => {
      const newMessage: Message = {
        id: `${data.author}-${data.time}`,
        text: data.message,
        senderId: data.author,
        timestamp: data.time,
        status: data.status || MessageStatus.DELIVERED,
        type: data.type || MessageType.TEXT,
        imageUrl: data.imageUrl,
      };

      setMessages((prev) => [...prev, newMessage]);
    });

    // Escuchar indicador de escritura
    socket.on("user_typing", (data: TypingEvent) => {
      if (data.userId !== currentUserId && data.room === roomId) {
        setIsTyping(data.isTyping);
      }
    });

    // Escuchar actualizaciones de estado de mensaje
    socket.on(
      "message_status_update",
      (data: { messageId: string; status: MessageStatus }) => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === data.messageId ? { ...msg, status: data.status } : msg,
          ),
        );
      },
    );

    return () => {
      socket.off("receive_message");
      socket.off("user_typing");
      socket.off("message_status_update");
      socket.emit("leave_room", roomId);
      socket.disconnect();
    };
  }, [roomId, currentUserId]);

  const sendMessage = useCallback(
    (text: string, senderId: string, type: MessageType = MessageType.TEXT) => {
      const messageId = `${senderId}-${Date.now()}`;

      const messageData: SocketMessageData = {
        room: roomId,
        author: senderId,
        message: text,
        time: new Date().toISOString(),
        type,
        status: MessageStatus.SENDING,
      };

      const newMessage: Message = {
        id: messageId,
        text,
        senderId,
        timestamp: messageData.time,
        status: MessageStatus.SENDING,
        type,
      };

      // Agregar mensaje optimísticamente
      setMessages((prev) => [...prev, newMessage]);

      // Enviar al servidor
      socket.emit("send_message", { ...messageData, messageId });

      // Simular cambio de estado (en producción esto vendría del servidor)
      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === messageId ? { ...msg, status: MessageStatus.SENT } : msg,
          ),
        );
      }, 500);
    },
    [roomId],
  );

  const sendTypingIndicator = useCallback(
    (typing: boolean) => {
      const typingData: TypingEvent = {
        room: roomId,
        userId: currentUserId,
        isTyping: typing,
      };
      socket.emit("typing", typingData);
    },
    [roomId, currentUserId],
  );

  const reactToMessage = useCallback(
    (messageId: string, emoji: string) => {
      socket.emit("react_to_message", {
        room: roomId,
        messageId,
        userId: currentUserId,
        emoji,
      });
    },
    [roomId, currentUserId],
  );

  const deleteMessage = useCallback(
    (messageId: string) => {
      socket.emit("delete_message", { room: roomId, messageId });
      setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
    },
    [roomId],
  );

  const editMessage = useCallback(
    (messageId: string, newText: string) => {
      socket.emit("edit_message", { room: roomId, messageId, newText });
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId
            ? { ...msg, text: newText, isEdited: true }
            : msg,
        ),
      );
    },
    [roomId],
  );

  return {
    messages,
    sendMessage,
    isConnected,
    isTyping,
    setIsTyping: sendTypingIndicator,
    deleteMessage,
    editMessage,
    reactToMessage,
  };
};

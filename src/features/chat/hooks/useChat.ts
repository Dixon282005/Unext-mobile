import { useEffect, useState } from "react";
import { socket } from "../../../lib/socket";

export const useChat = (roomId: string) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => setIsConnected(true));

    // Unirse a la sala del chat específico
    socket.emit("join_room", roomId);

    // Escuchar mensajes nuevos
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive_message");
      socket.disconnect();
    };
  }, [roomId]);

  const sendMessage = (text: string, senderId: string) => {
    const messageData = {
      room: roomId,
      author: senderId,
      message: text,
      time: new Date().toISOString(),
    };

    socket.emit("send_message", messageData);
    setMessages((prev) => [...prev, messageData]); // Lo añadimos a nuestra vista
  };

  return { messages, sendMessage, isConnected };
};

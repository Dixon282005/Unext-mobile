// ============================================
// 📦 TIPOS CENTRALIZADOS DEL CHAT
// ============================================

/**
 * Estado de un mensaje
 */
export enum MessageStatus {
  SENDING = "sending", // Enviando
  SENT = "sent", // Enviado
  DELIVERED = "delivered", // Entregado
  READ = "read", // Leído
  FAILED = "failed", // Falló
}

/**
 * Tipo de mensaje
 */
export enum MessageType {
  TEXT = "text",
  IMAGE = "image",
  VIDEO = "video",
  AUDIO = "audio",
  FILE = "file",
}

/**
 * Reacción a un mensaje
 */
export interface MessageReaction {
  emoji: string; // Emoji de la reacción
  userId: string; // ID del usuario que reaccionó
  timestamp: string; // Cuándo reaccionó
}

/**
 * Mensaje individual
 */
export interface Message {
  id: string; // ID único del mensaje
  text: string; // Contenido del mensaje
  senderId: string; // ID del remitente
  timestamp: string; // Fecha/hora ISO
  status?: MessageStatus; // Estado del mensaje
  type?: MessageType; // Tipo de contenido
  imageUrl?: string; // URL de imagen (si aplica)
  videoUrl?: string; // URL de video (si aplica)
  audioUrl?: string; // URL de audio (si aplica)
  reactions?: MessageReaction[]; // Reacciones al mensaje
  replyTo?: string; // ID del mensaje al que responde
  isEdited?: boolean; // Si fue editado
}

/**
 * Chat en la lista
 */
export interface Chat {
  id: string; // ID único del chat
  name: string; // Nombre del contacto/grupo
  message: string; // Último mensaje
  time: string; // Tiempo del último mensaje
  unread: number; // Mensajes no leídos
  avatar: string | null; // URL del avatar
  online: boolean; // Estado online
  typing?: boolean; // Si está escribiendo
  lastSeen?: string; // Última vez visto
  isPinned?: boolean; // Si está fijado
  isMuted?: boolean; // Si está silenciado
}

/**
 * Props del componente ChatRow
 */
export interface ChatRowProps {
  chat: Chat;
  onPress: () => void;
  onLongPress?: () => void; // Para opciones adicionales
}

/**
 * Props del componente MessageBubble
 */
export interface MessageBubbleProps {
  message: Message;
  isMe: boolean;
  showAvatar?: boolean;
  onLongPress?: (message: Message) => void;
  onReact?: (messageId: string, emoji: string) => void;
}

/**
 * Props del componente ChatInput
 */
export interface ChatInputProps {
  onSend: (text: string) => void;
  onImagePick?: () => void;
  onVoiceRecord?: () => void;
  placeholder?: string;
  disabled?: boolean;
}

/**
 * Datos del socket para mensajes
 */
export interface SocketMessageData {
  room: string; // ID de la sala
  author: string; // ID del autor
  message: string; // Contenido
  time: string; // Timestamp ISO
  type?: MessageType; // Tipo de mensaje
  imageUrl?: string; // URL de imagen
  status?: MessageStatus; // Estado
}

/**
 * Evento de typing (escribiendo)
 */
export interface TypingEvent {
  room: string; // ID de la sala
  userId: string; // ID del usuario escribiendo
  isTyping: boolean; // Si está escribiendo
}

/**
 * Usuario del chat
 */
export interface ChatUser {
  id: string; // ID único
  name: string; // Nombre
  avatar: string | null; // URL del avatar
  online: boolean; // Estado online
  lastSeen?: string; // Última vez visto
}

/**
 * Retorno del hook useChat
 */
export interface UseChatReturn {
  messages: Message[];
  sendMessage: (text: string, senderId: string, type?: MessageType) => void;
  isConnected: boolean;
  isTyping: boolean;
  setIsTyping: (typing: boolean) => void;
  deleteMessage?: (messageId: string) => void;
  editMessage?: (messageId: string, newText: string) => void;
  reactToMessage?: (messageId: string, emoji: string) => void;
}

import { io } from "socket.io-client";

// Usamos la URL de Railway
const URL = process.env.EXPO_PUBLIC_SOCKET_URL;

if (!URL) {
  throw new Error("No se ha configurado la URL del socket en el archivo .env");
}

export const socket = io(URL, {
  autoConnect: false, // Evita que se conecte apenas carga la app si no es necesario
  transports: ["websocket"], // Forzamos el uso de websockets para evitar problemas de CORS
});

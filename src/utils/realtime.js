import { io } from "socket.io-client";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";
const WS_URL = import.meta.env.VITE_WS_URL || API_BASE_URL;

export const createRealtimeSocket = (token) => {
  return io(WS_URL, {
    transports: ["websocket"],
    auth: {
      token,
    },
  });
};

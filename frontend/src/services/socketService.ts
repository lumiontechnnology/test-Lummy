import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const socketService = {
  connect(agentId: string) {
    if (!socket) {
      socket = io(import.meta.env.VITE_WS_URL || 'http://localhost:5000', {
        auth: {
          token: localStorage.getItem('token'),
        },
      });

      socket.on('connect', () => {
        console.log('Socket connected');
      });

      socket.on('disconnect', () => {
        console.log('Socket disconnected');
      });
    }

    return socket;
  },

  disconnect() {
    if (socket) {
      socket.disconnect();
      socket = null;
    }
  },

  getSocket() {
    return socket;
  },

  sendMessage(agentId: string, message: string, conversationId?: string) {
    if (socket) {
      socket.emit('send-message', { agentId, message, conversationId });
    }
  },

  onMessage(callback: (data: any) => void) {
    if (socket) {
      socket.on('ai-response', callback);
    }
  },
};

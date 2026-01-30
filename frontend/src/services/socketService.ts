import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const socketService = {
  connect() {
    if (!socket) {
      socket = io(process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:5000', {
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

  getConversations(agentId: string) {
    if (socket) {
      socket.emit('get-conversations', { agentId });
    }
  },

  onConversations(callback: (data: any) => void) {
    if (socket) {
      socket.on('conversations', callback);
    }
  },

  getConversation(id: string) {
    if (socket) {
      socket.emit('get-conversation', { id });
    }
  },

  onConversation(callback: (data: any) => void) {
    if (socket) {
      socket.on('conversation', callback);
    }
  },
};

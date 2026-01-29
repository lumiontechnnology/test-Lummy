import api from './api';

export const conversationService = {
  async getConversations(agentId: string) {
    const response = await api.get(`/conversations/agent/${agentId}`);
    return response.data;
  },

  async getConversation(conversationId: string) {
    const response = await api.get(`/conversations/${conversationId}`);
    return response.data;
  },

  async updateStatus(conversationId: string, status: 'ACTIVE' | 'RESOLVED' | 'ESCALATED') {
    const response = await api.patch(`/conversations/${conversationId}/status`, { status });
    return response.data;
  },

  async addMessage(conversationId: string, content: string, senderType: 'CUSTOMER' | 'AI' | 'HUMAN') {
    const response = await api.post(`/conversations/${conversationId}/messages`, {
      content,
      senderType,
    });
    return response.data;
  },
};

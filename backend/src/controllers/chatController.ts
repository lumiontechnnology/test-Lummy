import { Socket } from 'socket.io';
import prisma from '../config/database';
import claudeService from '../services/ai/claude.service';

export class ChatController {
  async handleMessage(socket: Socket, data: any) {
    try {
      const { agentId, message, conversationId } = data;

      let conversation;
      if (conversationId) {
        conversation = await prisma.conversation.findUnique({
          where: { id: conversationId },
          include: { messages: { orderBy: { createdAt: 'asc' } } },
        });
      } else {
        conversation = await prisma.conversation.create({
          data: {
            agentId,
            channel: 'CHAT',
            status: 'ACTIVE',
          },
          include: { messages: true },
        });
      }

      await prisma.message.create({
        data: {
          conversationId: conversation.id,
          senderType: 'CUSTOMER',
          content: message,
        },
      });

      const agent = await prisma.agent.findUnique({
        where: { id: agentId },
      });

      const history = conversation.messages.map(m => ({
        role: m.senderType === 'CUSTOMER' ? 'user' as const : 'assistant' as const,
        content: m.content,
      }));

      history.push({ role: 'user', content: message });

      const aiResponse = await claudeService.generateResponse(
        history,
        agent?.voiceProfile || {}
      );

      await prisma.message.create({
        data: {
          conversationId: conversation.id,
          senderType: 'AI',
          content: aiResponse,
        },
      });

      socket.emit('ai-response', {
        conversationId: conversation.id,
        message: aiResponse,
      });

      await prisma.learningData.create({
        data: {
          agentId,
          conversationId: conversation.id,
          interactionType: 'customer_query',
          patternDetected: { query: message, response: aiResponse },
          confidenceScore: 0.8,
        },
      });

    } catch (error) {
      console.error('Chat error:', error);
      socket.emit('error', { message: 'Failed to process message' });
    }
  }
}

export default new ChatController();

import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../config/database';

export class ConversationController {
  async getConversations(req: AuthRequest, res: Response) {
    try {
      const { agentId } = req.params;

      // Verify user owns this agent
      const agent = await prisma.agent.findFirst({
        where: {
          id: agentId,
          userId: req.user!.id,
        },
      });

      if (!agent) {
        return res.status(404).json({ error: 'Agent not found' });
      }

      const conversations = await prisma.conversation.findMany({
        where: { agentId },
        include: {
          messages: {
            orderBy: { createdAt: 'desc' },
            take: 1,
          },
        },
        orderBy: { updatedAt: 'desc' },
      });

      res.json({ conversations });
    } catch (error) {
      console.error('Get conversations error:', error);
      res.status(500).json({ error: 'Failed to fetch conversations' });
    }
  }

  async getConversation(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;

      const conversation = await prisma.conversation.findUnique({
        where: { id },
        include: {
          messages: { orderBy: { createdAt: 'asc' } },
          agent: {
            select: {
              id: true,
              name: true,
              userId: true,
            },
          },
        },
      });

      if (!conversation) {
        return res.status(404).json({ error: 'Conversation not found' });
      }

      // Verify user owns this conversation's agent
      if (conversation.agent.userId !== req.user!.id) {
        return res.status(403).json({ error: 'Access denied' });
      }

      res.json({ conversation });
    } catch (error) {
      console.error('Get conversation error:', error);
      res.status(500).json({ error: 'Failed to fetch conversation' });
    }
  }

  async updateStatus(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!['ACTIVE', 'RESOLVED', 'ESCALATED'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
      }

      const conversation = await prisma.conversation.findUnique({
        where: { id },
        include: {
          agent: { select: { userId: true } },
        },
      });

      if (!conversation) {
        return res.status(404).json({ error: 'Conversation not found' });
      }

      if (conversation.agent.userId !== req.user!.id) {
        return res.status(403).json({ error: 'Access denied' });
      }

      const updated = await prisma.conversation.update({
        where: { id },
        data: { status },
      });

      res.json({ conversation: updated });
    } catch (error) {
      console.error('Update conversation status error:', error);
      res.status(500).json({ error: 'Failed to update conversation' });
    }
  }

  async addMessage(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const { content, senderType } = req.body;

      if (!content || !senderType) {
        return res.status(400).json({ error: 'Content and senderType are required' });
      }

      if (!['CUSTOMER', 'AI', 'HUMAN'].includes(senderType)) {
        return res.status(400).json({ error: 'Invalid senderType' });
      }

      const conversation = await prisma.conversation.findUnique({
        where: { id },
        include: {
          agent: { select: { userId: true } },
        },
      });

      if (!conversation) {
        return res.status(404).json({ error: 'Conversation not found' });
      }

      if (conversation.agent.userId !== req.user!.id) {
        return res.status(403).json({ error: 'Access denied' });
      }

      const message = await prisma.message.create({
        data: {
          conversationId: id,
          content,
          senderType,
        },
      });

      res.status(201).json({ message });
    } catch (error) {
      console.error('Add message error:', error);
      res.status(500).json({ error: 'Failed to add message' });
    }
  }
}

export default new ConversationController();

import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../config/database';
import learningService from '../services/learning/learningService';

export class AgentController {
  async getAgents(req: AuthRequest, res: Response) {
    try {
      const agents = await prisma.agent.findMany({
        where: { userId: req.user!.id },
        include: {
          _count: {
            select: { conversations: true },
          },
        },
      });

      res.json({ agents });
    } catch (error) {
      console.error('Get agents error:', error);
      res.status(500).json({ error: 'Failed to fetch agents' });
    }
  }

  async getAgent(req: AuthRequest, res: Response) {
    try {
      const agent = await prisma.agent.findFirst({
        where: {
          id: req.params.id,
          userId: req.user!.id,
        },
        include: {
          _count: {
            select: { 
              conversations: true,
              learningData: true,
              voicePatterns: true,
            },
          },
        },
      });

      if (!agent) {
        return res.status(404).json({ error: 'Agent not found' });
      }

      res.json({ agent });
    } catch (error) {
      console.error('Get agent error:', error);
      res.status(500).json({ error: 'Failed to fetch agent' });
    }
  }

  async updateAgent(req: AuthRequest, res: Response) {
    try {
      const { name, status } = req.body;

      const agent = await prisma.agent.findFirst({
        where: {
          id: req.params.id,
          userId: req.user!.id,
        },
      });

      if (!agent) {
        return res.status(404).json({ error: 'Agent not found' });
      }

      const updatedAgent = await prisma.agent.update({
        where: { id: req.params.id },
        data: {
          ...(name && { name }),
          ...(status && { status }),
        },
      });

      res.json({ agent: updatedAgent });
    } catch (error) {
      console.error('Update agent error:', error);
      res.status(500).json({ error: 'Failed to update agent' });
    }
  }

  async rebuildVoiceProfile(req: AuthRequest, res: Response) {
    try {
      const agent = await prisma.agent.findFirst({
        where: {
          id: req.params.id,
          userId: req.user!.id,
        },
      });

      if (!agent) {
        return res.status(404).json({ error: 'Agent not found' });
      }

      const profile = await learningService.buildVoiceProfile(req.params.id);

      res.json({ 
        message: 'Voice profile rebuilt successfully',
        profile,
      });
    } catch (error) {
      console.error('Rebuild voice profile error:', error);
      res.status(500).json({ error: 'Failed to rebuild voice profile' });
    }
  }

  async getAgentStats(req: AuthRequest, res: Response) {
    try {
      const agent = await prisma.agent.findFirst({
        where: {
          id: req.params.id,
          userId: req.user!.id,
        },
      });

      if (!agent) {
        return res.status(404).json({ error: 'Agent not found' });
      }

      const totalConversations = await prisma.conversation.count({
        where: { agentId: req.params.id },
      });

      const resolvedConversations = await prisma.conversation.count({
        where: { 
          agentId: req.params.id,
          status: 'RESOLVED',
        },
      });

      const activeConversations = await prisma.conversation.count({
        where: { 
          agentId: req.params.id,
          status: 'ACTIVE',
        },
      });

      res.json({
        stats: {
          totalConversations,
          resolvedConversations,
          activeConversations,
          learningProgress: agent.learningStage,
          status: agent.status,
        },
      });
    } catch (error) {
      console.error('Get agent stats error:', error);
      res.status(500).json({ error: 'Failed to fetch agent stats' });
    }
  }
}

export default new AgentController();

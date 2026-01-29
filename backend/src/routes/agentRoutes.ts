import { Router } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth';
import prisma from '../config/database';
import voiceService from '../services/learning/voice.service';

const router = Router();

router.get('/', authenticate, async (req: AuthRequest, res) => {
  try {
    const agents = await prisma.agent.findMany({
      where: { userId: req.user!.id },
    });
    res.json(agents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch agents' });
  }
});

router.get('/:id', authenticate, async (req: AuthRequest, res) => {
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
    
    res.json(agent);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch agent' });
  }
});

router.post('/:id/rebuild-voice', authenticate, async (req: AuthRequest, res) => {
  try {
    const profile = await voiceService.buildVoiceProfile(req.params.id);
    res.json({ message: 'Voice profile rebuilt', profile });
  } catch (error) {
    res.status(500).json({ error: 'Failed to rebuild voice profile' });
  }
});

export default router;


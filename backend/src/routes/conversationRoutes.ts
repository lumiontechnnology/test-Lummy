import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import conversationController from '../controllers/conversationController';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Get all conversations for an agent
router.get('/agent/:agentId', (req, res) => 
  conversationController.getConversations(req, res)
);

// Get specific conversation
router.get('/:id', (req, res) => 
  conversationController.getConversation(req, res)
);

// Update conversation status
router.patch('/:id/status', (req, res) => 
  conversationController.updateStatus(req, res)
);

// Add message to conversation
router.post('/:id/messages', (req, res) => 
  conversationController.addMessage(req, res)
);

export default router;

import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../config/database';

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { email, password, companyName, industry } = req.body;

      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already registered' });
      }

      const passwordHash = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          email,
          passwordHash,
          companyName,
          industry,
        },
      });

      await prisma.agent.create({
        data: {
          userId: user.id,
          name: `${companyName} Agent`,
          voiceProfile: {},
        },
      });

      const token = this.generateToken(user.id, user.email);

      res.status(201).json({
        user: {
          id: user.id,
          email: user.email,
          companyName: user.companyName,
        },
        token,
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ error: 'Registration failed' });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const validPassword = await bcrypt.compare(password, user.passwordHash);
      if (!validPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = this.generateToken(user.id, user.email);

      res.json({
        user: {
          id: user.id,
          email: user.email,
          companyName: user.companyName,
        },
        token,
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Login failed' });
    }
  }

  async me(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Authentication required' });
      }
      res.json({ user: req.user });
    } catch {
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  }

  private generateToken(userId: string, email: string): string {
    return jwt.sign(
      { userId, email },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );
  }
}

export default new AuthController();

# Lummy

**AI that learns your voice, not the other way around.**

Lummy is a self-learning AI agent for customer service and sales that automatically adapts to your business's unique communication style.

![Lummy Logo](https://img.shields.io/badge/Lummy-AI%20Agent-0047FF?style=for-the-badge)

## 🌟 Features

- **🧠 Self-Learning AI** - Automatically adapts to your communication style
- **💬 Customer Service & Sales** - One AI handles everything seamlessly  
- **⚡ Zero Configuration** - No complex setup or training required
- **🔄 Real-time Chat** - Instant responses via WebSocket
- **🎯 Voice Matching** - Mirrors your brand personality automatically
- **📊 Analytics Dashboard** - Track performance and learning progress

## 🏗️ Tech Stack

### Frontend
- React 18 + TypeScript
- Tailwind CSS
- Vite
- Socket.io Client
- Zustand (State Management)
- Recharts (Analytics)

### Backend
- Node.js + Express + TypeScript
- PostgreSQL + Prisma ORM
- Redis (Caching)
- Socket.io (Real-time)
- Anthropic Claude API (Sonnet 4)
- JWT Authentication

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 15+
- Redis (optional but recommended)
- Anthropic API Key

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials and API keys
npx prisma generate
npx prisma migrate dev
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## 🔑 Environment Variables

### Backend `.env`
```env
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/lummy
JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-refresh-secret-key
REDIS_URL=redis://localhost:6379
ANTHROPIC_API_KEY=your-anthropic-api-key
FRONTEND_URL=http://localhost:3000
CORS_ORIGIN=http://localhost:3000
```

### Frontend `.env`
```env
VITE_API_URL=http://localhost:5000
```

## 📚 Documentation

- [System Architecture](./docs/ARCHITECTURE.md)
- [API Documentation](./docs/API.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)

## 🎯 How It Works

### Phase 1: Learning (Days 1-7)
Lummy observes your conversations and learns your communication patterns.

### Phase 2: Assisted Mode (Days 8-14)  
Lummy starts responding with human oversight and feedback.

### Phase 3: Autonomous (Day 15+)
Lummy handles conversations independently while continuously improving.

## 📈 Roadmap

- [ ] Multi-language support
- [ ] Voice call integration
- [ ] Advanced analytics and insights
- [ ] Mobile apps (iOS/Android)
- [ ] White-label solution for agencies
- [ ] Custom integrations (Zapier, Make)

## 🔒 Security

- JWT-based authentication
- API rate limiting (100 req/min)
- Input validation and sanitization
- SQL injection prevention via Prisma
- HTTPS in production
- Environment variable protection

## 📊 Database Schema

```
Users → Agents → Conversations → Messages
              ↓
        VoicePatterns
              ↓
        LearningData
```

See full schema in [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)

## 🤝 Contributing

This is a private repository. Contact the owner for collaboration opportunities.

## 📄 License

Proprietary - All rights reserved © 2026

## 👤 Author

**[Your Name]** - Founder & Designer  
UI/UX Design Portfolio Value: $10,000

## 🌐 Links

- [Live Demo](https://lummy.app) *(coming soon)*
- [Documentation](./docs)
- [Issue Tracker](https://github.com/yourusername/test-lummy/issues)

---

**Built with ❤️ by a designer who believes AI should learn from us, not the other way around.**

## 💡 Vision

Lummy represents a fundamental shift in how businesses interact with AI. Instead of spending weeks configuring chatbots and training models, businesses simply plug in Lummy and let it learn their voice naturally—just like hiring a new team member who learns by observing.

### The Problem
Current AI solutions require:
- Complex configuration dashboards
- Manual training and setup
- Constant maintenance
- Technical expertise

### The Lummy Solution
- Plug and play in 5 minutes
- Learns by watching (like a human)
- Zero configuration required
- Gets smarter every day

---

**Status**: 🚧 In Development | **Version**: 1.0.0 | **Last Updated**: January 2026

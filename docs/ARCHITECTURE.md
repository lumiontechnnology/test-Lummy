# Lummy - Complete System Architecture

## Overview
Lummy is a self-learning AI agent for customer service and sales that adapts to each business's unique voice and communication style.

## Technology Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context + Hooks
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Real-time**: Socket.io Client
- **Charts**: Recharts
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL 15
- **ORM**: Prisma
- **Cache**: Redis
- **Real-time**: Socket.io
- **Job Queue**: Bull (Redis-based)
- **Authentication**: JWT + Passport.js

### AI/ML Layer
- **Primary AI**: Anthropic Claude API (Sonnet 4)
- **Embeddings**: OpenAI Ada-002
- **Vector Store**: Pinecone or Weaviate
- **NLP Processing**: Custom pipeline

### Infrastructure
- **Hosting**: Vercel (Frontend) + Railway/Render (Backend)
- **File Storage**: AWS S3 or Cloudflare R2
- **Email**: SendGrid or Resend
- **Monitoring**: Sentry
- **Analytics**: PostHog or Mixpanel

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND LAYER                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Landing    │  │   Dashboard  │  │   Chat UI    │      │
│  │     Page     │  │   (Business) │  │  (Customer)  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                      API GATEWAY LAYER                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │     Auth     │  │   Business   │  │     Chat     │      │
│  │   Service    │  │   Service    │  │   Service    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                        CORE AI LAYER                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Lummy AI Engine                         │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────────┐  │   │
│  │  │ Learning │  │ Response │  │   Voice Style    │  │   │
│  │  │  Module  │  │Generator │  │   Matcher        │  │   │
│  │  └──────────┘  └──────────┘  └──────────────────┘  │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                        DATA LAYER                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  PostgreSQL  │  │     Redis    │  │    Vector    │      │
│  │  (Primary)   │  │    (Cache)   │  │     Store    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

---

## Database Schema

### Users (businesses)
```sql
- id: uuid (PK)
- email: string (unique)
- password_hash: string
- company_name: string
- industry: string
- created_at: timestamp
- updated_at: timestamp
```

### AI_Agents
```sql
- id: uuid (PK)
- user_id: uuid (FK)
- name: string
- status: enum (learning, active, paused)
- learning_stage: integer (0-100)
- voice_profile: jsonb
- created_at: timestamp
- updated_at: timestamp
```

### Conversations
```sql
- id: uuid (PK)
- agent_id: uuid (FK)
- customer_email: string
- channel: enum (email, chat, phone)
- status: enum (active, resolved, escalated)
- sentiment: float
- created_at: timestamp
- updated_at: timestamp
```

### Messages
```sql
- id: uuid (PK)
- conversation_id: uuid (FK)
- sender_type: enum (customer, ai, human)
- content: text
- metadata: jsonb
- created_at: timestamp
```

### Learning_Data
```sql
- id: uuid (PK)
- agent_id: uuid (FK)
- conversation_id: uuid (FK)
- interaction_type: string
- pattern_detected: jsonb
- confidence_score: float
- applied: boolean
- created_at: timestamp
```

### Voice_Patterns
```sql
- id: uuid (PK)
- agent_id: uuid (FK)
- pattern_type: enum (greeting, closing, tone, vocabulary)
- pattern_data: jsonb
- frequency: integer
- last_used: timestamp
```

---

## API Endpoints

### Authentication
```
POST   /api/auth/register        - Register new business
POST   /api/auth/login           - Login
POST   /api/auth/logout          - Logout
GET    /api/auth/me              - Get current user
POST   /api/auth/forgot-password - Password reset
```

### Business Management
```
GET    /api/business/profile     - Get business profile
PUT    /api/business/profile     - Update profile
GET    /api/business/stats       - Get dashboard stats
GET    /api/business/analytics   - Get detailed analytics
```

### AI Agent
```
POST   /api/agent/create         - Create new agent
GET    /api/agent/:id            - Get agent details
PUT    /api/agent/:id            - Update agent settings
DELETE /api/agent/:id            - Delete agent
GET    /api/agent/:id/status     - Get learning status
POST   /api/agent/:id/feedback   - Submit feedback
```

### Conversations
```
GET    /api/conversations        - List all conversations
GET    /api/conversations/:id    - Get conversation details
POST   /api/conversations/:id/escalate - Escalate to human
GET    /api/conversations/stats  - Get conversation analytics
```

### Chat (WebSocket)
```
WS     /api/chat                 - Real-time chat endpoint
```

### Integrations
```
POST   /api/integrations/email   - Connect email
POST   /api/integrations/slack   - Connect Slack
POST   /api/integrations/webhook - Setup webhook
GET    /api/integrations         - List integrations
DELETE /api/integrations/:id     - Remove integration
```

---

## AI Learning Pipeline

### Phase 1: Observation (Days 1-3)
1. Collect all incoming messages
2. Analyze response patterns from business
3. Extract tone, vocabulary, structure
4. Build initial voice profile

### Phase 2: Pattern Recognition (Days 4-7)
1. Identify common queries and responses
2. Detect personality traits (formal, friendly, technical)
3. Learn business-specific terminology
4. Build response templates

### Phase 3: Supervised Responses (Days 8-14)
1. Generate responses with human oversight
2. Collect feedback on generated responses
3. Refine voice matching algorithms
4. Increase automation confidence

### Phase 4: Full Automation (Day 15+)
1. Handle conversations independently
2. Continuous learning from interactions
3. Adapt to feedback in real-time
4. Self-improve through analytics

---

## Key Features Implementation

### 1. Self-Learning Engine
- Real-time conversation analysis
- Pattern extraction and storage
- Confidence scoring system
- Continuous model fine-tuning

### 2. Voice Matching
- Tone analysis (formal/casual spectrum)
- Vocabulary fingerprinting
- Sentence structure patterns
- Personality trait detection

### 3. Context Understanding
- Conversation history tracking
- Multi-turn dialogue management
- Intent classification
- Entity extraction

### 4. Smart Routing
- Confidence-based escalation
- Topic-based routing
- Sentiment-aware responses
- Urgency detection

---

## File Structure

```
lummy/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── landing/
│   │   │   ├── dashboard/
│   │   │   ├── chat/
│   │   │   └── shared/
│   │   ├── pages/
│   │   ├── contexts/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── utils/
│   │   └── App.tsx
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   │   ├── ai/
│   │   │   ├── auth/
│   │   │   ├── chat/
│   │   │   └── learning/
│   │   ├── models/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── config/
│   │   └── server.ts
│   ├── prisma/
│   │   └── schema.prisma
│   └── package.json
│
├── shared/
│   └── types/
│
└── docs/
    ├── api.md
    ├── deployment.md
    └── development.md
```

---

## Security Considerations

1. **Authentication**: JWT with refresh tokens
2. **API Rate Limiting**: 100 requests/minute per user
3. **Data Encryption**: At rest and in transit
4. **GDPR Compliance**: Data deletion and export
5. **API Key Management**: Encrypted in database
6. **Input Validation**: Strict schema validation
7. **SQL Injection Prevention**: Parameterized queries via Prisma

---

## Deployment Strategy

### Development
- Local PostgreSQL + Redis
- Mock AI responses for testing
- Hot reload for both frontend/backend

### Staging
- Railway/Render for backend
- Vercel for frontend
- Real AI with rate limits
- Test data only

### Production
- Load balanced backend instances
- CDN for frontend assets
- Production AI keys
- Full monitoring and logging
- Automated backups

---

## Monitoring & Analytics

### System Metrics
- API response times
- Error rates
- Database query performance
- AI response latency

### Business Metrics
- Conversations handled
- Resolution rate
- Customer satisfaction
- Learning progress
- Cost per conversation

### AI Metrics
- Confidence scores
- Escalation rate
- Pattern match accuracy
- Voice consistency score

---

## Future Enhancements

1. **Multi-language Support**: Detect and respond in customer's language
2. **Voice Calls**: Real-time phone conversation handling
3. **Advanced Analytics**: Predictive insights and recommendations
4. **A/B Testing**: Test different response strategies
5. **Custom Integrations**: Zapier, Make, native CRM integrations
6. **Mobile Apps**: iOS and Android native apps
7. **White Label**: Allow agencies to resell under their brand

---

## Cost Estimates (Monthly)

### MVP Stage (1-10 businesses)
- Backend Hosting: $20-50
- Database: $15-25
- Redis: $10-20
- AI API Calls: $100-500
- Total: ~$200-600/month

### Growth Stage (50-100 businesses)
- Backend Hosting: $100-200
- Database: $50-100
- Redis: $25-50
- AI API Calls: $1,000-3,000
- Total: ~$1,500-4,000/month

### Scale (500+ businesses)
- Custom infrastructure needed
- Estimated: $10,000-25,000/month

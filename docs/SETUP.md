# Lummy - Complete Setup Guide

## 📋 Prerequisites

Before you begin, make sure you have:

- **Node.js** 18+ installed ([Download](https://nodejs.org/))
- **PostgreSQL** 15+ installed ([Download](https://www.postgresql.org/download/))
- **Redis** (optional but recommended) ([Download](https://redis.io/download))
- **Git** installed
- **Anthropic API Key** ([Get one here](https://console.anthropic.com/))

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/test-lummy.git
cd test-lummy
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your credentials
# nano .env or open in your editor
```

**Required .env values:**
```env
DATABASE_URL=postgresql://username:password@localhost:5432/lummy
JWT_SECRET=your-random-secret-key-here
ANTHROPIC_API_KEY=sk-ant-your-api-key-here
```

```bash
# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# Start backend server
npm run dev
```

Backend should now be running on `http://localhost:5000`

### 3. Frontend Setup

Open a **new terminal window**:

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start frontend
npm run dev
```

Frontend should now be running on `http://localhost:3000`

## 🗄️ Database Setup

### Option A: Local PostgreSQL

```bash
# Create database
createdb lummy

# Verify connection
psql -d lummy -c "SELECT 1"
```

### Option B: Hosted Database (Recommended for beginners)

**Using Neon (Free):**
1. Go to [neon.tech](https://neon.tech)
2. Create free account
3. Create new project
4. Copy connection string
5. Paste into `backend/.env` as `DATABASE_URL`

**Using Supabase (Free):**
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Go to Settings → Database
4. Copy connection string
5. Paste into `backend/.env` as `DATABASE_URL`

## 🔑 Getting API Keys

### Anthropic Claude API

1. Go to [console.anthropic.com](https://console.anthropic.com/)
2. Sign up or log in
3. Navigate to API Keys
4. Create new key
5. Copy key to `backend/.env` as `ANTHROPIC_API_KEY`

**Pricing:** ~$15 per 1M tokens (very affordable for testing)

## 🧪 Testing the Setup

### 1. Check Backend Health

```bash
curl http://localhost:5000/api/health
```

Should return:
```json
{"status":"ok","timestamp":"2026-01-29T..."}
```

### 2. Test Registration

Visit `http://localhost:3000/register` and create an account

### 3. Test Login

Sign in with your new account at `http://localhost:3000/login`

### 4. Test Dashboard

You should see the dashboard with stats

## 🐛 Troubleshooting

### "Cannot connect to database"

**Problem:** Database connection failed

**Solutions:**
1. Check PostgreSQL is running: `pg_isready`
2. Verify DATABASE_URL in `.env`
3. Ensure database exists: `psql -l | grep lummy`
4. Check credentials are correct

### "Redis connection failed"

**Problem:** Redis not available

**Solution:** Redis is optional for MVP. Comment out Redis code in:
- `backend/src/config/redis.ts`
- `backend/src/server.ts`

Or install Redis:
```bash
# macOS
brew install redis
brew services start redis

# Ubuntu
sudo apt install redis-server
sudo systemctl start redis
```

### "Port 5000 already in use"

**Problem:** Another process using port 5000

**Solution:**
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill

# Or change port in backend/.env
PORT=5001
```

### "Prisma Client not generated"

**Problem:** Database client needs to be generated

**Solution:**
```bash
cd backend
npx prisma generate
```

### "Module not found" errors

**Problem:** Dependencies not installed

**Solution:**
```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
```

## 📱 Running in Production

### Backend (Railway)

1. Create account at [railway.app](https://railway.app)
2. Click "New Project"
3. Connect GitHub repo
4. Add PostgreSQL database
5. Add environment variables
6. Deploy!

### Frontend (Vercel)

1. Create account at [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Connect GitHub repo
4. Select `frontend` directory
5. Add environment variable: `VITE_API_URL=https://your-backend.railway.app`
6. Deploy!

## 🔒 Security Checklist

Before deploying to production:

- [ ] Change `JWT_SECRET` to a strong random string
- [ ] Use strong database password
- [ ] Enable HTTPS (automatic on Vercel/Railway)
- [ ] Set proper CORS origins
- [ ] Keep API keys secret (never commit to git)
- [ ] Enable database backups
- [ ] Set up monitoring (Sentry, etc.)

## 📚 Next Steps

1. **Customize the landing page** with your brand
2. **Configure your AI voice** in the dashboard
3. **Connect communication channels** (email, chat, etc.)
4. **Invite team members** to test
5. **Gather feedback** and iterate

## 💡 Development Tips

### Hot Reload

Both frontend and backend support hot reload. Changes will automatically refresh.

### Database Changes

After modifying `prisma/schema.prisma`:
```bash
npx prisma migrate dev --name your_migration_name
npx prisma generate
```

### Viewing Database

```bash
npx prisma studio
```

This opens a GUI at `http://localhost:5555` to view/edit data.

### Logs

Backend logs appear in terminal where you ran `npm run dev`

### Testing API Endpoints

Use tools like:
- [Postman](https://www.postman.com/)
- [Insomnia](https://insomnia.rest/)
- `curl` commands

Example:
```bash
# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "companyName": "Test Company"
  }'
```

## 🆘 Getting Help

If you're stuck:

1. Check this documentation
2. Read error messages carefully
3. Check GitHub Issues
4. Ask in discussions
5. Hire a developer on Fiverr/Upwork for 1-2 hours

## 📞 Support

For questions or issues, create an issue on GitHub or contact the team.

---

**You're all set!** 🎉 Start building your AI-powered customer service solution.

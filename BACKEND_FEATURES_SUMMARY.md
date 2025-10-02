# 🎯 Backend Features Summary - Quick Reference

This is a condensed version of `BACKEND_REQUIREMENTS.md` for quick reference.

---

## 📊 Features Overview

| Category | Features | Priority | Status |
|----------|----------|----------|--------|
| **Authentication** | Email signup/login, Google OAuth, Email verification, Password reset | 🔴 P0 | Not started |
| **User Management** | Profile CRUD, Preferences, Theme storage | 🔴 P0 | Not started |
| **Onboarding** | Website analysis, Competitor/Topic/Persona CRUD, Region/Language | 🔴 P0 | Not started |
| **Dashboard** | Prompt CRUD, Topic management, Prompt chaining | 🔴 P0 | Not started |
| **Analytics** | Visibility, Sentiment, Citations, Topics tracking | 🟡 P1 | Not started |
| **AI Integration** | Prompt generation, Website analysis, Testing | 🟡 P1 | Not started |

---

## 🗄️ Database Collections (MongoDB)

### 1. **users**
```javascript
{
  email, password, googleId,
  firstName, lastName, companyName, websiteUrl,
  preferences: { region, language, theme },
  subscription: { plan, status, expiresAt }
}
```

### 2. **competitors**
```javascript
{
  userId, name, url, selected,
  metadata: { description, industry }
}
```

### 3. **topics**
```javascript
{
  userId, name, selected, source: "ai"|"user",
  keywords[], promptCount
}
```

### 4. **personas**
```javascript
{
  userId, type, description, selected,
  source: "ai"|"user"
}
```

### 5. **prompts**
```javascript
{
  userId, topicId, title, text,
  status: "active"|"archived",
  metadata: { targetPersonas, targetCompetitors },
  performance: { tested, successRate }
}
```

### 6. **analytics**
```javascript
{
  userId, date,
  metrics: {
    visibility: { score, mentions, platforms[] },
    sentiment: { overall, positive, neutral, negative },
    citations: { count, sources[] }
  },
  competitors: [{ competitorId, visibility, sentiment }]
}
```

### 7. **email_verifications**
```javascript
{
  userId, email, code,
  expiresAt, verified, attempts
}
```

### 8. **website_analyses**
```javascript
{
  userId, url, status: "pending"|"completed"|"failed",
  results: { metadata, topics, competitors, personas }
}
```

---

## 🔌 API Endpoints (Total: 40+)

### Authentication (8 endpoints)
```
POST   /api/auth/signup
POST   /api/auth/login
POST   /api/auth/google
POST   /api/auth/verify-email
POST   /api/auth/resend-verification
POST   /api/auth/forgot-password
POST   /api/auth/reset-password
POST   /api/auth/logout
```

### User Profile (3 endpoints)
```
GET    /api/user/profile
PUT    /api/user/profile
PUT    /api/user/preferences
```

### Onboarding (3 endpoints)
```
POST   /api/onboarding/analyze-website
GET    /api/onboarding/status
POST   /api/onboarding/complete
```

### Competitors (4 endpoints)
```
GET    /api/competitors
POST   /api/competitors
PUT    /api/competitors/:id
DELETE /api/competitors/:id
```

### Topics (4 endpoints)
```
GET    /api/topics
POST   /api/topics
PUT    /api/topics/:id
DELETE /api/topics/:id
```

### Personas (4 endpoints)
```
GET    /api/personas
POST   /api/personas
PUT    /api/personas/:id
DELETE /api/personas/:id
```

### Prompts (5 endpoints)
```
GET    /api/prompts
POST   /api/prompts
PUT    /api/prompts/:id
DELETE /api/prompts/:id
POST   /api/prompts/generate
```

### Analytics (5 endpoints)
```
GET    /api/analytics/visibility
GET    /api/analytics/sentiment
GET    /api/analytics/topics
GET    /api/analytics/citations
GET    /api/analytics/dashboard
```

### Testing (1 endpoint)
```
POST   /api/prompts/:id/test
```

---

## 🔑 Environment Variables

```env
# Server
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000

# Database
MONGODB_URI=mongodb+srv://sj:jfdEhSrbJLvmlxjM@cluster0.ecjtsql.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

# Email (SendGrid)
SENDGRID_API_KEY=your_key
FROM_EMAIL=noreply@rankly.ai

# Google OAuth
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

# OpenRouter (RECOMMENDED for multi-LLM platform)
OPENROUTER_API_KEY=your_openrouter_key
OPENROUTER_REFERER=https://rankly.ai
OPENROUTER_APP_NAME=Rankly

# Alternative: Direct LLM APIs (if not using OpenRouter)
# OPENAI_API_KEY=your_openai_key
# ANTHROPIC_API_KEY=your_anthropic_key
# GOOGLE_AI_API_KEY=your_google_ai_key

# Optional
SENTRY_DSN=your_sentry_dsn
```

---

## 📦 Key Dependencies

```bash
npm install express mongoose jsonwebtoken bcryptjs passport passport-google-oauth20 \
  passport-jwt express-validator cors dotenv helmet express-rate-limit \
  @sendgrid/mail openai cheerio axios

npm install -D typescript @types/node @types/express nodemon ts-node
```

**Note**: `openai` package works with both OpenAI API and OpenRouter. Since Rankly is a multi-LLM platform, **use OpenRouter** for unified access to GPT-4, Claude, Gemini, Perplexity, and 100+ other models with a single API. See `OPENROUTER_IMPLEMENTATION.md` for details.

---

## 🎯 MVP Priority

### Phase 1: Must Have (P0)
1. ✅ Email authentication
2. ✅ User profile storage
3. ✅ Competitor/Topic/Persona CRUD
4. ✅ Prompt CRUD
5. ✅ Basic data persistence

### Phase 2: Should Have (P1)
6. ✅ Email verification
7. ✅ Website analysis (basic)
8. ✅ AI prompt generation
9. ✅ Basic analytics

### Phase 3: Nice to Have (P2)
10. ✅ Google OAuth
11. ✅ Advanced analytics
12. ✅ Prompt testing

---

## 🔄 Frontend → Backend Mapping

| Frontend Feature | Frontend File | Backend Endpoint |
|------------------|---------------|------------------|
| **Email signup** | `Onboarding.tsx` Step 1 | `POST /api/auth/signup` |
| **Email verification** | `Onboarding.tsx` Step 2 | `POST /api/auth/verify-email` |
| **User info** | `Onboarding.tsx` Step 3 | `PUT /api/user/profile` |
| **Website URL** | `Onboarding.tsx` Step 4 | `POST /api/onboarding/analyze-website` |
| **Competitors** | `Onboarding.tsx` Step 5 | `GET/POST/PUT/DELETE /api/competitors` |
| **Topics** | `Onboarding.tsx` Step 6 | `GET/POST/PUT/DELETE /api/topics` |
| **Personas** | `Onboarding.tsx` Step 7 | `GET/POST/PUT/DELETE /api/personas` |
| **Region/Language** | `Onboarding.tsx` Step 8 | `PUT /api/user/preferences` |
| **Generate Prompts** | `Onboarding.tsx` Step 8 | `POST /api/prompts/generate` |
| **Dashboard Prompts** | `Dashboard.tsx` | `GET/POST/PUT/DELETE /api/prompts` |
| **Dashboard Analytics** | `Dashboard.tsx` tabs | `GET /api/analytics/*` |

---

## 🧪 Testing Checklist

### Unit Tests
- [ ] User authentication logic
- [ ] Password hashing/validation
- [ ] JWT token generation/verification
- [ ] Database models & schemas
- [ ] Input validation

### Integration Tests
- [ ] Auth endpoints (signup, login, verify)
- [ ] CRUD endpoints (competitors, topics, personas, prompts)
- [ ] Website analysis flow
- [ ] Prompt generation flow
- [ ] Analytics endpoints

### E2E Tests
- [ ] Complete onboarding flow (8 steps)
- [ ] Dashboard CRUD workflow
- [ ] Authentication flow with sessions

---

## 🚀 Development Timeline

| Week | Focus | Deliverables |
|------|-------|--------------|
| **1-2** | Foundation | Auth, DB setup, User APIs |
| **3-4** | Onboarding | Website analysis, CRUD APIs |
| **5-6** | Dashboard | Prompt management, Topics |
| **7-8** | AI Features | OpenAI integration, Generation |
| **9-10** | Polish | Testing, OAuth, Deploy |

**Total**: 8-10 weeks for complete MVP

---

## 📂 Suggested Backend Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── database.ts       # MongoDB connection
│   │   ├── passport.ts       # Passport strategies
│   │   └── env.ts            # Environment validation
│   ├── models/
│   │   ├── User.ts
│   │   ├── Competitor.ts
│   │   ├── Topic.ts
│   │   ├── Persona.ts
│   │   ├── Prompt.ts
│   │   ├── Analytics.ts
│   │   └── EmailVerification.ts
│   ├── controllers/
│   │   ├── authController.ts
│   │   ├── userController.ts
│   │   ├── onboardingController.ts
│   │   ├── competitorController.ts
│   │   ├── topicController.ts
│   │   ├── personaController.ts
│   │   ├── promptController.ts
│   │   └── analyticsController.ts
│   ├── routes/
│   │   ├── auth.ts
│   │   ├── user.ts
│   │   ├── onboarding.ts
│   │   ├── competitors.ts
│   │   ├── topics.ts
│   │   ├── personas.ts
│   │   ├── prompts.ts
│   │   └── analytics.ts
│   ├── middleware/
│   │   ├── auth.ts           # JWT verification
│   │   ├── validate.ts       # Input validation
│   │   ├── errorHandler.ts   # Error handling
│   │   └── rateLimiter.ts    # Rate limiting
│   ├── services/
│   │   ├── emailService.ts   # SendGrid
│   │   ├── aiService.ts      # OpenAI
│   │   ├── scrapeService.ts  # Web scraping
│   │   └── analyticsService.ts
│   ├── utils/
│   │   ├── logger.ts
│   │   ├── validators.ts
│   │   └── helpers.ts
│   └── index.ts              # App entry point
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── .env
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🔐 Security Checklist

- [ ] JWT tokens with expiration
- [ ] Password hashing (bcrypt, 12 rounds)
- [ ] Rate limiting on all endpoints
- [ ] Input validation & sanitization
- [ ] CORS whitelist (no wildcards)
- [ ] Helmet.js security headers
- [ ] HTTPS in production
- [ ] Never log sensitive data
- [ ] SQL injection prevention (Mongoose parameterized queries)
- [ ] XSS prevention
- [ ] CSRF tokens for state-changing operations

---

## 📊 Estimated API Response Times

| Endpoint Type | Expected Time | Notes |
|--------------|---------------|-------|
| Auth (login/signup) | < 500ms | Includes password hashing |
| CRUD operations | < 200ms | Database queries |
| Website analysis | 5-15 seconds | Depends on site size |
| Prompt generation | 3-10 seconds | OpenAI API calls |
| Analytics queries | < 1 second | With proper indexing |

---

## 💡 Pro Tips

1. **Use TypeScript**: Catch errors early, better autocomplete
2. **Index MongoDB fields**: userId, email, createdAt for faster queries
3. **Cache analytics**: Use Redis for frequently accessed data
4. **Queue heavy jobs**: Use Bull or BullMQ for website analysis
5. **Monitor API usage**: Track OpenAI costs per user
6. **Implement pagination**: For prompts and analytics endpoints
7. **Add logging**: Use Winston or Pino for structured logs
8. **Version your API**: Start with `/api/v1/...`

---

## 📞 Contact

For detailed requirements, see: `BACKEND_REQUIREMENTS.md`

For frontend code reference:
- Onboarding: `/src/pages/Onboarding.tsx`
- Dashboard: `/src/pages/Dashboard.tsx`
- Context: `/src/contexts/OnboardingContext.tsx`

---

**Ready to start building?** 🚀

1. Read full requirements: `BACKEND_REQUIREMENTS.md`
2. Setup MongoDB + Express
3. Implement authentication first
4. Build onboarding APIs
5. Add dashboard features
6. Integrate AI services
7. Test & deploy!


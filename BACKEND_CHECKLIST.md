# ✅ Backend Development Checklist

Use this checklist to track your backend development progress.

---

## 🏗️ Phase 1: Foundation (Week 1-2)

### Setup & Configuration
- [ ] Initialize Node.js project with TypeScript
- [ ] Install core dependencies (Express, Mongoose, etc.)
- [ ] Setup MongoDB connection
- [ ] Create `.env` file with all variables
- [ ] Setup folder structure
- [ ] Configure ESLint + Prettier
- [ ] Add `nodemon` for development

### Database Models
- [ ] Create `User` model
- [ ] Create `Competitor` model
- [ ] Create `Topic` model
- [ ] Create `Persona` model
- [ ] Create `Prompt` model
- [ ] Create `Analytics` model
- [ ] Create `EmailVerification` model
- [ ] Create `WebsiteAnalysis` model
- [ ] Add indexes for userId, email, createdAt

### Middleware
- [ ] Create JWT authentication middleware
- [ ] Create input validation middleware
- [ ] Create error handler middleware
- [ ] Create rate limiter middleware
- [ ] Add CORS configuration
- [ ] Add Helmet.js for security headers

### Authentication Core
- [ ] Implement password hashing (bcrypt)
- [ ] Implement JWT token generation
- [ ] Implement JWT token verification
- [ ] Create auth utility functions

---

## 🔐 Phase 2: Authentication (Week 2)

### Email Authentication
- [ ] `POST /api/auth/signup` - Create new user
- [ ] `POST /api/auth/login` - Login user
- [ ] `POST /api/auth/logout` - Logout user
- [ ] Password validation (min 8 chars, etc.)
- [ ] Email format validation
- [ ] Duplicate email check
- [ ] Return JWT token on signup/login

### Email Verification
- [ ] Setup SendGrid account
- [ ] Configure SendGrid API
- [ ] Generate 6-digit OTP
- [ ] `POST /api/auth/verify-email` - Verify OTP
- [ ] `POST /api/auth/resend-verification` - Resend OTP
- [ ] OTP expiration (10 minutes)
- [ ] Limit verification attempts (5 max)
- [ ] Send verification email template

### Password Reset
- [ ] `POST /api/auth/forgot-password` - Request reset
- [ ] Generate reset token
- [ ] Send reset email
- [ ] `POST /api/auth/reset-password` - Reset password
- [ ] Token expiration (1 hour)

### Testing
- [ ] Test signup flow
- [ ] Test login flow
- [ ] Test email verification
- [ ] Test password reset
- [ ] Test JWT token validation
- [ ] Test error cases (invalid email, wrong password, etc.)

---

## 👤 Phase 3: User Profile (Week 3)

### Profile APIs
- [ ] `GET /api/user/profile` - Get user profile
- [ ] `PUT /api/user/profile` - Update profile
- [ ] `PUT /api/user/preferences` - Update preferences
- [ ] Validate profile data
- [ ] Handle profile picture upload (optional)

### Frontend Integration
- [ ] Test with Postman/Thunder Client
- [ ] Update frontend `OnboardingContext.tsx` to call APIs
- [ ] Handle loading states
- [ ] Handle error messages
- [ ] Store JWT token in localStorage

### Testing
- [ ] Test profile retrieval
- [ ] Test profile updates
- [ ] Test preferences updates
- [ ] Test with/without auth token

---

## 🚀 Phase 4: Onboarding (Week 3-4)

### Website Analysis
- [ ] `POST /api/onboarding/analyze-website` - Analyze URL
- [ ] Install Cheerio for web scraping
- [ ] Extract website metadata (title, description)
- [ ] Extract main content
- [ ] Setup OpenAI API
- [ ] Use GPT-4 to analyze content
- [ ] Generate suggested competitors
- [ ] Generate suggested topics
- [ ] Generate suggested personas
- [ ] Return analysis results
- [ ] Handle errors (invalid URL, timeout, etc.)

### Competitors CRUD
- [ ] `GET /api/competitors` - Get all competitors
- [ ] `POST /api/competitors` - Add competitor
- [ ] `PUT /api/competitors/:id` - Update competitor
- [ ] `DELETE /api/competitors/:id` - Delete competitor
- [ ] Validate competitor URL
- [ ] Link to userId
- [ ] Handle selection state

### Topics CRUD
- [ ] `GET /api/topics` - Get all topics
- [ ] `POST /api/topics` - Add topic
- [ ] `PUT /api/topics/:id` - Update topic
- [ ] `DELETE /api/topics/:id` - Delete topic
- [ ] Track source (ai vs user)
- [ ] Handle selection state

### Personas CRUD
- [ ] `GET /api/personas` - Get all personas
- [ ] `POST /api/personas` - Add persona
- [ ] `PUT /api/personas/:id` - Update persona
- [ ] `DELETE /api/personas/:id` - Delete persona
- [ ] Track source (ai vs user)
- [ ] Handle selection state

### Onboarding Status
- [ ] `GET /api/onboarding/status` - Get progress
- [ ] `POST /api/onboarding/complete` - Mark complete
- [ ] Track current step
- [ ] Store all onboarding data

### Testing
- [ ] Test website analysis with real URLs
- [ ] Test competitor CRUD operations
- [ ] Test topic CRUD operations
- [ ] Test persona CRUD operations
- [ ] Test frontend integration for Steps 4-8

---

## 📝 Phase 5: Prompts (Week 5)

### Prompt CRUD
- [ ] `GET /api/prompts` - Get all prompts (with topics)
- [ ] `POST /api/prompts` - Create prompt
- [ ] `PUT /api/prompts/:id` - Update prompt
- [ ] `DELETE /api/prompts/:id` - Delete prompt
- [ ] Link prompts to topics
- [ ] Link prompts to userId
- [ ] Return in nested format (topics with prompts)

### Topic Management (Dashboard)
- [ ] Create topic for prompts
- [ ] Update topic name
- [ ] Delete topic (cascade delete prompts?)
- [ ] Track lastUpdated timestamp

### Prompt Generation
- [ ] `POST /api/prompts/generate` - Generate prompts
- [ ] Accept: competitorIds, topicIds, personaIds
- [ ] Fetch competitor/topic/persona data
- [ ] Build context for GPT-4
- [ ] Generate prompts using OpenAI
- [ ] Calculate fake metrics (for now):
  - Visibility: random 30-60
  - Citations: random 5-20
  - Opportunities: random 80-150
- [ ] Save generated prompts to database
- [ ] Return prompts + metrics

### Testing
- [ ] Test prompt CRUD
- [ ] Test topic management
- [ ] Test prompt generation
- [ ] Test frontend Dashboard integration
- [ ] Verify data persistence

---

## 📊 Phase 6: Analytics (Week 6-7)

### Basic Analytics APIs
- [ ] `GET /api/analytics/dashboard` - Overview metrics
- [ ] `GET /api/analytics/visibility` - Visibility data
- [ ] `GET /api/analytics/sentiment` - Sentiment data
- [ ] `GET /api/analytics/topics` - Topics data
- [ ] `GET /api/analytics/citations` - Citations data

### Analytics Data Generation (Fake for MVP)
- [ ] Generate visibility score (30-70 range)
- [ ] Generate platform breakdowns (ChatGPT, Claude, etc.)
- [ ] Generate sentiment score (0.5-0.9 range)
- [ ] Generate sentiment distribution
- [ ] Generate citation count (5-30 range)
- [ ] Generate time-series data (last 30 days)

### Real Analytics (Future)
- [ ] Setup prompt testing framework
- [ ] Test prompts against OpenAI
- [ ] Test prompts against Anthropic (optional)
- [ ] Store test results
- [ ] Calculate real visibility based on tests
- [ ] Analyze sentiment from responses
- [ ] Track citations in responses

### Testing
- [ ] Test all analytics endpoints
- [ ] Verify data format matches frontend
- [ ] Test with different date ranges
- [ ] Test frontend Dashboard analytics tabs

---

## 🔗 Phase 7: Google OAuth (Week 7)

### Google OAuth Setup
- [ ] Create Google Cloud project
- [ ] Enable Google+ API
- [ ] Create OAuth credentials
- [ ] Add authorized redirect URI
- [ ] Install `passport-google-oauth20`
- [ ] Configure Passport Google strategy

### OAuth Flow
- [ ] `GET /api/auth/google` - Initiate OAuth
- [ ] `GET /api/auth/google/callback` - Handle callback
- [ ] `POST /api/auth/google` - Frontend token exchange
- [ ] Create user if new
- [ ] Link to existing user if email matches
- [ ] Return JWT token
- [ ] Store Google profile data

### Testing
- [ ] Test Google OAuth flow
- [ ] Test with new Google account
- [ ] Test with existing email
- [ ] Test frontend integration

---

## 🧪 Phase 8: Testing & Polish (Week 8-9)

### Unit Tests
- [ ] Test authentication functions
- [ ] Test password hashing
- [ ] Test JWT generation/verification
- [ ] Test validation functions
- [ ] Test database models

### Integration Tests
- [ ] Test auth endpoints
- [ ] Test user endpoints
- [ ] Test onboarding endpoints
- [ ] Test competitor/topic/persona endpoints
- [ ] Test prompt endpoints
- [ ] Test analytics endpoints

### E2E Tests
- [ ] Test complete signup → onboarding → dashboard flow
- [ ] Test login → dashboard flow
- [ ] Test Google OAuth flow
- [ ] Test prompt generation flow

### Error Handling
- [ ] Handle database connection errors
- [ ] Handle OpenAI API errors
- [ ] Handle validation errors
- [ ] Handle authentication errors
- [ ] Return proper error codes (400, 401, 403, 404, 500)
- [ ] Return consistent error format

### Security Audit
- [ ] Review all endpoints for auth requirement
- [ ] Test rate limiting
- [ ] Test CORS configuration
- [ ] Review password security
- [ ] Check for SQL injection (N/A for MongoDB)
- [ ] Check for XSS vulnerabilities
- [ ] Review environment variables
- [ ] Test with/without auth tokens
- [ ] Test with invalid tokens

### Performance
- [ ] Add database indexes
- [ ] Optimize queries (use `.lean()` for read-only)
- [ ] Add caching for analytics (Redis - optional)
- [ ] Test with 100+ prompts
- [ ] Test with slow network

### Documentation
- [ ] Document all API endpoints
- [ ] Add JSDoc comments to functions
- [ ] Create Postman collection
- [ ] Update README with setup instructions
- [ ] Document environment variables

---

## 🚀 Phase 9: Deployment (Week 10)

### Deployment Setup
- [ ] Choose hosting (Railway, Render, DigitalOcean, AWS)
- [ ] Setup MongoDB Atlas (cloud database)
- [ ] Configure environment variables in hosting
- [ ] Setup CI/CD (GitHub Actions - optional)
- [ ] Configure CORS for production domain

### Pre-Deployment
- [ ] Set `NODE_ENV=production`
- [ ] Remove console.logs
- [ ] Enable HTTPS only
- [ ] Review security headers
- [ ] Test production build locally
- [ ] Backup development database

### Deployment
- [ ] Deploy backend to hosting
- [ ] Verify environment variables
- [ ] Test all endpoints
- [ ] Monitor logs for errors
- [ ] Setup error tracking (Sentry)

### Frontend Integration
- [ ] Update frontend `VITE_API_URL`
- [ ] Deploy frontend
- [ ] Test complete flow in production
- [ ] Verify CORS works
- [ ] Test on mobile devices

### Monitoring
- [ ] Setup uptime monitoring
- [ ] Setup error tracking
- [ ] Monitor API response times
- [ ] Monitor database performance
- [ ] Track OpenAI API usage/costs

---

## 📦 Optional Enhancements

### Advanced Features
- [ ] Implement refresh tokens
- [ ] Add WebSocket for real-time updates
- [ ] Implement file upload for profile pictures
- [ ] Add bulk operations for competitors/topics
- [ ] Implement prompt templates
- [ ] Add prompt favorites/bookmarks
- [ ] Implement prompt search
- [ ] Add export functionality (CSV, JSON)

### Performance
- [ ] Implement Redis caching
- [ ] Add database query caching
- [ ] Implement pagination for all list endpoints
- [ ] Add lazy loading support

### Analytics
- [ ] Implement real prompt testing
- [ ] Add competitor tracking
- [ ] Implement web scraping for competitors
- [ ] Add sentiment analysis
- [ ] Track citation sources

### Team Features
- [ ] Add team/workspace support
- [ ] Implement role-based permissions
- [ ] Add team member invitations
- [ ] Implement shared prompts

### Billing
- [ ] Integrate Stripe
- [ ] Implement subscription plans
- [ ] Add usage tracking
- [ ] Implement billing portal

---

## 🎯 MVP Completion Checklist

**Core Features** (Must have):
- [ ] User signup/login works
- [ ] Email verification works
- [ ] Onboarding flow saves data
- [ ] Website analysis returns results
- [ ] Competitors/Topics/Personas CRUD works
- [ ] Prompts CRUD works
- [ ] Dashboard shows prompts
- [ ] Analytics returns data (even if fake)

**Nice to Have**:
- [ ] Google OAuth works
- [ ] Real prompt generation with OpenAI
- [ ] Real website analysis
- [ ] Error handling is robust
- [ ] Tests pass
- [ ] Deployed to production

**Can Wait**:
- [ ] Real analytics tracking
- [ ] Prompt testing
- [ ] Team features
- [ ] Billing

---

## 📊 Progress Tracker

| Phase | Status | Completion % |
|-------|--------|--------------|
| Foundation | ⬜ Not Started | 0% |
| Authentication | ⬜ Not Started | 0% |
| User Profile | ⬜ Not Started | 0% |
| Onboarding | ⬜ Not Started | 0% |
| Prompts | ⬜ Not Started | 0% |
| Analytics | ⬜ Not Started | 0% |
| Google OAuth | ⬜ Not Started | 0% |
| Testing | ⬜ Not Started | 0% |
| Deployment | ⬜ Not Started | 0% |

**Overall Progress**: 0% complete

---

## 🎉 You're Ready!

When you complete all checkboxes, you'll have a fully functional backend for Rankly! 🚀

**Estimated Time**: 8-10 weeks for MVP

**Next Steps**:
1. Start with Phase 1 (Foundation)
2. Complete authentication before moving forward
3. Build features in order of priority
4. Test each phase before moving to next
5. Deploy when core features are complete

**Good luck!** 💪


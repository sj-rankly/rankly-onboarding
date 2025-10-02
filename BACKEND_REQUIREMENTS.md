# 🚀 Backend Requirements for Rankly

**Tech Stack**: Node.js + Express + MongoDB  
**Purpose**: This document lists all features that need backend implementation

---

## 📋 Table of Contents

1. [Authentication & User Management](#1-authentication--user-management)
2. [Onboarding Flow](#2-onboarding-flow)
3. [Dashboard - Prompts Management](#3-dashboard---prompts-management)
4. [Dashboard - Analytics](#4-dashboard---analytics)
5. [AI/LLM Integration](#5-aillm-integration)
6. [Database Schema](#6-database-schema)
7. [API Endpoints](#7-api-endpoints)
8. [Third-Party Integrations](#8-third-party-integrations)
9. [Priority Levels](#9-priority-levels)

---

## 1. Authentication & User Management

### 1.1 Email Authentication
**Status**: Frontend placeholder exists  
**Requirements**:
- User signup with email + password
- Email validation
- Password hashing (bcrypt)
- JWT token generation
- Session management
- Password reset flow

**Frontend Integration**:
- Email input: `src/pages/Onboarding.tsx` (Step 1)
- User info: firstName, lastName stored in `OnboardingContext`

### 1.2 Google OAuth
**Status**: Frontend button exists (console.log only)  
**Requirements**:
- Google OAuth 2.0 integration
- Create user from Google profile
- Link existing accounts
- Handle OAuth callbacks
- Store Google tokens (optional for future API access)

**Frontend Integration**:
- Google login button: `src/pages/Onboarding.tsx` (Step 1, line ~677)
- Currently calls `handleGoogleLogin()` which just skips to Step 4

### 1.3 Email Verification
**Status**: Frontend has 6-digit code input  
**Requirements**:
- Generate 6-digit OTP
- Send verification email (SendGrid, Mailgun, or Resend)
- Validate OTP (with expiration)
- Mark email as verified
- Resend OTP functionality

**Frontend Integration**:
- Verification step: `src/pages/Onboarding.tsx` (Step 2)
- 6-digit code input fields

### 1.4 User Profile Management
**Requirements**:
- Store user data:
  - Email
  - First name
  - Last name
  - Company name
  - Website URL
  - Profile picture (optional)
  - Created/updated timestamps
- Update profile API
- Get profile API

**Frontend Integration**:
- User data stored in: `src/contexts/OnboardingContext.tsx`

---

## 2. Onboarding Flow

### 2.1 Website Analysis
**Status**: Frontend has URL input + loading animation  
**Requirements**:
- Accept website URL
- Crawl website content
- Extract metadata (title, description, keywords)
- Analyze website structure
- Identify main topics
- Generate initial competitors list (AI/scraping)
- Generate initial personas (AI)
- Return analysis results

**Frontend Integration**:
- URL input: `src/pages/Onboarding.tsx` (Step 4, line ~878)
- Loading animation: 2.5 seconds timeout currently
- Expected response: competitors, topics, personas

**Backend Flow**:
```
POST /api/analysis/website
Body: { url: "https://example.com" }
Response: {
  competitors: [...],
  topics: [...],
  personas: [...],
  metadata: {...}
}
```

### 2.2 Competitor Management
**Status**: Frontend has full CRUD UI  
**Requirements**:
- Store competitors list per user
- CRUD operations:
  - Add competitor (name + URL)
  - Update competitor URL
  - Delete competitor
  - Toggle selection
  - Get all competitors
- Validate competitor URLs
- Track which competitors are selected for analysis

**Frontend Integration**:
- Competitor management: `src/pages/Onboarding.tsx` (Step 5, lines 290-398)
- Functions: `addCompetitor()`, `removeCompetitor()`, `toggleCompetitorSelection()`, `updateCompetitorUrl()`

**Data Model**:
```javascript
{
  id: string,
  userId: string,
  name: string,
  url: string,
  selected: boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### 2.3 Topic Management
**Status**: Frontend has selection UI  
**Requirements**:
- Store topics per user
- CRUD operations:
  - Add custom topic
  - Remove topic
  - Toggle selection
  - Get all topics
- AI-generated topics from website analysis
- User-created custom topics

**Frontend Integration**:
- Topic management: `src/pages/Onboarding.tsx` (Step 6, lines 400-569)
- Functions: `addTopic()`, `removeTopic()`, `toggleTopicSelection()`

**Data Model**:
```javascript
{
  id: string,
  userId: string,
  name: string,
  selected: boolean,
  source: "ai" | "user", // How it was created
  createdAt: Date
}
```

### 2.4 Persona Management
**Status**: Frontend has CRUD UI  
**Requirements**:
- Store user personas per user
- CRUD operations:
  - Add persona (type + description)
  - Update persona description
  - Delete persona
  - Toggle selection
  - Get all personas
- AI-generated personas from website analysis
- User-created custom personas

**Frontend Integration**:
- Persona management: `src/pages/Onboarding.tsx` (Step 7, lines 571-669)
- Functions: `addPersona()`, `removePersona()`, `togglePersonaSelection()`, `updatePersonaDescription()`

**Data Model**:
```javascript
{
  id: string,
  userId: string,
  type: string, // e.g., "Marketer", "Developer", "Executive"
  description: string,
  selected: boolean,
  source: "ai" | "user",
  createdAt: Date,
  updatedAt: Date
}
```

### 2.5 Region & Language Settings
**Status**: Frontend has dropdowns (currently fixed to Global/English)  
**Requirements**:
- Store user preferences:
  - Region (Global, US, EU, APAC, etc.)
  - Language (English, Spanish, French, etc.)
- Update preferences API
- Return available regions/languages

**Frontend Integration**:
- Settings: `src/pages/Onboarding.tsx` (Step 8, lines 436-669)
- Currently hardcoded to "Global" and "English"

### 2.6 Prompt Generation
**Status**: Frontend shows loading + fake metrics  
**Requirements**:
- Generate AI prompts based on:
  - Selected competitors
  - Selected topics
  - Selected personas
  - Region & language
  - Website content
- Return generated prompts organized by topic
- Calculate metrics:
  - Visibility score
  - Citation opportunities
  - Total opportunities
- Store prompts in database

**Frontend Integration**:
- Generation trigger: `src/pages/Onboarding.tsx` (Step 8, `handleGeneratePrompts()`)
- Loading state: 4 seconds timeout
- Metrics display: visibility (45), citations (12), opportunities (127)

**Backend Flow**:
```
POST /api/prompts/generate
Body: {
  competitorIds: [...],
  topicIds: [...],
  personaIds: [...],
  region: "Global",
  language: "English"
}
Response: {
  prompts: [...],
  metrics: {
    visibility: 45,
    citations: 12,
    opportunities: 127
  }
}
```

---

## 3. Dashboard - Prompts Management

### 3.1 Topic Management (Dashboard)
**Status**: Frontend has collapsible UI  
**Requirements**:
- Get all topics with prompts
- Create new topic
- Update topic name
- Delete topic
- Track last updated timestamp

**Frontend Integration**:
- Dashboard prompts tab: `src/pages/Dashboard.tsx` (lines 157-188)
- Current data structure includes: id, name, lastUpdated, prompts[]

**Data Model**:
```javascript
{
  id: number,
  userId: string,
  name: string,
  lastUpdated: Date,
  createdAt: Date,
  promptCount: number
}
```

### 3.2 Prompt CRUD Operations
**Status**: Frontend has full CRUD UI  
**Requirements**:
- Create prompt within topic
- Read all prompts for a topic
- Update prompt text
- Delete prompt
- Track creation timestamp
- Search/filter prompts

**Frontend Integration**:
- Prompt management: `src/pages/Dashboard.tsx`
- Functions: `handleAddPrompt()`, `handleUpdatePrompt()`, `handleDeletePrompt()`

**Data Model**:
```javascript
{
  id: number,
  topicId: number,
  userId: string,
  text: string,
  title: string,
  createdAt: Date,
  updatedAt: Date,
  status: "active" | "archived"
}
```

### 3.3 Prompt Chaining/Relationships
**Status**: Frontend has visualization UI  
**Requirements**:
- Define relationships between prompts
- Store prompt chains/workflows
- Visualize prompt dependencies
- Execute prompt chains
- Track chain performance

**Frontend Integration**:
- Visualization: `src/pages/Dashboard.tsx` (PromptChaining component, lines 114-152)
- Currently shows static example

---

## 4. Dashboard - Analytics

### 4.1 Visibility Analytics
**Status**: Placeholder tab exists  
**Requirements**:
- Track brand visibility across AI platforms:
  - ChatGPT
  - Claude
  - Gemini
  - Perplexity
  - Others
- Calculate visibility scores
- Compare with competitors
- Show trends over time
- Platform-specific breakdowns

**Frontend Integration**:
- Tab: `src/pages/Dashboard.tsx` (Visibility tab)
- Currently shows placeholder

**Metrics to Track**:
- Brand mentions count
- Mention position (ranking)
- Visibility percentage
- Competitor comparison
- Time-series data

### 4.2 Sentiment Analysis
**Status**: Placeholder tab exists  
**Requirements**:
- Analyze sentiment of AI responses about brand
- Track sentiment over time
- Compare sentiment with competitors
- Identify negative sentiment triggers
- Show sentiment breakdown (positive/neutral/negative)

**Frontend Integration**:
- Tab: `src/pages/Dashboard.tsx` (Sentiment tab)

**Metrics to Track**:
- Overall sentiment score (-1 to 1)
- Sentiment distribution
- Sentiment by topic
- Sentiment by platform
- Sentiment trends

### 4.3 Topics Tracking
**Status**: Placeholder tab exists  
**Requirements**:
- Track which topics mention the brand
- Identify trending topics
- Topic performance over time
- Topic-competitor comparison
- Suggest new topics

**Frontend Integration**:
- Tab: `src/pages/Dashboard.tsx` (Topics tab)

### 4.4 Citations Tracking
**Status**: Placeholder tab exists  
**Requirements**:
- Track citations/references to brand
- Source of citations (websites, papers, etc.)
- Citation quality score
- Track citation changes over time
- Alert on new citations

**Frontend Integration**:
- Tab: `src/pages/Dashboard.tsx` (Citations tab)

---

## 5. AI/LLM Integration

### 5.1 Prompt Testing
**Requirements**:
- Test prompts against multiple LLMs
- Store results
- Compare responses
- Track which prompts work best
- A/B testing framework

**LLM Providers**:
- OpenAI (GPT-4, GPT-3.5)
- Anthropic (Claude)
- Google (Gemini)
- Others as needed

### 5.2 Website Analysis AI
**Requirements**:
- Use LLM to analyze website content
- Extract key information
- Generate topics
- Identify target personas
- Suggest competitors

**Use Case**: During onboarding Step 4 website URL analysis

### 5.3 Prompt Generation AI
**Requirements**:
- Generate relevant prompts based on:
  - Company/website info
  - Target personas
  - Topics
  - Competitors
- Optimize prompts for different LLMs
- Multi-language support

### 5.4 Content Recommendations
**Requirements**:
- Analyze gaps in visibility
- Suggest content improvements
- Recommend keywords/topics
- Generate content briefs

---

## 6. Database Schema

### 6.1 Users Collection
```javascript
{
  _id: ObjectId,
  email: String (unique, indexed),
  password: String (hashed),
  googleId: String (optional, indexed),
  firstName: String,
  lastName: String,
  companyName: String,
  websiteUrl: String,
  profilePicture: String (URL),
  emailVerified: Boolean,
  preferences: {
    region: String,
    language: String,
    theme: String // "light" or "dark"
  },
  subscription: {
    plan: String, // "free", "pro", "enterprise"
    status: String,
    expiresAt: Date
  },
  createdAt: Date,
  updatedAt: Date,
  lastLoginAt: Date
}
```

### 6.2 Competitors Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (indexed),
  name: String,
  url: String,
  selected: Boolean,
  metadata: {
    description: String,
    industry: String,
    size: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

### 6.3 Topics Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (indexed),
  name: String,
  selected: Boolean,
  source: String, // "ai" or "user"
  keywords: [String],
  promptCount: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### 6.4 Personas Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (indexed),
  type: String,
  description: String,
  selected: Boolean,
  source: String, // "ai" or "user"
  characteristics: {
    role: String,
    goals: [String],
    painPoints: [String]
  },
  createdAt: Date,
  updatedAt: Date
}
```

### 6.5 Prompts Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (indexed),
  topicId: ObjectId (indexed),
  title: String,
  text: String,
  status: String, // "active", "archived", "draft"
  metadata: {
    targetPersonas: [ObjectId],
    targetCompetitors: [ObjectId],
    language: String,
    region: String
  },
  performance: {
    tested: Boolean,
    successRate: Number,
    lastTestedAt: Date
  },
  relationships: [ObjectId], // Related prompt IDs
  createdAt: Date,
  updatedAt: Date
}
```

### 6.6 Analytics Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (indexed),
  date: Date (indexed),
  metrics: {
    visibility: {
      score: Number,
      mentions: Number,
      platforms: [{
        name: String,
        mentions: Number,
        score: Number
      }]
    },
    sentiment: {
      overall: Number,
      positive: Number,
      neutral: Number,
      negative: Number
    },
    citations: {
      count: Number,
      sources: [{
        url: String,
        title: String,
        quality: Number
      }]
    }
  },
  competitors: [{
    competitorId: ObjectId,
    visibility: Number,
    sentiment: Number
  }],
  createdAt: Date
}
```

### 6.7 Email Verifications Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (indexed),
  email: String,
  code: String,
  expiresAt: Date (indexed),
  verified: Boolean,
  attempts: Number,
  createdAt: Date
}
```

### 6.8 Website Analysis Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (indexed),
  url: String,
  status: String, // "pending", "completed", "failed"
  results: {
    metadata: Object,
    topics: [String],
    competitors: [Object],
    personas: [Object],
    keywords: [String]
  },
  error: String,
  analyzedAt: Date,
  createdAt: Date
}
```

---

## 7. API Endpoints

### 7.1 Authentication Endpoints

#### POST `/api/auth/signup`
**Body**:
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "firstName": "John",
  "lastName": "Doe",
  "companyName": "Acme Inc"
}
```
**Response**:
```json
{
  "success": true,
  "user": { "id": "...", "email": "..." },
  "token": "jwt_token",
  "message": "Verification email sent"
}
```

#### POST `/api/auth/login`
**Body**:
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```
**Response**:
```json
{
  "success": true,
  "user": { "id": "...", "email": "...", "firstName": "..." },
  "token": "jwt_token"
}
```

#### POST `/api/auth/google`
**Body**:
```json
{
  "googleToken": "google_oauth_token"
}
```
**Response**:
```json
{
  "success": true,
  "user": { "id": "...", "email": "..." },
  "token": "jwt_token",
  "isNewUser": true
}
```

#### POST `/api/auth/verify-email`
**Body**:
```json
{
  "email": "user@example.com",
  "code": "123456"
}
```
**Response**:
```json
{
  "success": true,
  "message": "Email verified successfully"
}
```

#### POST `/api/auth/resend-verification`
**Body**:
```json
{
  "email": "user@example.com"
}
```

#### POST `/api/auth/forgot-password`
**Body**:
```json
{
  "email": "user@example.com"
}
```

#### POST `/api/auth/reset-password`
**Body**:
```json
{
  "token": "reset_token",
  "newPassword": "newPassword123"
}
```

---

### 7.2 User Profile Endpoints

#### GET `/api/user/profile`
**Headers**: `Authorization: Bearer <token>`  
**Response**:
```json
{
  "id": "...",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "companyName": "Acme Inc",
  "websiteUrl": "https://acme.com",
  "preferences": { "region": "Global", "language": "English" }
}
```

#### PUT `/api/user/profile`
**Headers**: `Authorization: Bearer <token>`  
**Body**:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "companyName": "Acme Inc",
  "websiteUrl": "https://acme.com"
}
```

#### PUT `/api/user/preferences`
**Headers**: `Authorization: Bearer <token>`  
**Body**:
```json
{
  "region": "US",
  "language": "English",
  "theme": "dark"
}
```

---

### 7.3 Onboarding Endpoints

#### POST `/api/onboarding/analyze-website`
**Headers**: `Authorization: Bearer <token>`  
**Body**:
```json
{
  "url": "https://example.com"
}
```
**Response**:
```json
{
  "success": true,
  "analysisId": "...",
  "competitors": [
    { "name": "Competitor 1", "url": "https://comp1.com" }
  ],
  "topics": [
    { "name": "Topic 1" }
  ],
  "personas": [
    { "type": "Developer", "description": "..." }
  ],
  "metadata": {
    "title": "...",
    "description": "..."
  }
}
```

#### GET `/api/onboarding/status`
**Headers**: `Authorization: Bearer <token>`  
**Response**:
```json
{
  "completed": false,
  "currentStep": 5,
  "data": {
    "email": "...",
    "firstName": "...",
    "websiteUrl": "...",
    "competitors": [...],
    "topics": [...],
    "personas": [...]
  }
}
```

#### POST `/api/onboarding/complete`
**Headers**: `Authorization: Bearer <token>`  
**Body**:
```json
{
  "selectedCompetitors": ["id1", "id2"],
  "selectedTopics": ["id1", "id2"],
  "selectedPersonas": ["id1", "id2"],
  "region": "Global",
  "language": "English"
}
```

---

### 7.4 Competitor Endpoints

#### GET `/api/competitors`
**Headers**: `Authorization: Bearer <token>`  
**Response**:
```json
{
  "competitors": [
    {
      "id": "...",
      "name": "Competitor 1",
      "url": "https://comp1.com",
      "selected": true
    }
  ]
}
```

#### POST `/api/competitors`
**Headers**: `Authorization: Bearer <token>`  
**Body**:
```json
{
  "name": "New Competitor",
  "url": "https://newcomp.com"
}
```

#### PUT `/api/competitors/:id`
**Headers**: `Authorization: Bearer <token>`  
**Body**:
```json
{
  "name": "Updated Name",
  "url": "https://updated.com",
  "selected": true
}
```

#### DELETE `/api/competitors/:id`
**Headers**: `Authorization: Bearer <token>`

---

### 7.5 Topic Endpoints

#### GET `/api/topics`
**Headers**: `Authorization: Bearer <token>`

#### POST `/api/topics`
**Headers**: `Authorization: Bearer <token>`  
**Body**:
```json
{
  "name": "New Topic"
}
```

#### PUT `/api/topics/:id`
**Body**:
```json
{
  "name": "Updated Topic",
  "selected": true
}
```

#### DELETE `/api/topics/:id`

---

### 7.6 Persona Endpoints

#### GET `/api/personas`
**Headers**: `Authorization: Bearer <token>`

#### POST `/api/personas`
**Headers**: `Authorization: Bearer <token>`  
**Body**:
```json
{
  "type": "Marketing Manager",
  "description": "..."
}
```

#### PUT `/api/personas/:id`
**Body**:
```json
{
  "type": "Updated Type",
  "description": "Updated description",
  "selected": true
}
```

#### DELETE `/api/personas/:id`

---

### 7.7 Prompt Endpoints

#### GET `/api/prompts`
**Headers**: `Authorization: Bearer <token>`  
**Query**: `?topicId=...`  
**Response**:
```json
{
  "topics": [
    {
      "id": "...",
      "name": "Brand Visibility",
      "lastUpdated": "2025-10-02T...",
      "prompts": [
        {
          "id": "...",
          "text": "Analyze brand visibility...",
          "title": "Brand Analysis",
          "createdAt": "..."
        }
      ]
    }
  ]
}
```

#### POST `/api/prompts`
**Headers**: `Authorization: Bearer <token>`  
**Body**:
```json
{
  "topicId": "...",
  "text": "New prompt text",
  "title": "New Prompt"
}
```

#### PUT `/api/prompts/:id`
**Body**:
```json
{
  "text": "Updated prompt text",
  "title": "Updated title"
}
```

#### DELETE `/api/prompts/:id`

#### POST `/api/prompts/generate`
**Headers**: `Authorization: Bearer <token>`  
**Body**:
```json
{
  "competitorIds": ["id1", "id2"],
  "topicIds": ["id1", "id2"],
  "personaIds": ["id1", "id2"],
  "region": "Global",
  "language": "English"
}
```
**Response**:
```json
{
  "success": true,
  "prompts": [
    {
      "topicId": "...",
      "text": "Generated prompt...",
      "title": "..."
    }
  ],
  "metrics": {
    "visibility": 45,
    "citations": 12,
    "opportunities": 127
  }
}
```

---

### 7.8 Analytics Endpoints

#### GET `/api/analytics/visibility`
**Headers**: `Authorization: Bearer <token>`  
**Query**: `?from=2025-01-01&to=2025-10-02`  
**Response**:
```json
{
  "score": 45,
  "trend": "up",
  "platforms": [
    { "name": "ChatGPT", "mentions": 15, "score": 50 },
    { "name": "Claude", "mentions": 10, "score": 40 }
  ],
  "timeSeries": [...]
}
```

#### GET `/api/analytics/sentiment`
**Headers**: `Authorization: Bearer <token>`  
**Query**: `?from=2025-01-01&to=2025-10-02`

#### GET `/api/analytics/topics`
**Headers**: `Authorization: Bearer <token>`

#### GET `/api/analytics/citations`
**Headers**: `Authorization: Bearer <token>`

#### GET `/api/analytics/dashboard`
**Headers**: `Authorization: Bearer <token>`  
**Response**:
```json
{
  "visibility": { "score": 45, "trend": "up" },
  "sentiment": { "score": 0.7, "trend": "stable" },
  "citations": { "count": 12, "trend": "up" },
  "opportunities": 127
}
```

---

### 7.9 Testing Endpoints

#### POST `/api/prompts/:id/test`
**Headers**: `Authorization: Bearer <token>`  
**Body**:
```json
{
  "platforms": ["openai", "anthropic", "google"]
}
```
**Response**:
```json
{
  "results": [
    {
      "platform": "openai",
      "response": "...",
      "brandMentioned": true,
      "sentiment": 0.8
    }
  ]
}
```

---

## 8. Third-Party Integrations

### 8.1 Email Service
**Purpose**: Send verification emails, password resets  
**Options**:
- SendGrid (recommended)
- Mailgun
- Resend
- AWS SES

**Integration Points**:
- Email verification (onboarding step 2)
- Password reset
- Weekly reports (future)

### 8.2 LLM APIs
**Purpose**: Generate prompts, analyze websites, test prompts  
**Required**:
- OpenAI API (GPT-4, GPT-3.5)
- Anthropic API (Claude) - optional
- Google AI API (Gemini) - optional

**Usage**:
- Website analysis
- Prompt generation
- Prompt testing
- Content recommendations

### 8.3 OAuth Providers
**Purpose**: Social login  
**Required**:
- Google OAuth 2.0

**Future**:
- GitHub OAuth
- Microsoft OAuth

### 8.4 Web Scraping
**Purpose**: Analyze competitor websites  
**Options**:
- Puppeteer
- Cheerio
- Playwright
- ScrapingBee API (for JS-heavy sites)

### 8.5 Analytics/Monitoring
**Purpose**: Track API usage, errors  
**Options**:
- Sentry (error tracking)
- LogRocket (session replay)
- Mixpanel (product analytics)
- PostHog (open-source analytics)

---

## 9. Priority Levels

### 🔴 **P0 - Critical** (Must have for MVP)

1. **Authentication**
   - Email signup/login ✓
   - JWT tokens ✓
   - Session management ✓

2. **User Profile**
   - Create/update profile ✓
   - Store basic info ✓

3. **Onboarding Data Storage**
   - Save competitors ✓
   - Save topics ✓
   - Save personas ✓

4. **Basic Prompt CRUD**
   - Create prompts ✓
   - Read prompts ✓
   - Update prompts ✓
   - Delete prompts ✓

---

### 🟡 **P1 - High** (Important for launch)

5. **Email Verification**
   - Send OTP ✓
   - Verify OTP ✓

6. **Website Analysis**
   - Basic URL crawling ✓
   - Extract metadata ✓

7. **AI Prompt Generation**
   - Generate prompts based on inputs ✓
   - Basic metrics calculation ✓

8. **Dashboard Analytics**
   - Basic visibility metrics ✓
   - Basic sentiment analysis ✓

---

### 🟢 **P2 - Medium** (Nice to have)

9. **Google OAuth**
   - Social login ✓

10. **Advanced Analytics**
    - Time-series data ✓
    - Competitor comparison ✓
    - Citations tracking ✓

11. **Prompt Testing**
    - Test against LLMs ✓
    - Store results ✓

12. **Content Recommendations**
    - AI suggestions ✓

---

### 🔵 **P3 - Low** (Future enhancements)

13. **Prompt Chaining**
    - Define relationships ✓
    - Execute chains ✓

14. **Multi-language Support**
    - Multiple regions ✓
    - Multiple languages ✓

15. **Team Features**
    - Multiple users per account ✓
    - Role-based permissions ✓

16. **API Rate Limiting**
    - Prevent abuse ✓

17. **Webhooks**
    - Notify external services ✓

---

## 10. Environment Variables

Create `.env` file with:

```env
# Server
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000

# Database
MONGODB_URI=mongodb://localhost:27017/rankly

# JWT
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d

# Email Service (SendGrid example)
EMAIL_SERVICE=sendgrid
SENDGRID_API_KEY=your_sendgrid_api_key
FROM_EMAIL=noreply@rankly.ai

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

# OpenAI
OPENAI_API_KEY=your_openai_api_key
OPENAI_ORG_ID=your_org_id (optional)

# Anthropic (optional)
ANTHROPIC_API_KEY=your_anthropic_api_key

# Google AI (optional)
GOOGLE_AI_API_KEY=your_google_ai_api_key

# Sentry (optional)
SENTRY_DSN=your_sentry_dsn

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000  # 15 minutes
RATE_LIMIT_MAX_REQUESTS=100
```

---

## 11. Suggested Tech Stack

### Core Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript (recommended) or JavaScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + Passport.js

### Key Libraries
```json
{
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^8.0.0",
    "jsonwebtoken": "^9.0.2",
    "bcryptjs": "^2.4.3",
    "passport": "^0.7.0",
    "passport-google-oauth20": "^2.0.0",
    "passport-jwt": "^4.0.1",
    "express-validator": "^7.0.1",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "helmet": "^7.1.0",
    "express-rate-limit": "^7.1.5",
    "@sendgrid/mail": "^8.1.0",
    "openai": "^4.20.0",
    "cheerio": "^1.0.0-rc.12",
    "axios": "^1.6.2"
  },
  "devDependencies": {
    "@types/node": "^20.10.0",
    "@types/express": "^4.17.21",
    "typescript": "^5.3.3",
    "nodemon": "^3.0.2",
    "ts-node": "^10.9.2"
  }
}
```

---

## 12. API Security

### Required Security Measures

1. **Authentication**
   - JWT tokens with expiration
   - Refresh token rotation
   - Secure password hashing (bcrypt, 12 rounds)

2. **Rate Limiting**
   - Global: 100 requests per 15 minutes
   - Auth endpoints: 5 requests per 15 minutes
   - AI endpoints: 10 requests per hour

3. **Input Validation**
   - Validate all inputs with express-validator
   - Sanitize HTML/scripts
   - URL validation for competitors/website

4. **CORS**
   - Whitelist frontend domain only
   - No wildcard origins in production

5. **Headers**
   - Helmet.js for security headers
   - HTTPS only in production

6. **Data Privacy**
   - Never log sensitive data (passwords, tokens)
   - Encrypt sensitive fields in DB
   - GDPR compliance for EU users

---

## 13. Next Steps

### Phase 1: Foundation (Week 1-2)
- [ ] Setup Express + MongoDB
- [ ] Implement authentication (email + JWT)
- [ ] Create user profile APIs
- [ ] Setup database schemas

### Phase 2: Onboarding (Week 3-4)
- [ ] Implement email verification
- [ ] Create competitor/topic/persona CRUD APIs
- [ ] Basic website analysis (metadata extraction)
- [ ] Save onboarding data to DB

### Phase 3: Dashboard Core (Week 5-6)
- [ ] Prompt CRUD APIs
- [ ] Topic management APIs
- [ ] Basic analytics endpoints
- [ ] Connect frontend to backend

### Phase 4: AI Integration (Week 7-8)
- [ ] OpenAI integration
- [ ] Prompt generation logic
- [ ] Website content analysis
- [ ] Metrics calculation

### Phase 5: Polish & Launch (Week 9-10)
- [ ] Google OAuth
- [ ] Advanced analytics
- [ ] Testing & bug fixes
- [ ] Deployment

---

## 14. Testing Requirements

### Unit Tests
- Authentication logic
- Database models
- Validation functions
- Utility functions

### Integration Tests
- API endpoints
- Database operations
- Third-party integrations

### E2E Tests
- Complete onboarding flow
- Prompt management workflow
- Authentication flow

**Tools**: Jest, Supertest, MongoDB Memory Server

---

## 📞 Questions?

For questions or clarifications about any feature, refer to:
- Frontend code: `/src/pages/Onboarding.tsx`, `/src/pages/Dashboard.tsx`
- Context: `/src/contexts/OnboardingContext.tsx`
- Layout: `/src/components/Layout.tsx`

---

**Total Estimated Development Time**: 8-10 weeks for full MVP

**Critical Path**: Authentication → Profile → Onboarding Data → Prompts → Analytics


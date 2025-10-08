# Rankly Backend API

**Multi-LLM GEO/AEO Platform Backend**

## 🚀 Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js with TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + Passport.js
- **LLM Integration**: OpenRouter (unified multi-LLM API)
- **Email**: SendGrid
- **Security**: Helmet, CORS, Rate Limiting

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/           # Configuration files
│   │   ├── env.ts       # Environment variables
│   │   ├── database.ts  # MongoDB connection
│   │   └── app.ts       # Express app setup
│   ├── models/          # Mongoose models
│   ├── controllers/     # Route controllers
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   ├── services/        # Business logic
│   ├── utils/           # Utility functions
│   ├── types/           # TypeScript types
│   └── index.ts         # Server entry point
├── dist/                # Compiled JavaScript (gitignored)
├── package.json
├── tsconfig.json
└── README.md
```

## 🛠️ Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy `env.example` to `.env` and fill in your values:

```bash
cp env.example .env
```

Required variables:
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT tokens
- `OPENROUTER_API_KEY` - OpenRouter API key (for LLM features)

### 3. Start MongoDB

Make sure MongoDB is running:

```bash
# macOS (Homebrew)
brew services start mongodb-community

# Linux (systemd)
sudo systemctl start mongod

# Or use MongoDB Atlas (cloud)
```

### 4. Run Development Server

```bash
npm run dev
```

The server will start at `http://localhost:5000`

## 📡 Available Endpoints

### Health Check
```
GET /health
```

### API Info
```
GET /api
```

More endpoints will be added as we build features!

## 🔧 Development

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Type Checking

TypeScript will check types automatically during development.

## 🧪 Testing

```bash
npm test
```

(Tests coming soon!)

## 📖 Development Progress

Follow `BACKEND_CHECKLIST.md` in the root directory to track development progress.

### Phase 1: Foundation ✅
- [x] Project setup
- [x] TypeScript configuration
- [x] Express app setup
- [x] MongoDB connection
- [x] Environment configuration
- [x] Security middleware

### Phase 2: Authentication (In Progress)
- [ ] User model
- [ ] JWT authentication
- [ ] Email verification
- [ ] Password hashing
- [ ] Auth routes

## 🔐 Security Features

- **Helmet**: Security headers
- **CORS**: Configurable origins
- **Rate Limiting**: Prevent abuse
- **JWT**: Secure authentication
- **Input Validation**: Express validator
- **Password Hashing**: bcrypt

## 🌐 Environment Variables

See `env.example` for all available configuration options.

Key configurations:
- Server: PORT, NODE_ENV
- Database: MONGODB_URI
- Auth: JWT_SECRET, JWT_EXPIRES_IN
- Email: SENDGRID_API_KEY
- LLM: OPENROUTER_API_KEY
- OAuth: GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET

## 📚 Documentation

For complete backend specifications, see:
- `BACKEND_REQUIREMENTS.md` - Complete API specs
- `BACKEND_FEATURES_SUMMARY.md` - Quick reference
- `OPENROUTER_IMPLEMENTATION.md` - Multi-LLM integration
- `BACKEND_CHECKLIST.md` - Development tracker

## 🤝 Contributing

This is a modular, clean-code architecture. When adding new features:

1. Create models in `src/models/`
2. Create services in `src/services/`
3. Create controllers in `src/controllers/`
4. Create routes in `src/routes/`
5. Add route to `src/config/app.ts`
6. Update this README

## 📄 License

MIT

## 👨‍💻 Development Status

**Current Phase**: Phase 1 - Foundation ✅  
**Next Phase**: Phase 2 - Authentication  
**Timeline**: 8-10 weeks for MVP

---

Built with ❤️  for Rankly



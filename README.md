# Rankly - Get More Traffic from LLMs

A modern onboarding and analytics platform built with React, TypeScript, and shadcn/ui design system. Rankly helps you optimize your brand visibility across AI-powered platforms like ChatGPT, Claude, Gemini, and Perplexity.

## 🚀 Features

### Onboarding Flow
- **Multi-step User Registration**: Email, verification, user info collection
- **Google OAuth Integration**: Quick signup option
- **Website Analysis**: Automated competitor, topic, and persona discovery
- **Interactive Configuration**: Manage competitors, topics, and user personas
- **Progress Tracking**: Visual feedback throughout the setup process

### Dashboard
- **Prompt Management**: Organize and manage AI prompts by topic
- **Prompt Chaining Visualization**: See how prompts relate to each other
- **Analytics Tabs**: Visibility, Sentiment, Topics, Citations (coming soon)
- **Collapsible Topics**: Hierarchical organization of prompts
- **Real-time Updates**: Add, edit, and delete prompts instantly

### UI/UX
- **Dark/Light Theme**: Toggle between themes with persistent storage
- **Responsive Design**: Works on all screen sizes
- **Modern Components**: shadcn/ui with Radix UI primitives
- **Smooth Animations**: Tailwind CSS animations throughout

## 📦 Tech Stack

### Core
- **React 18**: Modern React with hooks and concurrent features
- **TypeScript**: Full type safety across the application
- **Vite**: Lightning-fast dev server and build tool
- **React Router**: Client-side routing between pages

### UI & Styling
- **shadcn/ui**: High-quality, accessible component system
- **Radix UI**: Unstyled, accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icon library
- **class-variance-authority**: Component variant management
- **tailwindcss-animate**: Animation utilities

### Build Tools
- **ESLint**: Code linting
- **PostCSS**: CSS processing with Autoprefixer
- **TypeScript**: Type checking

## 🛠️ Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd rankly-onboarding
   ```

2. **Install dependencies**:
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview production build**:
   ```bash
   npm run preview
   ```

## 📁 Project Structure

```
rankly-onboarding/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   │   ├── avatar.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── separator.tsx
│   │   │   └── switch.tsx
│   │   └── Layout.tsx       # Main layout with nav & theme toggle
│   ├── pages/
│   │   ├── Onboarding.tsx   # Multi-step onboarding flow
│   │   └── Dashboard.tsx    # Main dashboard with prompt management
│   ├── lib/
│   │   └── utils.ts         # Utility functions (cn helper)
│   ├── App.tsx              # Main app with routing
│   ├── main.tsx             # React entry point
│   └── globals.css          # Global styles & theme variables
├── components.json          # shadcn/ui configuration
├── tailwind.config.js       # Tailwind configuration
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
├── package.json             # Dependencies
└── index.html               # HTML entry point
```

## 🎨 Design System

### Theme System
- **CSS Variables**: HSL color space for better color manipulation
- **Dark Mode**: Class-based dark mode (`.dark`)
- **Consistent Colors**: Primary, secondary, muted, destructive variants
- **Custom Typography**: Inter font with custom heading scales

### Color Palette
```css
/* Light Mode */
--background: 0 0% 100%
--foreground: 0 0% 0%
--primary: 0 0% 0%
--muted: 0 0% 96%

/* Dark Mode */
--background: 0 0% 0%
--foreground: 0 0% 100%
--primary: 0 0% 100%
--muted: 0 0% 15%
```

### Typography
- **Font Family**: Inter (Google Fonts)
- **Logo Font**: Quintessential
- **Heading Scale**: h1 (48-64px), h2 (32-40px), h3 (24px)
- **Body Text**: 16px with 1.5 line height

## 🧩 Key Components

### Onboarding Page
- **EmailStep**: Email capture with Google OAuth
- **VerificationStep**: 6-digit code verification
- **UserInfoStep**: Name and company collection
- **CampaignStep**: Website URL analysis
- **LoadingCards**: Animated progress indicators
- **CompetitorsList**: Manage competitor URLs
- **Topics**: Topic selection and management
- **UserPersonas**: Persona configuration
- **RegionLanguage**: Region/language settings (currently fixed to Global/English)

### Dashboard Page
- **CollapsibleTopic**: Expandable topic sections
- **PromptChaining**: Visual prompt relationship diagram
- **Tab Navigation**: Switch between analytics views

### Layout Component
- **Sidebar Navigation**: Quick access to different sections
- **Theme Toggle**: Persistent dark/light mode
- **Contact Link**: Easy access to support

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server (port 3000)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - TypeScript type checking

### Adding New shadcn/ui Components
```bash
npx shadcn@latest add [component-name]
```

Example:
```bash
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
```

### Code Style
- Use TypeScript for all new files
- Follow React hooks best practices
- Use tailwind utility classes for styling
- Maintain consistent component structure

## 🚦 Routing

The application uses React Router v6:

```typescript
/                  → Onboarding flow
/onboarding        → Onboarding flow (same as /)
/dashboard         → Main dashboard
/*                 → Redirect to /
```

## 🎯 Next Steps

- [ ] Backend API integration
- [ ] User authentication & sessions
- [ ] Real competitor/topic/persona analysis
- [ ] Analytics data visualization
- [ ] Multi-language support
- [ ] Additional regions beyond Global
- [ ] Form validation library integration
- [ ] Loading states & error handling
- [ ] Unit & integration tests

## 📝 Environment Variables

Currently, no environment variables are required. When backend integration is added, create a `.env` file:

```env
VITE_API_URL=your_api_url
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

## 🐛 Known Issues

- Google OAuth is currently a placeholder (console log only)
- Region & Language are fixed to Global/English
- Dashboard metrics are placeholder values
- No backend persistence yet

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please follow the existing code style and include tests for new features.

## 📧 Contact

For questions or support, use the "Contact us" link in the application.

# Rankly Onboarding - shadcn/ui

A modern onboarding flow built with React, TypeScript, and shadcn/ui design system.

## 🚀 Features

- **shadcn/ui Components**: Modern, accessible UI components
- **Dark/Light Theme**: Toggle between themes with persistent storage
- **Multi-step Flow**: Email → Verification → User Info → Campaign Setup
- **TypeScript**: Full type safety
- **Responsive Design**: Works on all screen sizes
- **Modern Stack**: React 18, Vite, Tailwind CSS

## 📦 Dependencies

### Core Dependencies
- **React 18**: Modern React with concurrent features
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and dev server

### UI Dependencies
- **shadcn/ui**: Modern component library
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icons

### Key shadcn/ui Components
- `@radix-ui/react-*`: All Radix UI primitives
- `class-variance-authority`: Component variant management
- `clsx`: Conditional class names
- `tailwind-merge`: Tailwind class merging
- `tailwindcss-animate`: Animation utilities

## 🛠️ Installation

1. **Install dependencies**:
   ```bash
   npm install --legacy-peer-deps
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
rankly-onboarding/
├── src/
│   ├── components/
│   │   └── ui/           # shadcn/ui components
│   ├── lib/
│   │   └── utils.ts      # Utility functions
│   ├── App.tsx           # Main application
│   ├── main.tsx          # React entry point
│   └── globals.css       # Global styles
├── components.json       # shadcn/ui config
├── tailwind.config.js    # Tailwind configuration
├── vite.config.ts        # Vite configuration
└── package.json          # Dependencies
```

## 🎨 Design System

### Theme System
- **CSS Variables**: HSL color space for better manipulation
- **Dark Mode**: Automatic theme switching
- **Consistent Colors**: Primary, secondary, muted, destructive variants

### Components
- **Button**: Primary, secondary, destructive variants
- **Input**: Form inputs with focus states
- **Card**: Content containers with shadows
- **Badge**: Status indicators
- **Switch**: Theme toggle component

### Typography
- **Inter Font**: Modern, readable typeface
- **Consistent Sizing**: Tailwind's type scale
- **Proper Hierarchy**: Headings, body text, captions

## 🔧 Development

### Adding New Components
```bash
npx shadcn@latest add [component-name]
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - TypeScript type checking

## 🌟 Key Features

### 1. Theme Management
- Persistent theme storage
- Smooth transitions
- CSS variables for consistency

### 2. Form Validation
- Real-time validation
- Disabled states
- User feedback

### 3. Responsive Design
- Mobile-first approach
- Flexible layouts
- Consistent spacing

### 4. Accessibility
- ARIA labels
- Keyboard navigation
- Screen reader support

## 📱 Onboarding Flow

1. **Email Input**: Collect user email
2. **Email Verification**: 6-digit code verification
3. **User Information**: Name and company details
4. **Campaign Setup**: Website URL and campaign name

## 🎯 Next Steps

- Add more shadcn/ui components as needed
- Implement backend integration
- Add form validation library
- Enhance animations and transitions
- Add error handling and loading states

## 📄 License

MIT License - see LICENSE file for details.
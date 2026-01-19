# Technology Stack

## 🎨 Frontend Technologies

### Core Framework
- **Next.js 16.1.3** - React framework with App Router
  - Server-side rendering (SSR)
  - Static site generation (SSG)
  - API routes
  - File-based routing
  - Built-in optimization

### UI & Styling
- **React 19.2.3** - UI library
- **TypeScript 5.x** - Type-safe development
- **Tailwind CSS 4.0** - Utility-first CSS framework
  - Custom design system
  - Dark/light mode support
  - Responsive design utilities
- **PostCSS** - CSS processing

### UI Components & Icons
- **Lucide React 0.562.0** - Icon library
  - Modern, customizable icons
  - Tree-shakeable
  - Consistent design language

### Utility Libraries
- **clsx 2.1.1** - Conditional className utility
- **tailwind-merge 3.4.0** - Merge Tailwind classes intelligently
- **next-themes 0.4.6** - Theme management (dark/light mode)

## 🛠️ Development Tools

### Code Quality
- **ESLint 9.x** - Linting and code quality
- **eslint-config-next 16.1.3** - Next.js specific ESLint rules
- **TypeScript** - Static type checking

### Build Tools
- **@tailwindcss/postcss 4.x** - Tailwind CSS processing
- **PostCSS** - CSS transformation

### Development Utilities
- **ngrok 5.0.0-beta.2** - Secure tunneling for local development
  - Enables testing with external APIs
  - Bypasses CORS issues during development

## 🔌 Backend Integration

### API Communication
- **Fetch API** - Native HTTP client
- **Custom API Client** (`lib/api.ts`)
  - Centralized request handling
  - JWT token management
  - Error handling
  - Request/response interceptors

### Authentication
- **JWT (JSON Web Tokens)** - Stateless authentication
  - Access tokens stored in localStorage
  - Bearer token authentication
  - Automatic token injection

### State Management
- **React Hooks** - Built-in state management
  - useState for local state
  - useEffect for side effects
  - useRouter for navigation
  - Custom hooks for reusable logic

## 📦 Package Manager
- **npm** - Node package manager
  - Lock file for consistent dependencies
  - Scripts for development, build, and deployment

## 🌐 Deployment

### Hosting Platform
- **Vercel** (recommended) - Optimized for Next.js
  - Automatic deployments
  - Edge network
  - Serverless functions
  - Environment variables

### Environment Configuration
- **.env.local** - Environment variables
  - API URLs
  - Backend configuration
  - Feature flags

## 🎯 Key Features Enabled by Stack

### Performance
- **Next.js Image Optimization** - Automatic image optimization
- **Code Splitting** - Automatic route-based code splitting
- **Tree Shaking** - Remove unused code
- **Minification** - Production build optimization

### Developer Experience
- **Hot Module Replacement** - Instant feedback during development
- **TypeScript** - Type safety and IntelliSense
- **Fast Refresh** - Preserve component state during edits
- **ESLint** - Catch errors early

### User Experience
- **Dark/Light Mode** - Automatic theme switching
- **Responsive Design** - Mobile-first approach
- **Smooth Animations** - CSS transitions and animations
- **Loading States** - Custom loaders and skeletons
- **Error Handling** - User-friendly error messages

## 📊 Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ JavaScript support required
- CSS Grid and Flexbox support
- LocalStorage API support

## 🔄 Version Control
- **Git** - Source control
- **GitHub** (assumed) - Code hosting and collaboration

## 📱 Responsive Design Breakpoints

```css
/* Tailwind CSS default breakpoints */
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
2xl: 1536px /* 2X Extra large devices */
```

## 🎨 Design System

### Color Palette
- Primary: Indigo/Violet gradient
- Accent: Various contextual colors
- Neutral: Gray scale for text and backgrounds
- Semantic: Red (error), Green (success), Yellow (warning)

### Typography
- System fonts with fallbacks
- Responsive font sizes
- Custom font weights and line heights

### Spacing
- Tailwind's spacing scale (0.25rem increments)
- Consistent padding and margins
- Grid-based layouts

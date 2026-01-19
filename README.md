# PixelWeave Frontend

<div align="center">

![PixelWeave](https://img.shields.io/badge/PixelWeave-AI%20Mockup%20Generator-blueviolet?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-16.1.3-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)

**AI-Powered Fashion Mockup Generation Platform**

[Features](#-features) • [Documentation](#-documentation) • [Quick Start](#-quick-start) • [Tech Stack](#-tech-stack)

</div>

---

## 📖 About

**PixelWeave** is a modern B2B SaaS web application that revolutionizes fashion product photography through AI-powered mockup generation. Upload your garment designs and instantly generate professional product mockups with customizable models, backgrounds, and styling options—no photoshoots required.

### ✨ Why PixelWeave?

- 🎨 **Extensive Customization** - Control every aspect: model demographics, body type, pose, environment, and lighting
- ⚡ **Fast Generation** - AI-powered mockups in minutes, not days
- 💰 **Cost-Effective** - Eliminate expensive photoshoots and model fees
- 🌍 **Diverse Representation** - Support for multiple ethnicities, body types, and styles
- 🎯 **Professional Quality** - High-resolution, production-ready mockups

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18.0.0 or higher
- npm 9.0.0 or higher

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd Pixel-Frontend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local
# Edit .env.local with your backend API URL

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

**For detailed setup instructions, see [SETUP.md](./docs/SETUP.md)**

---

## ✨ Features

### 🔐 Authentication
- Secure user registration and login
- JWT-based authentication
- Session management
- Protected routes

### 🎨 AI Mockup Generation
- **Image Upload**: Drag & drop or click to upload (JPG, PNG, WEBP)
- **Garment Types**: T-shirts, hoodies, dresses, traditional wear, and more
- **Model Customization**:
  - Gender, age group, ethnicity
  - Body type, skin tone, height
  - Mood, pose, hair style and color
- **Environments**: Studio, street, nature, cafe, beach, luxury store, and more
- **Real-time Processing**: Live status updates with polling
- **Download Results**: High-quality mockup downloads

### 🎭 User Experience
- Dark/Light mode with system preference detection
- Fully responsive design (mobile, tablet, desktop)
- Smooth animations and transitions
- Custom loaders and progress indicators
- Comprehensive error handling

### 📊 Dashboard
- User profile and credit management
- Navigation to all features
- Quick access to mockup creation
- Settings and preferences

**For complete feature list, see [FEATURES.md](./docs/FEATURES.md)**

---

## 📚 Documentation

Comprehensive documentation is available in the `/docs` folder:

| Document | Description |
|----------|-------------|
| [📋 PROJECT_OVERVIEW.md](./docs/PROJECT_OVERVIEW.md) | Project vision, architecture, and roadmap |
| [🛠️ TECH_STACK.md](./docs/TECH_STACK.md) | Complete technology stack and tools |
| [🔌 API_DOCUMENTATION.md](./docs/API_DOCUMENTATION.md) | API endpoints, request/response formats |
| [✨ FEATURES.md](./docs/FEATURES.md) | Detailed feature descriptions |
| [⚙️ SETUP.md](./docs/SETUP.md) | Installation and configuration guide |

---

## 🛠️ Tech Stack

### Core Technologies
- **Framework**: Next.js 16.1.3 (App Router)
- **UI Library**: React 19.2.3
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 4.0
- **Icons**: Lucide React 0.562.0

### Key Features
- Server-side rendering (SSR)
- Static site generation (SSG)
- API route handlers
- Image optimization
- Dark/light theme support

### Development Tools
- ESLint for code quality
- TypeScript for type safety
- PostCSS for CSS processing
- ngrok for local development tunneling

**For detailed tech stack information, see [TECH_STACK.md](./docs/TECH_STACK.md)**

---

## 📁 Project Structure

```
Pixel-Frontend/
├── app/                    # Next.js App Router
│   ├── dashboard/         # Dashboard and features
│   ├── login/            # Authentication pages
│   ├── register/
│   └── ...
├── components/           # Reusable UI components
│   └── ui/              # UI component library
├── lib/                 # Utilities and helpers
│   └── api.ts          # API client
├── docs/               # 📚 Documentation
│   ├── PROJECT_OVERVIEW.md
│   ├── TECH_STACK.md
│   ├── API_DOCUMENTATION.md
│   ├── FEATURES.md
│   └── SETUP.md
├── public/            # Static assets
└── ...
```

---

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm start           # Start production server

# Code Quality
npm run lint        # Run ESLint
npm run lint -- --fix  # Fix auto-fixable issues
```

---

## 🌐 Environment Variables

Create a `.env.local` file in the root directory:

```env
# Backend API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

**Note**: Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

---

## 🎯 API Integration

The frontend integrates with a backend API providing:

- User authentication endpoints
- Mockup generation endpoints
- Payment processing endpoints

**For complete API documentation, see [API_DOCUMENTATION.md](./docs/API_DOCUMENTATION.md)**

---

## 🎨 Design System

### Color Palette
- **Primary**: Indigo/Violet gradient
- **Accent**: Context-aware colors
- **Neutral**: Comprehensive gray scale
- **Semantic**: Status-based colors

### Typography
- System font stack with fallbacks
- Responsive font sizing
- Optimized readability

### Components
- Reusable, theme-aware components
- Consistent design language
- Accessible and responsive

---

## 🚢 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push code to GitHub
2. Import project to Vercel
3. Configure environment variables
4. Deploy automatically

### Other Platforms
- Netlify
- AWS Amplify
- Docker
- Traditional hosting

**For deployment details, see [SETUP.md](./docs/SETUP.md)**

---

## 🐛 Troubleshooting

Common issues and solutions:

- **Port already in use**: Kill process or use different port
- **Module not found**: Clear `node_modules` and reinstall
- **API connection issues**: Verify backend URL and CORS settings
- **Build errors**: Run `npm run lint -- --fix`

**For detailed troubleshooting, see [SETUP.md](./docs/SETUP.md)**

---

## 🔐 Security

- JWT-based authentication
- Secure token storage
- Input validation and sanitization
- XSS and CSRF protection
- Environment variable protection

---

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is proprietary software. All rights reserved.

---

## 📞 Support

For support and questions:

- 📧 Email: support@pixelweave.com
- 📚 Documentation: [/docs](./docs)
- 🐛 Issues: GitHub Issues

---

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and deployment
- Tailwind CSS for the utility-first CSS framework
- Lucide for the beautiful icon set

---

<div align="center">

**Built with ❤️ using Next.js, React, and Tailwind CSS**

[⬆ Back to Top](#pixelweave-frontend)

</div>

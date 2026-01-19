# Setup & Installation Guide

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v18.0.0 or higher)
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify installation: `node --version`
  
- **npm** (v9.0.0 or higher)
  - Comes with Node.js
  - Verify installation: `npm --version`
  
- **Git** (optional, for cloning)
  - Download from [git-scm.com](https://git-scm.com/)
  - Verify installation: `git --version`

---

## 🚀 Installation Steps

### 1. Clone or Download the Repository

**Option A: Using Git**
```bash
git clone <repository-url>
cd Pixel-Frontend
```

**Option B: Download ZIP**
- Download the project ZIP file
- Extract to your desired location
- Navigate to the project folder

### 2. Install Dependencies

```bash
npm install
```

This will install all required dependencies listed in `package.json`:
- Next.js and React
- Tailwind CSS
- TypeScript
- Lucide React (icons)
- All other dependencies

**Installation time:** Approximately 2-5 minutes depending on your internet connection.

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```bash
# Windows
copy .env.example .env.local

# macOS/Linux
cp .env.example .env.local
```

**Configure the following environment variables:**

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000

# Optional: Production URLs
# NEXT_PUBLIC_API_URL=https://api.pixelweave.com
# NEXT_PUBLIC_BACKEND_URL=https://backend.pixelweave.com
```

**Environment Variables Explained:**
- `NEXT_PUBLIC_API_URL`: Backend API base URL
- `NEXT_PUBLIC_BACKEND_URL`: Backend media server URL (for image uploads/downloads)

> **Note:** Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

---

## 🏃 Running the Application

### Development Mode

Start the development server:

```bash
npm run dev
```

The application will be available at:
- **Local:** [http://localhost:3000](http://localhost:3000)
- **Network:** http://\<your-ip\>:3000

**Features in Development Mode:**
- Hot Module Replacement (HMR)
- Fast Refresh
- Detailed error messages
- Source maps for debugging

### Production Build

Build the application for production:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

**Production Optimizations:**
- Minified code
- Optimized bundles
- Image optimization
- Static generation where possible

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

Fix auto-fixable issues:

```bash
npm run lint -- --fix
```

---

## 🔧 Configuration Files

### TypeScript Configuration (`tsconfig.json`)

The project uses TypeScript with the following key settings:
- Strict mode enabled
- Path aliases configured (`@/*` → `./`)
- App Router support
- JSX preservation

### Tailwind CSS Configuration

Tailwind is configured to scan:
- `./app/**/*.{js,ts,jsx,tsx}`
- `./components/**/*.{js,ts,jsx,tsx}`
- `./lib/**/*.{js,ts,jsx,tsx}`

Custom theme extensions are defined in the configuration.

### Next.js Configuration (`next.config.ts`)

Key configurations:
- Image domains (if external images are used)
- Environment variables
- Build optimizations

---

## 📁 Project Structure

```
Pixel-Frontend/
├── app/                      # Next.js App Router
│   ├── dashboard/           # Dashboard pages
│   │   ├── create/         # Mockup creation
│   │   ├── library/        # Mockup library
│   │   ├── settings/       # User settings
│   │   ├── wardrobe/       # Wardrobe management
│   │   ├── layout.tsx      # Dashboard layout
│   │   └── page.tsx        # Dashboard home
│   ├── login/              # Login page
│   ├── register/           # Registration page
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── providers.tsx       # Theme providers
├── components/             # Reusable components
│   └── ui/                # UI components
│       └── loaders.tsx    # Loading components
├── lib/                   # Utility libraries
│   └── api.ts            # API client
├── public/               # Static assets
├── docs/                 # Documentation
├── .env.local           # Environment variables (create this)
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript config
├── tailwind.config.ts   # Tailwind config
└── next.config.ts       # Next.js config
```

---

## 🌐 Backend Setup

### Backend Requirements

The frontend requires a running backend API. Ensure the backend is:

1. **Running and accessible** at the URL specified in `.env.local`
2. **Configured for CORS** to allow requests from `http://localhost:3000`
3. **Providing the following endpoints:**
   - `POST /user/register/`
   - `POST /user/login/`
   - `POST /pixel/mockup/`
   - `GET /pixel/mockup/`

### Testing Backend Connection

1. Start the backend server
2. Update `.env.local` with the correct backend URL
3. Start the frontend development server
4. Try registering a new user or logging in

---

## 🐛 Troubleshooting

### Common Issues

#### 1. Port 3000 Already in Use

**Error:** `Port 3000 is already in use`

**Solution:**
```bash
# Find and kill the process using port 3000
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- -p 3001
```

#### 2. Module Not Found Errors

**Error:** `Module not found: Can't resolve '...'`

**Solution:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### 3. API Connection Issues

**Error:** Network errors or CORS issues

**Solutions:**
- Verify backend is running
- Check `.env.local` URLs are correct
- Ensure backend CORS is configured
- Check firewall/antivirus settings
- Try using ngrok for tunneling (already included in dependencies)

#### 4. Build Errors

**Error:** Build fails with TypeScript or ESLint errors

**Solution:**
```bash
# Fix linting issues
npm run lint -- --fix

# Check TypeScript errors
npx tsc --noEmit
```

---

## 🔐 Security Considerations

### Development
- Never commit `.env.local` to version control
- Use different API keys for development and production
- Keep dependencies updated: `npm audit fix`

### Production
- Use HTTPS for all API communications
- Set secure environment variables on hosting platform
- Enable security headers in Next.js config
- Implement rate limiting on API endpoints

---

## 📦 Deployment

### Vercel (Recommended)

1. **Push code to GitHub/GitLab/Bitbucket**

2. **Import project to Vercel:**
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your repository

3. **Configure environment variables:**
   - Add `NEXT_PUBLIC_API_URL`
   - Add `NEXT_PUBLIC_BACKEND_URL`

4. **Deploy:**
   - Vercel will automatically build and deploy
   - Get a production URL

### Other Platforms

The application can be deployed to:
- **Netlify**: Similar to Vercel
- **AWS Amplify**: Enterprise-grade hosting
- **Docker**: Containerized deployment
- **Traditional hosting**: Build and serve static files

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] User registration works
- [ ] User login works
- [ ] Dashboard loads correctly
- [ ] Mockup creation form works
- [ ] Image upload functions
- [ ] Theme toggle works
- [ ] Responsive design on mobile
- [ ] All navigation links work

### Browser Testing

Test on:
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

---

## 📚 Additional Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

### Community
- [Next.js GitHub](https://github.com/vercel/next.js)
- [Next.js Discord](https://discord.gg/nextjs)

---

## 🆘 Getting Help

If you encounter issues:

1. Check the troubleshooting section above
2. Review the documentation files in `/docs`
3. Check the browser console for errors
4. Review the terminal output for error messages
5. Ensure all prerequisites are met
6. Verify environment variables are correct

---

## 🔄 Updating the Project

To update dependencies:

```bash
# Check for outdated packages
npm outdated

# Update all packages (careful!)
npm update

# Update specific package
npm update <package-name>
```

**Note:** Always test thoroughly after updating dependencies.

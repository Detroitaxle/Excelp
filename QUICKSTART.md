# Quick Start Guide

Welcome to Excel Script Processor! Follow these steps to get started quickly.

## 1. Install Dependencies

First, make sure you have Node.js 18+ installed, then run:

```bash
npm install
```

## 2. Start Development Server

```bash
npm run dev
```

The app will open at `http://localhost:5173`

## 3. Try It Out

1. Upload an Excel file (.xlsx or .xls)
2. View the data preview
3. Select a script template or write your own
4. Click "Process File"
5. Download the result

## 4. Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: Excel Script Processor with all features"

# Add your GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## 5. Deploy to Vercel

### Via Vercel Dashboard (Easiest):

1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "New Project"
4. Select your repository
5. Click "Deploy"

### Via CLI:

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

## What's Included

✅ File upload with validation (max 50MB)
✅ Data preview component
✅ Enhanced script editor with templates
✅ 6 ready-to-use script templates
✅ Processing history tracking
✅ Documentation page
✅ Examples page
✅ Error handling and validation
✅ Security measures
✅ Responsive design
✅ Vercel deployment config
✅ GitHub Actions CI/CD

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Next Steps

1. Customize the README.md with your information
2. Add your GitHub username to the repository
3. (Optional) Set up a custom domain in Vercel
4. (Optional) Implement actual Python processing backend

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

## Need Help?

- Check the [Documentation](http://localhost:5173/documentation) page
- View [Examples](http://localhost:5173/examples) for script ideas
- Read the full [README.md](./README.md)

Happy coding! 🚀

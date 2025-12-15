# Deployment Guide

## Prerequisites

1. **GitHub Account** - For version control
2. **Vercel Account** - For deployment (free tier available)
3. **Node.js** - For local development

## Step 1: Push to GitHub

1. Initialize git repository (if not already done):
```bash
git init
git add .
git commit -m "Initial commit: Excel Script Processor"
```

2. Create a new repository on GitHub

3. Push your code:
```bash
git remote add origin https://github.com/yourusername/excel-script-processor.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
5. Click "Deploy"

### Option B: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Follow the prompts:
   - Set up and deploy? Yes
   - Which scope? Select your account
   - Link to existing project? No
   - Project name? excel-script-processor
   - Directory? ./
   - Override settings? No

5. For production deployment:
```bash
vercel --prod
```

## Step 3: Configure Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click "Settings" > "Domains"
3. Add your custom domain or use the Vercel-provided domain

## Step 4: Environment Variables (If Needed)

If you add environment variables later:

1. In Vercel dashboard: Settings > Environment Variables
2. Add your variables
3. Redeploy the project

## Step 5: Set Up Python Processing (Production)

The current implementation is a placeholder. For production:

### Option 1: AWS Lambda

1. Create a Lambda function with Python 3.9+ runtime
2. Upload `api/process_excel.py`
3. Add layer with pandas, openpyxl, xlrd
4. Update frontend API endpoint to Lambda URL

### Option 2: Google Cloud Functions

1. Create a Cloud Function with Python runtime
2. Deploy `api/process_excel.py`
3. Update frontend API endpoint

### Option 3: Separate Backend Service

1. Create a Node.js/Express backend
2. Use child_process to run Python scripts
3. Deploy to Railway, Render, or Heroku
4. Update frontend API endpoint

## Continuous Deployment

Once connected to GitHub, Vercel automatically:
- Deploys on every push to main branch
- Creates preview deployments for pull requests
- Runs build checks

## Monitoring

- View logs: Vercel Dashboard > Your Project > Logs
- Check analytics: Vercel Dashboard > Your Project > Analytics
- Monitor errors: Vercel Dashboard > Your Project > Error Tracking

## Troubleshooting

### Build Fails

- Check build logs in Vercel dashboard
- Ensure all dependencies are in package.json
- Verify Node.js version compatibility

### API Routes Not Working

- Check vercel.json configuration
- Ensure API routes are in /api directory
- Verify serverless function configuration

### Environment Issues

- Clear Vercel cache and redeploy
- Check environment variables are set correctly
- Verify CORS settings if API calls fail

## Post-Deployment Checklist

- [ ] Test file upload functionality
- [ ] Test all navigation links
- [ ] Test script templates
- [ ] Verify data preview works
- [ ] Check mobile responsiveness
- [ ] Test error handling
- [ ] Review security settings
- [ ] Set up custom domain (optional)
- [ ] Configure analytics (optional)
- [ ] Set up monitoring/alerts

## Useful Commands

```bash
# Preview deployment
vercel

# Production deployment
vercel --prod

# View deployment logs
vercel logs

# List all deployments
vercel ls

# Remove a deployment
vercel rm [deployment-url]
```

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [GitHub Actions for CI/CD](https://github.com/features/actions)

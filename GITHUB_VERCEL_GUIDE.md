# GitHub and Vercel Deployment - Step by Step

Follow these exact steps to push your code to GitHub and deploy to Vercel.

## Step 1: Create GitHub Repository

1. Go to https://github.com
2. Click the "+" icon in the top right
3. Click "New repository"
4. Fill in the details:
   - Repository name: `excel-script-processor` (or your preferred name)
   - Description: "A modern web app for processing Excel files with Python scripts"
   - Choose Public or Private
   - **DO NOT** check "Initialize with README" (we already have one)
5. Click "Create repository"

## Step 2: Push to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
# Set your repository URL (replace with your actual URL from GitHub)
git remote add origin https://github.com/YOUR_USERNAME/excel-script-processor.git

# Rename branch to main (if not already)
git branch -M main

# Push to GitHub
git push -u origin main
```

### Example:
If your GitHub username is "johndoe":
```bash
git remote add origin https://github.com/johndoe/excel-script-processor.git
git branch -M main
git push -u origin main
```

You'll be prompted for credentials. Use your GitHub username and a Personal Access Token (PAT) as the password.

### Creating a Personal Access Token (if needed):
1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a name like "Excel Script Processor"
4. Select scopes: `repo` (full control of private repositories)
5. Click "Generate token"
6. Copy the token and use it as your password when pushing

## Step 3: Deploy to Vercel

### Option A: Via Vercel Website (Recommended - Easiest)

1. Go to https://vercel.com
2. Click "Sign Up" or "Log In"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your GitHub account
5. Click "New Project"
6. Find your `excel-script-processor` repository
7. Click "Import"
8. Vercel will auto-detect settings:
   - Framework Preset: Vite
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: `dist`
9. Click "Deploy"
10. Wait 2-3 minutes for deployment
11. Your site is live! 🎉

### Option B: Via Vercel CLI

If you prefer command line:

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

Answer the prompts:
- Set up and deploy? `Y`
- Which scope? (Select your account)
- Link to existing project? `N`
- What's your project's name? `excel-script-processor`
- In which directory is your code located? `./`
- Want to override the settings? `N`

## Step 4: Configure Your Deployment

After deployment, in Vercel dashboard:

1. Go to your project
2. Click "Settings"
3. Note your deployment URL (e.g., `excel-script-processor.vercel.app`)

### Optional: Add Custom Domain

1. In Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

## Step 5: Verify Deployment

Visit your deployment URL and test:

- ✅ Home page loads
- ✅ File upload works
- ✅ Navigation to Documentation works
- ✅ Navigation to Examples works
- ✅ Script templates load
- ✅ All UI elements display correctly

## Troubleshooting

### Push to GitHub fails with authentication error

**Solution**: Use a Personal Access Token instead of password
1. Generate token at: GitHub → Settings → Developer settings → Personal access tokens
2. Use token as password when prompted

### Vercel build fails

**Solution**: Check the build logs in Vercel dashboard
- Common issues: Missing dependencies, type errors
- Fix errors and push again to GitHub (Vercel will auto-redeploy)

### Site deploys but looks broken

**Solution**: 
- Check browser console for errors
- Verify all assets are loading
- Clear browser cache and reload

### API routes not working

**Solution**: 
- The API is a placeholder for now
- For production, you'll need to set up a Python backend
- See `DEPLOYMENT.md` for backend setup options

## What Happens Next?

### Automatic Deployments

- Every time you push to the `main` branch on GitHub, Vercel automatically redeploys
- Pull requests get preview deployments
- You can see all deployments in Vercel dashboard

### Making Changes

```bash
# Make your changes to the code
# Then:

git add .
git commit -m "Your commit message"
git push

# Vercel will automatically deploy the changes!
```

## Your URLs

After deployment, save these URLs:

- **GitHub Repository**: https://github.com/YOUR_USERNAME/excel-script-processor
- **Live Site**: https://excel-script-processor.vercel.app (or your custom domain)
- **Vercel Dashboard**: https://vercel.com/YOUR_USERNAME/excel-script-processor

## Share Your Project

Your project is now live! Share the URL with:
- Friends and colleagues
- On social media
- In your portfolio
- On your resume

## Need Help?

- GitHub Docs: https://docs.github.com
- Vercel Docs: https://vercel.com/docs
- Check the issues tab on your GitHub repo

---

Congratulations! Your Excel Script Processor is now live! 🚀

# GitHub Setup & Deployment Guide

Follow these steps to get your portfolio on GitHub and deploy it to a custom domain.

## Step 1: Prepare Your Local Repository

### Download Your Code from Replit

1. **Download** your Replit project:
   - Go to your Replit project
   - Click the three dots menu
   - Select "Download as zip"
   - Extract the files to your local machine

### Initialize Git Repository

```bash
# Navigate to your project folder
cd security-portfolio

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Security Professional Portfolio"
```

## Step 2: Create GitHub Repository

1. **Go to GitHub** and create a new repository
2. **Name it** `security-portfolio` (or your preferred name)
3. **Keep it public** (or private if you prefer)
4. **Don't initialize** with README (you already have one)

## Step 3: Connect to GitHub

```bash
# Add GitHub as remote origin
git remote add origin https://github.com/YOUR_USERNAME/security-portfolio.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 4: Deploy Options

### Option A: Vercel (Recommended)

1. **Go to** [vercel.com](https://vercel.com)
2. **Sign up** with your GitHub account
3. **Import** your repository
4. **Add environment variables**:
   ```
   DATABASE_URL=your_postgresql_url
   NODE_ENV=production
   ```
5. **Deploy** - automatic!

### Option B: Railway

1. **Go to** [railway.app](https://railway.app)
2. **Connect** your GitHub repository
3. **Add PostgreSQL** service
4. **Set environment variables**
5. **Deploy**

### Option C: Netlify + Backend Hosting

1. **Frontend** to Netlify
2. **Backend** to Railway/Render
3. **Update** API endpoints

## Step 5: Custom Domain Setup

### Purchase Domain
- **Namecheap**, **GoDaddy**, **Cloudflare**, etc.
- Recommended: `.dev`, `.tech`, `.me`, `.com`

### Configure DNS (Vercel Example)
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A  
Name: @
Value: 76.76.19.61 (Vercel's IP)
```

### Add Domain in Vercel
1. **Go to** project dashboard
2. **Settings** → **Domains**
3. **Add** your domain
4. **Wait** for SSL certificate (automatic)

## Step 6: Environment Variables

### Production Database
Set up production database:

**Option 1: Neon (Free PostgreSQL)**
```bash
# Sign up at neon.tech
# Create new project
# Copy connection string
DATABASE_URL=postgresql://user:pass@host/db?sslmode=require
```

**Option 2: Railway PostgreSQL**
```bash
# Add PostgreSQL service in Railway
# Copy DATABASE_URL from dashboard
```

### Required Variables
```bash
DATABASE_URL=your_production_database_url
NODE_ENV=production
PORT=10000
```

## Step 7: Custom Configuration

### Update Contact Information
Edit these files with your real information:
- `client/src/lib/terminal-commands.ts`
- `client/src/components/HeroSection.tsx`
- `client/src/components/ContactForm.tsx`

### Add Your Resume
1. **Create** a PDF of your resume
2. **Place** it in `public/resume-shubham-choubey.pdf`
3. **Update** the download link in portfolio.tsx

### Customize Branding
- **Update** colors in `client/src/index.css`
- **Modify** terminal prompt in components
- **Add** your own logo/favicon

## Step 8: Maintenance & Updates

### Making Changes
```bash
# Make your changes locally
git add .
git commit -m "Update: description of changes"
git push

# Automatic deployment will trigger
```

### Monitoring
- **Vercel**: Check function logs
- **Railway**: Monitor deploy logs
- **Database**: Check connection health

## Step 9: SEO & Performance

### SEO Improvements
1. **Add** meta tags to `portfolio.tsx`
2. **Create** sitemap.xml
3. **Submit** to Google Search Console

### Performance
1. **Enable** caching in hosting provider
2. **Optimize** images
3. **Monitor** Core Web Vitals

## Troubleshooting

### Common Issues

**Build Errors**
```bash
# Check TypeScript errors
npm run check

# Test build locally
npm run build
```

**Database Connection**
```bash
# Test database connection
npm run db:push
```

**Environment Variables**
- Ensure all variables are set in hosting dashboard
- Check variable names match exactly
- Restart deployment after adding variables

### Getting Help
- Check hosting provider documentation
- GitHub Issues for technical problems
- Contact hosting support for deployment issues

## Security Checklist

- [ ] Environment variables secured
- [ ] Database connection encrypted
- [ ] HTTPS enabled
- [ ] No sensitive data in public repo
- [ ] Rate limiting on contact form
- [ ] Regular security updates

Your portfolio is now ready for the world! 🚀
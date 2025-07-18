# Deployment Guide

This guide covers different deployment options for your portfolio application.

## Quick Deploy Options

### 1. Vercel (Recommended for Full-Stack)

1. **Push to GitHub** first
2. **Connect Vercel** to your GitHub repository
3. **Add Environment Variables** in Vercel dashboard:
   ```
   DATABASE_URL=your_neon_postgresql_url
   NODE_ENV=production
   ```
4. **Deploy** - Vercel will automatically build and deploy

### 2. Railway (Good for Backend + Database)

1. **Connect GitHub** repository to Railway
2. **Add PostgreSQL service** in Railway
3. **Set environment variables**
4. **Deploy** with automatic builds

### 3. Netlify (Frontend Only)

For static hosting (you'll need separate backend):
1. **Build** the frontend: `npm run build`
2. **Deploy** the `dist/public` folder to Netlify
3. **Set up** separate backend hosting

## Database Setup

### Using Neon (Recommended)

1. **Sign up** at [neon.tech](https://neon.tech)
2. **Create** a new project
3. **Copy** the connection string
4. **Update** your `.env` file

### Using Railway PostgreSQL

1. **Add PostgreSQL** service in Railway
2. **Copy** the DATABASE_URL from Railway dashboard
3. **Update** environment variables

## Domain Configuration

### Custom Domain Setup

1. **Purchase domain** from registrar (Namecheap, GoDaddy, etc.)
2. **Configure DNS** records:
   - For Vercel: Add CNAME record pointing to `cname.vercel-dns.com`
   - For Railway: Add CNAME record pointing to your Railway app URL
   - For Netlify: Add CNAME record pointing to your Netlify app

3. **SSL Certificate** - Usually automatic with hosting providers

### DNS Records Example

```
Type: CNAME
Name: www
Value: your-app.vercel.app (or your hosting provider URL)

Type: A
Name: @
Value: [Your hosting provider's IP address]
```

## Build Scripts

The application includes these build commands:

- `npm run dev` - Development server
- `npm run build` - Production build
- `npm start` - Start production server
- `npm run db:push` - Deploy database schema

## Environment Variables

Required for production:

```bash
DATABASE_URL=postgresql://user:pass@host:port/db
NODE_ENV=production
PORT=10000
```

## Monitoring & Maintenance

### Health Checks

The application includes basic health endpoints:
- `/api/health` - Check if server is running
- Database connection validation

### Logging

Server logs are available in your hosting dashboard:
- Vercel: Functions tab
- Railway: Deploy logs
- Check for any startup errors

### Updates

To update your live site:
1. **Make changes** locally
2. **Test** with `npm run dev`
3. **Commit** and push to GitHub
4. **Automatic deployment** will trigger

## Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Check DATABASE_URL format
   - Verify database is accessible
   - Run `npm run db:push` to ensure schema is deployed

2. **Build Failures**
   - Check for TypeScript errors
   - Verify all dependencies are in package.json
   - Check build logs in hosting dashboard

3. **Environment Variables**
   - Ensure all required variables are set
   - Check variable names match exactly
   - Restart deployment after adding variables

### Performance Optimization

1. **Enable caching** in your hosting provider
2. **Optimize images** and assets
3. **Use CDN** for static files
4. **Monitor** performance with hosting analytics

## Security Considerations

1. **Environment Variables** - Never commit .env files
2. **Database Security** - Use connection pooling
3. **HTTPS** - Ensure SSL is enabled
4. **Rate Limiting** - Consider adding for contact form
5. **CORS** - Configure for your domain only

## Backup Strategy

1. **Database Backups** - Enable automatic backups in your database provider
2. **Code Backups** - GitHub serves as primary backup
3. **Environment Variables** - Keep secure backup of .env configuration
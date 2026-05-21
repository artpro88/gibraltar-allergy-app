# Production Deployment Guide

Complete step-by-step guide for deploying to production with all API connections.

## Prerequisites

- GitHub account
- Supabase account (free tier)
- Firebase account (free tier)
- Mapbox account (free tier)
- Node.js 18+
- Supabase CLI installed

## Step 1: GitHub Setup

### Create Repository
```bash
# Go to github.com and create new repository
# Name: gibraltar-allergy-app
# Description: Real-time allergy forecasting for Gibraltar

# Add remote
cd "Gibraltar Allergy App"
git remote add origin https://github.com/YOUR_USERNAME/gibraltar-allergy-app.git
git branch -M main
git push -u origin main
```

### Configure Secrets
1. Go to GitHub repo → Settings → Secrets and variables → Actions
2. Add these secrets:

| Secret Name | Value |
|-------------|-------|
| `SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Your service role key |
| `SUPABASE_ANON_KEY` | Your anon key |
| `FIREBASE_PROJECT_ID` | Firebase project ID |
| `FIREBASE_PRIVATE_KEY` | Firebase private key |
| `FIREBASE_CLIENT_EMAIL` | Firebase client email |

## Step 2: Supabase Setup

### Create Project
1. Go to supabase.com
2. Create new project
3. Wait for database initialization

### Get Connection Details
```bash
# Go to Project Settings → API
# Copy:
# - Project URL → SUPABASE_URL
# - anon key → SUPABASE_ANON_KEY
# - service_role key → SUPABASE_SERVICE_ROLE_KEY
```

### Run Migrations
```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link to project
cd backend
supabase link --project-ref YOUR_PROJECT_REF

# Push migrations
supabase db push
```

### Setup RLS Policies
```sql
-- Run these in Supabase SQL editor for user data protection

-- Users can only see their own data
CREATE POLICY "Users can view own data"
ON environmental_data FOR SELECT
USING (auth.uid() = user_id);

-- Similar policies for other tables
```

## Step 3: Firebase Setup

### Create Project
1. Go to firebase.google.com
2. Create new project (link to Supabase if you can)
3. Enable Cloud Messaging

### Get Credentials
```bash
# Go to Project Settings → Service Accounts
# Click "Generate New Private Key"
# Save as backend/config/firebase.json
```

### Setup Cloud Messaging
1. Go to Cloud Messaging tab
2. Get your server key
3. Add to backend/.env

## Step 4: Environment Configuration

### Backend
```bash
cp backend/.env.example backend/.env.local
# Edit backend/.env.local with your actual keys
```

### Mobile
```bash
# Create mobile/.env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
MAPBOX_ACCESS_TOKEN=your_mapbox_token
```

## Step 5: Deploy Backend

### Local Testing
```bash
cd backend
npm install
npm run dev

# Test endpoints
curl http://localhost:3000/health
curl http://localhost:3000/api/weather/current
curl http://localhost:3000/api/air-quality/current
curl http://localhost:3000/api/environmental/report
```

### Deploy to Supabase
```bash
# Option 1: Automatic via GitHub Actions
# Just push to main branch - GitHub Actions will deploy

# Option 2: Manual deployment
supabase functions deploy
supabase db push
```

## Step 6: Deploy Mobile App

### iOS
```bash
cd mobile
flutter build ios --release
# Use Xcode to upload to App Store
```

### Android
```bash
cd mobile
flutter build appbundle --release
# Upload to Google Play Console
```

## Step 7: Verify Deployments

### Backend Health Check
```bash
# Check if backend is running
curl https://your-backend-url/health

# Should return:
# {"status":"ok","timestamp":"2024-01-15T10:30:00Z"}
```

### Test API Endpoints
```bash
# Test weather endpoint
curl https://your-backend-url/api/weather/current

# Test air quality endpoint
curl https://your-backend-url/api/air-quality/current

# Test combined report
curl https://your-backend-url/api/environmental/report
```

### Mobile App Test
1. Install on test device
2. Verify data loads from backend
3. Test push notifications
4. Check dark mode
5. Verify offline fallback

## Step 8: Monitoring & Maintenance

### Backend Monitoring
```bash
# Check logs in Supabase dashboard
# Monitor error rates
# Set up alerts
```

### Database Backups
```bash
# Supabase auto-backups daily
# Manual backup:
supabase db dump -f backup.sql
```

### Performance Optimization
- Enable caching for weather data
- Optimize database queries
- Monitor API response times

## Troubleshooting

### Backend Not Deploying
```bash
# Check git status
git status

# Verify secrets in GitHub
# Check GitHub Actions logs
```

### API Connection Issues
```bash
# Test CORS
curl -H "Origin: http://localhost" -H "Access-Control-Request-Method: GET" https://your-api-url

# Verify API keys
echo $SUPABASE_URL
echo $SUPABASE_ANON_KEY
```

### Mobile App Connection Issues
- Verify .env file has correct URLs
- Check API firewall rules
- Test on actual device (not just emulator)

## Rollback Procedure

### Backend Rollback
```bash
# Revert to previous version
git revert COMMIT_HASH
git push origin main

# GitHub Actions will auto-deploy
```

### Database Rollback
```bash
# Restore from backup
supabase db restore --backup-path backup.sql
```

## Security Checklist

- [ ] Environment variables in GitHub Secrets (not in code)
- [ ] Database RLS policies enabled
- [ ] CORS properly configured
- [ ] API rate limiting enabled
- [ ] HTTPS enforced
- [ ] Authentication tokens secured
- [ ] Firebase security rules configured
- [ ] Sensitive data encrypted

## Cost Estimation

| Service | Free Tier | Cost at Scale |
|---------|-----------|---------------|
| Supabase | 1GB DB + 2GB storage | $25-100/month |
| Firebase | 100 msgs/day | $50-200/month |
| Open-Meteo | Unlimited | Free |
| Mapbox | 25k loads/month | $200-500/month |
| **Total** | ~$0 | $400-800/month |

---

**Status:** Ready to deploy
**GitHub Actions:** Automated
**Monitoring:** Via Supabase dashboard

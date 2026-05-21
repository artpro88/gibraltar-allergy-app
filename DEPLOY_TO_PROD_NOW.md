# 🚀 DEPLOY TO PRODUCTION NOW - Complete Guide

Your app is ready. Follow these steps to deploy to production with all APIs working.

## ⏱️ Total Time: ~90 minutes

### Phase 1: External Services Setup (40 mins)

## STEP 1: Create Supabase Project (15 mins)

1. Go to **https://supabase.com/sign-up**
2. Sign up with GitHub (easier)
3. Click "New Project"
4. **Project name:** `gibraltar-allergy`
5. **Database password:** Create and save it!
6. **Region:** Europe (close to Gibraltar)
7. Click "Create" and wait 2-3 minutes

### Get Your Credentials

1. Go to **Project Settings → API**
2. Copy these 3 values to a safe place:

```
SUPABASE_URL = [Project URL at top]
SUPABASE_ANON_KEY = [anon public key]
SUPABASE_SERVICE_ROLE_KEY = [service_role secret key]
```

**✅ STEP 1 COMPLETE**

---

## STEP 2: Create Firebase Project (15 mins)

1. Go to **https://console.firebase.google.com**
2. Click "Create a project"
3. **Project name:** `gibraltar-allergy-app`
4. Disable Google Analytics (for MVP)
5. Wait for project creation

### Get Service Account Key

1. Go to **Project Settings → Service Accounts** tab
2. Click "Generate New Private Key"
3. JSON file downloads automatically
4. Open it and copy these 3 values:

```
FIREBASE_PROJECT_ID = [project_id field]
FIREBASE_PRIVATE_KEY = [private_key field - copy with quotes]
FIREBASE_CLIENT_EMAIL = [client_email field]
```

**✅ STEP 2 COMPLETE**

---

## STEP 3: Create Mapbox Account (10 mins - Optional)

1. Go to **https://account.mapbox.com/auth/signin/**
2. Create account
3. Go to **Account → Tokens**
4. Copy your access token

```
MAPBOX_ACCESS_TOKEN = [your token]
```

**✅ STEP 3 COMPLETE**

---

### Phase 2: GitHub Setup (30 mins)

## STEP 4: Create GitHub Repository (5 mins)

1. Go to **https://github.com/new**
2. **Repository name:** `gibraltar-allergy-app`
3. **Public** (recommended)
4. Click "Create repository"
5. Copy your repo URL: `https://github.com/YOUR_USERNAME/gibraltar-allergy-app.git`

**✅ STEP 4 COMPLETE**

---

## STEP 5: Push Code to GitHub (10 mins)

Open terminal in project root:

```bash
cd "/Users/ArturProlisko/Documents/augment-projects/Test Agent/Gibraltar Allergy App"

git remote add origin https://github.com/YOUR_USERNAME/gibraltar-allergy-app.git

git branch -M main

git push -u origin main
```

**When asked for password:**
- Go to GitHub → Settings → Developer settings → Personal access tokens
- Generate token (select: `repo`, `workflow`)
- Paste token as password

**✅ STEP 5 COMPLETE**

---

## STEP 6: Add GitHub Secrets (15 mins)

1. Go to your GitHub repo
2. Click **Settings**
3. Click **Secrets and variables → Actions**
4. Click **"New repository secret"**

### Add These 6 Secrets

**Secret 1: SUPABASE_URL**
- Value: `https://your-project.supabase.co`

**Secret 2: SUPABASE_SERVICE_ROLE_KEY**
- Value: The `service_role` key from Step 1

**Secret 3: SUPABASE_ANON_KEY**
- Value: The `anon` key from Step 1

**Secret 4: FIREBASE_PROJECT_ID**
- Value: From Firebase JSON (project_id)

**Secret 5: FIREBASE_PRIVATE_KEY**
- Value: From Firebase JSON (private_key - with newlines)

**Secret 6: FIREBASE_CLIENT_EMAIL**
- Value: From Firebase JSON (client_email)

**✅ STEP 6 COMPLETE**

---

### Phase 3: Database & Testing (20 mins)

## STEP 7: Setup Supabase Database (10 mins)

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login
# Opens browser - authenticate with GitHub

# Navigate to backend
cd "/Users/ArturProlisko/Documents/augment-projects/Test Agent/Gibraltar Allergy App/backend"

# Get your project ref from Supabase dashboard (top-right corner)
# Then run:
supabase link --project-ref YOUR_PROJECT_REF

# Run migrations
supabase db push
# Accept all changes when prompted
```

**Verify it worked:**
1. Go to Supabase dashboard
2. Click **SQL Editor**
3. Run: `SELECT tablename FROM pg_tables WHERE schemaname = 'public';`
4. Should show 6 tables

**✅ STEP 7 COMPLETE**

---

## STEP 8: Test Backend Locally (10 mins)

```bash
cd backend
npm install
npm run dev

# In new terminal:
curl http://localhost:3000/health
curl http://localhost:3000/api/weather/current
curl http://localhost:3000/api/air-quality/current
curl http://localhost:3000/api/environmental/report

# All should return JSON data
# Stop server: Ctrl+C
```

**✅ STEP 8 COMPLETE**

---

### Phase 4: Deploy to Production (5 mins)

## STEP 9: Deploy (5 mins)

```bash
cd "/Users/ArturProlisko/Documents/augment-projects/Test Agent/Gibraltar Allergy App"

git add .
git commit -m "Deploy to production with all APIs configured"
git push origin main
```

**Watch deployment:**
1. Go to GitHub repo → **Actions** tab
2. Click the workflow run
3. Watch logs complete
4. ✅ Green checkmark = SUCCESS!

**✅ DEPLOYMENT COMPLETE**

---

## ✅ Final Verification

Once GitHub Actions completes:

### Test Live Endpoints

```bash
# The backend will be running on Supabase
# Test the endpoints:
curl https://your-backend-url/health
curl https://your-backend-url/api/weather/current
curl https://your-backend-url/api/air-quality/current
```

All should return real data from Open-Meteo APIs.

---

## 🎉 You're Done!

Your app is now in **production** with:

✅ Flutter mobile app configured
✅ Node.js backend deployed
✅ PostgreSQL database set up
✅ Weather API (Open-Meteo) integrated
✅ Air quality API (Open-Meteo) integrated
✅ Firebase notifications ready
✅ GitHub Actions CI/CD running
✅ All 6 APIs connected and working

---

## 📞 Troubleshooting

**Git push fails:**
- Use Personal Access Token instead of password
- Check GitHub authentication

**Supabase push fails:**
- Verify project ref is correct
- Run: `supabase projects list`

**APIs not responding:**
- Check GitHub Actions logs
- Verify all 6 secrets are set
- Check Supabase database is created

**Backend returns errors:**
- Check environment variables
- Verify API keys are valid
- Check Supabase is running

---

## 📚 Documentation

- `NEXT_STEPS.md` - Detailed walkthrough
- `docs/API.md` - API endpoints
- `docs/ARCHITECTURE.md` - System design
- `GITHUB_SETUP.md` - GitHub details

---

**Time to complete:** ~90 minutes
**Difficulty:** Easy (step-by-step)
**Result:** Production app with all APIs working

🚀 **Start with STEP 1 and follow each step in order!**

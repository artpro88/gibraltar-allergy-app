# GitHub Setup & Deployment

Complete guide to push to GitHub and enable CI/CD.

## Step 1: Create GitHub Repository

### Web Interface
1. Go to https://github.com/new
2. **Repository name:** `gibraltar-allergy-app`
3. **Description:** `Real-time allergy forecasting and air quality app for Gibraltar`
4. **Visibility:** Public (recommended for open source)
5. **Initialize:** Don't add README (we have one)
6. Click **Create repository**

### Get the URL
Your repo URL will be: `https://github.com/YOUR_USERNAME/gibraltar-allergy-app.git`

## Step 2: Push to GitHub

```bash
cd "/Users/ArturProlisko/Documents/augment-projects/Test Agent/Gibraltar Allergy App"

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/gibraltar-allergy-app.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

**If you get authentication error:**
```bash
# Create Personal Access Token:
# 1. Go to GitHub.com → Settings → Developer settings → Personal access tokens
# 2. Click "Tokens (classic)"
# 3. Click "Generate new token"
# 4. Select scopes: repo, workflow
# 5. Copy token and use as password when git prompts
```

## Step 3: Configure GitHub Secrets

### Navigate to Secrets
1. Go to your GitHub repo
2. Click **Settings**
3. Click **Secrets and variables** → **Actions**
4. Click **New repository secret**

### Add Each Secret

**SUPABASE_URL**
- Value: Your Supabase project URL
- Example: `https://abcdefgh.supabase.co`

**SUPABASE_SERVICE_ROLE_KEY**
- Go to Supabase dashboard
- Project Settings → API
- Copy `service_role` key
- Value: `eyJ...` (long JWT token)

**SUPABASE_ANON_KEY**
- From same location as above
- Copy `anon` key
- Value: `eyJ...` (JWT token)

**FIREBASE_PROJECT_ID**
- Go to Firebase console
- Project settings → General
- Copy `Project ID`
- Value: `gibraltar-allergy-XXXXX`

**FIREBASE_PRIVATE_KEY**
- Project settings → Service accounts
- Click "Generate new private key"
- Opens JSON file
- Copy `private_key` value (between quotes)

**FIREBASE_CLIENT_EMAIL**
- Same JSON file
- Copy `client_email` value
- Value: `firebase-adminsdk-xxx@project.iam.gserviceaccount.com`

## Step 4: Verify GitHub Actions Setup

1. Go to **Actions** tab in your repo
2. You should see **Deploy to Production** workflow
3. Click it to view the workflow file

## Step 5: Test Deployment

### Option A: Via Web Interface
1. Go to **Actions** tab
2. Select **Deploy to Production**
3. Click **Run workflow** → **Run workflow**
4. Watch the logs

### Option B: Via Command Line
```bash
git commit --allow-empty -m "Trigger deployment"
git push origin main
```

Then watch at: `https://github.com/YOUR_USERNAME/gibraltar-allergy-app/actions`

## Step 6: Setup Branch Protection

1. Go to **Settings** → **Branches**
2. Click **Add rule**
3. **Branch name pattern:** `main`
4. Enable:
   - [x] Require status checks to pass
   - [x] Require pull request reviews
   - [x] Dismiss stale PR approvals
5. Click **Create**

## Monitoring Deployments

### GitHub Actions Dashboard
- **URL:** `https://github.com/YOUR_USERNAME/gibraltar-allergy-app/actions`
- Shows all deployment runs
- View logs for each step
- See success/failure status

### Deployment Status Badge
Add to README.md:
```markdown
[![Deploy to Production](https://github.com/YOUR_USERNAME/gibraltar-allergy-app/actions/workflows/deploy.yml/badge.svg)](https://github.com/YOUR_USERNAME/gibraltar-allergy-app/actions)
```

## Troubleshooting Deployments

### "Cannot find secrets"
- Verify secrets are added correctly
- Check spelling matches workflow file
- Wait 1 minute after adding secrets

### "npm install fails"
- Check Node.js version in workflow (should be 18)
- Verify package.json is valid JSON
- Check node_modules not in git (check .gitignore)

### "Supabase deployment fails"
- Verify SUPABASE_URL is correct format
- Check service role key (not anon key)
- Verify keys are not rotated

### "Firebase credentials invalid"
- Download new private key from Firebase
- Ensure full JSON format in FIREBASE_PRIVATE_KEY
- Check client email is correct

## Local Testing Before Push

```bash
# Test backend locally
cd backend
npm install
npm run dev

# Test API
curl http://localhost:3000/health

# Test Docker build
docker-compose up
```

## Environment Variables Reference

| Variable | Source | Where Used |
|----------|--------|-----------|
| SUPABASE_URL | Supabase dashboard | Backend API |
| SUPABASE_SERVICE_ROLE_KEY | Supabase → API | Backend auth |
| SUPABASE_ANON_KEY | Supabase → API | Frontend |
| FIREBASE_PROJECT_ID | Firebase console | Notifications |
| FIREBASE_PRIVATE_KEY | Firebase SA | Firebase admin |
| FIREBASE_CLIENT_EMAIL | Firebase SA | Firebase admin |

## CI/CD Workflow

```
Code Push to main
       ↓
GitHub Actions triggered
       ↓
Install dependencies
       ↓
Run tests
       ↓
Deploy to Supabase
       ↓
Deploy Edge Functions
       ↓
Send notification
```

## Repository Structure in GitHub

```
gibraltar-allergy-app/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── backend/
├── mobile/
├── docs/
└── README.md
```

## Best Practices

1. **Never commit secrets** - Always use GitHub Secrets
2. **Use meaningful commit messages** - "Fix weather API" vs "fix"
3. **Test locally first** - Before pushing
4. **Review before merge** - Use pull requests
5. **Monitor deployments** - Check Actions after push

---

**Repository Ready:** ✅ Set up and connected
**CI/CD:** ✅ GitHub Actions configured
**Secrets:** ⏳ Needs configuration (6 secrets)
**Status:** Ready to deploy to production

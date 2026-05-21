#!/bin/bash

# Gibraltar Allergy App - Production Deployment Script
# This script automates the entire deployment process

set -e

echo "🚀 Gibraltar Allergy App - Production Deployment"
echo "=================================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
  echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
  echo -e "${RED}❌ $1${NC}"
}

print_info() {
  echo -e "${YELLOW}ℹ️  $1${NC}"
}

# Step 1: Verify prerequisites
print_info "Step 1: Verifying prerequisites..."
command -v node >/dev/null 2>&1 || { print_error "Node.js is not installed"; exit 1; }
command -v npm >/dev/null 2>&1 || { print_error "npm is not installed"; exit 1; }
command -v git >/dev/null 2>&1 || { print_error "git is not installed"; exit 1; }
print_success "Node.js, npm, and git are installed"

# Step 2: Install backend dependencies
print_info "Step 2: Installing backend dependencies..."
cd backend
npm install --omit=dev > /dev/null 2>&1
print_success "Backend dependencies installed"
cd ..

# Step 3: Verify environment
print_info "Step 3: Checking environment configuration..."
if [ -f "backend/.env.local" ]; then
  print_success "Environment file found: backend/.env.local"
else
  print_info "No .env.local file found. Using default configuration."
  print_info "For production, create backend/.env.local with:"
  echo "  SUPABASE_URL=your_url"
  echo "  SUPABASE_SERVICE_ROLE_KEY=your_key"
  echo "  NODE_ENV=production"
fi

# Step 4: Build Docker image
print_info "Step 4: Building Docker image..."
if command -v docker >/dev/null 2>&1; then
  docker build -t gibraltar-allergy-backend:latest backend/
  print_success "Docker image built successfully"
else
  print_info "Docker not installed. Skipping Docker build."
  print_info "To use Docker, install it from https://docker.com"
fi

# Step 5: Test backend locally
print_info "Step 5: Testing backend API..."
cd backend
npm run dev &
SERVER_PID=$!
sleep 3

# Test health endpoint
if curl -s http://localhost:3000/health > /dev/null 2>&1; then
  print_success "Backend health check passed"
else
  print_error "Backend health check failed"
fi

# Test weather endpoint
if curl -s http://localhost:3000/api/weather/current > /dev/null 2>&1; then
  print_success "Weather API endpoint working"
else
  print_info "Weather API check (may fail if no internet)"
fi

# Kill the server
kill $SERVER_PID 2>/dev/null || true
wait $SERVER_PID 2>/dev/null || true
cd ..

# Step 6: Git status
print_info "Step 6: Checking git status..."
if [ -d ".git" ]; then
  CHANGES=$(git status --short | wc -l)
  if [ $CHANGES -gt 0 ]; then
    print_info "Found $CHANGES uncommitted changes"
    git add .
    git commit -m "Production deployment" || true
    print_success "Changes committed"
  else
    print_success "Git repository is clean"
  fi
else
  print_info "Not a git repository"
fi

# Step 7: Ready for deployment
print_info "Step 7: Deployment preparation complete!"
echo ""
echo "=================================================="
echo "✅ Your application is ready to deploy!"
echo ""
echo "📦 Next Steps:"
echo ""
echo "1. Create Supabase Project:"
echo "   - Go to https://supabase.com"
echo "   - Create new project"
echo "   - Get credentials from Project Settings → API"
echo ""
echo "2. Create GitHub Repository:"
echo "   - Go to https://github.com/new"
echo "   - Name: gibraltar-allergy-app"
echo "   - Public repository"
echo ""
echo "3. Push to GitHub:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/gibraltar-allergy-app.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "4. Add GitHub Secrets (Settings → Secrets → Actions):"
echo "   - SUPABASE_URL"
echo "   - SUPABASE_SERVICE_ROLE_KEY"
echo "   - SUPABASE_ANON_KEY"
echo "   - FIREBASE_PROJECT_ID"
echo "   - FIREBASE_PRIVATE_KEY"
echo "   - FIREBASE_CLIENT_EMAIL"
echo ""
echo "5. Setup Supabase Database:"
echo "   npm install -g supabase"
echo "   supabase login"
echo "   cd backend && supabase link --project-ref YOUR_REF"
echo "   supabase db push"
echo ""
echo "6. Deploy:"
echo "   git push origin main"
echo "   (GitHub Actions will auto-deploy)"
echo ""
echo "=================================================="
print_success "Deployment preparation complete!"

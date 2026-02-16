# Malon Labs — DevOps, CI/CD & Automation Guide

## Overview

This document covers the complete development workflow, automated testing, CI/CD pipeline, scheduled tasks, and deployment strategy for the Malon Labs website project.

---

## Git Workflow

### Branch Strategy (GitHub Flow)

```
main          ← Production (auto-deploys to live site)
├── staging   ← Pre-production testing
├── dev       ← Active development
├── feature/* ← Individual features (branch from dev)
├── fix/*     ← Bug fixes
└── hotfix/*  ← Emergency production fixes (branch from main)
```

### Branch Naming Convention

- `feature/add-consulting-page`
- `feature/hero-animation`
- `fix/mobile-nav-overlap`
- `hotfix/contact-form-broken`

### Commit Message Format

```
type(scope): brief description

Types: feat, fix, style, refactor, docs, test, chore, perf
Examples:
  feat(website): add parallax hero section
  fix(consulting): fix pricing table mobile overflow
  style(brand): update nav colors to match logo
  chore(ci): add lighthouse performance check
```

---

## Project Initialization Commands

Run these in your `~/Projects/ai_consult` directory after setup:

```bash
# Initialize git
cd ~/Projects/ai_consult
git init
git add .
git commit -m "chore: initial project setup with brand, content, and DevOps config"

# Connect to GitHub (replace with your repo URL)
git remote add origin https://github.com/Shamininski/malonlabs.git
# Or create a new repo:
# gh repo create malonlabs-v2 --private --source=. --push

# Create branch structure
git checkout -b dev
git push -u origin dev
git checkout -b staging
git push -u origin staging
git checkout dev
```

### Importing Old Site Content

```bash
# Clone the old repo separately to reference
git clone https://github.com/Shamininski/malonlabs.git ~/malonlabs_old

# Have Claude Code analyze it
cd ~/Projects/ai_consult
claude "Analyze the old Malon Labs site at ~/malonlabs_old/malonlaravel and ~/malonlabs_old/old_site. Extract any useful content (text, service descriptions, about page copy, contact info) and suggest what to carry over to the new site."
```

---

## GitHub Actions CI/CD Pipeline

### File: `.github/workflows/ci.yml`

```yaml
name: CI — Build, Test & Deploy

on:
  push:
    branches: [main, staging, dev]
  pull_request:
    branches: [main, staging]

jobs:
  # ─── LINT & VALIDATE ───
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Validate HTML
        uses: nicferrier/validate-html-action@v1
        with:
          files: deliverables/website/*.html

      - name: Lint CSS (Stylelint)
        run: |
          npx stylelint "deliverables/website/**/*.css" --fix || true

      - name: Check links
        uses: lycheeverse/lychee-action@v2
        with:
          args: deliverables/website/*.html
          fail: false

  # ─── PERFORMANCE AUDIT ───
  lighthouse:
    runs-on: ubuntu-latest
    needs: lint
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 22

      - name: Install Chrome
        run: |
          sudo apt-get update
          sudo apt-get install -y google-chrome-stable

      - name: Run Lighthouse
        run: |
          npm install -g @lhci/cli
          lhci autorun --config=.lighthouserc.json || true

      - name: Upload Lighthouse report
        uses: actions/upload-artifact@v4
        with:
          name: lighthouse-report
          path: .lighthouseci/

  # ─── BUILD DOCUMENTS ───
  build-docs:
    runs-on: ubuntu-latest
    needs: lint
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 22

      - name: Setup Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.12'

      - name: Install dependencies
        run: |
          npm install -g docx pptxgenjs tsx
          pip install python-docx python-pptx openpyxl Pillow reportlab

      - name: Build DOCX deliverables
        run: |
          for script in scripts/build-*.js scripts/build-*.ts; do
            [ -f "$script" ] && npx tsx "$script"
          done

      - name: Upload deliverables
        uses: actions/upload-artifact@v4
        with:
          name: deliverables
          path: deliverables/

  # ─── DEPLOY TO STAGING ───
  deploy-staging:
    runs-on: ubuntu-latest
    needs: [lint, lighthouse]
    if: github.ref == 'refs/heads/staging'
    steps:
      - uses: actions/checkout@v4

      - name: Deploy to staging
        # Option A: GitHub Pages (free)
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: deliverables/website
          destination_dir: staging

        # Option B: Deploy to VPS via SSH (uncomment if using VPS)
        # - name: Deploy via SSH
        #   uses: appleboy/ssh-action@v1
        #   with:
        #     host: ${{ secrets.STAGING_HOST }}
        #     username: ${{ secrets.STAGING_USER }}
        #     key: ${{ secrets.STAGING_SSH_KEY }}
        #     script: |
        #       cd /var/www/staging.malonlabs.com
        #       git pull origin staging
        #       # Restart if needed

  # ─── DEPLOY TO PRODUCTION ───
  deploy-production:
    runs-on: ubuntu-latest
    needs: [lint, lighthouse, build-docs]
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4

      - name: Deploy to production
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: deliverables/website
          cname: malonlabs.com  # Your domain

        # Option B: Deploy to VPS via SSH (uncomment if using VPS)
        # - name: Deploy via SSH
        #   uses: appleboy/ssh-action@v1
        #   with:
        #     host: ${{ secrets.PRODUCTION_HOST }}
        #     username: ${{ secrets.PRODUCTION_USER }}
        #     key: ${{ secrets.PRODUCTION_SSH_KEY }}
        #     script: |
        #       cd /var/www/malonlabs.com
        #       git pull origin main
        #       sudo systemctl reload nginx
```

### File: `.github/workflows/scheduled.yml`

```yaml
name: Scheduled Tasks

on:
  schedule:
    # Run link checker weekly (Sundays at 6am EAT / 3am UTC)
    - cron: '0 3 * * 0'

  workflow_dispatch: # Allow manual trigger

jobs:
  link-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Check for broken links
        uses: lycheeverse/lychee-action@v2
        with:
          args: deliverables/website/*.html
      - name: Create issue if broken links found
        if: failure()
        uses: peter-evans/create-issue-from-file@v5
        with:
          title: "Broken links detected on website"
          content-filepath: lychee/out.md
          labels: bug, automated

  security-audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run security headers check
        run: |
          npx is-website-vulnerable https://malonlabs.com || true
```

---

## Lighthouse Configuration

### File: `.lighthouserc.json`

```json
{
  "ci": {
    "collect": {
      "staticDistDir": "deliverables/website",
      "numberOfRuns": 3
    },
    "assert": {
      "assertions": {
        "categories:performance": ["warn", { "minScore": 0.85 }],
        "categories:accessibility": ["error", { "minScore": 0.90 }],
        "categories:best-practices": ["warn", { "minScore": 0.90 }],
        "categories:seo": ["warn", { "minScore": 0.90 }]
      }
    },
    "upload": {
      "target": "filesystem",
      "outputDir": ".lighthouseci"
    }
  }
}
```

---

## Local Automation Scripts

### Auto-commit & Push (Cron Job)

```bash
#!/bin/bash
# File: scripts/auto-git-push.sh
# Automatically commits and pushes changes every 2 hours during work hours
# Add to crontab: 0 8-18/2 * * 1-5 /home/Projects/ai_consult/scripts/auto-git-push.sh

PROJECT_DIR="$HOME/Projects/ai_consult"
cd "$PROJECT_DIR" || exit 1

# Only push if there are changes
if [[ -n $(git status --porcelain) ]]; then
  TIMESTAMP=$(date '+%Y-%m-%d %H:%M')
  git add -A
  git commit -m "chore: auto-save at $TIMESTAMP"
  git push origin "$(git branch --show-current)" 2>/dev/null
  echo "[$TIMESTAMP] Changes pushed."
else
  echo "[$(date '+%Y-%m-%d %H:%M')] No changes to push."
fi
```

### Website Build & Preview Script

```bash
#!/bin/bash
# File: scripts/dev-server.sh
# Starts live-server with browser auto-open for website preview

PROJECT_DIR="$HOME/Projects/ai_consult"
WEBSITE_DIR="$PROJECT_DIR/deliverables/website"

if [ ! -f "$WEBSITE_DIR/index.html" ]; then
  echo "❌ No index.html found in $WEBSITE_DIR"
  echo "   Build the website first, then run this script."
  exit 1
fi

echo "🌐 Starting dev server at http://localhost:8080"
echo "   Press Ctrl+C to stop"
cd "$WEBSITE_DIR"
live-server --port=8080 --no-browser
```

### Document Build Script

```bash
#!/bin/bash
# File: scripts/build-all.sh
# Builds all deliverables (website is built separately)

PROJECT_DIR="$HOME/Projects/ai_consult"
cd "$PROJECT_DIR" || exit 1

echo "📄 Building deliverables..."

# Build DOCX files
for script in scripts/build-assessment.ts scripts/build-proposal.ts; do
  if [ -f "$script" ]; then
    echo "  Building $(basename $script)..."
    npx tsx "$script"
  fi
done

# Build PPTX
if [ -f "scripts/build-pitch-deck.ts" ]; then
  echo "  Building pitch deck..."
  npx tsx "scripts/build-pitch-deck.ts"
fi

# Convert to PDF for preview
if command -v soffice &> /dev/null; then
  echo "  Converting to PDF..."
  for docx in deliverables/consulting/**/*.docx; do
    [ -f "$docx" ] && soffice --headless --convert-to pdf "$docx" --outdir "$(dirname $docx)"
  done
  for pptx in deliverables/consulting/**/*.pptx; do
    [ -f "$pptx" ] && soffice --headless --convert-to pdf "$pptx" --outdir "$(dirname $pptx)"
  done
fi

echo "✅ Build complete. Check deliverables/ for output."
```

### Performance Test Script

```bash
#!/bin/bash
# File: scripts/perf-test.sh
# Run Lighthouse locally against the built website

WEBSITE_DIR="$HOME/Projects/ai_consult/deliverables/website"

if [ ! -f "$WEBSITE_DIR/index.html" ]; then
  echo "❌ Build the website first."
  exit 1
fi

echo "🔍 Running Lighthouse performance audit..."

# Start a temp server
npx serve "$WEBSITE_DIR" -l 3333 &
SERVER_PID=$!
sleep 2

# Run Lighthouse
npx lighthouse http://localhost:3333 \
  --chrome-flags="--headless --no-sandbox" \
  --output=html \
  --output-path="$HOME/Projects/ai_consult/deliverables/shared/lighthouse-report.html" \
  --only-categories=performance,accessibility,best-practices,seo

# Stop server
kill $SERVER_PID 2>/dev/null

echo "✅ Report saved to deliverables/shared/lighthouse-report.html"
echo "   Open it in a browser to review."
```

---

## Crontab Setup

Run `crontab -e` and add:

```cron
# Auto-commit & push every 2 hours during work hours (Mon-Fri, 8am-6pm EAT)
0 8-18/2 * * 1-5 /home/$USER/Projects/ai_consult/scripts/auto-git-push.sh >> /home/$USER/Projects/ai_consult/logs/auto-push.log 2>&1

# Weekly broken link check (Sunday 6am EAT)
0 6 * * 0 cd /home/$USER/Projects/ai_consult && npx lychee deliverables/website/*.html >> /home/$USER/Projects/ai_consult/logs/link-check.log 2>&1

# Monthly: rebuild all documents (1st of each month at 2am)
0 2 1 * * /home/$USER/Projects/ai_consult/scripts/build-all.sh >> /home/$USER/Projects/ai_consult/logs/build.log 2>&1
```

Create log directory:

```bash
mkdir -p ~/Projects/ai_consult/logs
```

---

## Deployment Options

### Option A: GitHub Pages (Free — Recommended to Start)

1. Push to main
2. GitHub Actions builds and deploys to GitHub Pages
3. Set custom domain in repo settings → `malonlabs.com`
4. Add CNAME record at your DNS provider

### Option B: VPS (More Control)

```bash
# On your VPS (Ubuntu)
sudo apt install nginx certbot python3-certbot-nginx
sudo mkdir -p /var/www/malonlabs.com

# Nginx config
sudo cat > /etc/nginx/sites-available/malonlabs.com << 'EOF'
server {
    listen 80;
    server_name malonlabs.com www.malonlabs.com;
    root /var/www/malonlabs.com;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/css application/javascript image/svg+xml;

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff2)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }
}
EOF

sudo ln -s /etc/nginx/sites-available/malonlabs.com /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# SSL
sudo certbot --nginx -d malonlabs.com -d www.malonlabs.com
```

### Option C: Vercel / Netlify (Zero Config)

```bash
# Vercel
npm i -g vercel
cd deliverables/website
vercel --prod

# Netlify
npm i -g netlify-cli
cd deliverables/website
netlify deploy --prod --dir=.
```

---

## Testing Checklist (Pre-Deploy)

```markdown
### Visual
- [ ] Logo renders correctly on all pages
- [ ] Colors match brand/BRAND.md exactly
- [ ] Mobile responsive (test: 375px, 768px, 1024px, 1440px)
- [ ] Parallax effects work smoothly (no jank)
- [ ] 3D animations load without blocking content
- [ ] Lazy loading works (images load on scroll)
- [ ] Carousel navigation works (touch + click)
- [ ] Dark sections have correct contrast

### Functional
- [ ] All navigation links work
- [ ] WhatsApp CTA opens correct number
- [ ] Contact form submits (or shows instructions)
- [ ] Smooth scroll between sections
- [ ] Mobile hamburger menu works

### Performance
- [ ] Lighthouse Performance ≥ 85
- [ ] Lighthouse Accessibility ≥ 90
- [ ] First Contentful Paint < 2s
- [ ] Total page weight < 2MB
- [ ] All images optimized (WebP where possible)
- [ ] CSS/JS minified in production

### SEO
- [ ] Meta title and description set
- [ ] Open Graph tags for social sharing
- [ ] Structured data (Organization schema)
- [ ] Sitemap.xml present
- [ ] robots.txt configured
```

---

## Website Design Specifications (for Claude Code)

### Hero Section

- Full-viewport parallax hero with depth layers
- Animated 3D molecular/network pattern (matching logo motif) using Three.js or CSS 3D
- Large headline with text reveal animation
- Subtle particle effect in background
- CTA buttons with hover glow effect

### Services Section

- Three cards with hover-lift 3D transform
- Each card has an animated icon (CSS or Lottie)
- Staggered entrance animation on scroll
- Click/tap expands to full detail view

### Portfolio/Work Section

- Image carousel with smooth transitions (Swiper.js or custom)
- Lazy-loaded project screenshots
- Before/after or stat-based case study highlights

### Consulting Section

- Dedicated deep section with pricing tier cards
- Process timeline with step-by-step animation
- Animated counter for key stats (e.g., "40% efficiency gain")

### Contact Section

- Split layout: form on left, contact details + map on right
- WhatsApp floating button (persistent)
- Form with validation and clear feedback

### Global Effects

- Parallax scrolling on hero and section backgrounds
- Intersection Observer for scroll-triggered animations
- Lazy loading for all images and heavy assets
- Smooth scroll behavior
- Prefers-reduced-motion respected (accessibility)
- Loading skeleton for 3D content while it initializes

### Performance Budget

- Total page weight: < 2MB (aim for < 1.5MB)
- JavaScript: < 200KB gzipped
- CSS: < 50KB gzipped
- Images: WebP format, lazy loaded
- 3D/animations: loaded after critical content (defer)
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s

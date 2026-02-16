#!/bin/bash
# Auto-generates project documentation from content/ and deliverables/
# Outputs a single GUIDE.md for onboarding and a STATUS.md for project tracking
# Usage: ./scripts/generate-docs.sh

PROJECT_DIR="$HOME/Projects/ai_consult"
cd "$PROJECT_DIR" || exit 1

# ─── PROJECT STATUS ───
cat > docs/STATUS.md << EOF
# Project Status

**Generated:** $(date '+%Y-%m-%d %H:%M EAT')
**Branch:** $(git branch --show-current 2>/dev/null || echo 'not a git repo')
**Last Commit:** $(git log -1 --pretty=format:'%h — %s (%ar)' 2>/dev/null || echo 'none')

## Deliverables

| Deliverable | Path | Status |
|-------------|------|--------|
EOF

# Check each deliverable
check_deliverable() {
  if find "$PROJECT_DIR/$2" -maxdepth 1 -name "$3" 2>/dev/null | grep -q .; then
    echo "| $1 | \`$2\` | ✅ Built |" >> docs/STATUS.md
  else
    echo "| $1 | \`$2\` | ⬜ Not started |" >> docs/STATUS.md
  fi
}

check_deliverable "Main Website" "deliverables/website" "index.html"
check_deliverable "Consulting Landing Page" "deliverables/consulting/landing-page" "*.html"
check_deliverable "AI Readiness Assessment" "deliverables/consulting/assessment" "*.docx"
check_deliverable "Pitch Deck" "deliverables/consulting/pitch-deck" "*.pptx"
check_deliverable "Service Proposal" "deliverables/consulting/proposal" "*.docx"

cat >> docs/STATUS.md << EOF

## File Inventory

| Directory | Files | Total Size |
|-----------|-------|------------|
$(for dir in content brand deliverables scripts; do
  COUNT=$(find "$PROJECT_DIR/$dir" -type f -not -name '.gitkeep' 2>/dev/null | wc -l)
  SIZE=$(du -sh "$PROJECT_DIR/$dir" 2>/dev/null | cut -f1)
  echo "| \`$dir/\` | $COUNT | $SIZE |"
done)

## Recent Changes (Last 10 Commits)

\`\`\`
$(git log --oneline -10 2>/dev/null || echo 'No git history yet')
\`\`\`
EOF

# ─── ONBOARDING GUIDE ───
cat > docs/GUIDE.md << 'EOF'
# Malon Labs — Developer Onboarding Guide

## Prerequisites
- Node.js 22+, Python 3.12+, npm 10+
- Run `./setup.sh` to install all dependencies

## Project Overview
Malon Labs Ltd is a Tanzanian technology company with three service lines:
1. **Software & App Development** — Custom apps (Flutter), web platforms, APIs
2. **Managed IT Services** — Infrastructure, security, helpdesk, cloud
3. **Malon Labs Consulting** — AI & IT consulting, training, automation

## Key Files to Read First
1. `CLAUDE.md` — Master project spec (start here)
2. `brand/BRAND.md` — Visual identity and tone
3. `DEVOPS.md` — Git workflow, CI/CD, deployment

## Daily Workflow
```bash
# Start work
cd ~/Projects/ai_consult
git checkout dev
git pull origin dev

# Create feature branch
git checkout -b feature/your-feature-name

# Preview website changes
./scripts/dev-server.sh

# Run performance check
./scripts/perf-test.sh

# When done
git add . && git commit -m "feat(scope): description"
git push origin feature/your-feature-name
# Create PR to dev on GitHub
```

## Building Deliverables
```bash
# All at once
./scripts/build-all.sh

# Or individually via Claude Code
claude "Build the pitch deck per CLAUDE.md"
```

## Scripts Reference
| Script | Purpose |
|--------|---------|
| `setup.sh` | Install all dependencies |
| `scripts/dev-server.sh` | Live preview website |
| `scripts/build-all.sh` | Build DOCX/PPTX deliverables |
| `scripts/perf-test.sh` | Lighthouse performance audit |
| `scripts/generate-changelog.sh` | Update CHANGELOG.md from git |
| `scripts/generate-docs.sh` | Update STATUS.md and this guide |
| `scripts/auto-git-push.sh` | Auto-commit (runs via cron) |
| `scripts/setup-cron.sh` | Install cron jobs |

## Brand Quick Reference
- **Primary:** `#1E2637` (Malon Navy)
- **Secondary:** `#1A8F6E` (Emerald Green)
- **Accent:** `#F5A623` (Warm Amber)
- **Fonts:** Poppins (headings), Inter (body), Calibri (documents)
EOF

echo "✅ docs/STATUS.md updated"
echo "✅ docs/GUIDE.md updated"

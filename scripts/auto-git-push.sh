#!/bin/bash
# ============================================
# Auto Git Commit & Push
# Runs via cron every 2 hours during work hours
#
# Crontab entry:
#   0 8-18/2 * * 1-5 ~/Projects/ai_consult/scripts/auto-git-push.sh >> ~/Projects/ai_consult/logs/auto-push.log 2>&1
# ============================================

PROJECT_DIR="$HOME/Projects/ai_consult"
cd "$PROJECT_DIR" || exit 1

TIMESTAMP=$(date '+%Y-%m-%d %H:%M')
BRANCH=$(git branch --show-current 2>/dev/null)

if [ -z "$BRANCH" ]; then
  echo "[$TIMESTAMP] ERROR: Not a git repository or no branch checked out."
  exit 1
fi

# Only auto-push on dev branch (never auto-push to main or staging)
if [ "$BRANCH" != "dev" ] && [ "$BRANCH" != "${BRANCH#feature/}" ]; then
  echo "[$TIMESTAMP] Skipping auto-push on branch: $BRANCH (only dev and feature/* branches)"
  exit 0
fi

if [[ -n $(git status --porcelain) ]]; then
  git add -A
  git commit -m "chore: auto-save at $TIMESTAMP"
  
  if git push origin "$BRANCH" 2>/dev/null; then
    echo "[$TIMESTAMP] ✅ Changes pushed to $BRANCH"
  else
    echo "[$TIMESTAMP] ⚠️ Push failed (offline?) — changes committed locally"
  fi
else
  echo "[$TIMESTAMP] No changes to push."
fi

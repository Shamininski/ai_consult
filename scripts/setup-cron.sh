#!/bin/bash
# ============================================
# Setup Cron Jobs for Malon Labs automation
# Usage: ./scripts/setup-cron.sh
# ============================================

echo "🕐 Setting up automated cron jobs..."
echo ""

# Build the crontab entries
CRON_ENTRIES="
# ─── Malon Labs Automation ───
# Auto git push every 2hrs during work hours (Mon-Fri, 8am-6pm EAT)
0 8-18/2 * * 1-5 $HOME/Projects/ai_consult/scripts/auto-git-push.sh >> $HOME/Projects/ai_consult/logs/auto-push.log 2>&1

# Weekly broken link check (Sunday 6am EAT / 3am UTC)
0 3 * * 0 cd $HOME/Projects/ai_consult && npx lychee deliverables/website/*.html >> $HOME/Projects/ai_consult/logs/link-check.log 2>&1

# Auto-generate changelog and status docs weekly (Friday 5pm EAT / 2pm UTC)
0 14 * * 5 cd $HOME/Projects/ai_consult && ./scripts/generate-changelog.sh && ./scripts/generate-docs.sh >> $HOME/Projects/ai_consult/logs/docs-gen.log 2>&1
"

# Show what will be added
echo "The following cron jobs will be added:"
echo "$CRON_ENTRIES"
echo ""

read -p "Proceed? (y/n): " CONFIRM

if [ "$CONFIRM" = "y" ] || [ "$CONFIRM" = "Y" ]; then
  # Create logs directory
  mkdir -p "$HOME/Projects/ai_consult/logs"

  # Add to existing crontab (preserve existing entries)
  (crontab -l 2>/dev/null; echo "$CRON_ENTRIES") | crontab -

  echo ""
  echo "✅ Cron jobs installed. Current crontab:"
  crontab -l
else
  echo "Cancelled."
fi

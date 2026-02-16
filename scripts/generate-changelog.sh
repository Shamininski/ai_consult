#!/bin/bash
# Auto-generates CHANGELOG.md from git commit history
# Usage: ./scripts/generate-changelog.sh

PROJECT_DIR="$HOME/Projects/ai_consult"
cd "$PROJECT_DIR" || exit 1

echo "# Changelog" > CHANGELOG.md
echo "" >> CHANGELOG.md
echo "Auto-generated from git history. Last updated: $(date '+%Y-%m-%d %H:%M EAT')" >> CHANGELOG.md
echo "" >> CHANGELOG.md

# Group commits by date
git log --pretty=format:"%ad|%s|%h" --date=short | while IFS='|' read DATE MSG HASH; do
  if [ "$DATE" != "$PREV_DATE" ]; then
    echo "" >> CHANGELOG.md
    echo "## $DATE" >> CHANGELOG.md
    PREV_DATE="$DATE"
  fi
  echo "- $MSG (\`$HASH\`)" >> CHANGELOG.md
done

echo ""
echo "✅ CHANGELOG.md updated ($(grep -c "^-" CHANGELOG.md) entries)"

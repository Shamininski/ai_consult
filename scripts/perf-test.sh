#!/bin/bash
# ============================================
# Performance Test (Local Lighthouse)
# Runs Lighthouse against the built website locally
# Usage: ./scripts/perf-test.sh
# ============================================

WEBSITE_DIR="$HOME/Projects/ai_consult/deliverables/website"
REPORT_DIR="$HOME/Projects/ai_consult/deliverables/shared"

if [ ! -f "$WEBSITE_DIR/index.html" ]; then
  echo "❌ No website built yet. Build first, then test."
  exit 1
fi

mkdir -p "$REPORT_DIR"

echo "🔍 Running Lighthouse performance audit..."
echo ""

# Start a temporary server
npx serve "$WEBSITE_DIR" -l 3333 -s &
SERVER_PID=$!
sleep 2

# Run Lighthouse
npx lighthouse http://localhost:3333 \
  --chrome-flags="--headless --no-sandbox" \
  --output=html \
  --output-path="$REPORT_DIR/lighthouse-report.html" \
  --only-categories=performance,accessibility,best-practices,seo \
  --quiet

RESULT=$?

# Stop server
kill $SERVER_PID 2>/dev/null
wait $SERVER_PID 2>/dev/null

if [ $RESULT -eq 0 ]; then
  echo ""
  echo "✅ Report saved: $REPORT_DIR/lighthouse-report.html"
  echo "   Open in browser: xdg-open $REPORT_DIR/lighthouse-report.html"
else
  echo "❌ Lighthouse failed. Is Chrome installed?"
fi

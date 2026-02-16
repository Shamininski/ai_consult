#!/bin/bash
# ============================================
# Development Server
# Starts live-server with hot reload for website preview
# Usage: ./scripts/dev-server.sh
# ============================================

PROJECT_DIR="$HOME/Projects/ai_consult"
WEBSITE_DIR="$PROJECT_DIR/deliverables/website"

if [ ! -f "$WEBSITE_DIR/index.html" ]; then
  echo "❌ No index.html found in $WEBSITE_DIR"
  echo ""
  echo "Build the website first:"
  echo "  cd ~/Projects/ai_consult && claude \"Build the main website per CLAUDE.md\""
  echo ""
  exit 1
fi

PORT=${1:-8080}

echo "🌐 Starting Malon Labs dev server..."
echo "   URL: http://localhost:$PORT"
echo "   Dir: $WEBSITE_DIR"
echo "   Press Ctrl+C to stop"
echo ""

cd "$WEBSITE_DIR"
live-server --port=$PORT --no-browser --wait=500

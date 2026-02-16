#!/bin/bash
# ============================================
# Build All Deliverables
# Runs all build scripts and converts to PDF
# Usage: ./scripts/build-all.sh
# ============================================

PROJECT_DIR="$HOME/Projects/ai_consult"
cd "$PROJECT_DIR" || exit 1

echo "========================================="
echo "  Malon Labs — Build All Deliverables"
echo "========================================="
echo ""

PASS=0
FAIL=0

build() {
  if [ -f "$1" ]; then
    echo "  📄 Building $(basename $1)..."
    if npx tsx "$1" 2>/dev/null; then
      ((PASS++))
    else
      echo "    ❌ Failed: $1"
      ((FAIL++))
    fi
  fi
}

# Build DOCX and PPTX files
for script in scripts/build-*.ts scripts/build-*.js; do
  build "$script"
done

# Convert to PDF if LibreOffice is available
if command -v soffice &> /dev/null; then
  echo ""
  echo "  📑 Converting to PDF..."
  
  find deliverables -name "*.docx" -o -name "*.pptx" | while read f; do
    echo "    Converting $(basename $f)..."
    soffice --headless --convert-to pdf "$f" --outdir "$(dirname $f)" 2>/dev/null
  done
else
  echo ""
  echo "  ⚠️ LibreOffice not found — skipping PDF conversion"
fi

echo ""
echo "========================================="
echo "  Results: $PASS built, $FAIL failed"
echo "========================================="

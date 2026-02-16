#!/bin/bash
# ============================================
# AI Consult — Full Environment Setup Script
# Run: chmod +x setup.sh && ./setup.sh
# ============================================

set -e

echo ""
echo "🚀 Setting up AI Consult development environment..."
echo "=================================================="
echo ""

# --- System packages ---
echo "📦 Installing system dependencies..."
sudo apt update -qq
sudo apt install -y -qq \
  build-essential curl git wget unzip \
  python3 python3-pip python3-venv \
  libreoffice-core libreoffice-writer libreoffice-impress libreoffice-calc \
  poppler-utils pandoc wkhtmltopdf \
  fonts-crosextra-caladea fonts-crosextra-carlito \
  fonts-dejavu fonts-freefont-ttf fonts-liberation

# --- Node.js 22 ---
if ! node --version 2>/dev/null | grep -q "v22"; then
  echo "📦 Installing Node.js 22..."
  curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
  sudo apt install -y -qq nodejs
else
  echo "✅ Node.js 22 already installed"
fi

# --- npm global config ---
mkdir -p ~/.npm-global
npm config set prefix '~/.npm-global'
if ! grep -q "npm-global" ~/.bashrc 2>/dev/null; then
  echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
fi
export PATH=~/.npm-global/bin:$PATH

# --- Python packages ---
echo "🐍 Installing Python packages..."
pip install --break-system-packages -q \
  python-docx==1.2.0 \
  python-pptx==1.0.2 \
  openpyxl==3.1.5 \
  Pillow==12.1.0 \
  reportlab==4.4.9 \
  pypdf==5.9.0 \
  pypdfium2==5.3.0 \
  "pdfminer.six==20251230" \
  Jinja2==3.1.6 \
  Markdown==3.10.1 \
  markdownify==1.2.2 \
  "markitdown[pptx]==0.1.4"

# --- Node packages ---
echo "📗 Installing Node.js packages..."
npm install -g --silent \
  docx@9.5.1 \
  pptxgenjs@4.0.1 \
  marked@17.0.1 \
  pdf-lib@1.17.1 \
  sharp@0.34.5 \
  tsx@4.21.0 \
  typescript@5.9.3

# --- Google Chrome ---
if ! google-chrome --version > /dev/null 2>&1; then
  echo "🌐 Installing Google Chrome..."
  cd /tmp
  wget -q https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
  sudo dpkg -i google-chrome-stable_current_amd64.deb || sudo apt --fix-broken install -y
  cd -
else
  echo "✅ Google Chrome already installed"
fi

# --- Poppins font ---
echo "🔤 Installing Poppins font..."
mkdir -p ~/.local/share/fonts
cd /tmp
wget -q "https://github.com/google/fonts/raw/main/ofl/poppins/Poppins-Regular.ttf" -O Poppins-Regular.ttf 2>/dev/null && \
  cp Poppins-Regular.ttf ~/.local/share/fonts/ || echo "  ⚠️  Poppins font: download manually from https://fonts.google.com/specimen/Poppins"
wget -q "https://github.com/google/fonts/raw/main/ofl/poppins/Poppins-Bold.ttf" -O Poppins-Bold.ttf 2>/dev/null && \
  cp Poppins-Bold.ttf ~/.local/share/fonts/ || true
fc-cache -f 2>/dev/null
cd -

# --- Project structure ---
echo "📁 Creating project structure..."
PROJECT_DIR="$HOME/Projects/ai_consult"
mkdir -p "$PROJECT_DIR"/{assets,outputs,scripts,templates}

cat > "$PROJECT_DIR/README.md" << 'EOF'
# AI Consult — AI & IT Consultation Business (Tanzania)

## Project Structure
- `assets/` — logos, images, brand resources
- `outputs/` — generated files (PPTX, DOCX, PDF, HTML)
- `scripts/` — generation scripts
- `templates/` — reusable templates

## Deliverables
1. Landing page (HTML)
2. AI Readiness Assessment (DOCX)
3. Pitch Deck (PPTX)
4. Service Proposal (DOCX)
EOF

# --- Verification ---
echo ""
echo "========================================="
echo "  Environment Verification"
echo "========================================="

PASS=0; FAIL=0

check() {
  if eval "$2" > /dev/null 2>&1; then
    echo "  ✅ $1"
    ((PASS++))
  else
    echo "  ❌ $1"
    ((FAIL++))
  fi
}

check "Python 3"         "python3 --version"
check "Node.js"          "node --version"
check "npm"              "npm --version"
check "LibreOffice"      "soffice --version"
check "Pandoc"           "pandoc --version"
check "pdftoppm"         "pdftoppm -v 2>&1"
check "wkhtmltopdf"      "wkhtmltopdf --version 2>&1"
check "Google Chrome"    "google-chrome --version"
check "python-docx"      "python3 -c 'import docx'"
check "python-pptx"      "python3 -c 'import pptx'"
check "openpyxl"         "python3 -c 'import openpyxl'"
check "Pillow"           "python3 -c 'import PIL'"
check "reportlab"        "python3 -c 'import reportlab'"
check "pypdf"            "python3 -c 'import pypdf'"
check "npm: docx"        "npm list -g docx"
check "npm: pptxgenjs"   "npm list -g pptxgenjs"
check "npm: tsx"         "npm list -g tsx"

echo ""
echo "========================================="
echo "  Results: $PASS passed, $FAIL failed"
echo "========================================="

if [ $FAIL -gt 0 ]; then
  echo ""
  echo "⚠️  Some items failed. Review and fix manually."
else
  echo ""
  echo "🎉 All set! Your environment is ready."
  echo ""
  echo "Next: cd ~/Projects/ai_consult && claude"
fi
echo ""

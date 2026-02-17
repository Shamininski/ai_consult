#!/bin/bash
# Converts SVG logos to PNG using Chrome headless
# Usage: ./scripts/convert-logos.sh

LOGO_DIR="$HOME/Projects/ai_consult/brand/logo"
TEMP_DIR=$(mktemp -d)

convert_svg() {
  local svg_file="$1"
  local png_file="$2"
  local width="$3"
  local height="$4"
  local basename=$(basename "$svg_file" .svg)

  # Create an HTML wrapper that loads the font and embeds the SVG inline
  local svg_content
  svg_content=$(cat "$svg_file")

  cat > "$TEMP_DIR/${basename}.html" << HTMLEOF
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Viga&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; }
  html, body { width: ${width}px; height: ${height}px; overflow: hidden; }
  svg { display: block; width: ${width}px; height: ${height}px; }
</style>
</head>
<body>
${svg_content}
</body>
</html>
HTMLEOF

  # Chrome writes screenshot relative to its CWD, so cd to target dir
  (cd "$LOGO_DIR" && google-chrome \
    --headless=new \
    --disable-gpu \
    --no-sandbox \
    --screenshot="$(basename "$png_file")" \
    --window-size="${width},${height}" \
    --hide-scrollbars \
    "file://$TEMP_DIR/${basename}.html" \
    2>/dev/null)

  if [ -f "$png_file" ]; then
    echo "  ✅ $(basename "$png_file") ($(du -h "$png_file" | cut -f1))"
  else
    echo "  ❌ Failed: $(basename "$png_file")"
  fi
}

echo "🎨 Converting SVG logos to PNG..."
echo ""

# Full logo variants (640x640)
convert_svg "$LOGO_DIR/malon-logo-dark-bg.svg" "$LOGO_DIR/malon-logo-dark-bg.png" 640 640
convert_svg "$LOGO_DIR/malon-logo-light-bg.svg" "$LOGO_DIR/malon-logo-light-bg.png" 640 640

# Consulting variant (640x720)
convert_svg "$LOGO_DIR/malon-consulting-dark-bg.svg" "$LOGO_DIR/malon-consulting-dark-bg.png" 640 720

# Icon-only variants (640x640)
convert_svg "$LOGO_DIR/malon-icon-only.svg" "$LOGO_DIR/malon-icon-only.png" 640 640
convert_svg "$LOGO_DIR/malon-icon-only-white.svg" "$LOGO_DIR/malon-icon-only-white.png" 640 640

# Cleanup
rm -rf "$TEMP_DIR"

echo ""
echo "✅ Done. PNGs saved to brand/logo/"
